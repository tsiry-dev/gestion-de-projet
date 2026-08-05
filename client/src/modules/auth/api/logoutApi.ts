import { ENDPOINTS } from "@/core/api/endpoint";
import publicApi from "@/core/api/publicHttpClient";

async function logoutApi() {
  await publicApi.post(ENDPOINTS.AUTH.LOGOUT);
}

export default logoutApi;