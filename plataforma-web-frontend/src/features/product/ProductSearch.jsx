import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { useParams } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { buscarMedicamentosyListar } from "../product/services/ProductoService";
import { Preloader } from "../../components/preloader/PreloaderPage";

export const ProductSearch = () => {
  const { keyword } = useParams();
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      if (!keyword) return;
      setIsLoading(true);
      try {
        if (!keyword) return;
        const resultados = await buscarMedicamentosyListar(keyword);
        console.log("Resultados del scraping:", resultados);
        const productosFormateados = resultados.map((producto) => ({
          id: producto.detalle_url[0].split("/").pop(),
          nombre: producto.nombre,
          imagenUrl: producto.imagen_url,
          mejorPrecio: parseFloat(producto.precio[0].replace(",", ".")),
          urlProducto: producto.detalle_url[0],
          tiendaNombre: producto.tienda[0],
          base: producto.url_base[0],
          cantidadTienda: producto.tienda.length,
        }));

        setProductos(productosFormateados);
      } catch (error) {
        console.error("Error al cargar los productos:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductos();
  }, [keyword]);
  if (isLoading) return <Preloader />;
  return (
    <>
      <Header />
      <section className="px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-hero_dark_black text-center">
            RESULTADOS
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 max-w-sm mx-auto h-full flex flex-col transition-all duration-300 transform hover:scale-105"
              >
                {/* Corazón de favorito (decorativo) */}
                <div className="flex justify-end mb-2">
                  <button className="text-gray-400 hover:text-red-500">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Imagen del producto */}
                <div className="flex justify-center mb-4">
                  <img
                    src={producto.imagenUrl}
                    alt={producto.nombre}
                    className="w-32 h-32 object-contain"
                  />
                </div>

                {/* Información del producto */}
                <div className="text-center space-y-2 flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 leading-tight min-h-[3.5rem] flex items-center justify-center">
                    {producto.nombre}
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">
                    S/{producto.mejorPrecio.toLocaleString()}
                  </p>
                  <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                    <span>Mejor precio en</span>
                    <span className="font-medium text-orange-500">
                      {producto.tiendaNombre}
                    </span>
                  </div>
                </div>

                {/* Botones */}
                <div className="mt-4 space-y-2">
                  <button
                    className="w-full bg-gray-900 text-white py-2 px-4 rounded-md font-medium hover:bg-gray-800"
                    disabled
                  >
                    Ver precios en {producto.cantidadTienda.toLocaleString()}{" "}
                    tiendas
                  </button>
                  <a
                    href={`${producto.base}${producto.urlProducto}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-block text-center border border-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-50"
                  >
                    Comprar en tienda
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
