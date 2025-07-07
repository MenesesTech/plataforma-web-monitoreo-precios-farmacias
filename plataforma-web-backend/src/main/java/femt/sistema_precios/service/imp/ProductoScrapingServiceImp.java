package femt.sistema_precios.service.imp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import femt.sistema_precios.config.ScraperApiConfig;
import femt.sistema_precios.dto.ProductoCardKeywordDTO;
import femt.sistema_precios.dto.ProductoRequestDTO;
import femt.sistema_precios.model.DetalleUrl;
import femt.sistema_precios.model.PrecioHistorico;
import femt.sistema_precios.model.Producto;
import femt.sistema_precios.model.Tienda;
import femt.sistema_precios.repository.ProductoRepository;
import femt.sistema_precios.repository.TiendaRepository;
import femt.sistema_precios.service.ProductoScrapingService;

import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ProductoScrapingServiceImp implements ProductoScrapingService {

    private final RestTemplate restTemplate;
    private final ScraperApiConfig scraperApiConfig;
    private final TiendaRepository tiendaRepository;
    private final ProductoRepository productoRepository;

    public ProductoScrapingServiceImp(RestTemplate restTemplate, ScraperApiConfig scraperApiConfig,
            TiendaRepository tiendaRepository, ProductoRepository productoRepository) {
        this.restTemplate = restTemplate;
        this.scraperApiConfig = scraperApiConfig;
        this.tiendaRepository = tiendaRepository;
        this.productoRepository = productoRepository;
    }

    @Override
    @Transactional
    public void registrarProducto(List<ProductoRequestDTO> dtoList) throws Exception {
        log.info("Iniciando registro de {} productos", dtoList.size());

        for (ProductoRequestDTO dto : dtoList) {
            try {
                // Validar que el DTO tenga datos válidos
                if (dto == null || dto.getNombre() == null || dto.getNombre().trim().isEmpty()) {
                    log.warn("DTO nulo o sin nombre, saltando producto");
                    continue;
                }

                // Validar que las listas tengan el mismo tamaño
                if (dto.getTienda() == null || dto.getPrecio() == null ||
                        dto.getDetalle_url() == null || dto.getUrl_base() == null) {
                    log.warn("Listas nulas en producto: {}", dto.getNombre());
                    continue;
                }

                int size = dto.getTienda().size();
                if (dto.getPrecio().size() != size || dto.getDetalle_url().size() != size ||
                        dto.getUrl_base().size() != size) {
                    log.warn("Tamaños de listas inconsistentes para producto: {}", dto.getNombre());
                    continue;
                }

                log.info("Procesando producto: {} con {} tiendas", dto.getNombre(), size);

                // Buscar productos por nombre (pueden existir múltiples)
                List<Producto> productosExistentes = productoRepository.findByNombre(dto.getNombre());

                Producto producto;
                if (!productosExistentes.isEmpty()) {
                    // Usar el primero encontrado
                    producto = productosExistentes.get(0);
                    log.info("Producto existente encontrado: {}", producto.getId());
                } else {
                    // Crear nuevo producto
                    producto = new Producto();
                    producto.setNombre(dto.getNombre());
                    producto.setImagenUrl(dto.getImagen_url());
                    producto.setDetalleUrls(new ArrayList<>());
                    producto.setPrecios(new ArrayList<>());
                    log.info("Creando nuevo producto: {}", dto.getNombre());
                }

                // Procesar cada tienda
                for (int i = 0; i < size; i++) {
                    try {
                        String nombreTienda = dto.getTienda().get(i);
                        String urlBase = dto.getUrl_base().get(i);
                        String detalleUrlStr = dto.getDetalle_url().get(i);
                        String precioStr = dto.getPrecio().get(i);

                        // Validar datos individuales
                        if (nombreTienda == null || urlBase == null || detalleUrlStr == null || precioStr == null) {
                            log.warn("Datos nulos en tienda {} para producto {}", i, dto.getNombre());
                            continue;
                        }

                        // Limpiar y convertir precio
                        BigDecimal precioValor;
                        try {
                            String precioCleaned = precioStr.replace(",", ".").replaceAll("[^0-9.]", "");
                            precioValor = new BigDecimal(precioCleaned);
                        } catch (NumberFormatException e) {
                            log.warn("Error convirtiendo precio '{}' para tienda {}: {}", precioStr, nombreTienda,
                                    e.getMessage());
                            continue;
                        }

                        // Buscar o crear Tienda
                        Tienda tienda = tiendaRepository.findByNombre(nombreTienda)
                                .orElseGet(() -> {
                                    Tienda nueva = new Tienda();
                                    nueva.setNombre(nombreTienda);
                                    nueva.setUrlBase(urlBase);
                                    nueva.setPrecios(new ArrayList<>());
                                    log.info("Creando nueva tienda: {}", nombreTienda);
                                    return tiendaRepository.save(nueva);
                                });

                        // Crear DetalleUrl
                        DetalleUrl detalleUrl = new DetalleUrl();
                        detalleUrl.setUrl(detalleUrlStr);
                        detalleUrl.setProducto(producto);
                        producto.getDetalleUrls().add(detalleUrl);

                        // Crear PrecioHistorico
                        PrecioHistorico precio = new PrecioHistorico();
                        precio.setPrecio(precioValor);
                        precio.setFecha(LocalDateTime.now());
                        precio.setProducto(producto);
                        precio.setTienda(tienda);
                        producto.getPrecios().add(precio);

                        log.debug("Agregado precio {} para tienda {} en producto {}",
                                precioValor, nombreTienda, dto.getNombre());

                    } catch (Exception e) {
                        log.error("Error procesando tienda {} para producto {}: {}",
                                i, dto.getNombre(), e.getMessage());
                        // Continuar con la siguiente tienda
                    }
                }

                // Guardar producto solo si tiene al menos un precio
                if (!producto.getPrecios().isEmpty()) {
                    productoRepository.save(producto);
                    log.info("Producto guardado exitosamente: {} con {} precios",
                            producto.getNombre(), producto.getPrecios().size());
                } else {
                    log.warn("Producto {} no tiene precios válidos, no se guardará", dto.getNombre());
                }

            } catch (Exception e) {
                log.error("Error procesando producto {}: {}",
                        dto != null ? dto.getNombre() : "null", e.getMessage(), e);
                // Continuar con el siguiente producto
            }
        }

        log.info("Finalizado registro de productos");
    }

    @Override
    public void eliminarProducto(Long id) throws Exception {
        // Implementar si es necesario
    }

    @Override
    public void actualizarProducto(ProductoRequestDTO precioHistoricoDTO) {
        // Implementar si es necesario
    }

    @Override
    public List<ProductoRequestDTO> solicitudProductosFlask() throws Exception {
        try {
            log.info("Solicitando productos a Flask desde: {}", scraperApiConfig.getUrl1());

            ResponseEntity<ProductoRequestDTO[]> response = restTemplate.postForEntity(
                    scraperApiConfig.getUrl1(), null, ProductoRequestDTO[].class);

            if (response.getBody() == null) {
                throw new IllegalStateException("No se recibieron productos de Flask");
            }

            List<ProductoRequestDTO> productos = Arrays.asList(response.getBody());
            log.info("Recibidos {} productos de Flask", productos.size());

            return productos;
        } catch (RestClientException e) {
            log.error("Error al comunicarse con el servicio Flask: {}", e.getMessage());
            throw new Exception("Error al comunicarse con el servicio Flask: " + e.getMessage());
        }
    }

    @Override
    public List<ProductoCardKeywordDTO> buscarPorKeyword(String keywords) throws Exception {
        try {
            String url = scraperApiConfig.getUrl2();
            String fullUrl = url + keywords;

            log.info("Buscando productos por keyword: {} en URL: {}", keywords, fullUrl);

            ResponseEntity<ProductoCardKeywordDTO[]> response = restTemplate.postForEntity(
                    fullUrl, null, ProductoCardKeywordDTO[].class);

            if (response.getBody() == null) {
                throw new IllegalStateException("No se recibieron productos de Flask para búsqueda");
            }

            List<ProductoCardKeywordDTO> productos = Arrays.asList(response.getBody());
            log.info("Encontrados {} productos para keyword: {}", productos.size(), keywords);

            return productos;

        } catch (Exception e) {
            log.error("Error buscando por keyword {}: {}", keywords, e.getMessage());
            throw new Exception("Error al comunicarse con el servicio Flask: " + e.getMessage());
        }
    }
}