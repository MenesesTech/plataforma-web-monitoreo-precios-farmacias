package femt.sistema_precios.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoCardKeywordDTO {
    private String nombre;
    private String imagen_url;
    private List<String> precio;
    private List<String> tienda;
    private List<String> detalle_url;
    private List<String> url_base;

}
