// src/pages/ResultsPage.jsx
import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';

const ResultsPage = () => {
  const [productos, setProductos] = useState([
    {
      id: 1,
      nombre: "Ibuprofeno 400mg",
      precio_normal: 8.5,
      precio_aplicativo_movil: 7.9,
      precio_tarjeta: 7.2,
      url_imagen: "https://url-imagen.com/img.jpg",
      url_producto: "https://btl.inkafarma.pe/producto/ibuprofeno",
      tienda_nombre: "Inkafarma",
      tienda_logo: "https://inkafarma.pe/logo.png"
    },
    // Agrega más productos aquí
  ]);

  const handleOrdenar = (e) => {
    const criterio = e.target.value;
    if (criterio === "precio") {
      const ordenado = [...productos].sort((a, b) => a.precio_tarjeta - b.precio_tarjeta);
      setProductos(ordenado);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Resultados de búsqueda</h2>

        <div className="flex items-center space-x-2">
          <label htmlFor="ordenar" className="text-sm font-medium">Ordenar por:</label>
          <select
            id="ordenar"
            onChange={handleOrdenar}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="">Seleccionar</option>
            <option value="precio">Mejor precio</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
