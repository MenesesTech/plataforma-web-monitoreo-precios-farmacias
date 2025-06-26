package femt.sistema_precios.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import femt.sistema_precios.dto.PrecioHistoricoDTO;
import femt.sistema_precios.model.PrecioHistorico;

@Component
public class PrecioHistoricoMapper {
    @Autowired
    private ModelMapper modelMapper;

    public PrecioHistorico toEntity(PrecioHistoricoDTO dto) {
        PrecioHistorico precioHistorico = modelMapper.map(dto, PrecioHistorico.class);
        return precioHistorico;
    }
}
