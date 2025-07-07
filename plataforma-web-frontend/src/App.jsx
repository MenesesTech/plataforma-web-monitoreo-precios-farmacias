import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HomePage } from "./features/home/pages/HomePage";
import { ProductDetailsPage } from "./features/products/pages/ProductDetailsPage";
import { ProductSearch } from "./features/products/pages/ProductSearchPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/producto/:id/precios" element={<ProductDetailsPage />} />
        <Route path="/buscar/producto/:keyword" element={<ProductSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
