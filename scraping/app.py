from flask import Flask, jsonify
import json

app = Flask(__name__)

@app.route('/api/productos', methods=['GET'])
def obtener_productos():
    try:
        with open('productos.json', 'r', encoding='utf-8') as archivo:
            data = json.load(archivo)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "El archivo productos.json no existe"}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Error al procesar el JSON"}), 500

if __name__ == '__main__':
    app.run(debug=True)
