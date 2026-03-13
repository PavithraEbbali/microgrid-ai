import { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import OnboardingTutorial from "../components/OnboardingTutorial";
import "../styles/Dashboard.css";

const API_BASE = "http://127.0.0.1:8000";

function Dashboard() {
  const [prediction, setPrediction] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState("Detecting location...");
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [showOnboarding, setShowOnboarding] = useState(() => {
    // Check if user has seen onboarding
    return !localStorage.getItem("hasSeenOnboarding");
  });

  // Add these state declarations near your other useState calls
const [locationAttempted, setLocationAttempted] = useState(false);
const [showLocationPermission, setShowLocationPermission] = useState(false);


  const [hasPermission, setHasPermission] = useState(false);

  // Reverse geocoding function to get location name
  const getLocationName = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const address = response.data.address;
      const city = address.city || address.town || address.village || address.county || "Unknown Location";
      setLocationName(city);
    } catch (err) {
      console.error("Error fetching location name:", err);
      setLocationName("Location detected");
    }
  };

const handleEnableLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation({ lat, lon });
        await getLocationName(lat, lon);
        await fetchPredictionData(lat, lon);
      },
      (error) => {
        setError(`Unable to access location. Please enable in browser settings.
        Steps to enable:
        1. Check browser address bar for 🔒 location icon
        2. Click it and select &#39;Allow&#39;
        3. Refresh the page
        4. Or enable in browser settings &amp;gt; Privacy &amp;gt; Location`);
        setLoading(false);
      }
    );
  };

  const getPrediction = async () => {
    if (hasPermission && location) {
      // Reuse existing data if permission already granted
      await fetchPredictionData(location.lat, location.lon);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation({ lat, lon });
          await getLocationName(lat, lon);
          await fetchPredictionData(lat, lon);
        },
        (error) => {
          setHasPermission(false);
          setError(`Unable to access location. Please enable in browser settings.
          Steps to enable:
          1. Check browser address bar for 🔒 location icon
          2. Click it and select &#39;Allow&#39;
          3. Refresh the page
          4. Or enable in browser settings &amp;gt; Privacy &amp;gt; Location`);
          setLoading(false);
        }
      );
    } catch (err) {
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getPrediction();
    // Auto-refresh every 60 seconds instead of 10 to give users time to read
    const interval = setInterval(() => {
      getPrediction();
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  // Helper function: post-geolocation prediction logic
  const fetchPredictionData = async (lat, lon) => {
    try {
      // Fetch weather data
      const weatherResponse = await axios.post(`${API_BASE}/weather`, {
        latitude: lat,
        longitude: lon
      });

      const weatherData = weatherResponse.data.current;
      setWeather(weatherData);

      // Get current time
      const now = new Date();
      const hour = now.getHours();
      const day_of_week = now.getDay();

      // Get detailed analysis
      const analysisResponse = await axios.post(
        `${API_BASE}/analyze-energy`,
        {
          temperature: weatherData.temperature,
          humidity: weatherData.humidity,
          wind_speed: weatherData.wind_speed,
          cloud_cover: weatherData.cloud_cover,
          pressure: weatherData.pressure,
          hour,
          day_of_week
        }
      );

      setAnalysis(analysisResponse.data);
      setPrediction(analysisResponse.data.predicted_energy);
      setLastUpdate(new Date());

      // Generate hourly forecast
      const hourlyData = [];
      for (let i = 0; i < 24; i++) {
        const forecastHour = (hour + i) % 24;
        const tempTrend = Math.sin((forecastHour * Math.PI) / 12) * 8 + weatherData.temperature;
        const cloudTrend = Math.sin((forecastHour * Math.PI) / 12 + 1) * 25 + weatherData.cloud_cover;
        
        try {
          const forecastResponse = await axios.post(
            `${API_BASE}/predict-energy`,
            {
              temperature: Math.max(10, Math.min(45, tempTrend)),
              humidity: weatherData.humidity + (Math.random() - 0.5) * 10,
              wind_speed: weatherData.wind_speed + (Math.random() - 0.5) * 3,
              cloud_cover: Math.max(0, Math.min(100, cloudTrend)),
              pressure: weatherData.pressure,
              hour: forecastHour,
              day_of_week
            }
          );
          
          hourlyData.push({
            time: `${String(forecastHour).padStart(2, "0")}:00`,
            hour: forecastHour,
            energy: Math.round(forecastResponse.data.predicted_energy),
            temperature: Math.round(tempTrend * 10) / 10
          });
        } catch (e) {
          console.error(`Error forecasting hour ${forecastHour}:`, e);
        }
      }
      setHourlyForecast(hourlyData);
      setLoading(false);
      setHasPermission(true);
    } catch (err) {
      setError("Failed to fetch weather data. " + (err.response?.data?.detail || err.message));
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Analyzing your energy data...</p>
        </div>
      </div>
    );
  }

  if (error && !showLocationPermission) {
    return (
      <div className="dashboard-container">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h2>Unable to access location</h2>
          <p>Please enable in browser settings.</p>
          <div className="error-instructions">
            <ol>
              <li>Check browser address bar for 🔒 location icon</li>
              <li>Click it and select &#39;Allow&#39;</li>
              <li>Refresh the page</li>
              <li>Or enable in browser settings &gt; Privacy &gt; Location</li>
            </ol>
          </div>
          <button onClick={getPrediction} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }



  return (
    <div className="dashboard-container">
      {showOnboarding && (
        <OnboardingTutorial onClose={() => setShowOnboarding(false)} />
      )}
      
      {/* HEADER */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>⚡ Autonomous Microgrid Manager</h1>
          <p className="header-subtitle">Real-time Energy Intelligence System</p>
          <div className="location-info">
            📍 {locationName}
          </div>
        </div>
        <div className="update-info">
          Last updated: {lastUpdate.toLocaleTimeString()}
          <button onClick={getPrediction} className="refresh-button">
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* MAIN METRICS */}
      <div className="metrics-grid">
        {/* Predicted Energy Card */}
        <div className="metric-card primary-card">
          <div className="metric-icon">⚡</div>
          <div className="metric-content">
            <h3>Predicted Demand</h3>
            <div className="metric-value">{prediction}kWh</div>
            <div className={`metric-level ${analysis.demand_level.toLowerCase()}`}>
              {analysis.demand_level} DEMAND
            </div>
            <div className="metric-bar">
              <div
                className="metric-fill"
                style={{
                  width: `${Math.min((prediction / 150) * 100, 100)}%`,
                  backgroundColor: analysis.demand_color
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Solar Potential Card */}
        <div className="metric-card secondary-card">
          <div className="metric-icon">☀️</div>
          <div className="metric-content">
            <h3>Solar Potential</h3>
            <div className="metric-value">{analysis.solar_potential}%</div>
            <div className={`metric-level ${analysis.solar_level.toLowerCase()}`}>
              {analysis.solar_level}
            </div>
            <div className="metric-bar">
              <div
                className="metric-fill"
                style={{
                  width: `${analysis.solar_potential}%`,
                  backgroundColor: "#fbbf24"
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Peak Hour Card */}
        <div className="metric-card tertiary-card">
          <div className="metric-icon">📈</div>
          <div className="metric-content">
            <h3>Peak Hour</h3>
            <div className="metric-value">{analysis.peak_hour_label}</div>
            <div className="metric-label">Next peak demand expected</div>
            <div className="peak-description">
              Avoid heavy appliance use during this time
            </div>
          </div>
        </div>

        {/* Efficiency Score Card */}
        <div className="metric-card quaternary-card">
          <div className="metric-icon">💡</div>
          <div className="metric-content">
            <h3>Efficiency Score</h3>
            <div className="metric-value">{analysis.efficiency_score}/100</div>
            <div className="metric-label">Energy efficiency rating</div>
            <div className={`efficiency-indicator ${analysis.efficiency_score > 50 ? 'good' : 'poor'}`}>
              {analysis.efficiency_score > 50 ? '✓ Good Conditions' : '⚠ Optimize Usage'}
            </div>
          </div>
        </div>
      </div>

      {/* WEATHER & CONDITIONS */}
      <div className="conditions-section">
        <h2>Current Conditions</h2>
        <div className="weather-grid">
          <div className="weather-item">
            <span className="weather-label">Temperature</span>
            <span className="weather-value">{weather.temperature}°C</span>
          </div>
          <div className="weather-item">
            <span className="weather-label">Humidity</span>
            <span className="weather-value">{weather.humidity}%</span>
          </div>
          <div className="weather-item">
            <span className="weather-label">Wind Speed</span>
            <span className="weather-value">{weather.wind_speed} km/h</span>
          </div>
          <div className="weather-item">
            <span className="weather-label">Cloud Cover</span>
            <span className="weather-value">{weather.cloud_cover}%</span>
          </div>
          <div className="weather-item">
            <span className="weather-label">Pressure</span>
            <span className="weather-value">{weather.pressure} mb</span>
          </div>
        </div>
      </div>

      {/* CHARTS */}
      <div className="charts-grid">
        {/* Energy Forecast Chart */}
        <div className="chart-container">
          <h3>24-Hour Energy Forecast</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="time" 
                stroke="#94a3b8"
                interval={3}
              />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #60a5fa",
                  borderRadius: "8px"
                }}
              />
              <Line
                type="monotone"
                dataKey="energy"
                stroke="#60a5fa"
                strokeWidth={3}
                dot={{ fill: "#60a5fa", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Temperature Distribution */}
        <div className="chart-container">
          <h3>Temperature Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hourlyForecast.slice(0, 12)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #f97316",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="temperature" fill="#f97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SMART RECOMMENDATIONS */}
      <div className="recommendations-section">
        <h2>Smart Energy Recommendations</h2>
        <div className="recommendations-grid">
          {analysis.recommendations.map((rec, idx) => (
            <div key={idx} className={`recommendation-card ${rec.type}`}>
              <div className="rec-icon">{rec.icon}</div>
              <div className="rec-content">
                <h4>{rec.title}</h4>
                <p>{rec.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PERFORMANCE SCORE SECTION */}
      <div className="performance-section">
        <h2>⭐ Your Energy Management Score</h2>
        <div className="performance-card">
          <div className="circular-progress">
            <svg className="progress-ring" width="200" height="200">
              <circle
                cx="100"
                cy="100"
                r="90"
                className="progress-ring-circle"
                style={{
                  strokeDashoffset: 565 - (analysis.efficiency_score / 100) * 565
                }}
              />
            </svg>
            <div className="score-display">
              <span className="score-number">{analysis.efficiency_score}</span>
              <span className="score-label">/100</span>
            </div>
          </div>
          <div className="performance-details">
            <h3>Performance Analysis</h3>
            <p>
              {analysis.efficiency_score > 75
                ? "🎯 Excellent! You're managing energy optimally. Keep it up!"
                : analysis.efficiency_score > 50
                ? "📈 Good performance! Small adjustments can boost your score."
                : "💡 Opportunity to improve. Try following our recommendations more closely."}
            </p>
            <div className="score-factors">
              <div className="factor">
                <span className="factor-label">Peak Avoidance</span>
                <span className="factor-value">{Math.max(0, 100 - (prediction / 150) * 100).toFixed(0)}%</span>
              </div>
              <div className="factor">
                <span className="factor-label">Solar Utilization</span>
                <span className="factor-value">{analysis.solar_potential}%</span>
              </div>
              <div className="factor">
                <span className="factor-label">Cost Optimization</span>
                <span className="factor-value">{Math.min(100, (analysis.efficiency_score * 1.2).toFixed(0))}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SAVINGS CALCULATOR SECTION */}
      <div className="savings-calculator-section">
        <h2>💰 Potential Energy Savings</h2>
        <div className="calculator-container">
          <div className="calculator-card">
            <h3>Calculate Your Monthly Savings</h3>
            <p>If you follow our smart recommendations...</p>
            <div className="savings-display">
              <div className="savings-item">
                <span className="savings-label">Monthly Bill Reduction</span>
                <span className="savings-value">
                  {(300 * (analysis.efficiency_score / 100) * 0.25).toFixed(0)}₹
                </span>
              </div>
              <div className="savings-item">
                <span className="savings-label">Annual Savings</span>
                <span className="savings-value">
                  {(3600 * (analysis.efficiency_score / 100) * 0.25).toFixed(0)}₹
                </span>
              </div>
              <div className="savings-item">
                <span className="savings-label">CO₂ Reduction</span>
                <span className="savings-value">
                  {((prediction * 30 * 0.6) / 1000).toFixed(1)} tons
                </span>
              </div>
            </div>
            <p className="savings-note">
              Based on {analysis.efficiency_score}% efficiency score and following smart recommendations
            </p>
          </div>
        </div>
      </div>

      {/* AI INSIGHTS SECTION */}
      <div className="ai-insights-section">
        <h2>💡 Real-Time AI Insights</h2>
        <div className="insights-container">
          <div className="insight-box">
            <h4>📊 Demand Pattern</h4>
            <p>
              {analysis.demand_level === "HIGH"
                ? "Current demand is HIGH. Peak hours detected: 6-9 PM and 1-3 PM. Avoid heavy appliances during these times."
                : analysis.demand_level === "MEDIUM"
                ? "Current demand is MODERATE. Good window for energy usage. Consider scheduling heavy tasks now."
                : "Current demand is LOW. Optimal time for heavy appliances. Grid is healthy and stable."}
            </p>
          </div>
          <div className="insight-box">
            <h4>🌡️ Weather Impact</h4>
            <p>
              {weather.temperature > 32
                ? `High temperature (${weather.temperature}°C) is driving cooling demand. AC costs are elevated.`
                : weather.temperature < 10
                ? `Cold conditions (${weather.temperature}°C) detected. Monitor heating appliances.`
                : `Mild temperature (${weather.temperature}°C) ideal for natural ventilation. Use this to offset AC use.`}
            </p>
          </div>
          <div className="insight-box">
            <h4>☀️ Renewable Potential</h4>
            <p>
              {analysis.solar_level === "NONE"
                ? "🌙 NightTime - no solar generation possible."
                : analysis.solar_potential > 70
                ? "Solar conditions are EXCELLENT today! Perfect time to utilize solar energy if available."
                : analysis.solar_potential > 40
                ? "Solar potential is MODERATE. Cloud cover is limiting renewable generation."
                : "Solar potential is LOW. Thick clouds today. Expect increased grid reliance."}
            </p>
          </div>
          <div className="insight-box">
            <h4>⚡ Smart Recommendation</h4>
            <p>
              {analysis.recommendations[0]?.message ||
                "Continue following the personalized recommendations below to maximize your efficiency score."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;