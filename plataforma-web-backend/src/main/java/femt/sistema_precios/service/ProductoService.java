package femt.sistema_precios.service;

import java.util.List;

import femt.sistema_precios.dto.ProductoCardDTO;
import femt.sistema_precios.dto.ProductoPrecioDTO;

public interface ProductoService {
    List<ProductoCardDTO> listarProductosConMejorPrecio() throws Exception;

    List<ProductoPrecioDTO> listarProductosPorId(Integer id) throws Exception;
}
