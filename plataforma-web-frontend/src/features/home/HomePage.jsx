import React, { useEffect, useState, useRef } from "react";
import { HeroSection } from "../../components/HeroSection";
import { SlideLogo } from "../../components/slideLogo";
import { StepsSection } from "../../components/StepsSection";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ProductList } from "../product/ProductList";
import { listarProductos } from "../product/services/ProductoService";

export const HomePage = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Crear referencia para desplazarse a la sección de productos
  const ofertasRef = useRef(null);

  const handleGoToOffers = () => {
    ofertasRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await listarProductos();
        setProductos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div>
      <Header />
      {/* Pasamos la función como prop al HeroSection */}
      <HeroSection onGoToOffers={handleGoToOffers} />

      <StepsSection />
      <div ref={ofertasRef}>
        <SlideLogo />
      </div>

      {/* Ref apuntando al componente destino */}
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
