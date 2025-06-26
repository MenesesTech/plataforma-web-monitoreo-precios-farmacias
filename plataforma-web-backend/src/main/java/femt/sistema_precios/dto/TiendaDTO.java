package femt.sistema_precios.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TiendaDTO {
    private Long id;
    private String nombre;
    private String urlBase;
    private List<PrecioHistoricoDTO> precios;
}
