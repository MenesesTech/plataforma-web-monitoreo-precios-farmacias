// Renderizado si ocurre un error
export const ErrorScreen = ({ mensaje }) => {
  return (
    <div className="min-h-screen bg-theme">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-red-500 mb-4">⚠️</div>
            <p className="text-gray-600">{mensaje}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-hero_dark text-white rounded-lg hover:bg-hero_dark_black transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
