package femt.sistema_precios.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoPrecioUnificadoDTO {
    private String imagenUrl;
    private String nombre;
    private List<String> tienda;
    private List<Double> precio;
    private List<String> url;
    private List<String> url_base;
}