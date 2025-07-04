// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import StepsSection from './components/StepsSection';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';

function App() {
  const [resultados, setResultados] = useState([]);
  const [buscando, setBuscando] = useState(false);

  const handleSearch = (query) => {
    // Simula datos; reemplázalo con tu llamada al backend
    const mock = [
      {
        id: 1,
        nombre: "Paracetamol",
        precio_normal: 8.9,
        precio_aplicativo_movil: 8.4,
        precio_tarjeta: 7.5,
        url_imagen: "https://via.placeholder.com/150",
        url_producto: "https://inkafarma.com.pe/producto/1",
        tienda_nombre: "Inkafarma"
      },
      // ... más
    ];
    const filtrados = mock.filter(p =>
      p.nombre.toLowerCase().includes(query.toLowerCase())
    );
    setResultados(filtrados);
    setBuscando(true);
  };

  return (
    <div className="min-h-screen bg-[#F0FBFD] flex flex-col">
      <Header onSearch={handleSearch} />
      <main className="flex-grow">
        {buscando ? (
          <ResultsPage productos={resultados} />
        ) : (
          <HomePage />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
