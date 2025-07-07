export const EmptyProductScreen = () => {
  return (
    <div className="min-h-screen bg-theme">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-gray-600">
              No se encontraron datos del producto
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
