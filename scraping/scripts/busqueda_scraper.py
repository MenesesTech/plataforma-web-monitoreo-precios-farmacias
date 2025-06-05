from scraper_core import scrapear_tienda

def main():
    tiendas = [
        {
            "nombre_tienda": "InkaFarma",
            "categoria": "Congestion Nasal",
            "url": "https://inkafarma.pe/categoria/farmacia/resfriado-comun/congestion-nasal",
            "div_product_card": "product",
            "span_product_name": "product-name",
            "span_product_price": "card-monedero",
            "div_target_price": "grid-price",
            "max_scroll_intentos": 10,
            "nombre_archivo": "inkafarma_productos_resfriado.csv"
        },
        {
            "nombre_tienda": "MiFarma",
            "categoria": "Congestion Nasal",
            "url": "https://www.mifarma.com.pe/categoria/farmacia-1/resfriado-comun-1/congestion-nasal-2",
            "div_product_card": "product",
            "span_product_name": "product-name",
            "span_product_price": "label",
            "div_target_price": "row",
            "max_scroll_intentos": 10,
            "nombre_archivo": "mifarma_productos_resfriado.csv"
        }
    ]

    for tienda in tiendas:
        try:
            scrapear_tienda(tienda)
        except Exception as e:
            print(f"Error al scrapear {tienda['nombre_tienda']}: {e}")


if __name__ == "__main__":
    main()
