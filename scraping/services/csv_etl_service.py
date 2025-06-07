import csv
import json
import glob

def extraer_datos_de_csv(ruta_csv):
    productos = {}

    archivos = glob.glob(ruta_csv)  # obtener todos los CSV

    for archivo in archivos:
        with open(archivo, newline='', encoding='utf-8') as archivo_csv:
            lector = csv.DictReader(archivo_csv)
            for fila in lector:
                nombre = fila['nombre'].strip()
                precio_normal = float(fila['precio_normal'].replace(',', '.')) if fila['precio_normal'] else None
                precio_app = float(fila['precio_app'].replace(',', '.')) if fila['precio_app'] else None
                precio_tarjeta = float(fila['precio_tarjeta'].replace(',', '.')) if fila['precio_tarjeta'] else None
                imagen_url = fila['imagen_url'] or None
                detalle_url = fila['detalle_url']
                categoria = fila['categoria'].strip()
                url_base = fila['url_base']
                tienda = fila['tienda'].strip()

                if nombre not in productos:
                    productos[nombre] = {
                        'nombre': nombre,
                        'categoria': categoria,
                        'precios': [],
                        'imagen_url': imagen_url,
                        'detalle_url': detalle_url,
                        'url_base': url_base
                    }

                # si no hay imagen y ahora sí hay, actualizar
                if not productos[nombre]['imagen_url'] and imagen_url:
                    productos[nombre]['imagen_url'] = imagen_url

                productos[nombre]['precios'].append({
                    'tienda': tienda,
                    'precio_normal': precio_normal,
                    'precio_app': precio_app,
                    'precio_tarjeta': precio_tarjeta,
                    'detalle_url': detalle_url,
                    'url_base': url_base
                })

    # Convertir a lista
    return list(productos.values())

if __name__ == "__main__":
    ruta = './csv/*.csv'
    datos = extraer_datos_de_csv(ruta)

    with open('productos.json', 'w', encoding='utf-8') as f:
        json.dump(datos, f, ensure_ascii=False, indent=4)

    print("✅ Archivo productos.json generado con éxito.")
