package femt.sistema_precios.mapper;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import femt.sistema_precios.dto.ProductoCardDTO;
import femt.sistema_precios.dto.ProductoDTO;
import femt.sistema_precios.model.PrecioHistorico;
import femt.sistema_precios.model.Producto;

@Component
public class ProductoMapper {

    @Autowired
    private ModelMapper modelMapper;

    public Producto toEntity(ProductoDTO dto) {
        Producto producto = modelMapper.map(dto, Producto.class);
        return producto;
    }

    public ProductoCardDTO toCardDTO(Producto producto) {
        ProductoCardDTO dto = new ProductoCardDTO();
        dto.setId(producto.getId());
        dto.setNombre(producto.getNombre());
        dto.setImagenUrl(producto.getImagenUrl());

        Optional<PrecioHistorico> mejorPrecio = producto.getPrecios().stream()
                .min(Comparator.comparing(PrecioHistorico::getPrecio));

        if (mejorPrecio.isPresent()) {
            PrecioHistorico precio = mejorPrecio.get();
            dto.setMejorPrecio(precio.getPrecio());
            dto.setTiendaNombre(precio.getTienda().getNombre());

            String url = producto.getDetalleUrls() != null && !producto.getDetalleUrls().isEmpty()
                    ? producto.getDetalleUrls().get(0).getUrl()
                    : "";
            dto.setUrlProducto(url);
        } else {
            dto.setMejorPrecio(BigDecimal.ZERO);
            dto.setTiendaNombre("Sin información");
            dto.setUrlProducto("");
        }
        return dto;
    }
}
