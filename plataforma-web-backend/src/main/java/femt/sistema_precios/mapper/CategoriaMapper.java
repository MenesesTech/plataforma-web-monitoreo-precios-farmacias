package femt.sistema_precios.mapper;

import femt.sistema_precios.dto.request.CategoriaRequestDTO;
import femt.sistema_precios.model.Categoria;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CategoriaMapper {
    @Autowired
    private ModelMapper modelMapper;

    public Categoria toEntity(CategoriaRequestDTO dto){
        Categoria categoria = new Categoria();
        categoria.setNombre(dto.getNombre());
        return categoria;
    }
}
