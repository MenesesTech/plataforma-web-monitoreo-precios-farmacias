import React from "react";

export const HeroSection = ({ onGoToOffers }) => {
  return (
    <>
      <section className="relative bg-gradient-to-br via-blue-50 to-teal-50 overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0">
          {/* Patrones geométricos */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-lg"></div>
          <div className="absolute bottom-20 left-16 w-40 h-40 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-40 right-10 w-28 h-28 bg-gradient-to-br from-green-200/20 to-teal-200/20 rounded-full blur-lg"></div>

          {/* Formas abstractas */}
          <div className="absolute top-32 left-1/4 w-16 h-16 bg-cyan-300/10 rotate-45 rounded-lg"></div>
          <div className="absolute top-60 right-1/3 w-12 h-12 bg-blue-300/10 rotate-12 rounded-lg"></div>
          <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-purple-300/10 rotate-45 rounded-lg"></div>

          {/* Líneas decorativas */}
          <svg
            className="absolute top-20 left-1/2 w-64 h-64 opacity-10"
            viewBox="0 0 100 100"
          >
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <path
              d="M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20"
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="2"
            />
          </svg>

          {/* Puntos decorativos */}
          <div className="absolute top-24 left-1/6 w-2 h-2 bg-cyan-400 rounded-full"></div>
          <div className="absolute top-36 right-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
          <div className="absolute bottom-24 left-1/2 w-2.5 h-2.5 bg-purple-400 rounded-full"></div>
          <div className="absolute bottom-36 right-1/6 w-1.5 h-1.5 bg-teal-400 rounded-full"></div>

          {/* Ondas de fondo */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/50 to-transparent"></div>
          <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-white/30 to-transparent"></div>
        </div>

        {/* Contenido principal */}
        <div className="relative z-10 grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <div className="mb-4 inline-flex items-center px-4 py-2 text-sm font-medium text-hero_dark bg-hero_dark_light backdrop-blur-sm rounded-full shadow-sm border border-cyan-200/50">
              <svg
                className="w-4 h-4 mr-2 text-cyan-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Precio justo garantizado
            </div>

            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-hero_dark">
              Consigue siempre el{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-red-500">
                mejor precio
              </span>
            </h1>

            <p className="max-w-2xl mb-6 font-light text-gray-600 lg:mb-8 md:text-lg lg:text-xl">
              En MedicPrice, comparar precios es fácil. Encuentra la mejor
              opción para tu salud y tu bolsillo. Ahorro garantizado en todos
              tus medicamentos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onGoToOffers}
                className="group inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-[#13a7b2] to-[#13a7b2] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Ir a ofertas
                <svg
                  className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>

              <button className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-gray-700 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm hover:bg-white hover:shadow-md focus:ring-4 focus:ring-gray-200 transition-all duration-300">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                Ver farmacias
              </button>
            </div>

            {/* Indicadores de confianza */}
            <div className="mt-8 flex items-center space-x-6">
              <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-hero_dark rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">
                    5
                  </div>
                  <div className="w-8 h-8 bg-hero_green rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">
                    ★
                  </div>
                </div>
                <span className="ml-3 text-sm text-gray-600 font-medium">
                  +10,000 usuarios satisfechos
                </span>
              </div>
            </div>
          </div>

          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex lg:justify-center lg:items-center">
            <div className="relative w-full max-w-6xl h-[600px] overflow-visible">
              {/* Forma orgánica de fondo SVG con gradiente mejorado */}
              <svg
                className="absolute inset-0 w-full h-full drop-shadow-lg"
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="mainGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#0891b2" />
                    <stop offset="100%" stopColor="#0e7490" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path
                  d="M100,150 Q60,100 125,75 Q225,25 350,100 Q440,150 400,250 Q375,350 275,375 Q175,400 100,325 Q50,250 100,150 Z"
                  fill="url(#mainGradient)"
                  filter="url(#glow)"
                />
              </svg>

              {/* Elementos flotantes decorativos mejorados */}
              <div className="absolute top-8 left-16 w-5 h-5 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-bounce shadow-lg"></div>
              <div className="absolute top-12 right-20 w-4 h-4 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full animate-pulse shadow-md"></div>
              <div
                className="absolute bottom-20 left-8 w-7 h-7 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce shadow-lg"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute bottom-16 right-12 w-5 h-5 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full animate-pulse shadow-md"
                style={{ animationDelay: "1s" }}
              ></div>

              {/* Elementos adicionales */}
              <div className="absolute top-1/4 left-4 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              <div
                className="absolute top-3/4 right-4 w-4 h-4 bg-indigo-400 rounded-full animate-ping"
                style={{ animationDelay: "0.8s" }}
              ></div>

              {/* Imagen principal con marco mejorado */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 overflow-visible">
                <div className="w-80 h-80 bg-gradient-to-br from-white to-gray-50 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/50 backdrop-blur-sm overflow-visible relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/20 to-blue-100/20 rounded-full"></div>
                  <img
                    src="/caracter-3d.png"
                    alt="Persona mayor consultando precios de medicamentos"
                    className="w-96 h-96 object-contain absolute z-10 drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
