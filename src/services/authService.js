import axiosInstance from "../utils/api";

export const loginUser = async (email, password) =>
    axiosInstance.post("/auth/login", { email, password }, { withCredentials: true });

export const registerUser = async (name, email, password) =>
    axiosInstance.post("/auth/register", { name, email, password });

export const logoutUser = async () =>
    axiosInstance.post("/auth/logout", {}, { withCredentials: true });

export const getCurrentUser = async () =>
    axiosInstance.get("/auth/me", { withCredentials: true });
