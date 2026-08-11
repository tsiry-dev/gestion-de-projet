import axios from "axios";

import type { AxiosInstance } from "axios";
import { ENV } from "../../app/config/env";
import { store } from "@/app/store/store";





/**
 * 🌐 AXIOS INSTANCE
 */
const privateApi: AxiosInstance = axios.create({
  baseURL: ENV.API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

privateApi.interceptors.request.use((config) => {

  
  
  const token = store.getState().session.token;

  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// privateApi.interceptors.response.use(
//     (response) => response,

//     (error) => {

//         if(error.response?.status === 401){

//             notify.error(
//                 "Votre session a expiré, vous n'êtes plus autorisé à effectuer cette action. Veuillez vous reconnecter."
//             );

//             // optionnel :
//             // store.dispatch(handleLogoutStore());
//         }


//         return Promise.reject(error);
//     }
// );


/**
 * 📥 RESPONSE INTERCEPTOR
 * (optionnel)
 */
privateApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);


export default privateApi;