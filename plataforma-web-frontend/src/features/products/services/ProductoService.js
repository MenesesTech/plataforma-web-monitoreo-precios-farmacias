import axios from "axios";

const API_URL_PRODUCTOSLISTA = "http://localhost:8080/api/productos/listar";
const API_URL_PRECIOSLISTA = "http://localhost:8080/api/productos/precios";
const API_URL_PRODUCTOKEYWORD = "http://localhost:8080/api/productos/buscar"

export const listarProductos = async () => {
    try {
        const response = await axios.get(API_URL_PRODUCTOSLISTA);
        if (response.status === 200) {
            return response.data;
        }
        throw new Error("Error al traer productos del API");
    } catch (error) {
        console.error("Error en listarProductos:", error);
        throw new Error("Error en el servidor");
    }
};

export const listarPrecios = async (idProducto) => {
    try {
        const response = await axios.get(`${API_URL_PRECIOSLISTA}/${idProducto}`);
        if (response.status === 200) {
            return response.data;
        }
        throw new Error("Error al traer los productos del API");
    } catch (error) {
        console.error("Error real:", error.message);
        throw new Error("Error en el servidor");
    }
};

export const buscarMedicamentosyListar = async (keywords) => {
    try {
        const response = await axios.post(`${API_URL_PRODUCTOKEYWORD}/${keywords}`);
        if (response.status === 200) {
            console.log(response.data)
            return response.data;
        }
        throw new Error("Error al traer los productos con keywords de la API");
    } catch (error) {
        console.error("Error real:", error.message);
        throw new Error("Error en el servidor");
    }
};