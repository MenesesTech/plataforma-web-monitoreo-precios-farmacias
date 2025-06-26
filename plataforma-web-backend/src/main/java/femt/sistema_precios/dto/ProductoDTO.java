package femt.sistema_precios.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoDTO {
    private Long id;
    private String nombre;
    private String imagenUrl;
    private List<DetalleUrlDTO> detalleUrls;
    private List<PrecioHistoricoDTO> precios;
    private List<TiendaDTO> tiendas;
}
