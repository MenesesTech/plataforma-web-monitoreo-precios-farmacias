// hooks/useProductDetails.js
import { useState, useEffect } from "react";
import { listarPrecios } from "../../products/services/ProductoService";
import { useParams } from "react-router-dom";

export const useProductDetails = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [tiendas, setTiendas] = useState([]);
    const [precios, setPrecios] = useState({ min: 0, max: 0, promedio: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await listarPrecios(id);
                if (!data) throw new Error("Respuesta vacía del servidor");

                const { imagenUrl, nombre, tienda, precio, url, url_base } = data;

                const productoProcesado = {
                    nombre,
                    imagenUrl,
                    marca: nombre.split(" ")[0],
                };

                const tiendasProcesadas = tienda.map((t, index) => ({
                    name: t,
                    tiendaId: t,
                    price: precio[index],
                    url: url[index],
                    url_base: url_base[index],
                }));

                tiendasProcesadas.sort((a, b) => a.price - b.price);
                if (tiendasProcesadas.length > 0) {
                    tiendasProcesadas[0].best = true;
                }

                const preciosArray = tiendasProcesadas.map((t) => t.price);
                const min = Math.min(...preciosArray);
                const max = Math.max(...preciosArray);
                const promedio =
                    preciosArray.reduce((sum, p) => sum + p, 0) / preciosArray.length;

                setProducto(productoProcesado);
                setTiendas(tiendasProcesadas);
                setPrecios({ min, max, promedio });
            } catch (err) {
                console.error("Error al obtener datos:", err.message);
                setError("Error al cargar los datos del producto.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    const descuentoPorcentaje =
        precios.max > 0
            ? Math.round(((precios.max - precios.min) / precios.max) * 100)
            : 0;

    return {
        producto,
        tiendas,
        precios,
        loading,
        error,
        descuentoPorcentaje,
    };
};
