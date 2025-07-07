// Renderizado si está cargando
export const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-theme">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hero_dark mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando datos del producto...</p>
          </div>
        </div>
      </div>
    </div>
  );
};
