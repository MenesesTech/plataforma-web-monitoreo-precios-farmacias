import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductList from '../components/ProductList';
import * as ProductoService from '../services/ProductoService';

// Mock del servicio
vi.mock('../services/ProductoService');

describe('ProductList Integration Tests', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('debe mostrar lista de productos cuando se cargan correctamente', async () => {
    // Arrange
    const mockProducts = [
      { id: 1, nombre: 'Paracetamol 500mg', laboratorio: 'Lab A' },
      { id: 2, nombre: 'Ibuprofeno 400mg', laboratorio: 'Lab B' }
    ];
    
    ProductoService.listarProductos.mockResolvedValueOnce(mockProducts);

    // Act
    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );

    // Assert
    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Paracetamol 500mg')).toBeInTheDocument();
      expect(screen.getByText('Ibuprofeno 400mg')).toBeInTheDocument();
      expect(screen.getByText('Lab A')).toBeInTheDocument();
      expect(screen.getByText('Lab B')).toBeInTheDocument();
    });
    
    expect(ProductoService.listarProductos).toHaveBeenCalledTimes(1);
  });

  it('debe mostrar mensaje de error cuando falla la carga de productos', async () => {
    // Arrange
    ProductoService.listarProductos.mockRejectedValueOnce(new Error('Error en el servidor'));

    // Act
    render(
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    );

    // Assert
    await waitFor(() => {
      expect(screen.getByText(/error al cargar productos/i)).toBeInTheDocument();
    });
    
    expect(ProductoService.listarProductos).toHaveBeenCalledTimes(1);
  });
});