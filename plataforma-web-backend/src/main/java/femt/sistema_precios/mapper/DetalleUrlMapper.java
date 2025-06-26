package femt.sistema_precios.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import femt.sistema_precios.dto.DetalleUrlDTO;
import femt.sistema_precios.model.DetalleUrl;

@Component
public class DetalleUrlMapper {

    @Autowired
    private ModelMapper modelMapper;

    public DetalleUrl toEntity(DetalleUrlDTO dto) {
        DetalleUrl detalleUrl = modelMapper.map(dto, DetalleUrl.class);
        return detalleUrl;
    }
}
