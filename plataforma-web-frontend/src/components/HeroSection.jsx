import React from 'react';

const HeroSection = ({ onGoToOffers }) => {
  return (
    <section className="bg-[#E0F7FA] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Texto lado izquierdo */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-[#007C91] mb-4">
            Consigue siempre el mejor precio
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            En MedicPrice, comparar precios es fácil. Encuentra la mejor opción para tu salud y tu bolsillo.
          </p>
          <button
            onClick={onGoToOffers}
            className="bg-[#00ACC1] text-white px-6 py-3 rounded-lg hover:bg-[#0097A7] transition"
          >
            Ir a ofertas
          </button>
        </div>

        {/* Imagen lado derecho */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/caracter-3d.png"
            alt="Personaje feliz con tablet"
            className="w-64 md:w-80 drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
