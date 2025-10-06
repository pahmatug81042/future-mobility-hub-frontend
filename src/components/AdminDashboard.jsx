import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [weeklyTrends, setWeeklyTrends] = useState([]);
  const [monthlyTrends, setMonthlyTrends] = useState([]);
  const [vehicleHeatmap, setVehicleHeatmap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const statsRes = await axiosInstance.get("/admin/dashboard");
      setStats(statsRes.data.stats || {});

      const weeklyRes = await axiosInstance.get(
        "/admin/analytics/weekly-trends"
      );
      setWeeklyTrends(weeklyRes.data.trends || []);

      const monthlyRes = await axiosInstance.get(
        "/admin/analytics/monthly-trends"
      );
      setMonthlyTrends(monthlyRes.data.trends || []);

      const heatmapRes = await axiosInstance.get(
        "/admin/analytics/vehicle-heatmap"
      );
      setVehicleHeatmap(heatmapRes.data.heatmap || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load admin dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  if (loading) return <p>Loading admin dashboard...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="admin-dashboard-page">
      <h2>Admin Dashboard</h2>

      <section className="stats-section">
        <h3>Key Stats</h3>
        <ul>
          <li>Total Trips: {stats.totalTrips || 0}</li>
          <li>Active Vehicles: {stats.activeVehicles || 0}</li>
        </ul>
      </section>

      <section className="trends-section">
        <h3>Weekly Trip Trends</h3>
        <ul>
          {weeklyTrends.map((trend) => (
            <li key={trend._id}>
              {trend._id}: {trend.trips} trips
            </li>
          ))}
        </ul>

        <h3>Monthly Trip Trends</h3>
        <ul>
          {monthlyTrends.map((trend) => (
            <li key={trend._id}>
              {trend._id}: {trend.trips} trips
            </li>
          ))}
        </ul>
      </section>

      <section className="heatmap-section">
        <h3>Vehicle Usage Heatmap</h3>
        <ul>
          {vehicleHeatmap.map((v) => (
            <li key={v._id}>
              {v._id}: {v.count} vehicles
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};