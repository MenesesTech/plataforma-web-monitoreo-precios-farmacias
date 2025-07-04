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
import femt.sistema_precios.dto.ProductoRequestDTO;
import femt.sistema_precios.model.DetalleUrl;
import femt.sistema_precios.model.PrecioHistorico;
import femt.sistema_precios.model.Producto;
import femt.sistema_precios.model.Tienda;
import femt.sistema_precios.repository.ProductoRepository;
import femt.sistema_precios.repository.TiendaRepository;
import femt.sistema_precios.service.ProductoScrapingService;

@Service
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
    public void registrarProducto(List<ProductoRequestDTO> dtoList) throws Exception {
        for (ProductoRequestDTO dto : dtoList) {
            Producto producto = new Producto();
            producto.setNombre(dto.getNombre());
            producto.setImagenUrl(dto.getImagen_url());

            List<DetalleUrl> detalleUrls = new ArrayList<>();
            List<PrecioHistorico> precios = new ArrayList<>();

            for (int i = 0; i < dto.getTienda().size(); i++) {
                String nombreTienda = dto.getTienda().get(i);
                String urlBase = dto.getUrl_base().get(i);
                String detalleUrlStr = dto.getDetalle_url().get(i);
                BigDecimal precioValor = new BigDecimal(dto.getPrecio().get(i).replace(",", "."));

                // Crear tienda
                Tienda tienda = tiendaRepository.findByNombre(nombreTienda)
                        .orElseGet(() -> {
                            Tienda nueva = new Tienda();
                            nueva.setNombre(nombreTienda);
                            nueva.setUrlBase(urlBase);
                            return tiendaRepository.save(nueva);
                        });

                // Crear Detalle_Url
                DetalleUrl detalleUrl = new DetalleUrl();
                detalleUrl.setUrl(detalleUrlStr);
                detalleUrl.setProducto(producto);
                detalleUrls.add(detalleUrl);

                // Crear PrecioHistorico
                PrecioHistorico precio = new PrecioHistorico();
                precio.setPrecio(precioValor);
                precio.setFecha(LocalDateTime.now());
                precio.setProducto(producto);
                precio.setTienda(tienda);
                precios.add(precio);
            }

            producto.setDetalleUrls(detalleUrls);
            producto.setPrecios(precios);

            productoRepository.save(producto);

        }
    }

    @Override
    public void eliminarProducto(Long id) throws Exception {

    }

    @Override
    public void actualizarProducto(ProductoRequestDTO precioHistoricoDTO) {
    }

    @Override
    public List<ProductoRequestDTO> solicitudProductosFlask() throws Exception {
        try {
            ResponseEntity<ProductoRequestDTO[]> response = restTemplate.postForEntity(scraperApiConfig.getUrl(), null,
                    ProductoRequestDTO[].class);
            if (response.getBody() == null) {
                throw new IllegalStateException("No se rebieron productos de Flask");
            }

            List<ProductoRequestDTO> productos = Arrays.asList(response.getBody());
            // registrarProducto(productos);
            return productos;
        } catch (RestClientException e) {
            throw new Exception("Error al comunicarse con el servicio Flask: " + e.getMessage());
        }
    }
}
