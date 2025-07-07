// hooks/useProductSearch.js
import { useEffect, useState } from "react";
import { buscarMedicamentosyListar } from "../services/ProductoService";

export const useProductSearch = (keyword) => {
    const [productos, setProductos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProductos = async () => {
            if (!keyword) return;

            setIsLoading(true);
            try {
                const resultados = await buscarMedicamentosyListar(keyword);
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

    return { productos, isLoading };
};
