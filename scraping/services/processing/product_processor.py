from services.normalization.product_normalizer import ProductNormalizer
from rapidfuzz.fuzz import token_sort_ratio

class DataProcessor:
    """Procesa y agrupa productos similares de distintas farmacias por nombre"""

    def __init__(self, umbral_similitud: int = 100):  # Lowered threshold
        self.umbral_similitud = umbral_similitud

    async def data_processing_products(self, lista_productos: list[dict]) -> dict:
        productos_procesados = []
        vistos = set()

        for i, prod_a in enumerate(lista_productos):
            if i in vistos:
                continue

            nombre_a_norm = ProductNormalizer.normalize_text(prod_a["nombre"])

            # Inicializar el producto con listas
            producto = {
                "nombre": prod_a["nombre"],
                "precio": [prod_a["precio"]] if prod_a["precio"] else [],
                "tienda": [prod_a["tienda"]],
                "detalle_url": [prod_a["detalle_url"]] if prod_a["detalle_url"] else [],
                "imagen_url": prod_a["imagen_url"],
                "url_base": [prod_a["url_base"]]
            }

            nombres_candidatos = [prod_a["nombre"]]
            imagenes_candidatas = [prod_a["imagen_url"]]

            vistos.add(i)

            for j in range(i + 1, len(lista_productos)):
                if j in vistos:
                    continue

                prod_b = lista_productos[j]
                nombre_b_norm = ProductNormalizer.normalize_text(prod_b["nombre"])
                similitud = token_sort_ratio(nombre_a_norm, nombre_b_norm)

                if similitud >= self.umbral_similitud:
                    # Verificar presentaciones
                    palabras_clave_a = set(nombre_a_norm.split())
                    palabras_clave_b = set(nombre_b_norm.split())
                    presentaciones = {'tableta', 'comprimido', 'ml', 'g', 'un'}
                    presentaciones_a = palabras_clave_a.intersection(presentaciones)
                    presentaciones_b = palabras_clave_b.intersection(presentaciones)
                    
                    # Relaxed presentation check
                    if len(presentaciones_a.symmetric_difference(presentaciones_b)) <= 1:
                        # Check for duplicates from the same store
                        if prod_b["tienda"] not in producto["tienda"] or prod_b["detalle_url"] not in producto["detalle_url"]:
                            producto["precio"].append(prod_b["precio"] if prod_b["precio"] else None)
                            producto["tienda"].append(prod_b["tienda"])
                            producto["detalle_url"].append(prod_b["detalle_url"] if prod_b["detalle_url"] else None)
                            producto["url_base"].append(prod_b["url_base"])
                            nombres_candidatos.append(prod_b["nombre"])
                            imagenes_candidatas.append(prod_b["imagen_url"])
                            vistos.add(j)

            # Seleccionar el nombre más largo
            producto["nombre"] = max(nombres_candidatos, key=len)
            # Seleccionar la primera imagen válida
            producto["imagen_url"] = next((img for img in imagenes_candidatas if img), None)

            # Filtrar None en las listas
            producto["precio"] = [p for p in producto["precio"] if p]
            producto["detalle_url"] = [d for d in producto["detalle_url"] if d]
            producto["url_base"] = list(dict.fromkeys(producto["url_base"]))  # Remove duplicates
            producto["tienda"] = list(dict.fromkeys(producto["tienda"]))  # Remove duplicates

            if producto["precio"]:
                productos_procesados.append(producto)

        return {
            "datos": productos_procesados,
            "mensaje": "Scraping ejecutado con éxito",
            "total_registros": len(productos_procesados)
        }