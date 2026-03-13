import joblib
import numpy as np
import os

# Get correct file path
current_dir = os.path.dirname(__file__)
model_path = os.path.join(current_dir, "energy_model.pkl")

# Load model
model = joblib.load(model_path)


def predict_energy(
    temperature,
    humidity,
    wind_speed,
    cloud_cover,
    pressure,
    hour,
    day_of_week
):

    input_data = np.array([[
        temperature,
        humidity,
        wind_speed,
        cloud_cover,
        pressure,
        hour,
        day_of_week
    ]])

    prediction = model.predict(input_data)

    return float(prediction[0])