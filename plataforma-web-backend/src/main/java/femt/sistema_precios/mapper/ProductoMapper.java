package femt.sistema_precios.mapper;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import femt.sistema_precios.dto.ProductoCardDTO;
import femt.sistema_precios.model.PrecioHistorico;
import femt.sistema_precios.model.Producto;
import femt.sistema_precios.model.Tienda;

@Component
public class ProductoMapper {

    public ProductoCardDTO toCardDTO(Producto producto) {
        ProductoCardDTO dto = new ProductoCardDTO();
        dto.setId(producto.getId());
        dto.setNombre(producto.getNombre());
        dto.setImagenUrl(producto.getImagenUrl());

        Optional<PrecioHistorico> mejorPrecio = producto.getPrecios().stream()
                .min(Comparator.comparing(PrecioHistorico::getPrecio));

        if (mejorPrecio.isPresent()) {
            PrecioHistorico precio = mejorPrecio.get();
            Tienda tienda = precio.getTienda();
            dto.setMejorPrecio(precio.getPrecio());

            // ✅ Contar tiendas únicas correctamente
            Set<String> tiendasUnicas = producto.getPrecios().stream()
                    .map(ph -> ph.getTienda().getNombre())
                    .collect(Collectors.toSet());
            dto.setCantidadTienda(tiendasUnicas.size());

            dto.setTiendaNombre(tienda.getNombre());
            dto.setBase(tienda.getUrlBase());

            String url = producto.getDetalleUrls() != null && !producto.getDetalleUrls().isEmpty()
                    ? producto.getDetalleUrls().get(0).getUrl()
                    : "";
            dto.setUrlProducto(url);
        } else {
            dto.setMejorPrecio(BigDecimal.ZERO);
            dto.setTiendaNombre("Sin información");
            dto.setUrlProducto("");
            dto.setCantidadTienda(0); // También puedes poner null si prefieres
        }

        return dto;
    }

}
