from bs4 import BeautifulSoup
from playwright.async_api import async_playwright
from services.normalization.product_normalizer import ProductNormalizer

# ========== MÉTODO 1: SCROLL PROGRESIVO ==========
async def scroll_progresivo(page, max_intentos=100, pixels_por_scroll=800):
    # Subir al principio una sola vez
    await page.evaluate("window.scrollTo(0, 0)")
    await page.wait_for_timeout(500)

    altura_anterior = 0
    intentos_sin_cambio = 0

    for intento in range(max_intentos):
        # Scroll progresivo hacia abajo
        await page.evaluate(f"window.scrollBy(0, {pixels_por_scroll})")

        # Esperar a que cargue contenido nuevo
        await page.wait_for_timeout(15000)

        # Verificar si cambió la altura
        altura_actual = await page.evaluate("document.body.scrollHeight")

        if altura_actual == altura_anterior:
            intentos_sin_cambio += 1
            print(f"📊 Sin cambios en altura ({intentos_sin_cambio}/3)")

            if intentos_sin_cambio >= 6:
                print("Scroll completado - No hay más contenido")
                break
        else:
            intentos_sin_cambio = 0
            altura_anterior = altura_actual
            print(f"📈 Nueva altura detectada: {altura_actual}px")

    return altura_actual

# Función principal
async def iniciar_scraping(URL: str, nombre_tienda: str):
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True,
            args=[
                "--disable-blink-features=AutomationControlled",
                "--disable-web-security",
                "--disable-geolocation",
            ],
        )

        context = await browser.new_context(
            viewport={"width": 1920, "height": 1080},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            permissions=[],
        )

        page = await context.new_page()

        try:
            print(f"🌐 Cargando página: {URL}")
            await page.goto(URL, wait_until="domcontentloaded", timeout=30000)
            await page.wait_for_timeout(5000)  # Increased wait time
            await scroll_progresivo(page)
            await page.wait_for_timeout(1000)  # Wait after scrolling
            html = await page.content()
            print(f"Página completa guardada en HTML de {nombre_tienda}")
        except Exception as e:
            print(f"Error al cargar la página de {nombre_tienda}: {e}")
            html = ""
        finally:
            await browser.close()

        if html:
            soup = BeautifulSoup(html, "html.parser")
            swiper_container = soup.find("div", class_="showcase-top")
            if swiper_container:
                swiper_container.decompose()
            cards = soup.find_all("div", class_="product")
            productos = []
            seen = set()

            for item in cards:
                precio = None
                imagen_url = None
                url_details = None

                # Etiqueta del producto
                etiqueta_tag = item.find("span", class_="text-tag")
                etiqueta = etiqueta_tag.text.strip() if etiqueta_tag else ""

                # Nombre del producto
                nombre_tag = item.find("span", class_="product-name")
                nombre = nombre_tag.text.strip() if nombre_tag else None

                # Precio
                precios_content_tag = item.find("div", class_="product3Prices")
                precio_normal_content = precios_content_tag.find("fp-product-regular-price-mifa") if precios_content_tag else None
                if precio_normal_content:
                    precio_normal_tag = precio_normal_content.find("span", class_="label")
                    precio = precio_normal_tag.text.strip() if precio_normal_tag else None
                if precio:
                    precio = precio.replace("S/", "").replace(".", ",").strip()

                # Url de imagen (improved logic)
                img_product_content = item.find("div", class_="product-image-container")
                if img_product_content:
                    img_tag = img_product_content.find("img", class_="img-fluid mh-100")
                    if img_tag:
                        imagen_url = img_tag.get("src") or img_tag.get("data-src") or img_tag.get("srcset")
                        if imagen_url and imagen_url.startswith("//"):
                            imagen_url = "https:" + imagen_url
                        if imagen_url and "not-found.svg" in imagen_url:
                            imagen_url = None
                    if not imagen_url:
                        print(f"No se encontró imagen para {nombre} en {nombre_tienda}")

                # Url de detalles del producto
                detail_product_content = item.find("a", class_="link")
                if detail_product_content:
                    url_details = detail_product_content["href"] if "href" in detail_product_content.attrs else None

                # Normalizar nombre para evitar duplicados
                if nombre:
                    nombre_completo = nombre + (" " + etiqueta if etiqueta else "")
                    nombre_normalizado = ProductNormalizer.normalize_text(nombre_completo)
                    if nombre_normalizado and nombre_normalizado not in seen:
                        seen.add(nombre_normalizado)
                        productos.append(
                            {
                                "nombre": nombre_completo.strip(),
                                "precio": precio,
                                "imagen_url": imagen_url,
                                "detalle_url": url_details,
                                "url_base": f"http://{nombre_tienda.lower()}.com.pe",
                                "tienda": nombre_tienda.lower(),
                            }
                        )

            return productos