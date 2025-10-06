import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/api";

export default function TripList() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const { data } = await axiosInstance.get("/trips");
        setTrips(data.trips);
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
      }
    };
    fetchTrips();
  }, []);

  return (
    <div className="trip-list">
      {trips.length ? (
        trips.map((trip) => (
          <div key={trip._id} className="trip-card">
            <p>
              <strong>Origin:</strong> {trip.origin}
            </p>
            <p>
              <strong>Destination:</strong> {trip.destination}
            </p>
            <p>
              <strong>Mode:</strong> {trip.mode}
            </p>
            <p>
              <strong>Scheduled:</strong>{" "}
              {new Date(trip.scheduledTime).toLocaleString()}
            </p>
            <p>
              <strong>Predicted Traffic:</strong>{" "}
              {trip.predictedTraffic?.level || "N/A"}
            </p>
          </div>
        ))
      ) : (
        <p>No trips found</p>
      )}
    </div>
  );
};