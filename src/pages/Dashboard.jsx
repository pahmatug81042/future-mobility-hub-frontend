import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/api";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch user trips
      const tripsRes = await axiosInstance.get("/trips");
      setTrips(tripsRes.data.trips || []);

      // Fetch vehicle data
      const vehiclesRes = await axiosInstance.get("/vehicles");
      setVehicles(vehiclesRes.data.vehicles || []);

      // Fetch predictive analytics stats
      const statsRes = await axiosInstance.get("/admin/dashboard");
      setStats(statsRes.data.stats || {});
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="dashboard-page">
      <h2>Dashboard</h2>

      <section className="stats-section">
        <h3>Statistics</h3>
        <ul>
          <li>Total Trips: {stats.totalTrips || 0}</li>
          <li>Active Vehicles: {stats.activeVehicles || 0}</li>
          {stats.trafficPredictions && (
            <li>
              Traffic Predictions:{" "}
              {stats.trafficPredictions.map((t) => `${t.level}`).join(", ")}
            </li>
          )}
        </ul>
      </section>

      <section className="trips-section">
        <h3>Your Trips</h3>
        <ul>
          {trips.length === 0 ? (
            <li>No trips found</li>
          ) : (
            trips.map((trip) => (
              <li key={trip._id}>
                {trip.origin} → {trip.destination} ({trip.mode}) at{" "}
                {new Date(trip.scheduledTime).toLocaleString()}
              </li>
            ))
          )}
        </ul>
      </section>

      <section className="vehicles-section">
        <h3>Vehicles</h3>
        <ul>
          {vehicles.length === 0 ? (
            <li>No vehicles found</li>
          ) : (
            vehicles.map((vehicle) => (
              <li key={vehicle._id}>
                {vehicle.name} - {vehicle.status} ({vehicle.location})
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
};