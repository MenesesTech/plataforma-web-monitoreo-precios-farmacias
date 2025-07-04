// src/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ producto }) => {
  const {
    nombre,
    url_imagen,
    tienda_nombre,
    tienda_logo,
    precio_tarjeta,
    url_producto
  } = producto;

  return (
    <div className="border rounded-2xl shadow-md p-4 w-72 flex flex-col items-center bg-white">
      <img src={url_imagen} alt={nombre} className="w-40 h-40 object-contain mb-4" />
      
      <h3 className="text-center text-base font-semibold mb-2">{nombre}</h3>
      
      <p className="text-sm text-gray-600 mb-1">
        Mejor precio en <span className="font-semibold">{tienda_nombre}</span>
      </p>
      
      <p className="text-lg font-bold text-green-600 mb-4">S/ {precio_tarjeta.toFixed(2)}</p>
      
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg mb-2 transition"
        onClick={() => alert("Vista de detalle aún no implementada")}
      >
        Ver precio en X tiendas
      </button>
      
      <a
        href={url_producto}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-500 hover:underline"
      >
        Comprar en tienda
      </a>
    </div>
  );
};

export default ProductCard;
