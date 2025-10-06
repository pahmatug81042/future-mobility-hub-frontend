import React, { useState } from "react";
import axiosInstance from "../utils/api";

export default function TripForm({ onTripCreated }) {
  const [form, setForm] = useState({
    origin: "",
    destination: "",
    mode: "car",
    scheduledTime: "",
    notes: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/trips", form);
      onTripCreated(data.trip);
      setForm({
        origin: "",
        destination: "",
        mode: "car",
        scheduledTime: "",
        notes: "",
      });
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="trip-form">
      <input
        name="origin"
        value={form.origin}
        onChange={handleChange}
        placeholder="Origin"
        required
      />
      <input
        name="destination"
        value={form.destination}
        onChange={handleChange}
        placeholder="Destination"
        required
      />
      <input
        type="datetime-local"
        name="scheduledTime"
        value={form.scheduledTime}
        onChange={handleChange}
        required
      />
      <select name="mode" value={form.mode} onChange={handleChange}>
        <option value="car">Car</option>
        <option value="bike">Bike</option>
        <option value="walk">Walk</option>
      </select>
      <input
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder="Notes (optional)"
      />
      <button type="submit">Create Trip</button>
    </form>
  );
};