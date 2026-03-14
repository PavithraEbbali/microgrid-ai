from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests
import numpy as np
from datetime import datetime
from ai_model.predict import predict_energy

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "Backend Connected"}


# Input structures
class EnergyInput(BaseModel):
    temperature: float
    humidity: float
    wind_speed: float
    cloud_cover: float
    pressure: float
    hour: int
    day_of_week: int

class LocationInput(BaseModel):
    latitude: float
    longitude: float

@app.post("/weather")
async def get_weather(location: LocationInput):
    """Fetch weather data from Open-Meteo API"""
    try:
        # Fetch current weather and hourly forecast
        url = f"https://api.open-meteo.com/v1/forecast"
        params = {
            "latitude": location.latitude,
            "longitude": location.longitude,
            "current": "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,cloud_cover,pressure_msl",
            "hourly": "temperature_2m,cloud_cover,relative_humidity_2m",
            "timezone": "auto",
            "forecast_days": 1
        }
        
        response = requests.get(url, params=params)
        response.raise_for_status()
        
        data = response.json()
        current = data.get("current", {})
        hourly = data.get("hourly", {})
        
        return {
            "current": {
                "temperature": current.get("temperature_2m", 0),
                "humidity": current.get("relative_humidity_2m", 0),
                "wind_speed": current.get("wind_speed_10m", 0),
                "cloud_cover": current.get("cloud_cover", 0),
                "pressure": current.get("pressure_msl", 0),
                "weather_code": current.get("weather_code", 0),
            },
            "hourly": {
                "temperature": hourly.get("temperature_2m", []),
                "cloud_cover": hourly.get("cloud_cover", []),
                "humidity": hourly.get("relative_humidity_2m", [])
            }
        }
    except Exception as e:
        return {"error": str(e)}


@app.post("/predict-energy")
def predict(data: EnergyInput):
    """Predict electricity demand based on weather and time data"""
    
    prediction = predict_energy(
        data.temperature,
        data.humidity,
        data.wind_speed,
        data.cloud_cover,
        data.pressure,
        data.hour,
        data.day_of_week
    )
    
    # Ensure prediction is in realistic range (20-150 kWh)
    prediction = max(20, min(150, prediction))
    
    return {
        "predicted_energy": round(float(prediction), 2)
    }


@app.post("/analyze-energy")
def analyze_energy(data: EnergyInput):
    """Provide comprehensive energy analysis with insights"""
    
    # Get energy prediction
    prediction = predict_energy(
        data.temperature,
        data.humidity,
        data.wind_speed,
        data.cloud_cover,
        data.pressure,
        data.hour,
        data.day_of_week
    )
    
    prediction = max(20, min(150, prediction))
    
    # Determine demand level
    if prediction < 40:
        demand_level = "LOW"
        demand_color = "#10b981"  # Green
    elif prediction < 80:
        demand_level = "MEDIUM"
        demand_color = "#f59e0b"  # Amber
    else:
        demand_level = "HIGH"
        demand_color = "#ef4444"  # Red
    
    # Calculate solar potential (0% at night, cloud-based during day)
    hour = data.hour
    if 6 <= hour <= 18:  # Daytime only (6AM-6PM)
        solar_potential = max(0, 100 - data.cloud_cover * 1.2)
        if solar_potential > 70:
            solar_level = "EXCELLENT"
        elif solar_potential > 40:
            solar_level = "GOOD"
        elif solar_potential > 20:
            solar_level = "MODERATE"
        else:
            solar_level = "POOR"
    else:  # Nighttime (including 2AM!)
        solar_potential = 0
        solar_level = "NONE"


    # Smarter efficiency score calculation
    efficiency_score = 70

    # Demand impact
    if demand_level == "HIGH":
        efficiency_score -= 25
    elif demand_level == "MEDIUM":
        efficiency_score -= 10
    else:
        efficiency_score += 5

    # Solar potential impact
    if solar_potential > 70:
        efficiency_score += 15
    elif solar_potential > 40:
        efficiency_score += 8
    elif solar_potential > 20:
        efficiency_score += 3

    # Temperature impact
    if data.temperature > 35:
        efficiency_score -= 10
    elif data.temperature > 30:
        efficiency_score -= 5
    elif data.temperature < 10:
        efficiency_score -= 5

    # Humidity impact
    if data.humidity > 80:
        efficiency_score -= 5

    # Wind benefit
    if data.wind_speed > 12:
        efficiency_score += 5

    # Clamp final score
    efficiency_score = max(20, min(95, efficiency_score))

    
    # Generate smart recommendations
    recommendations = []
    
    if demand_level == "HIGH":
        recommendations.append({
            "type": "urgent",
            "title": "Peak Demand Hours",
            "message": "Electricity demand is very high. Avoid using heavy appliances now.",
            "icon": "⚠️"
        })
    
    if solar_potential > 70 and 6 <= data.hour <= 18:  # Only show solar recs during day
        recommendations.append({
            "type": "opportunity",
            "title": "Solar Peak",
            "message": "Excellent conditions for solar energy. Use solar-powered appliances if available.",
            "icon": "☀️"
        })

    
    if data.humidity > 75:
        recommendations.append({
            "type": "info",
            "title": "High Humidity",
            "message": "High humidity may increase cooling demand. Use fans efficiently.",
            "icon": "💧"
        })
    
    if data.wind_speed > 10:
        recommendations.append({
            "type": "info",
            "title": "Strong Wind",
            "message": "Good conditions for wind energy generation.",
            "icon": "💨"
        })
    
    if demand_level == "LOW" and data.temperature < 25:
        recommendations.append({
            "type": "savings",
            "title": "Energy Saving Window",
            "message": "Now is a great time to charge devices and run heavy appliances.",
            "icon": "✅"
        })
    
    if not recommendations:
        recommendations.append({
            "type": "info",
            "title": "Normal Conditions",
            "message": "Energy demand is stable. Continue with normal usage patterns.",
            "icon": "ℹ️"
        })
    
    # Estimate peak hour (typically higher in evening)
    peak_hours = [7, 8, 18, 19, 20]  # Morning and evening peaks
    current_hour = data.hour
    next_peak = next((h for h in peak_hours if h > current_hour), peak_hours[0])
    
    return {
        "predicted_energy": round(prediction, 2),
        "demand_level": demand_level,
        "demand_color": demand_color,
        "solar_potential": round(solar_potential, 1),
        "solar_level": solar_level,
        "peak_hour": next_peak,
        "peak_hour_label": f"{next_peak}:00",
        "temperature": data.temperature,
        "humidity": data.humidity,
        "wind_speed": data.wind_speed,
        "cloud_cover": data.cloud_cover,
        "recommendations": recommendations,
        "efficiency_score": efficiency_score,
    }

class ChatRequest(BaseModel):
    message: str
    energy_context: dict


from openai import OpenAI

client = OpenAI(api_key=("GROQ_API_KEY"),
                base_url="https://api.groq.com/openai/v1")

class ChatRequest(BaseModel):
    message: str
    energy_context: dict


@app.post("/chat")
async def chat(request: ChatRequest):

    ctx = request.energy_context

    system_prompt = f"""
You are GridSense AI, an energy optimization assistant.

Current microgrid data:
Demand: {ctx.get('predicted_energy')} kWh ({ctx.get('demand_level')})
Solar: {ctx.get('solar_potential')}%
Weather: {ctx.get('temperature')}°C, {ctx.get('humidity')}% humidity

INSTRUCTIONS:
1. If the user is just greeting you (e.g., "hi", "hello"): Respond with a brief, friendly greeting and ask how you can help them optimize their energy today. Do NOT give tips yet.
2. If the user asks for advice, how to save energy, or what to do: Provide exactly 3 quick tips based on the data.

STRICT FORMATTING RULES(ONLY WHEN GIVING TIPS):
- DO NOT use asterisks (*) or any Markdown formatting.
- Number your points 1, 2, and 3.
- Keep each point under 12 words.
- DO NOT use introductory phrases. Just start with number 1.
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": request.message}
        ]
    )

    reply = response.choices[0].message.content

    return {"reply": reply}