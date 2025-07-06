import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HomePage } from "./features/home/HomePage";
import { ProductDetails } from "./features/product/ProductDetails";
import { ProductSearch } from "./features/product/ProductSearch";
import { Preloader } from "./components/preloader/PreloaderPage";
import { ScrollToTop } from "./components/ScrollToTop";

function AppWrapper() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Simula carga al cambiar de ruta
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <>
      <ScrollToTop />
      {loading && <Preloader />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/producto/:id/precios" element={<ProductDetails />} />
        <Route path="/buscar/producto/:keyword" element={<ProductSearch />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
