package femt.sistema_precios.serviceTest;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import femt.sistema_precios.dto.ProductoRequestDTO;
import femt.sistema_precios.model.Producto;
import femt.sistema_precios.repository.ProductoRepository;
import femt.sistema_precios.service.ProductoScrapingService;

@SpringBootTest
@ActiveProfiles("test")
@RunWith(SpringRunner.class)
public class ProductoServiceTest {

    @Autowired
    private ProductoScrapingService productoScrapingService;

    @Autowired
    private ProductoRepository productoRepository;

    @Test
    public void agregarNuevoProducto() throws Exception {
        // Datos de entrada
        ProductoRequestDTO productoRequestDTO = new ProductoRequestDTO();
        productoRequestDTO.setNombre("Abrilar EA 575 Jarabe FRASCO 100 ML");
        productoRequestDTO.setImagen_url("https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/932007X.jpg");
        productoRequestDTO.setDetalle_url(Arrays.asList("/producto/abrilar-jarabe/932007",
                "/producto/abrilar-jarabe/932007"));
        productoRequestDTO.setPrecio(Arrays.asList("22,60", "24,00"));
        productoRequestDTO.setTienda(Arrays.asList("inkafarma", "mifarma"));
        productoRequestDTO.setUrl_base(Arrays.asList("http://inkafarma.com.pe", "http://mifarma.com.pe"));

        // Accion
        productoScrapingService.registrarProducto(Collections.singletonList(productoRequestDTO));

        // Verificacion
        List<Producto> productos = productoRepository.findAll();
        for (Producto producto : productos) {
            System.err.println(producto.getNombre());
        }
    }

}
