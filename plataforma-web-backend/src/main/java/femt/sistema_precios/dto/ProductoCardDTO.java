package femt.sistema_precios.dto;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoCardDTO {
    private Long id;
    private String nombre;
    private String imagenUrl;
    private BigDecimal mejorPrecio;
    private String urlProducto;
    private String tiendaNombre;
    private String base;
    private Integer cantidadTienda;
}
