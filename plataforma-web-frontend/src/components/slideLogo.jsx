import React from "react";

export const SlideLogo = () => {
  const logos = [
    {
      src: "https://images.ctfassets.net/l9x8e72nkkav/6xqbBgTHavdMuuDVCyKdI/afd0935a8e51a6a3f7ac89f17499baf7/inkafarma.svg",
      alt: "Inkafarma",
    },
    {
      src: "https://images.ctfassets.net/buvy887680uc/3f1z1TRfyGL0gSeubGwUKm/788001d462053aed81aa6b8650e61331/imagotipo-color.svg",
      alt: "Mifarma",
    },
    {
      src: "https://www.hogarysalud.com.pe/wp-content/uploads/2024/10/logo-cabecera.png",
      alt: "Hogar y Salud",
    },
  ];

  const duplicatedLogos = [...logos, ...logos]; // Para scroll infinito

  return (
    <div className="w-full  overflow-hidden relative bg-amber-500">
      <div className="relative overflow-hidden whitespace-nowrap">
        <div className="inline-flex items-center gap-20 animate-marquee">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-16 min-w-[120px] rounded-xl px-5 hover:scale-105 transition-transform duration-300"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-10 max-w-[100px] object-contain filter drop-shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
