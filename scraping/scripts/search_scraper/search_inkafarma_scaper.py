import asyncio
from urllib.parse import quote
from playwright.async_api import async_playwright
from services.normalization.product_normalizer import ProductNormalizer

async def search_inkafarma_playwright(keyword: str):
    productos = []
    seen = set()
    nombre_tienda = "Inkafarma"
    
    keyword_encoded = quote(keyword.strip().lower())
    url = f"https://inkafarma.pe/buscador?keyword={keyword_encoded}"
    
    async with async_playwright() as p:
        # Launch browser with minimal settings
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={"width": 1280, "height": 720},
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/120.0.0.0 Safari/537.36"
            ),
            java_script_enabled=True,
            ignore_https_errors=True
        )
        page = await context.new_page()
        
        print(f"🌐 Abriendo URL: {url}")
        try:
            # Reduce timeout to 5 seconds
            await page.goto(url, wait_until="domcontentloaded")
            await page.wait_for_timeout(5000) 
            await page.wait_for_timeout(2000)
            html = await page.content()

            # Use more specific selector to avoid unnecessary DOM traversal
            cards = await page.query_selector_all("div.showcase-top div.product")
            if not cards:
                print("❌ No se encontraron productos en 'showcase-top'")
                return []

            # Parallel extraction of product data
            async def extract_product(item):
                try:
                    # Batch DOM queries for efficiency
                    nombre_task = item.query_selector("span.product-name")
                    etiqueta_task = item.query_selector("span.text-tag")
                    precio_task = item.query_selector("div.product3Prices span.label, div.product3Prices span.card-monedero")
                    img_task = item.query_selector("img.img-fluid.mh-100")
                    link_task = item.query_selector("a.link")

                    # Await all queries concurrently
                    nombre_tag, etiqueta_tag, precio_tag, img_tag, link_tag = await asyncio.gather(
                        nombre_task, etiqueta_task, precio_task, img_task, link_task
                    )

                    # Extract values
                    nombre = await nombre_tag.inner_text() if nombre_tag else None
                    etiqueta = await etiqueta_tag.inner_text() if etiqueta_tag else ""
                    precio = await precio_tag.inner_text() if precio_tag else None
                    if precio:
                        precio = precio.replace("S/", "").replace(".", ",").strip()
                    
                    imagen_url = await img_tag.get_attribute("src") if img_tag else None
                    if imagen_url:
                        if imagen_url.startswith("//"):
                            imagen_url = "https:" + imagen_url
                        if "not-found.svg" in imagen_url:
                            imagen_url = None

                    detalle_url = await link_tag.get_attribute("href") if link_tag else None

                    return nombre, etiqueta, precio, imagen_url, detalle_url
                except Exception as e:
                    print(f"⚠️ Error extrayendo producto: {e}")
                    return None, None, None, None, None

            # Process all cards in parallel
            results = await asyncio.gather(*(extract_product(item) for item in cards))

            # Process extracted data
            for nombre, etiqueta, precio, imagen_url, detalle_url in results:
                if nombre:
                    nombre_completo = f"{nombre} {etiqueta}".strip()
                    nombre_normalizado = ProductNormalizer.normalize_text(nombre_completo)
                    if nombre_normalizado not in seen:
                        seen.add(nombre_normalizado)
                        productos.append({
                            "nombre": nombre_completo,
                            "precio": precio,
                            "imagen_url": imagen_url,
                            "detalle_url": detalle_url,
                            "url_base": "https://inkafarma.pe",
                            "tienda": "inkafarma",
                        })

        except Exception as e:
            print(f"❌ Error durante la búsqueda en Inkafarma: {e}")
        finally:
            await browser.close()

    return productos