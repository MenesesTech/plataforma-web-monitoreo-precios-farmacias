package femt.sistema_precios.repository;

import femt.sistema_precios.dto.ProductoPrecioDTO;
import femt.sistema_precios.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    List<Producto> findByNombre(String nombre);

    @Query(value = """
            SELECT
                p.id AS id,
                MIN(p.imagen_url) AS imagenUrl,
                MIN(p.nombre) AS nombre,
                MIN(purl.url) AS url,
                ph.precio AS precio,
                MIN(t.nombre) AS tienda
            FROM producto p
            INNER JOIN detalle_url purl ON p.id = purl.producto_id
            INNER JOIN precio_historico ph ON ph.producto_id = p.id
            INNER JOIN tienda t ON t.id = ph.tienda_id
            WHERE p.id = ?1
            GROUP BY ph.precio
            """, nativeQuery = true)
    List<ProductoPrecioDTO> obtenerPreciosPorProductoId(Long idProducto);
}