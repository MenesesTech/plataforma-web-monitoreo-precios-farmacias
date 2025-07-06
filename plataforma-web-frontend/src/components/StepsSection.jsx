import React from "react";
import { Search, Type, Table, Eye, ShoppingCart } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-8 h-8 text-hero_dark_black" />,
    text: "Click en el botón de la lupa o campo de texto",
  },
  {
    icon: <Type className="w-8 h-8 text-hero_dark_black" />,
    text: "Escribe el producto deseado (ej: “Paracetamol”) y presiona ENTER o click en buscar",
  },
  {
    icon: <Table className="w-8 h-8 text-hero_dark_black" />,
    text: "Se cargará una tabla con los precios de los productos",
  },
  {
    icon: <Eye className="w-8 h-8 text-hero_dark_black" />,
    text: "Click en “Ver precios en diferentes tiendas” para COMPARAR PRECIOS",
  },
  {
    icon: <ShoppingCart className="w-8 h-8 text-hero_dark_black" />,
    text: "Click en “Comprar en tienda”",
  },
];

export const StepsSection = () => {
  return (
    <section className="bg-hero_dark py-16 px-6 text-theme border-2 border-hero_dark_light rounded-xl mx-6 mb-6">
      <h3 className="text-2xl md:text-3xl font-semibold text-center mb-10">
        + Siga estos pasos para usar la plataforma
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-theme p-6 rounded-xl shadow-md flex items-start gap-4"
          >
            <div className="mt-1">{step.icon}</div>
            <div>
              <h4 className="font-bold mb-1 text-hero_dark_black">
                PASO {index + 1}
              </h4>
              <p className="text-hero_dark_black">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
