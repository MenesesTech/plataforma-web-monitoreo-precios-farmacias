import React, { useRef, useEffect, useState } from "react";
import { Banner } from "../../../components/Banner";
import { SlideLogo } from "../../../components/slideLogo";
import { StepsSection } from "../../../components/StepsSection";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { ProductList } from "../../products/components/ProductList";
import { useProductos } from "../../products/hooks/useProductos";
import { Preloader } from "../../../components/common/preloader/PreloaderPage";

export const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const { productos, cargando, error } = useProductos();
  const ofertasRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleGoToOffers = () => {
    ofertasRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) return <Preloader />;

  return (
    <div>
      <Header />
      <Banner onGoToOffers={handleGoToOffers} />
      <StepsSection />

      <div ref={ofertasRef}>
        <SlideLogo />
      </div>

      {/* Mostrar productos, error o cargando */}
      <div ref={ofertasRef}>
        {cargando ? (
          <p className="text-center py-10">Cargando productos...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-10">{error}</p>
        ) : (
          <ProductList productos={productos} />
        )}
      </div>

      <Footer />
    </div>
  );
};
