# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load your previously trained model
model = joblib.load('model.pkl')
print("Model loaded successfully from model.pkl")

# Define expected features
expected_features = [
    'Gender',
    'Age',
    'Height',
    'Weight',
    'family_history_with_overweight',
    'FAVC',
    'FCVC',
    'NCP',
    'CAEC',
    'SMOKE',
    'CH2O',
    'SCC',
    'FAF',
    'TUE',
    'CALC',
    'MTRANS'
]

@app.route('/')
def home():
    return "Obesity Prediction API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    """
    Expects JSON input with the following fields:
      "Gender", "Age", "Height", "Weight",
      "family_history_with_overweight", "FAVC", "FCVC", "NCP", "CAEC", "SMOKE",
      "CH2O", "SCC", "FAF", "TUE", "CALC", "MTRANS"
    Returns JSON:
      {"prediction": <string_category>, "confidence": <float>}
    """
    data = request.get_json()

    # Validate input
    if not data:
        return jsonify({"error": "No input data provided"}), 400

    # Check if all expected features are present
    missing_features = [f for f in expected_features if f not in data]
    if missing_features:
        return jsonify({"error": f"Missing features: {', '.join(missing_features)}"}), 400

    try:
        # Convert input data to a DataFrame
        input_data = pd.DataFrame([data])

        # Convert numeric fields properly
        numeric_fields = ['Age', 'Height', 'Weight', 'FCVC', 'NCP', 'CH2O', 'FAF', 'TUE']
        for field in numeric_fields:
            input_data[field] = pd.to_numeric(input_data[field], errors='coerce')

        # Check for invalid numeric fields
        if input_data[numeric_fields].isnull().any().any():
            return jsonify({"error": "Invalid input types for numeric fields"}), 400

        # Make prediction
        pred = model.predict(input_data)[0]

        # If model supports predict_proba, get max confidence
        if hasattr(model, 'predict_proba'):
            proba = model.predict_proba(input_data)[0]  # first row
            confidence = float(np.max(proba))
        else:
            confidence = None

        return jsonify({
            "prediction": str(pred),
            "confidence": confidence
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
