import csv
import mysql.connector
from mysql.connector import Error

def conectar_bd():
    return mysql.connector.connect(
        host='localhost',
        database='preciofarma_db',
        user='root',
        password='1234'
    )

def insertar_categoria(cursor, categoria):
    cursor.execute("SELECT id FROM categorias WHERE nombre = %s", (categoria,))
    resultado = cursor.fetchone()
    if resultado:
        return resultado[0]
    cursor.execute("INSERT INTO categorias (nombre) VALUES (%s)", (categoria,))
    return cursor.lastrowid

def insertar_tienda(cursor, tienda, url_base):
    cursor.execute("SELECT id FROM tiendas WHERE nombre = %s", (tienda,))
    resultado = cursor.fetchone()
    if resultado:
        return resultado[0]
    cursor.execute(
        "INSERT INTO tiendas (nombre, url_base, activa) VALUES (%s, %s, %s)",
        (tienda, url_base, 1)
    )
    return cursor.lastrowid

def buscar_producto(cursor, nombre):
    cursor.execute("SELECT id FROM productos WHERE nombre = %s", (nombre,))
    resultado = cursor.fetchone()
    if resultado:
        return resultado[0]
    return None

def insertar_producto(cursor, nombre, categoria_id):
    cursor.execute(
        "INSERT INTO productos (nombre, categoria_id, created_at) VALUES (%s, %s, NOW())",
        (nombre, categoria_id)
    )
    return cursor.lastrowid

def insertar_producto_tienda(cursor, producto_id, tienda_id, precio_normal, precio_app, precio_tarjeta, url_imagen, url_producto):
    cursor.execute(
        """
        INSERT INTO producto_tienda 
        (producto_id, tienda_id, precio_normal, precio_aplicativo_movil, precio_tarjeta, url_imagen, url_producto, disponible)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """,
        (producto_id, tienda_id, precio_normal, precio_app, precio_tarjeta, url_imagen, url_producto, 1)
    )

def cargar_csv_a_mysql(ruta_csv):
    conexion = conectar_bd()
    if conexion.is_connected():
        cursor = conexion.cursor()

        with open(ruta_csv, newline='', encoding='utf-8') as archivo_csv:
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

                id_categoria = insertar_categoria(cursor, categoria)
                id_tienda = insertar_tienda(cursor, tienda, url_base)

                # Buscar si el producto ya existe
                id_producto = buscar_producto(cursor, nombre)
                if not id_producto:
                    id_producto = insertar_producto(cursor, nombre, id_categoria)

                insertar_producto_tienda(cursor, id_producto, id_tienda, precio_normal, precio_app, precio_tarjeta, imagen_url, detalle_url)

        conexion.commit()
        print("Datos insertados correctamente.")
        cursor.close()
        conexion.close()
    else:
        print("No se pudo conectar a la base de datos.")

# Ejecutar la función
cargar_csv_a_mysql("./csv/productos_inkafarma.csv")
cargar_csv_a_mysql("./csv/productos_mifarma.csv")
