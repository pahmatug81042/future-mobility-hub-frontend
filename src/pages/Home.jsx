import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">
      <h1>Welcome to Future Mobility Hub</h1>
      <p>
        Future Mobility Hub is a smart mobility platform leveraging AI and
        real-time analytics to optimize transportation routes, vehicle
        utilization, and traffic management.
      </p>

      <section className="features">
        <h2>Features</h2>
        <ul>
          <li>Plan trips with predictive traffic analysis</li>
          <li>View real-time vehicle locations</li>
          <li>Admin analytics and usage trends</li>
          <li>Personalized and accessibility-aware routes</li>
        </ul>
      </section>

      <section className="quick-links">
        <Link to="/register">Get Started</Link> | <Link to="/login">Login</Link>
      </section>
    </div>
  );
};