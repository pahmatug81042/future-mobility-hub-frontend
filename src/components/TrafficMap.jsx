import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import io from "socket.io-client";

// Fix default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const socket = io(import.meta.env.VITE_BACKEND_URL);

const TrafficMap = ({ trips, vehicles }) => {
  const [mapCenter, setMapCenter] = useState([37.7749, -122.4194]); // Default center
  const [trafficData, setTrafficData] = useState([]);
  const [vehiclePositions, setVehiclePositions] = useState(vehicles);

  // Update vehicle positions in real-time
  useEffect(() => {
    socket.on("vehiclePositionUpdated", (vehicleUpdate) => {
      setVehiclePositions((prev) =>
        prev.map((v) => (v._id === vehicleUpdate._id ? vehicleUpdate : v))
      );
    });

    socket.on("trafficUpdated", (trafficUpdate) => {
      setTrafficData((prev) => {
        const filtered = prev.filter(
          (t) => t.location !== trafficUpdate.location
        );
        return [...filtered, trafficUpdate];
      });
    });

    return () => {
      socket.off("vehiclePositionUpdated");
      socket.off("trafficUpdated");
    };
  }, []);

  // Center map on first trip or first vehicle
  useEffect(() => {
    if (trips.length > 0) {
      const firstTrip = trips[0];
      if (firstTrip.route?.start_location) {
        setMapCenter([
          firstTrip.route.start_location.lat,
          firstTrip.route.start_location.lng,
        ]);
      }
    } else if (vehicles.length > 0) {
      const firstVehicle = vehicles[0];
      setMapCenter([firstVehicle.location.lat, firstVehicle.location.lng]);
    }
  }, [trips, vehicles]);

  return (
    <MapContainer
      center={mapCenter}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {/* Render trip routes */}
      {trips.map((trip) => {
        if (!trip.route?.path) return null;
        const positions = trip.route.path.map((p) => [p.lat, p.lng]);
        return <Polyline key={trip._id} positions={positions} color="blue" />;
      })}

      {/* Render traffic markers */}
      {trafficData.map((traffic, idx) => (
        <Marker
          key={idx}
          position={[
            traffic.locationLat || mapCenter[0],
            traffic.locationLng || mapCenter[1],
          ]}
        >
          <Popup>
            Traffic Level: {traffic.prediction?.level || "N/A"} <br />
            Score: {traffic.prediction?.score || "N/A"}
          </Popup>
        </Marker>
      ))}

      {/* Render vehicle markers */}
      {vehiclePositions.map((vehicle) => (
        <Marker
          key={vehicle._id}
          position={[vehicle.location.lat, vehicle.location.lng]}
        >
          <Popup>
            {vehicle.name} <br />
            Status: {vehicle.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default TrafficMap;