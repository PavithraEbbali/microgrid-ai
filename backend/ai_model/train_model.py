import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from xgboost import XGBRegressor
import joblib
import os

np.random.seed(42)

data_size = 5000

# Weather features
temperature = np.random.uniform(15, 40, data_size)
humidity = np.random.uniform(20, 90, data_size)
wind_speed = np.random.uniform(0, 15, data_size)
cloud_cover = np.random.uniform(0, 100, data_size)
pressure = np.random.uniform(980, 1030, data_size)

# Time features
hour = np.random.randint(0, 24, data_size)
day_of_week = np.random.randint(0, 7, data_size)

# Synthetic energy demand logic (realistic electricity demand in kWh)
# Base load + weather influence + time-based patterns
base_load = 50  # Base consumption
energy_demand = (
    base_load +
    temperature * 0.8 +  # Higher temp = more cooling demand
    humidity * 0.2 +
    wind_speed * 0.3 +
    (100 - cloud_cover) * 0.1 +  # More sun = more solar, less demand
    pressure * 0.05 +
    (np.sin(hour * np.pi / 12) * 20) +  # Daily pattern (peak at noon and evening)
    (day_of_week % 2) * 5 +  # Weekday vs weekend variation
    np.random.normal(0, 5, data_size)  # Noise
)

# Ensure positive values
energy_demand = np.maximum(energy_demand, 20)

df = pd.DataFrame({
    "temperature": temperature,
    "humidity": humidity,
    "wind_speed": wind_speed,
    "cloud_cover": cloud_cover,
    "pressure": pressure,
    "hour": hour,
    "day_of_week": day_of_week,
    "energy_demand": energy_demand
})

X = df[[
    "temperature",
    "humidity",
    "wind_speed",
    "cloud_cover",
    "pressure",
    "hour",
    "day_of_week"
]]

y = df["energy_demand"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = XGBRegressor(
    n_estimators=200,
    max_depth=5,
    learning_rate=0.05,
    random_state=42
)

model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"✅ Model trained successfully!")
print(f"MSE: {mse:.4f}")
print(f"R² Score: {r2:.4f}")

# Save model to the correct path
current_dir = os.path.dirname(__file__)
model_path = os.path.join(current_dir, "energy_model.pkl")
joblib.dump(model, model_path)

print(f"✅ Model saved to: {model_path}")