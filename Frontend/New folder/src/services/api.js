import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  validateToken: () => api.get("/auth/validate"),
  logout: () => localStorage.removeItem("token"),
};

export const restaurants = {
  create: (data) => api.post("/restaurants", data),
  getAll: () => api.get("/restaurants"),
  update: (id, data) => api.patch(`/restaurants/${id}`, data),
};

export const menu = {
  create: (data) => api.post("/menu", data),
  getByRestaurant: (id) => api.get(`/menu/restaurant/${id}`),
  update: (id, data) => api.patch(`/menu/${id}`, data),
};

export const orders = {
  create: (data) => api.post("/orders", data),
  getAll: () => api.get("/orders"),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
};