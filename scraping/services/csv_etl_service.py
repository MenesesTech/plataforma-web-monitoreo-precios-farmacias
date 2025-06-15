import csv
import glob
import json
from difflib import SequenceMatcher
import re

# Normalizar nombre del producto
def normalizar(nombre):
    # Convertir a minúsculas y quitar espacios extra
    nombre = nombre.lower().strip()
    
    # Reemplazos básicos de acentos
    replacements = (
        ("á", "a"), ("é", "e"), ("í", "i"), ("ó", "o"), ("ú", "u"), ("ñ", "n"),
        ("à", "a"), ("è", "e"), ("ì", "i"), ("ò", "o"), ("ù", "u"),
    )
    
    for a, b in replacements:
        nombre = nombre.replace(a, b)
    
    # Normalizar espacios múltiples
    nombre = re.sub(r'\s+', ' ', nombre)
    
    return nombre

# Extraer información crítica del producto (nombre + dosificación)
def extraer_info_critica(nombre_normalizado):
    """
    Extrae información crítica que define únicamente al producto:
    - Nombre del medicamento
    - Dosificación (mg, g, ml, etc.)
    - Forma farmacéutica (tableta, cápsula, etc.)
    """
    # Buscar dosificación (números seguidos de unidades)
    dosificacion = re.search(r'\d+\s*(mg|g|ml|mcg|ui|iu)\b', nombre_normalizado)
    dosificacion_texto = dosificacion.group() if dosificacion else ""
    
    # Buscar forma farmacéutica
    formas = ['tableta', 'capsula', 'jarabe', 'suspension', 'inyectable', 'crema', 'gel']
    forma_farmaceutica = ""
    for forma in formas:
        if forma in nombre_normalizado:
            forma_farmaceutica = forma
            break
    
    # Extraer el nombre principal (primera palabra significativa)
    palabras = nombre_normalizado.split()
    nombre_principal = ""
    
    # Buscar la primera palabra que no sea presentación
    palabras_presentacion = ['caja', 'frasco', 'sobre', 'ampolla', 'un', 'x']
    for palabra in palabras:
        if palabra not in palabras_presentacion and len(palabra) > 2:
            nombre_principal = palabra
            break
    
    # Crear identificador único
    identificador = f"{nombre_principal}_{dosificacion_texto}_{forma_farmaceutica}".strip("_")
    
    return identificador

# Verificar si dos productos son exactamente el mismo
def es_mismo_producto_exacto(nombre1_norm, nombre2_norm):
    """
    Verifica si dos productos son exactamente el mismo basándose en:
    1. Coincidencia exacta del nombre normalizado, O
    2. Misma información crítica (nombre + dosificación + forma)
    """
    # Verificar coincidencia exacta
    if nombre1_norm == nombre2_norm:
        return True
    
    # Verificar misma información crítica
    info1 = extraer_info_critica(nombre1_norm)
    info2 = extraer_info_critica(nombre2_norm)
    
    return info1 == info2 and info1 != ""

# ========================================================
# BUSCAR PRODUCTOS SIMILARES CON VERIFICACIÓN EXACTA
# --------------------------------------------------------
def encontrar_producto_similar(nombre_norm, productos_existentes, usar_similitud=True):
    # PASO 1: Buscar coincidencia exacta (100%)
    if nombre_norm in productos_existentes:
        return nombre_norm
    
    # PASO 2: Si se permite similitud, buscar por información crítica
    if usar_similitud:
        for clave_existente in productos_existentes.keys():
            if es_mismo_producto_exacto(nombre_norm, clave_existente):
                return clave_existente
    
    # PASO 3: Si no encuentra nada, retornar None
    return None

# ========================================================
# CONSTRUIR NUEVO NOMBRE DE PRODUCTO
# --------------------------------------------------------
def crear_nombre_mejorado(nombre_actual, nombre_nuevo):
    if len(nombre_nuevo) > len(nombre_actual):
        return nombre_nuevo
    return nombre_actual

# ========================================================
# FUNCIÓN PARA MANTENER SOLO EL PRECIO MÁS BAJO POR TIENDA
# --------------------------------------------------------
def optimizar_precios_por_tienda(precios):
    """
    De una lista de precios, mantiene solo el más bajo por cada tienda
    """
    mejores_precios = {}
    
    for precio in precios:
        tienda = precio["tienda"]
        precio_valor = precio["precio_normal"]
        
        if precio_valor is None:
            continue
            
        # Si es la primera vez que vemos esta tienda, o si encontramos un precio mejor
        if (tienda not in mejores_precios or 
            precio_valor < mejores_precios[tienda]["precio_normal"]):
            mejores_precios[tienda] = precio
    
    return list(mejores_precios.values())

# Extraer y consolidar productos desde múltiples CSV
def extraccion_limpieza_datos(ruta, usar_similitud=True, debug=False, solo_precio_bajo=True):
    productos_consolidados = {}  # clave: nombre normalizado, valor: diccionario del producto
    archivos_encontrados = glob.glob(ruta)
    
    if debug:
        print(f"Procesando {len(archivos_encontrados)} archivos...")
    
    for archivo in archivos_encontrados:
        if debug:
            print(f"Procesando archivo: {archivo}")
            
        with open(archivo, newline='', encoding='utf-8') as archivo_csv:
            lector = csv.DictReader(archivo_csv)
            for fila in lector:
                nombre_raw = fila['nombre'].strip()
                nombre_norm = normalizar(nombre_raw)
                
                # Precios y demás
                precio_normal = float(fila['precio_normal'].replace(',', '.')) if fila['precio_normal'] else None
                precio_app = float(fila['precio_app'].replace(',', '.')) if fila['precio_app'] else None
                precio_tarjeta = float(fila['precio_tarjeta'].replace(',', '.')) if fila['precio_tarjeta'] else None
                imagen_url = fila['imagen_url'] or None
                detalle_url = fila['detalle_url']
                categoria = fila['categoria'].strip()
                url_base = fila['url_base']
                tienda = fila['tienda'].strip().lower()
                
                # Crear entrada de tienda
                entrada_precio = {
                    "tienda": tienda,
                    "precio_normal": precio_normal,
                    "precio_app": precio_app,
                    "precio_tarjeta": precio_tarjeta,
                    "detalle_url": detalle_url,
                    "imagen_url": imagen_url if imagen_url else None,
                    "url_base": url_base
                }
                
                # Buscar producto similar con verificación exacta
                clave_producto = nombre_norm
                if usar_similitud:
                    producto_similar = encontrar_producto_similar(nombre_norm, productos_consolidados, usar_similitud)
                    if producto_similar:
                        clave_producto = producto_similar
                        if debug:
                            print(f"  ✓ Producto consolidado: '{nombre_raw}'")
                            print(f"    -> Consolidado con: '{productos_consolidados[clave_producto]['nombre']}'")
                
                # Si el producto aún no está registrado
                if clave_producto not in productos_consolidados:
                    productos_consolidados[clave_producto] = {
                        "nombre": nombre_raw,
                        "categoria": categoria,
                        "precios": [entrada_precio],
                    }
                    if debug:
                        print(f"  + Nuevo producto: '{nombre_raw}'")
                        print(f"    Info crítica: '{extraer_info_critica(nombre_norm)}'")
                else:
                    # Si ya existe, agregamos el nuevo precio y mejoramos el nombre
                    productos_consolidados[clave_producto]["precios"].append(entrada_precio)
                    
                    # Mejorar el nombre si el nuevo es más descriptivo
                    nombre_actual = productos_consolidados[clave_producto]["nombre"]
                    nombre_mejorado = crear_nombre_mejorado(nombre_actual, nombre_raw)
                    if nombre_mejorado != nombre_actual:
                        if debug:
                            print(f"  ↑ Nombre mejorado: '{nombre_actual}' -> '{nombre_mejorado}'")
                        productos_consolidados[clave_producto]["nombre"] = nombre_mejorado
    
    # PASO FINAL: Optimizar precios si se solicita
    if solo_precio_bajo:
        if debug:
            print("\n🔧 Optimizando precios - manteniendo solo el más bajo por tienda...")
        
        for clave_producto in productos_consolidados:
            precios_originales = len(productos_consolidados[clave_producto]["precios"])
            productos_consolidados[clave_producto]["precios"] = optimizar_precios_por_tienda(
                productos_consolidados[clave_producto]["precios"]
            )
            precios_optimizados = len(productos_consolidados[clave_producto]["precios"])
            
            if debug and precios_originales != precios_optimizados:
                print(f"  📉 {productos_consolidados[clave_producto]['nombre']}: {precios_originales} -> {precios_optimizados} precios")
    
    if debug:
        print(f"\nConsolidación completada: {len(productos_consolidados)} productos únicos encontrados")
    
    return list(productos_consolidados.values())

def procesar_productos_desde_lista(productos, usar_similitud=True, debug=False, solo_precio_bajo=True):
    productos_consolidados = {}

    for fila in productos:
        nombre_raw = fila['nombre'].strip()
        nombre_norm = normalizar(nombre_raw)
        
        precio_normal = float(str(fila['precio_normal']).replace(',', '.')) if fila['precio_normal'] else None
        precio_app = float(str(fila['precio_app']).replace(',', '.')) if fila['precio_app'] else None
        precio_tarjeta = float(str(fila['precio_tarjeta']).replace(',', '.')) if fila['precio_tarjeta'] else None
        imagen_url = fila['imagen_url'] or None
        detalle_url = fila['detalle_url']
        categoria = fila['categoria'].strip()
        url_base = fila['url_base']
        tienda = fila['tienda'].strip().lower()

        entrada_precio = {
            "tienda": tienda,
            "precio_normal": precio_normal,
            "precio_app": precio_app,
            "precio_tarjeta": precio_tarjeta,
            "detalle_url": detalle_url,
            "imagen_url": imagen_url,
            "url_base": url_base
        }

        clave_producto = nombre_norm
        if usar_similitud:
            producto_similar = encontrar_producto_similar(nombre_norm, productos_consolidados, usar_similitud)
            if producto_similar:
                clave_producto = producto_similar
                if debug:
                    print(f"✓ Producto consolidado: '{nombre_raw}' con '{productos_consolidados[clave_producto]['nombre']}'")

        if clave_producto not in productos_consolidados:
            productos_consolidados[clave_producto] = {
                "nombre": nombre_raw,
                "categoria": categoria,
                "precios": [entrada_precio],
            }
        else:
            productos_consolidados[clave_producto]["precios"].append(entrada_precio)
            nombre_actual = productos_consolidados[clave_producto]["nombre"]
            nombre_mejorado = crear_nombre_mejorado(nombre_actual, nombre_raw)
            productos_consolidados[clave_producto]["nombre"] = nombre_mejorado

    if solo_precio_bajo:
        for clave in productos_consolidados:
            productos_consolidados[clave]["precios"] = optimizar_precios_por_tienda(productos_consolidados[clave]["precios"])

    return list(productos_consolidados.values())

# # ========================================================
# # FUNCIÓN ADICIONAL: ESTADÍSTICAS DE CONSOLIDACIÓN
# # --------------------------------------------------------
# def mostrar_estadisticas(productos_consolidados):
#     total_productos = len(productos_consolidados)
#     productos_con_multiples_tiendas = sum(1 for p in productos_consolidados if len(p["precios"]) > 1)
    
#     print("\n" + "="*50)
#     print("ESTADÍSTICAS DE CONSOLIDACIÓN")
#     print("="*50)
#     print(f"Total de productos únicos: {total_productos}")
#     print(f"Productos en múltiples tiendas: {productos_con_multiples_tiendas}")
#     print(f"Productos únicos de una sola tienda: {total_productos - productos_con_multiples_tiendas}")
    
#     # Distribución por tiendas
#     tiendas_count = {}
#     for producto in productos_consolidados:
#         for precio in producto["precios"]:
#             tienda = precio["tienda"]
#             tiendas_count[tienda] = tiendas_count.get(tienda, 0) + 1
    
#     print("\nDistribución por tiendas:")
#     for tienda, count in sorted(tiendas_count.items()):
#         print(f"  {tienda}: {count} productos")
    
#     # Mostrar algunos productos con múltiples tiendas
#     print(f"\nEjemplos de productos en múltiples tiendas:")
#     ejemplos = [p for p in productos_consolidados if len(p["precios"]) > 1][:5]
#     for producto in ejemplos:
#         print(f"  • {producto['nombre']}")
#         for precio in producto["precios"]:
#             print(f"    - {precio['tienda']}: ${precio['precio_normal']}")

# # ========================================================
# # FUNCIÓN DE TESTING: Verificar consolidaciones
# # --------------------------------------------------------
# def verificar_consolidaciones(productos_consolidados):
#     print("\n" + "="*50)
#     print("VERIFICACIÓN DE CONSOLIDACIONES")
#     print("="*50)
    
#     # Mostrar productos con diferencias de dosificación
#     print("📋 Productos consolidados por dosificación:")
    
#     productos_por_base = {}
#     for producto in productos_consolidados:
#         nombre_norm = normalizar(producto["nombre"])
#         info_critica = extraer_info_critica(nombre_norm)
#         nombre_base = info_critica.split('_')[0] if '_' in info_critica else info_critica
        
#         if nombre_base not in productos_por_base:
#             productos_por_base[nombre_base] = []
#         productos_por_base[nombre_base].append(producto)
    
#     for nombre_base, productos_grupo in productos_por_base.items():
#         if len(productos_grupo) > 1:
#             print(f"\n  🔸 {nombre_base.upper()}:")
#             for producto in productos_grupo:
#                 nombre_norm = normalizar(producto["nombre"])
#                 info_critica = extraer_info_critica(nombre_norm)
#                 precios_str = ", ".join([f"{p['tienda']}: ${p['precio_normal']}" for p in producto["precios"]])
#                 print(f"    • {info_critica} - {precios_str}")

# # Ejemplo de uso:
# if __name__ == "__main__":
#     # Ruta de los archivos CSV
#     ruta_archivos = "*.csv"
    
#     # Consolidar productos con optimización de precios
#     productos = extraccion_limpieza_datos(
#         ruta=ruta_archivos, 
#         usar_similitud=True,
#         debug=True,
#         solo_precio_bajo=True  # Mantener solo el precio más bajo por tienda
#     )
    
#     # Mostrar estadísticas
#     mostrar_estadisticas(productos)
    
#     # Verificar consolidaciones
#     verificar_consolidaciones(productos)
    
#     # Guardar resultado en JSON
#     with open('productos_consolidados.json', 'w', encoding='utf-8') as f:
#         json.dump(productos, f, ensure_ascii=False, indent=2)
    
#     print(f"\nResultados guardados en 'productos_consolidados.json'")