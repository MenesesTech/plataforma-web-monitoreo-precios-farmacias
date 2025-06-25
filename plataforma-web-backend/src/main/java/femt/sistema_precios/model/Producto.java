package femt.sistema_precios.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "producto")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String imagenUrl;

    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private List<DetalleUrl> detalleUrls;

    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private List<PrecioHistorico> precios;
}
