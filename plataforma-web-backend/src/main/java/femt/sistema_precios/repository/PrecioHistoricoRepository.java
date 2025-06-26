package femt.sistema_precios.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import femt.sistema_precios.model.PrecioHistorico;

@Repository
public interface PrecioHistoricoRepository extends JpaRepository<PrecioHistorico, Long> {

}
