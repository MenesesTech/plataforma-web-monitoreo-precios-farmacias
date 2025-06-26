package femt.sistema_precios.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import femt.sistema_precios.dto.TiendaDTO;
import femt.sistema_precios.model.Tienda;

@Component
public class TiendaMapper {
    @Autowired
    private ModelMapper modelMapper;

    public Tienda toEntity(TiendaDTO dto) {
        Tienda tienda = modelMapper.map(dto, Tienda.class);
        return tienda;
    }

}
