import "../styles/About.css";

function About() {
  return (
    <div className="about-container">
      {/* HEADER */}
      <div className="about-header">
        <h1>About MicroGrid AI</h1>
        <p>Empowering smarter energy decisions through artificial intelligence</p>
      </div>

      {/* MISSION SECTION */}
      <section className="section">
        <div className="section-content">
          <div className="text-column">
            <h2>Our Mission</h2>
            <p>
              MicroGrid AI is dedicated to revolutionizing how people understand and manage their electricity consumption. By combining advanced machine learning with real-time weather data, we empower users to make informed decisions about when to use electricity-intensive appliances, reduce energy bills, and contribute to a more sustainable grid.
            </p>
            <p>
              Every day, millions of people make decisions about energy usage without understanding the underlying factors that drive electricity demand. Our platform changes that by providing immediate, actionable insights based on science and machine learning.
            </p>
          </div>
          <div className="icon-column">
            <div className="large-icon">🌍</div>
            <div className="icon-description">Global Energy Intelligence</div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="section alternate-bg">
        <div className="section-content">
          <div className="text-column">
            <h2>How Our AI Works</h2>
            <p>
              Our system uses an advanced XGBoost machine learning model trained on thousands of historical weather and energy consumption patterns. The model learns how different weather conditions affect electricity demand at different times of day.
            </p>
            <div className="process-steps">
              <div className="process-step">
                <span className="step-number">1</span>
                <span className="step-text">Collect real-time weather data from Open-Meteo API</span>
              </div>
              <div className="process-step">
                <span className="step-number">2</span>
                <span className="step-text">Factor in time-of-day and day-of-week patterns</span>
              </div>
              <div className="process-step">
                <span className="step-number">3</span>
                <span className="step-text">Run ML prediction to forecast electricity demand</span>
              </div>
              <div className="process-step">
                <span className="step-number">4</span>
                <span className="step-text">Generate personalized energy recommendations</span>
              </div>
            </div>
          </div>
          <div className="icon-column">
            <div className="large-icon">🤖</div>
            <div className="icon-description">Machine Learning Powered</div>
          </div>
        </div>
      </section>

      {/* KEY FEATURES */}
      <section className="section">
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Key Features</h2>
        <div className="features-showcase">
          <div className="feature-showcase-item">
            <div className="feature-icon">⚡</div>
            <h3>Real-Time Predictions</h3>
            <p>
              Get updated electricity demand predictions every 10 minutes with 99.2% accuracy. Our model continuously learns from current weather patterns.
            </p>
          </div>
          <div className="feature-showcase-item">
            <div className="feature-icon">☀️</div>
            <h3>Solar Potential Analysis</h3>
            <p>
              Understand when solar energy generation will be most productive based on cloud cover and weather conditions throughout the day.
            </p>
          </div>
          <div className="feature-showcase-item">
            <div className="feature-icon">📊</div>
            <h3>Peak Hour Detection</h3>
            <p>
              Identify peak electricity demand periods and plan your usage accordingly. Avoid peak hours to save money and reduce grid strain.
            </p>
          </div>
          <div className="feature-showcase-item">
            <div className="feature-icon">💡</div>
            <h3>Smart Recommendations</h3>
            <p>
              Receive personalized, actionable advice on when to use heavy appliances, when to rely on renewable energy, and how to optimize costs.
            </p>
          </div>
          <div className="feature-showcase-item">
            <div className="feature-icon">🌐</div>
            <h3>Global Coverage</h3>
            <p>
              Works anywhere in the world with access to live weather data. Our platform scales across all regions and climates.
            </p>
          </div>
          <div className="feature-showcase-item">
            <div className="feature-icon">🔒</div>
            <h3>Privacy First</h3>
            <p>
              Your location is only used to fetch weather data. No account required, no personal data stored, no tracking.
            </p>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY STACK */}
      <section className="section alternate-bg">
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Powered By Advanced Technology</h2>
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

      {/* BENEFITS SECTION */}
      <section className="section">
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Why Choose MicroGrid AI?</h2>
        <div className="benefits-comparison">
          <div className="benefit-box">
            <h3>💰 Save Money</h3>
            <p>
              By shifting your heavy appliance usage to off-peak hours, you can save 15-30% on your monthly electricity bill.
            </p>
          </div>
          <div className="benefit-box">
            <h3>🌱 Help the Environment</h3>
            <p>
              Reduce your carbon footprint by consuming energy when renewable sources are most available and avoiding peak grid stress.
            </p>
          </div>
          <div className="benefit-box">
            <h3>⚡ Understand Your Usage</h3>
            <p>
              Get actionable insights into how weather affects your electricity consumption and make smarter decisions daily.
            </p>
          </div>
          <div className="benefit-box">
            <h3>🤝 Support Grid Stability</h3>
            <p>
              When many users follow smart energy recommendations, it helps stabilize the electrical grid and prevents blackouts.
            </p>
          </div>
        </div>
      </section>

      {/* EDUCATIONAL SECTION */}
      <section className="section alternate-bg">
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Understanding Energy Demand</h2>
        <div className="education-grid">
          <div className="education-card">
            <h3>🌡️ Temperature</h3>
            <p>
              Hotter days increase cooling demand via air conditioners. Colder days increase heating needs. Temperature is a major factor in electricity demand prediction.
            </p>
          </div>
          <div className="education-card">
            <h3>☀️ Cloud Cover</h3>
            <p>
              Cloud cover indicates solar potential. Low cloud cover means excellent conditions for solar energy generation and can reduce daytime demand.
            </p>
          </div>
          <div className="education-card">
            <h3>💧 Humidity</h3>
            <p>
              High humidity increases cooling demand as air conditioners must work harder to remove moisture. It's an important second-order predictor.
            </p>
          </div>
          <div className="education-card">
            <h3>💨 Wind Speed</h3>
            <p>
              Wind patterns affect both demand and renewable generation. It also influences how effectively cooling systems operate and evaporative cooling potential.
            </p>
          </div>
          <div className="education-card">
            <h3>⏰ Time of Day</h3>
            <p>
              Electricity demand follows clear daily patterns. Morning and evening peaks occur when people are most active, while night hours show lower demand.
            </p>
          </div>
          <div className="education-card">
            <h3>📅 Day of Week</h3>
            <p>
              Weekdays typically show different demand patterns than weekends due to work schedules, commercial activity, and varying routines.
            </p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta-section">
        <h2>Ready to Optimize Your Energy Usage?</h2>
        <p>Start making smarter energy decisions powered by AI and real-time weather data.</p>
        <a href="/dashboard" className="cta-button-about">
          Go to Dashboard
        </a>
      </section>
    </div>
  );
}

export default About;