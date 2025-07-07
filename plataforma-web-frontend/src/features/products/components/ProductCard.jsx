import { useNavigate } from "react-router-dom";

export const ProductCard = ({ producto }) => {
  const {
    id,
    nombre,
    imagenUrl,
    mejorPrecio,
    urlProducto,
    tiendaNombre,
    base,
    cantidadTienda,
  } = producto;
  const navigate = useNavigate();
  const handleVerPrecios = () => {
    navigate(`/producto/${id}/precios`, {
      state: { producto },
    });
  };
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 max-w-sm mx-auto h-full flex flex-col transition-all duration-300 transform hover:scale-105">
      {/* Corazón de favorito */}
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
          src={imagenUrl}
          alt={nombre}
          className="w-32 h-32 object-contain"
        />
      </div>

      {/* Información del producto - flex-grow para ocupar espacio disponible */}
      <div className="text-center space-y-2 flex-grow">
        <p className="text-sm text-gray-500 font-medium"></p>
        <h3 className="text-lg font-semibold text-gray-900 leading-tight min-h-[3.5rem] flex items-center justify-center">
          {nombre}
        </h3>
        <p className="text-2xl font-bold text-gray-900">
          S/{mejorPrecio.toLocaleString()}
        </p>
        <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
          <span>Mejor precio en</span>
          <span className="font-medium text-orange-500">{tiendaNombre}</span>
        </div>
      </div>

      {/* Botones - siempre en la parte inferior */}
      <div className="mt-4 space-y-2">
        <button
          className="w-full bg-gray-900 text-white py-2 px-4 rounded-md font-medium hover:bg-gray-800"
          onClick={handleVerPrecios}
        >
          Ver precios en {cantidadTienda.toLocaleString()} tiendas
        </button>
        <a
          href={`${base}${urlProducto}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-block text-center border border-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-50"
        >
          Comprar en tienda
        </a>
      </div>
    </div>
  );
};
