import axios from "axios";
import * as SecureStore from "expo-secure-store";
// const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
const BASE_URL = "https://api.freeapi.app/api/v1";
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("auth_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync("auth_token");
    }
    if (error.code === "ECONNABORTED") {
    }
    return Promise.reject(error);
  },
);
export default api;
