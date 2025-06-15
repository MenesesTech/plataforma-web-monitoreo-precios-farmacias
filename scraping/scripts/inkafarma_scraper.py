import asyncio
import pandas as pd
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright

# URL objetivo
URL = "https://inkafarma.pe/categoria/salud/sistema-respiratorio"
nombre_tienda = "InkaFarma"

# ========== MÉTODO 1: SCROLL PROGRESIVO (MÁS NATURAL) ==========
async def scroll_progresivo(page, max_intentos=60, pixels_por_scroll=800):
    print("🔄 Iniciando scroll progresivo...")
    
    # Subir al principio una sola vez
    await page.evaluate("window.scrollTo(0, 0)")
    await page.wait_for_timeout(1000)
    
    altura_anterior = 0
    intentos_sin_cambio = 0
    
    for intento in range(max_intentos):
        # Scroll progresivo hacia abajo
        await page.evaluate(f"window.scrollBy(0, {pixels_por_scroll})")
        
        # Esperar a que cargue contenido nuevo
        await page.wait_for_timeout(2000)
        
        # Verificar si cambió la altura
        altura_actual = await page.evaluate("document.body.scrollHeight")
        
        if altura_actual == altura_anterior:
            intentos_sin_cambio += 1
            print(f"📊 Sin cambios en altura ({intentos_sin_cambio}/3)")
            
            if intentos_sin_cambio >= 3:
                print("✅ Scroll completado - No hay más contenido")
                break
        else:
            intentos_sin_cambio = 0
            altura_anterior = altura_actual
            print(f"📈 Nueva altura detectada: {altura_actual}px")
    
    return altura_actual


# Función principal
async def iniciar_scraping():
    async with async_playwright() as p:
        # Lanzar navegador
        browser = await p.chromium.launch(
            headless=True,
            args=[
                '--disable-blink-features=AutomationControlled',
                '--disable-web-security',
                '--disable-geolocation', 
            ]
        )

        # Crear contexto con configuración personalizada
        context = await browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            permissions=[],
        )

        page = await context.new_page()
        
        try:
            print(f"🌐 Cargando página: {URL}")
            await page.goto(URL, wait_until="domcontentloaded")
            await page.wait_for_timeout(5000)
            await scroll_progresivo(page)
            html = await page.content()
            print(f"✅ Página completa guardada en HTML de {nombre_tienda}")
        except Exception as e:
            print(f"❌ Error al cargar la página de {nombre_tienda}: {e}")
            html = ""
        finally:
            await browser.close()

        # Procesar el HTML si se necesita
        if(html):
            soup = BeautifulSoup(html, 'html.parser')
            # Extraer los datos
            cards = soup.find_all("div", class_='product')
            # Lista de productos
            productos = []
            seen = set() # Evitar duplicados
            
            for item in cards:
                # Inicializar variables por defecto
                precio_normal = None
                precio_app = None
                precio_tarjeta = None
                imagen_url = None
                url_details = None
                categoria = None

                #Etiqueta del producto
                etiqueta_tag = item.find('span', class_='text-tag')
                etiqueta = etiqueta_tag.text.strip() if etiqueta_tag else None

                # Nombre del producto
                nombre_tag = item.find('span', class_='product-name')
                nombre = nombre_tag.text.strip() if nombre_tag else None

                # Precio normal
                precios_content_tag = item.find('div', class_='product3Prices')
                precio_normal_content = precios_content_tag.find('fp-product-price')
                if precio_normal_content:
                    precio_normal_tag = precio_normal_content.find('span', class_='card-monedero')
                    precio_normal = precio_normal_tag.text.strip() if precio_normal_tag else None
                if precio_normal:
                    precio_normal = precio_normal.replace("S/", "").replace(".", ",").strip()

                # Precio con aplicativo
                precio_app_content = precios_content_tag.find('fp-product-regular-price')
                if precio_app_content:
                    precio_app_tag = precio_app_content.find('span', class_='card-monedero')
                    precio_app = precio_app_tag.text.strip() if precio_app_tag else None
                if precio_app:
                    precio_app = precio_app.replace("S/", "").replace(".", ",").strip()

                # Precio con tarjeta oh
                precio_tarjeta_content = precios_content_tag.find('fp-product-offer-price')
                if precio_tarjeta_content:
                    precio_tarjeta_tag = precio_tarjeta_content.find('span', class_='card-monedero')
                    precio_tarjeta = precio_tarjeta_tag.text.strip() if precio_tarjeta_tag else None
                if precio_tarjeta:
                    precio_tarjeta = precio_tarjeta.replace("S/", "").replace(".", ",").strip()
                # Url de imagen
                imagen_url = None
                img_product_content = item.find('div', class_='product-image-container')

                if img_product_content:
                    img_tag = img_product_content.find('img', class_='img-fluid mh-100')
                    imagen_url = img_tag['src'] if img_tag and 'src' in img_tag.attrs else None

                # Url de detalles del producto
                detail_product_content = item.find('a', class_='link')
                if detail_product_content:
                    url_details = detail_product_content['href'] if 'href' in detail_product_content.attrs else None

                # Categoria
                categoria = item['data-product-category'] if 'data-product-category' in item.attrs else None
                if categoria:
                    categoria = categoria.replace("-1","").strip()
                
                # Evitar duplicados por nombre y evitar imágenes de "not-found"
                if nombre and nombre not in seen and imagen_url != "../../../../../assets/images/product/not-found.svg":
                    seen.add(nombre)
                    productos.append({
                        "nombre": nombre + ' ' + etiqueta,
                        "precio_normal": precio_normal,
                        "precio_app": precio_app,
                        "precio_tarjeta": precio_tarjeta,
                        "imagen_url": imagen_url,
                        "detalle_url": url_details,
                        "categoria": categoria,
                        "url_base": 'http://inkafarma.com.pe',
                        "tienda": 'inkafarma'
                    })
            return productos