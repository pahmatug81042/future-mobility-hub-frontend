import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">
      <header className="hero-section">
        <h1>Welcome to Future Mobility Hub</h1>
        <p>
          A next-generation platform integrating smart city data, predictive
          analytics, and mobility insights to enhance urban transportation.
        </p>
        <div className="cta-buttons">
          <Link to="/register" className="btn-primary">
            Get Started
          </Link>
          <Link to="/login" className="btn-secondary">
            Login
          </Link>
        </div>
      </header>

      <section className="features-section">
        <h2>Core Features</h2>
        <ul>
          <li>Vehicle management and trip tracking</li>
          <li>Predictive analytics for smart route planning</li>
          <li>Real-time traffic visualization with live data</li>
          <li>Secure authentication and role-based access</li>
        </ul>
      </section>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Future Mobility Hub. All rights reserved.
        </p>
      </footer>
    </div>
  );
};