import { useState, useEffect } from "react";
import "../styles/OnboardingTutorial.css";

function OnboardingTutorial({ onClose }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "🎯 Welcome to Autonomous Microgrid Manager",
      description: "This platform provides real-time AI-powered energy intelligence for your location. Let's take a quick tour!",
      icon: "⚡"
    },
    {
      title: "📍 Your Location Matters",
      description: "We use your location to fetch real-time weather data and provide hyper-localized energy predictions. Your data stays private.",
      icon: "🗺️"
    },
    {
      title: "📊 Smart Energy Cards",
      description: "Each card shows critical metrics: Predicted Energy Demand, Solar Potential, Peak Hours, and Efficiency Score. These update every 60 seconds.",
      icon: "📈"
    },
    {
      title: "⚙️ Smart Recommendations",
      description: "We provide actionable recommendations to optimize your energy usage, reduce costs, and support grid stability. Scroll down to see them!",
      icon: "💡"
    },
    {
      title: "🚀 You're Ready!",
      description: "Start by allowing location access. The dashboard will load your local energy data instantly. Questions? Check the About page.",
      icon: "✨"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const completeOnboarding = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    onClose();
  };

  const step = steps[currentStep];

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-modal">
        <button className="close-btn" onClick={handleSkip}>✕</button>
        
        <div className="step-indicator">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`dot ${idx === currentStep ? "active" : ""} ${
                idx < currentStep ? "completed" : ""
              }`}
            ></div>
          ))}
        </div>

        <div className="onboarding-content">
          <div className="icon-container">{step.icon}</div>
          <h2>{step.title}</h2>
          <p>{step.description}</p>
        </div>

        <div className="button-group">
          {currentStep < steps.length - 1 && (
            <button className="skip-btn" onClick={handleSkip}>
              Skip Tour
            </button>
          )}
          <button
            className="next-btn"
            onClick={handleNext}
          >
            {currentStep === steps.length - 1 ? "Get Started" : "Next"}
          </button>
        </div>

        <p className="step-counter">
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>
    </div>
  );
}

export default OnboardingTutorial;
