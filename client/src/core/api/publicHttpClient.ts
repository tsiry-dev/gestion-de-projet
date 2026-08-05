import axios from "axios";

import type { AxiosInstance } from "axios";
import { ENV } from "../../app/config/env";

/**
 * 🌐 AXIOS INSTANCE
 */
const publicApi: AxiosInstance = axios.create({
  baseURL: ENV.API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 📥 RESPONSE INTERCEPTOR
 * (optionnel)
 */
publicApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);


export default publicApi;