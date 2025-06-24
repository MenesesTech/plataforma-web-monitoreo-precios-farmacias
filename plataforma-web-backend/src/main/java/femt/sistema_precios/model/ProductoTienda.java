package femt.sistema_precios.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "producto_tienda")
public class ProductoTienda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tienda_id", nullable = false)
    private Tienda tienda;

    @Column(nullable = true)
    private Double precio_normal;
    @Column(nullable = true)
    private Double precio_tarjeta;
    @Column(nullable = true)
    private Double precio_aplicativo_movil;

    @Column(nullable = false)
    private String url_producto;

    private String url_imagen;
}
