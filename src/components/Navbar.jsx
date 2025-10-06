import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { logoutUser } from "../services/authService";
import ThemeToggleButton from "./ThemeToggleButton"; // Import the toggle button

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout(); // Clear auth context
      navigate("/login");
    } catch (err) {
      console.error(
        "Logout failed:",
        err.response?.data?.message || err.message
      );
    }
  };

  return (
    <nav className="navbar">
      <h1>Future Mobility Hub</h1>

      {/* Navigation Links */}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        {user ? (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>

            {user.isAdmin && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}

            <li>
              <Link to="/route-suggestion">Routes</Link>
            </li>

            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}

        {/* Theme Toggle */}
        <li>
          <ThemeToggleButton />
        </li>
      </ul>
    </nav>
  );
};