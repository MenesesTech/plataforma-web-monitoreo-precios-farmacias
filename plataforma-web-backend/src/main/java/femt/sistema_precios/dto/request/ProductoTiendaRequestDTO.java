package femt.sistema_precios.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoTiendaRequestDTO {
    private Integer producto_id;
    private Integer tienda_id;
    private Double precio_normal;
    private Double precio_aplicativo_movil;
    private Double precio_tarjeta;
    private String url_imagen;
    private String url_producto;
    private Boolean disponible;
}
