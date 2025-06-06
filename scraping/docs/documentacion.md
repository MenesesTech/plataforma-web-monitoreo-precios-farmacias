# **📘 Documentación Técnica: Scraper con Playwright**

## **🧰 Requisitos del proyecto**

Este proyecto realiza scraping de productos farmacéuticos desde las tiendas **Mifarma** e **Inkafarma** utilizando herramientas modernas como **Playwright** para la navegación web automatizada, **BeautifulSoup** para el análisis del DOM, y **Pandas** para la manipulación y almacenamiento de datos.

---

## **🔧 Instalación de dependencias**

Antes de ejecutar el script, asegúrese de tener instalado **Python 3.10 o superior** y un entorno virtual activo (recomendado).

**1\. Crear entorno virtual (opcional pero recomendado):**

```
python -m venv venv
source venv/bin/activate      # En Linux/Mac
venv\Scripts\activate         # En Windows
```

**2\. Instalar las dependencias:**

```
pip install -r requirements.txt
```

**3\. Instalar los navegadores requeridos por Playwright:**

```
playwright install
```

## **🚀 Ejecución del scraping**

Cada script puede ser ejecutado directamente mediante:

```
python scraping/scripts/mifarma_scraper.py
python scraping/scripts/inkafarma_scraper.py
```

Cada ejecución genera un archivo CSV con los productos extraídos, que se guarda en `./scraping/csv/productos_mifarma.csv`.

## **📝 Detalles técnicos**

*   **Scroll automático:** se realiza con `Playwright` para cargar productos dinámicamente.
*   **Extracción de datos:** se usa `BeautifulSoup` para obtener:
    *   Nombre del producto
    *   Precio normal
    *   Precio con app
    *   Precio con tarjeta
    *   URL de imagen
    *   URL del producto
    *   Categoría
*   **Almacenamiento:** los datos se almacenan en un archivo `.csv` usando `pandas`.