// src/components/ProductList.jsx
import React from "react";
import { ProductCard } from "../components/ProductCard";

export const ProductList = ({ productos }) => {
  return (
    <section className="px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-hero_dark_black text-center">
          OFERTAS
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      </div>
    </section>
  );
};
