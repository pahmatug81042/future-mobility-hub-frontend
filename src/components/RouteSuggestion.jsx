import React, { useState } from "react";
import axios from "axios";
import TrafficMap from "./TrafficMap";

const RouteSuggestion = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRouteData(null);

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/trips/optimal-route`,
        {
          params: { origin, destination },
          withCredentials: true,
        }
      );

      setRouteData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching route");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="route-suggestion-container">
      <h2>Route Suggestion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Origin:</label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Destination:</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Calculating..." : "Get Optimal Route"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {routeData && (
        <div className="route-result">
          <h3>Predicted Route</h3>
          <p>
            Origin Traffic: {routeData.predictedTraffic.origin.level} (
            {routeData.predictedTraffic.origin.score})
          </p>
          <p>
            Destination Traffic: {routeData.predictedTraffic.destination.level}{" "}
            ({routeData.predictedTraffic.destination.score})
          </p>
          <p>Available Vehicles: {routeData.availableVehicles}</p>

          <TrafficMap
            trips={[
              {
                _id: "suggested-route",
                route: routeData.route,
              },
            ]}
            vehicles={[]}
          />
        </div>
      )}
    </div>
  );
};

export default RouteSuggestion;