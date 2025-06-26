package femt.sistema_precios.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import femt.sistema_precios.dto.ProductoDTO;
import femt.sistema_precios.model.Producto;

@Component
public class ProductoMapper {

    @Autowired
    private ModelMapper modelMapper;

    public Producto toEntity(ProductoDTO dto) {
        Producto producto = modelMapper.map(dto, Producto.class);
        return producto;
    }
}
