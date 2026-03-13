import "../styles/LocationPermissionModal.css";

function LocationPermissionModal({ onRetry, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="location-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-icon">📍</div>
        
        <h2>Enable Location Access</h2>
        
        <p className="modal-description">
          MicroGrid AI needs your location to provide accurate energy predictions and real-time insights tailored to your area.
        </p>
        
        <div className="permission-benefits">
          <div className="benefit-item">
            <span className="benefit-icon">✓</span>
            <span>Get precise energy forecasts for your location</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">✓</span>
            <span>Real-time weather-based recommendations</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">✓</span>
            <span>Personalized cost savings analysis</span>
          </div>
        </div>
        
        <div className="modal-actions">
          <button className="btn-enable" onClick={onRetry}>
            <span>📍</span> Enable Location
          </button>
          <button className="btn-cancel" onClick={onClose}>
            Skip for Now
          </button>
        </div>
        
        <p className="modal-note">
          Your location is only used to fetch weather data and is never stored or shared.
        </p>
      </div>
    </div>
  );
}

export default LocationPermissionModal;
