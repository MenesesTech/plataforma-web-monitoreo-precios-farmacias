package femt.sistema_precios.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrecioHistoricoDTO {
    private BigDecimal precio;
    private LocalDateTime fecha;
    private ProductoDTO productoDTO;
    private TiendaDTO tiendaDTO;
}
