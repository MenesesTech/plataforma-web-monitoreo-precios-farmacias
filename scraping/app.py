import asyncio
import json
import logging
from flask import Flask, jsonify, make_response
from scripts.inkafarma_scraper import iniciar_scraping as inkafarma_scraper
from scripts.mifarma_scraper import iniciar_scraping as mifarma_scraper
from services.csv_etl_service import procesar_productos_desde_lista

# Crear app en flask
app = Flask(__name__)

# Configuracion de logging para los mensajes
logging.basicConfig(level=logging.INFO,
                    format="%(levelname)s:%(asctime)s:%(funcName)s: %(message)s",
                   datefmt='%H:%M:%S',
                   encoding='utf-8')
logger = logging.getLogger(__name__)

# ==============================
#           FUNCIONES
# ==============================

# 1. Scrapear farmacias
def ejecutar_scraping():
    try:
        productos_inkafarma = asyncio.run(inkafarma_scraper())
        productos_mifarma = asyncio.run(mifarma_scraper())
        return productos_inkafarma + productos_mifarma
    except Exception as e:
        logger.info(f'Error al ejecutar scraping: {e}')
        raise

# ==============================
#       ENDPOINT's
# ==============================
# Endpoint: Ejecutar scraping y retornar datos procesados
@app.route('/api/ejecutar-scraping', methods=['POST'])
def send_data():
    try:
        productos = ejecutar_scraping()
        productos_etl = procesar_productos_desde_lista(productos)
        
        return jsonify({
            "mensaje": "Scraping ejecutado con éxito",
            "datos": productos_etl,
            "total_registros": len(productos_etl)
        }), 200
        
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
    app.run(debug=True, host='0.0.0.0', port=5000)