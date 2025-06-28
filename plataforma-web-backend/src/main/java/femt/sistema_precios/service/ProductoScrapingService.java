package femt.sistema_precios.service;

import java.util.List;

import femt.sistema_precios.dto.ProductoRequestDTO;

public interface ProductoScrapingService {
    void registrarProducto(List<ProductoRequestDTO> dto) throws Exception;

    void eliminarProducto(Long id) throws Exception;

    void actualizarProducto(ProductoRequestDTO precioHistoricoDTO);

    List<ProductoRequestDTO> solicitudProductosFlask() throws Exception;
}
