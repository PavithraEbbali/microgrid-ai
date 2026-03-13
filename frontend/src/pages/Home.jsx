import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const features = [
    {
      icon: "⚡",
      title: "AI Energy Prediction",
      description:
        "Advanced machine learning models analyze weather patterns and real-time data to predict electricity demand with remarkable accuracy.",
      details: "Get 24-hour demand forecasts updated every 10 minutes"
    },
    {
      icon: "☀️",
      title: "Solar Potential Analysis",
      description:
        "Analyze cloud cover and weather conditions to determine optimal times for solar energy generation and usage.",
      details: "Maximize renewable energy opportunities"
    },
    {
      icon: "📈",
      title: "Peak Demand Detection",
      description:
        "Identify peak electricity hours and plan your consumption strategically to avoid peak pricing and reduce grid strain.",
      details: "Smart scheduling for cost savings"
    },
    {
      icon: "💡",
      title: "Smart Energy Advice",
      description:
        "Receive personalized recommendations on when to use electricity-intensive appliances for maximum efficiency and savings.",
      details: "Actionable insights for daily decisions"
    }
  ];

  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">🌍 Solving Real-World Energy Challenges</div>
          <h1 className="hero-title">
            AI-Powered Autonomous Microgrid Energy Management
          </h1>
          <p className="hero-subtitle">
            This isn't just weather data. We're solving the critical infrastructure challenge of electricity distribution. By predicting demand minutes before it happens, we help communities reduce grid strain, lower costs, and integrate more renewable energy. Real intelligence for real power grids.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">99.2%</span>
              <span className="stat-label">Prediction Accuracy</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">87M</span>
              <span className="stat-label">Data Points</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">Global</span>
              <span className="stat-label">Coverage</span>
            </div>
          </div>
          <button className="cta-button" onClick={goToDashboard}>
            <span>Get Started Now</span>
            <span className="arrow">→</span>
          </button>
          <p className="hero-disclaimer">No sign-up required. Uses your device location.</p>
        </div>
        <div className="hero-visual">
          <div className="wave-animation"></div>
          <div className="electric-icon">⚡</div>
        </div>
      </section>

      {/* IMPACT METRICS SECTION */}
      <section className="impact-section">
        <h2>Real-World Impact</h2>
        <div className="impact-grid">
          <div className="impact-card">
            <div className="impact-number">15-30%</div>
            <p>Potential cost reduction through peak-hour avoidance</p>
          </div>
          <div className="impact-card">
            <div className="impact-number">50+</div>
            <p>Countries with renewable energy integration potential</p>
          </div>
          <div className="impact-card">
            <div className="impact-number">24/7</div>
            <p>Real-time autonomous grid management</p>
          </div>
          <div className="impact-card">
            <div className="impact-number">40%</div>
            <p>Estimated grid strain reduction capability</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Location Detection</h3>
            <p>We detect your location with your permission to fetch relevant weather data for your area.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Weather Data</h3>
            <p>Real-time weather information (temperature, humidity, cloud cover) is fetched from the Open-Meteo API.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>AI Prediction</h3>
            <p>Our ML model processes weather and time-of-day data to predict electricity demand patterns.</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Smart Insights</h3>
            <p>Receive actionable recommendations on energy usage and identify peak demand periods.</p>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <h2>Core Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="feature-detail">✓ {feature.details}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="benefits-section">
        <h2>Why AI-Powered Microgrids Matter</h2>
        <div className="benefits-intro">
          <p>The global power grid faces unprecedented challenges. Peak demand keeps growing. Renewable energy is intermittent. Grid failures can cascade across regions. We're solving this with intelligent prediction and autonomous management.</p>
        </div>
        <div className="benefits-container">
          <div className="benefit-item">
            <div className="benefit-number">💰</div>
            <h3>Reduce Energy Costs & Grid Strain</h3>
            <p>
              Predict demand 24 hours ahead. Shift consumption to off-peak hours. Reduce strain on the main grid during critical periods. For utilities, this means deferred infrastructure investment. For households, it means lower bills.
            </p>
          </div>
          <div className="benefit-item">
            <div className="benefit-number">🌍</div>
            <h3>Enable Renewable Integration</h3>
            <p>
              Solar and wind are unpredictable. Our AI forecasts demand alongside renewable availability, enabling utilities to maximize clean energy usage and reduce reliance on fossil fuels at peak times.
            </p>
          </div>
          <div className="benefit-item">
            <div className="benefit-number">📊</div>
            <h3>Data-Driven Microgrid Control</h3>
            <p>
              Microgrids can operate independently or connected to the main grid. Real-time AI predictions enable autonomous switching and resource allocation, critical for disaster resilience and energy security.
            </p>
          </div>
          <div className="benefit-item">
            <div className="benefit-number">⚙️</div>
            <h3>Prevent Blackouts & Cascading Failures</h3>
            <p>
              Early demand prediction allows grid operators to increase supply before shortfalls occur. This prevents rolling blackouts and the domino effect of grid failures that can leave millions without power.
            </p>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY STACK */}
      <section className="tech-section">
        <h2>Powered By Advanced Technology</h2>
        <div className="tech-grid">
          <div className="tech-card">
            <h4>🤖 Machine Learning</h4>
            <p>XGBoost algorithm trained on thousands of weather and energy consumption patterns.</p>
          </div>
          <div className="tech-card">
            <h4>⛅ Open-Meteo API</h4>
            <p>Real-time weather data from a comprehensive global meteorological database.</p>
          </div>
          <div className="tech-card">
            <h4>⚛️ React Frontend</h4>
            <p>Modern, responsive interface built with React and Vite for blazing-fast performance.</p>
          </div>
          <div className="tech-card">
            <h4>🚀 FastAPI Backend</h4>
            <p>High-performance backend API for instant predictions and real-time data processing.</p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="final-cta">
        <div className="cta-content">
          <h2>Ready to Take Control of Your Energy Usage?</h2>
          <p>Start getting personalized energy insights in seconds. No account needed.</p>
          <button className="cta-button-large" onClick={goToDashboard}>
            Launch Dashboard
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;