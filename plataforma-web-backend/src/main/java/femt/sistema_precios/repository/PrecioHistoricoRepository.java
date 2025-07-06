package femt.sistema_precios.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import femt.sistema_precios.model.PrecioHistorico;

@Repository
public interface PrecioHistoricoRepository extends JpaRepository<PrecioHistorico, Long> {
    @Query("SELECT COUNT(DISTINCT p.tienda) FROM PrecioHistorico p WHERE p.producto.id = :idProducto")
    Long countTiendasByProductoId(@Param("idProducto") Integer idProducto);

}
