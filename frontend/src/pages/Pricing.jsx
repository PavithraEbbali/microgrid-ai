import { useNavigate } from "react-router-dom";
import "../styles/Pricing.css";

function Pricing() {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Essentials",
      price: "Free",
      description: "Perfect for learning and individual users",
      icon: "⚡",
      features: [
        "Real-time energy predictions",
        "Location-based weather data",
        "24-hour forecast",
        "Peak demand detection",
        "Basic recommendations",
        "Updated every 5 minutes"
      ],
      cta: "Get Started",
      popular: false,
      color: "blue"
    },
    {
      name: "Professional",
      price: "$9",
      period: "/month",
      description: "For small communities and households",
      icon: "📊",
      features: [
        "Everything in Essentials",
        "7-day advanced forecast",
        "Historical data analysis",
        "Custom time alerts",
        "Energy usage optimization",
        "Export reports (CSV/PDF)",
        "Priority support",
        "Offline access"
      ],
      cta: "Coming Soon",
      popular: true,
      color: "green"
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For utilities and large-scale operations",
      icon: "🏢",
      features: [
        "Everything in Professional",
        "30-day forecasting",
        "Multi-location management",
        "API access",
        "Batch processing",
        "Custom ML model training",
        "Dedicated support",
        "SLA guarantee",
        "White-label options"
      ],
      cta: "Contact Sales",
      popular: false,
      color: "purple"
    }
  ];

  return (
    <div className="pricing-container">
      {/* HERO SECTION */}
      <section className="pricing-hero">
        <h1>Simple, Transparent Pricing</h1>
        <p>
          Choose the perfect plan for your energy intelligence needs. No hidden fees, no surprises.
        </p>
      </section>

      {/* PRICING CARDS */}
      <section className="pricing-section">
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card ${plan.popular ? "popular" : ""} ${plan.color}`}
            >
              {plan.popular && (
                <div className="popular-badge">
                  🏆 Most Popular
                </div>
              )}
              
              <div className="plan-header">
                <div className="plan-icon">{plan.icon}</div>
                <h3>{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
                <div className="plan-price">
                  <span className="price">{plan.price}</span>
                  {plan.period && <span className="period">{plan.period}</span>}
                </div>
              </div>

              <ul className="features-list">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="checkmark">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`cta-button ${plan.color}`}
                onClick={() => plan.name === "Essentials" && navigate("/dashboard")}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h4>Can I upgrade anytime?</h4>
            <p>Yes! Upgrade at any time and only pay for the remainder of your billing cycle proportionally.</p>
          </div>
          <div className="faq-item">
            <h4>Do you offer refunds?</h4>
            <p>We offer a 14-day money-back guarantee if you're not satisfied with your plan.</p>
          </div>
          <div className="faq-item">
            <h4>What payment methods do you accept?</h4>
            <p>We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.</p>
          </div>
          <div className="faq-item">
            <h4>Is there a free trial?</h4>
            <p>Yes! Start with our free Essentials plan with full access to core features.</p>
          </div>
          <div className="faq-item">
            <h4>Can I cancel anytime?</h4>
            <p>Absolutely. No long-term contracts. Cancel your subscription anytime with one click.</p>
          </div>
          <div className="faq-item">
            <h4>Do you offer discounts for annual plans?</h4>
            <p>Coming soon! Annual subscriptions will receive a 20% discount compared to monthly pricing.</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="pricing-cta">
        <h2>Ready to optimize your energy management?</h2>
        <p>Start with our free plan today. No credit card required.</p>
        <button className="primary-cta" onClick={() => navigate("/dashboard")}>
          Launch Dashboard
        </button>
      </section>
    </div>
  );
}

export default Pricing;
