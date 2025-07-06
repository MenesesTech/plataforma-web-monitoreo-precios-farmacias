package femt.sistema_precios.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import femt.sistema_precios.dto.ProductoCardDTO;
import femt.sistema_precios.dto.ProductoCardKeywordDTO;
import femt.sistema_precios.dto.ProductoPrecioDTO;
import femt.sistema_precios.dto.ProductoPrecioUnificadoDTO;
import femt.sistema_precios.dto.ProductoRequestDTO;
import femt.sistema_precios.service.ProductoScrapingService;
import femt.sistema_precios.service.ProductoService;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoScrapingController {
    @Autowired
    private ProductoScrapingService productoScrapingService;
    @Autowired
    private ProductoService productoService;

    @PostMapping("/scrapear")
    public ResponseEntity<?> obtenerProductosDesdeFlask() {
        try {
            List<ProductoRequestDTO> productos = productoScrapingService.solicitudProductosFlask();
            return ResponseEntity.ok(productos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                    .body("Error al consultar Flask: " + e.getMessage());
        }
    }

    @PostMapping("/guardar-productos")
    public ResponseEntity<?> guardarProductos() {
        try {
            List<ProductoRequestDTO> productos = productoScrapingService.solicitudProductosFlask();
            productoScrapingService.registrarProducto(productos);
            return ResponseEntity.ok("Productos guardados correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                    .body("Error al guardar productos: " + e.getMessage());
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<?> listarProductosConMejorPrecio() {
        try {
            List<ProductoCardDTO> productos = productoService.listarProductosConMejorPrecio();
            return ResponseEntity.ok(productos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener productos: " + e.getMessage());
        }
    }

    @PostMapping("/buscar/{keywords}")
    public ResponseEntity<?> buscarProductoKeywords(@PathVariable("keywords") String keywords) {
        try {
            List<ProductoCardKeywordDTO> productosEncontrados = productoScrapingService.buscarPorKeyword(keywords);
            return ResponseEntity.ok(productosEncontrados);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al buscar productos: " + e.getMessage());
        }
    }

    @GetMapping("/precios/{id}")
    public ResponseEntity<?> obtenerPrecios(@PathVariable Long id) {
        try {
            List<ProductoPrecioDTO> productos = productoService.listarProductosPorId(id.intValue());

            if (productos.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Producto no encontrado");
            }

            ProductoPrecioUnificadoDTO resultado = new ProductoPrecioUnificadoDTO();

            List<Double> precios = new ArrayList<>();
            List<String> tiendas = new ArrayList<>();
            List<String> urls = new ArrayList<>();
            List<String> urls_base = new ArrayList<>();
            for (ProductoPrecioDTO producto : productos) {
                precios.add(producto.getPrecio());
                tiendas.add(producto.getTienda());
                urls.add(producto.getUrl());
                urls_base.add(producto.getUrl_base());
                resultado.setImagenUrl(producto.getImagenUrl());
                resultado.setNombre(producto.getNombre());
            }
            resultado.setUrl_base(urls_base);
            resultado.setPrecio(precios);
            resultado.setTienda(tiendas);
            resultado.setUrl(urls);

            return ResponseEntity.ok(resultado);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener precios: " + e.getMessage());
        }
    }

}
