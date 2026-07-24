import axios from "axios";

import type { AxiosInstance } from "axios";
import { ENV } from "../../app/config/env";


/**
 * 🌐 AXIOS INSTANCE
 */
const api: AxiosInstance = axios.create({
  baseURL: ENV.API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 📤 REQUEST INTERCEPTOR
 * (optionnel)
 */
api.interceptors.request.use((config) => {
  return config;
});

/**
 * 📥 RESPONSE INTERCEPTOR
 * (optionnel)
 */
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;