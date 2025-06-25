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
public class Tienda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String urlBase;

    @OneToMany(mappedBy = "tienda", cascade = CascadeType.ALL)
    private List<PrecioHistorico> precios;
}
