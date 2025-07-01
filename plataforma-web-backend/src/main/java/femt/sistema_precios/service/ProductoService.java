package femt.sistema_precios.service;

import java.util.List;

import femt.sistema_precios.dto.ProductoCardDTO;

public interface ProductoService {
    List<ProductoCardDTO> listarProductosConMejorPrecio() throws Exception;
}
