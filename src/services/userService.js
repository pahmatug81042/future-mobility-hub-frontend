import axiosInstance from "../utils/api";

// Fetch all users (admin only)
export const fetchAllUsers = async () =>
    axiosInstance.get("/users", { withCredentials: true });

// Fetch a specific user by ID
export const fetchUserById = async (userId) =>
    axiosInstance.get(`/users/${userId}`, { withCredentials: true });

// Update profile info for logged-in user
export const updateUserProfile = async (updatedData) =>
    axiosInstance.put("/users/me", updatedData, { withCredentials: true });

// Delete user account (admin or self)
export const deleteUserAccount = async (userId) =>
    axiosInstance.delete(`/users/${userId}`, { withCredentials: true });
