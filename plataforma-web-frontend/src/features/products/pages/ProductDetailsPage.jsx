import React, { useState, useEffect } from "react";
import { Heart, TrendingDown, Bell } from "lucide-react"; // Iconos de la interfaz
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { LoadingScreen } from "../../../components/common/LoadingScreen";
import { EmptyProductScreen } from "../../../components/common/EmptyProductScreen";
import { ErrorScreen } from "../../../components/common/ErrorScreen";
import { useProductDetails } from "../hooks/useProductDetails";
import { Preloader } from "../../../components/common/preloader/PreloaderPage";
// Componente principal de detalle de producto
export const ProductDetailsPage = () => {
  const { producto, tiendas, precios, loading, error, descuentoPorcentaje } =
    useProductDetails();
  // 🧠 Hook de preloader al inicio (independiente del loading de datos)
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 1000); // Mostrar preloader solo 1 segundo

    return () => clearTimeout(timer); // Limpieza
  }, []);

  // 🎬 Mostrar preloader solo una vez al entrar a la página
  if (showPreloader) return <Preloader />;
  if (showPreloader) return <Preloader />;
  if (error) return <ErrorScreen mensaje={error} />;
  if (!producto.nombre) return <EmptyProductScreen />;
  if (loading) return <Preloader />;
  return (
    <div className="min-h-screen bg-theme">
      <Header />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Columna izquierda - Detalles del producto */}
          <div className="lg:col-span-3 space-y-8">
            {/* Información del producto */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  {producto.marca}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-hero_dark_black leading-tight">
                {producto.nombre}
              </h1>

              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="w-4 h-4 text-hero_green" />
                  <span>Comparando {tiendas.length} tiendas</span>
                </div>
              </div>
            </div>

            {/* Imagen del producto */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                {producto.imagenUrl ? (
                  <img
                    src={producto.imagenUrl}
                    alt={producto.nombre}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                ) : null}
                <div
                  className="text-center"
                  style={{ display: producto.imagenUrl ? "none" : "block" }}
                >
                  <div className="text-6xl mb-4">📦</div>
                  <div className="text-sm text-gray-500">Producto</div>
                </div>
              </div>
            </div>

            {/* Historial de precios (Placeholder) */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-hero_dark_black">
                  Historial de precios
                </h3>
                <span className="text-sm text-gray-500">Últimos 30 días</span>
              </div>
              <div className="h-48 flex items-center justify-center text-gray-400">
                <span>Gráfico no disponible (placeholder)</span>
              </div>
            </div>
          </div>

          {/* Columna derecha - Información lateral */}
          <div className="lg:col-span-2 space-y-6">
            {/* Precio destacado */}
            <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <div className="space-y-4">
                <div>
                  <div className="text-4xl font-bold text-hero_dark_black">
                    S/{precios.min.toFixed(2)}
                  </div>
                  {precios.max > precios.min && (
                    <div className="text-lg text-gray-500 line-through">
                      S/{precios.max.toFixed(2)}
                    </div>
                  )}
                </div>
                {descuentoPorcentaje > 0 && (
                  <div className="inline-flex items-center px-3 py-1 bg-hero_green/10 text-hero_green rounded-full text-sm font-medium">
                    {descuentoPorcentaje}% descuento
                  </div>
                )}
                <button className="w-full bg-hero_dark text-white py-4 rounded-xl font-medium hover:bg-hero_dark_black transition-colors">
                  Ver mejor precio
                </button>
              </div>
            </div>

            {/* Alerta de precio */}
            <div className="bg-hero_green/5 border border-hero_green/20 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-hero_green/20 rounded-full flex items-center justify-center">
                  <Bell className="w-4 h-4 text-hero_green" />
                </div>
                <div>
                  <div className="font-medium text-hero_dark_black">
                    Alerta de precio
                  </div>
                  <div className="text-sm text-gray-600">
                    Te avisamos cuando baje
                  </div>
                </div>
              </div>
              <button className="w-full bg-hero_green text-hero_dark_black py-3 rounded-xl font-medium hover:bg-hero_green/80 transition-colors">
                Crear alerta
              </button>
            </div>

            {/* Estadísticas de precios */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Precio más bajo</span>
                  <span className="font-semibold text-hero_green">
                    S/{precios.min.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Precio más alto</span>
                  <span className="font-semibold text-red-500">
                    S/{precios.max.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Precio promedio</span>
                  <span className="font-semibold text-gray-700">
                    S/{precios.promedio.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparación de precios entre tiendas */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-8 pb-0">
            <h2 className="text-xl font-semibold text-hero_dark_black mb-6">
              Comparar precios
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {tiendas.map((tienda, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-8 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {tienda.name.slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-hero_dark_black">
                      {tienda.name}
                    </div>
                    {tienda.best && (
                      <div className="text-sm text-hero_green font-medium">
                        Mejor precio
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-lg font-semibold text-hero_dark_black">
                      S/{tienda.price.toFixed(2)}
                    </div>
                    {tienda.best && (
                      <div className="text-sm text-hero_green">Disponible</div>
                    )}
                  </div>
                  <a
                    href={tienda.url_base + tienda.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-hero_dark text-white rounded-lg hover:bg-hero_dark_black transition-colors"
                  >
                    Ver
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
