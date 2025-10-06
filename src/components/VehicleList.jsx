import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/api";

export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/vehicles");
        setVehicles(res.data.vehicles || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load vehicles");
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  if (loading) return <p>Loading vehicles...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="vehicle-list">
      <h2>Vehicles</h2>
      {vehicles.length === 0 ? (
        <p>No vehicles found</p>
      ) : (
        <ul>
          {vehicles.map((v) => (
            <li key={v._id}>
              {v.name} - {v.status} (Lat: {v.location.lat}, Lng:{" "}
              {v.location.lng})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};