import axios from "axios";

// Alamat backend diambil dari environment variable (lokal atau hasil deploy)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Otomatis menyertakan token JWT di setiap request jika sudah login
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
