import { useEffect, useState } from "react";
import { listarProductos } from "../services/ProductoService";

export const useProductos = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const data = await listarProductos();
                setProductos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };

        fetchProductos();
    }, []);

    return { productos, cargando, error };
};
