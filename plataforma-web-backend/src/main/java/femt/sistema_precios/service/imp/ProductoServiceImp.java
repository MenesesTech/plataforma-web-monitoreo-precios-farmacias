package femt.sistema_precios.service.imp;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import femt.sistema_precios.dto.ProductoCardDTO;
import femt.sistema_precios.dto.ProductoPrecioDTO;
import femt.sistema_precios.mapper.ProductoMapper;
import femt.sistema_precios.model.Producto;
import femt.sistema_precios.repository.ProductoRepository;
import femt.sistema_precios.service.ProductoService;

@Service
public class ProductoServiceImp implements ProductoService {

    private final ProductoRepository productoRepository;
    private final ProductoMapper productoMapper;

    public ProductoServiceImp(ProductoRepository productoRepository, ProductoMapper productoMapper) {
        this.productoRepository = productoRepository;
        this.productoMapper = productoMapper;
    }

    @Override
    public List<ProductoCardDTO> listarProductosConMejorPrecio() throws Exception {
        try {
            List<Producto> productos = productoRepository.findAll();
            return productos.stream()
                    .map(productoMapper::toCardDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new Exception("Error al obtener productos con mejor precio: " + e.getMessage());
        }
    }

    @Override
    public List<ProductoPrecioDTO> listarProductosPorId(Integer id) throws Exception {
        try {
            return productoRepository.obtenerPreciosPorProductoId(Long.valueOf(id));
        } catch (Exception e) {
            throw new Exception("Error al obtener productos para el ID " + id + ": " + e.getMessage(), e);
        }
    }
}
