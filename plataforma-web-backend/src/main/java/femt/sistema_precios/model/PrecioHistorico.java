package femt.sistema_precios.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "precio_historico")
public class PrecioHistorico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal precio;
    private LocalDateTime fecha;

    @ManyToOne(fetch = FetchType.LAZY)
    private Producto producto;

    @ManyToOne(fetch = FetchType.LAZY)
    private Tienda tienda;
}