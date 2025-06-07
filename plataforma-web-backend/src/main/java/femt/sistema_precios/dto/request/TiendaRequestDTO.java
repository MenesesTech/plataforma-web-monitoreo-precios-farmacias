package femt.sistema_precios.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TiendaRequestDTO {
    private String nombre;
    private String url_base;
    private String logo_url;
}
