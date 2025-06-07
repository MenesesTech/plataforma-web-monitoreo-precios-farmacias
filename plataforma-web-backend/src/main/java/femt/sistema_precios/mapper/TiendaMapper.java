package femt.sistema_precios.mapper;

import femt.sistema_precios.dto.request.TiendaRequestDTO;
import femt.sistema_precios.model.Tienda;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TiendaMapper {
    @Autowired
    private ModelMapper modelMapper;

    public Tienda toEntity(TiendaRequestDTO dto){
        Tienda tienda = new Tienda();
        tienda.setNombre(dto.getNombre());
        tienda.setLogo_url(dto.getLogo_url());
        tienda.setUrl_base(dto.getUrl_base());
        return tienda;
    }
}
