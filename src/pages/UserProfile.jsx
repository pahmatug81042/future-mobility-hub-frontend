import React, { useEffect, useState } from "react";
import { fetchUserById, updateUserProfile } from "../services/userService";
import { useAuth } from "../contexts/AuthContext";

export default function UserProfile() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await fetchUserById(user._id);
        setFormData({ name: data.name, email: data.email });
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) loadProfile();
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await updateUserProfile(formData);
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      setMessage("Failed to update profile. Try again.");
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      <h2>My Profile</h2>
      {message && <p className="status-message">{message}</p>}
      <form onSubmit={handleSubmit} className="profile-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="update-btn">
          Update Profile
        </button>
      </form>
    </div>
  );
};