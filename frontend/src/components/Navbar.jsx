import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">⚡</span>
          <span className="logo-text">MicroGrid AI</span>
        </Link>

        {/* Hamburger Icon */}
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></span>
        </button>

        {/* Desktop Menu */}
        <div className="navbar-menu">
          <Link to="/" className="nav-link" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/dashboard" className="nav-link" onClick={closeMenu}>
            Dashboard
          </Link>
          <Link to="/pricing" className="nav-link" onClick={closeMenu}>
            Pricing
          </Link>
          <Link to="/about" className="nav-link" onClick={closeMenu}>
            About
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
          <Link to="/" className="mobile-nav-link" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/dashboard" className="mobile-nav-link" onClick={closeMenu}>
            Dashboard
          </Link>
          <Link to="/pricing" className="mobile-nav-link" onClick={closeMenu}>
            Pricing
          </Link>
          <Link to="/about" className="mobile-nav-link" onClick={closeMenu}>
            About
          </Link>
        </div>

        <div className="navbar-info">
          <span className="status-badge">🟢 Online</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;