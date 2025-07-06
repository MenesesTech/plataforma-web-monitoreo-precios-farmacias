from services.normalization.product_normalizer import ProductNormalizer
from rapidfuzz.fuzz import token_sort_ratio
import re

class DataProcessor:
    """Procesa y agrupa productos similares de distintas farmacias por nombre"""

    def __init__(self, umbral_similitud: int = 75):
        self.umbral_similitud = umbral_similitud

    def extraer_concentracion_normalizada(self, texto: str) -> str:
        """
        Extrae la concentración del nombre del producto y la convierte a una unidad estándar (mg).
        Ejemplos válidos: 500mg, 1g, 120mg/5ml
        """
        texto = texto.lower()
        patrones = re.findall(r'(\d+(?:,\d+)?|\d+(?:\.\d+)?)(mg|g)(?:\/(\d+(?:,\d+)?|\d+(?:\.\d+)?)(ml))?', texto)

        concentraciones = []
        for cantidad, unidad, cantidad2, unidad2 in patrones:
            cantidad = cantidad.replace(",", ".")
            if unidad == "g":
                cantidad_mg = float(cantidad) * 1000
            else:
                cantidad_mg = float(cantidad)
            if cantidad2 and unidad2 == "ml":
                volumen_ml = float(cantidad2.replace(",", "."))
                concentraciones.append(f"{int(cantidad_mg)}mg/{int(volumen_ml)}ml")
            else:
                concentraciones.append(f"{int(cantidad_mg)}mg")
        return " ".join(concentraciones).strip()

    async def data_processing_products(self, lista_productos: list[dict]) -> dict:
        productos_procesados = []
        vistos = set()

        for i, prod_a in enumerate(lista_productos):
            if i in vistos:
                continue

            nombre_a_norm = ProductNormalizer.normalize_text(prod_a["nombre"])
            concentracion_a = self.extraer_concentracion_normalizada(nombre_a_norm)

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
                concentracion_b = self.extraer_concentracion_normalizada(nombre_b_norm)

                similitud = token_sort_ratio(nombre_a_norm, nombre_b_norm)

                # Comparar solo si concentración es exactamente igual
                if similitud >= self.umbral_similitud and concentracion_a == concentracion_b:
                    palabras_clave_a = set(nombre_a_norm.split())
                    palabras_clave_b = set(nombre_b_norm.split())
                    presentaciones = {'tableta', 'comprimido', 'ml', 'g', 'un'}
                    presentaciones_a = palabras_clave_a.intersection(presentaciones)
                    presentaciones_b = palabras_clave_b.intersection(presentaciones)

                    if len(presentaciones_a.symmetric_difference(presentaciones_b)) <= 1:
                        if prod_b["tienda"] not in producto["tienda"] or prod_b["detalle_url"] not in producto["detalle_url"]:
                            producto["precio"].append(prod_b["precio"])
                            producto["tienda"].append(prod_b["tienda"])
                            producto["detalle_url"].append(prod_b["detalle_url"])
                            producto["url_base"].append(prod_b["url_base"])
                            nombres_candidatos.append(prod_b["nombre"])
                            imagenes_candidatas.append(prod_b["imagen_url"])
                            vistos.add(j)

            producto["nombre"] = max(nombres_candidatos, key=len)
            producto["imagen_url"] = next((img for img in imagenes_candidatas if img), None)

            producto["precio"] = [p for p in producto["precio"] if p]
            producto["detalle_url"] = [d for d in producto["detalle_url"] if d]
            producto["url_base"] = list(dict.fromkeys(producto["url_base"]))
            producto["tienda"] = list(dict.fromkeys(producto["tienda"]))

            if producto["precio"]:
                productos_procesados.append(producto)

        return productos_procesados
