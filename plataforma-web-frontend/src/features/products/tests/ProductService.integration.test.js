import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { listarProductos, listarPrecios, buscarMedicamentosyListar } from '../services/ProductoService';

// Mock de axios
vi.mock('axios');

describe('ProductoService Integration Tests', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('listarProductos', () => {
    it('debe retornar datos cuando la API responde correctamente', async () => {
      // Arrange
      const mockData = [{ id: 1, nombre: 'Paracetamol' }, { id: 2, nombre: 'Ibuprofeno' }];
      axios.get.mockResolvedValueOnce({ status: 200, data: mockData });

      // Act
      const result = await listarProductos();

      // Assert
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/productos/listar');
      expect(result).toEqual(mockData);
    });

    it('debe lanzar error cuando la API falla', async () => {
      // Arrange
      axios.get.mockRejectedValueOnce(new Error('Error de red'));

      // Act & Assert
      await expect(listarProductos()).rejects.toThrow('Error en el servidor');
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/productos/listar');
    });
  });

  describe('listarPrecios', () => {
    it('debe retornar precios cuando la API responde correctamente', async () => {
      // Arrange
      const mockData = [
        { farmacia: 'Farmacia A', precio: 1000 },
        { farmacia: 'Farmacia B', precio: 950 }
      ];
      axios.get.mockResolvedValueOnce({ status: 200, data: mockData });

      // Act
      const result = await listarPrecios(1);

      // Assert
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/productos/precios/1');
      expect(result).toEqual(mockData);
    });
  });

  describe('buscarMedicamentosyListar', () => {
    it('debe retornar resultados de búsqueda cuando la API responde correctamente', async () => {
      // Arrange
      const mockData = [{ id: 1, nombre: 'Paracetamol 500mg' }];
      axios.post.mockResolvedValueOnce({ status: 200, data: mockData });

      // Act
      const result = await buscarMedicamentosyListar('paracetamol');

      // Assert
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/productos/buscar/paracetamol');
      expect(result).toEqual(mockData);
    });
  });
});