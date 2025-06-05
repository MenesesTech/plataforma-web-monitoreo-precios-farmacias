import time
import pandas as pd
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

# Funcion para configurar el driver de Selenium
def configurar_driver():
    # Configurar Selenium
    service = Service(ChromeDriverManager().install())
    options = Options()
    options.add_argument("--window-size=1920x1080")
    options.add_argument("--disable-notifications")
    # options.add_argument("--headless")
    driver = webdriver.Chrome(service=service, options=options)
    return driver

# Funcion para cargar la pagina con url
def cargar_pagina(driver, url):
    driver.get(url)
    time.sleep(5)
    return driver

# Función para guardar los datos en un archivo CSV
def guardar_datos_csv(datos, nombre_archivo):
    directorio = "/Users/ASUS/Downloads"
    ruta_completa = f"{directorio}/{nombre_archivo}"
    datos.to_csv(ruta_completa, index=False, sep=";", encoding="utf-8-sig")
    print(f"Datos guardados en: {ruta_completa}")

# Función para hacer scroll
def scrollear_abajo(driver, max_scroll_intentos):
    ultima_altura = driver.execute_script("return document.body.scrollHeight")
    for intento in range(max_scroll_intentos):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(4)
        nueva_altura = driver.execute_script("return document.body.scrollHeight")
        if nueva_altura == ultima_altura:
            break
        ultima_altura = nueva_altura

# Función para extraer los datos de la página
def extraer_datos(soup, div_product_card, span_product_name, span_product_price, div_target_price, config):
    # Buscamos todos los cards de productos
    cards = soup.find_all("div", class_=div_product_card)
    # Lista de productos
    productos = []
    seen = set() # Para evitar duplicados

    for item in cards:
        # Nombre
        nombre_tag = item.find('span', class_=span_product_name)
        nombre = nombre_tag.text.strip() if nombre_tag else None

        # Precio normal
        precio_content_tag = item.find('div', class_='product3Prices')
        precio_tag = None
        if precio_content_tag:
            precio_tag = precio_content_tag.find('span', class_=span_product_price)
            if not precio_tag:
                precio_tag = precio_content_tag.find('div', class_=span_product_price)
        precio = precio_tag.text.strip() if precio_tag else None
        # Limpieza de precio normal
        if precio:
            precio = precio.replace("S/", "").replace(".", ",").strip()

        # Precio con tarjeta
        precio_con_tarjeta_tag = precio_content_tag.find('div', class_=div_target_price) if precio_content_tag else None
        p_tag = precio_con_tarjeta_tag.find('p') if precio_con_tarjeta_tag else None
        precio_con_tarjeta = p_tag.text.strip() if p_tag else None

        # Limpieza de precio con tarjeta
        if precio_con_tarjeta:
            precio_con_tarjeta = precio_con_tarjeta.replace("S/", "").replace(".", ",").strip()

        if nombre and nombre not in seen:
            seen.add(nombre)
            productos.append({
                'Nombre': nombre,
                'Precio': precio,
                'Precio con tarjeta': precio_con_tarjeta,
                'Categoria': config['categoria'],
                'Tienda': config['nombre_tienda']
            })
    return productos

# Funcion para scrapear por tienda
def scrapear_tienda(config: dict):
    driver = configurar_driver()
    cargar_pagina(driver, config["url"])
    scrollear_abajo(driver, config["max_scroll_intentos"])
    # Obtener HTML completo
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    driver.quit()
    # Extraer datos
    productos = extraer_datos(soup, 
        config["div_product_card"], 
        config["span_product_name"], 
        config["span_product_price"], 
        config["div_target_price"],
        config
    )
    # Crear DataFrame
    df = pd.DataFrame(productos)
    nombre_archivo = config.get("nombre_archivo")
    guardar_datos_csv(df, nombre_archivo)
