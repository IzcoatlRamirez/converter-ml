from sklearn.linear_model import LinearRegression
from flask_cors import CORS  # Importa CORS desde Flask-CORS
from flask import Flask,jsonify,request
import joblib
import os

app = Flask(__name__)
CORS(app)  # Habilita CORS para tu aplicación
# Obtener la ruta absoluta al directorio actual del script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construir la ruta absoluta al archivo .pkl
modelo_path = os.path.join(script_dir, 'radToGrad.pkl')

modelo = joblib.load(modelo_path)

#iniciamos el servidor y cargamos el index.html
@app.get('/')
def home():
    return 'Hola mundo desde flask'


@app.route('/api/predict', methods=['POST'])
def getPrediction():
    try:
        data = request.get_json()
        radians = data['radians']
        # Realiza una predicción usando el modelo cargado
        grados = modelo.predict([[radians]])[0]

        # Convertir el resultado (ndarray) a una lista de Python
        grados_lista = grados.tolist()

        return jsonify({'prediction': grados_lista})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug = True)