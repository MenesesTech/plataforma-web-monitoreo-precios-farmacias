import asyncio
import logging
from flask import Flask, jsonify, make_response
from scripts.inkafarma_scraper import iniciar_scraping as inkafarma_scraper
from scripts.mifarma_scraper import iniciar_scraping as mifarma_scraper
from scripts.search_scraper.search_inkafarma_scaper import search_inkafarma_playwright
from scripts.search_scraper.search_mifarma_scraper import search_mifarma_playwright
from services.processing.product_processor import DataProcessor

# Crear app en flask
app = Flask(__name__)

# Configuracion de logging para los mensajes
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s:%(asctime)s:%(funcName)s: %(message)s",
    datefmt="%H:%M:%S",
    encoding="utf-8",
)
logger = logging.getLogger(__name__)

# ==============================
#           FUNCIONES
# ==============================
async def data_processing_farma(*listas):
    combinada = []
    for lista in listas:
        combinada.extend(lista)
    procesador = DataProcessor()
    return await procesador.data_processing_products(combinada)

# 1. Scrapear farmacias
async def ejecutar_scraping():
    try:
        productos_inkafarma_resfriado, productos_mifarma_resfriado = await asyncio.gather(
            # Categoria de Resfriado
            inkafarma_scraper("https://inkafarma.pe/categoria/farmacia/resfriado-comun/preparaciones-para-tos-y-resfrio", "Inkafarma"),
            mifarma_scraper("https://www.mifarma.com.pe/categoria/farmacia-1/resfriado-comun-1/preparaciones-para-tos-y-resfrio-1", "Mifarma")
        )

        productos_procesados = await data_processing_farma(
            productos_inkafarma_resfriado, productos_mifarma_resfriado
        )
        return productos_procesados

    except Exception as e:
        logger.error(f"Error al ejecutar scraping: {e}")
        raise

# 2. Scrapear farmacias por palabras clave
async def ejecutar_scraping_por_palabra_clave(keywords):
    try:
        productos_inkafarma = await search_inkafarma_playwright(keywords)
        productos_mifarma = await search_mifarma_playwright(keywords)
        productos_procesados = await data_processing_farma(productos_inkafarma, productos_mifarma)
        return productos_procesados
    except Exception as e:
        logger.error(f"Error al ejecutar scraping por palabra clave: {e}")
        raise
    
# ==============================
#       ENDPOINT's
# ==============================
# Endpoint: Ejecutar scraping y retornar datos procesados
@app.route("/api/ejecutar-scraping", methods=["POST"])
def send_data():
    try:
        productos = asyncio.run(ejecutar_scraping())
        return jsonify(productos), 200
    except Exception as e:
        logger.error(f"Error al ejecutar el scraping: {e}")
        return jsonify({"error": str(e)}), 500

# ==============================
#       MANEJO DE EXCEPCIONES
# ==============================
@app.errorhandler(Exception)
def handle_error(e):
    logger.error(f"Error inesperado: {e}")
    return make_response(jsonify({"error": str(e)}), 500)

# ==============================
#       METODO PRINCIPAL
# ==============================
if __name__ == "__main__":
    logger.info("Iniciando servicio, y listo para scrapear...")
    app.run(debug=True, host="0.0.0.0", port=5000)