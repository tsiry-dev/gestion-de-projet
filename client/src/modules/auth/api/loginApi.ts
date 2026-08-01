import { ENDPOINTS } from "@/core/api/endpoint";
import api from "@/core/api/httpClient";

export default function loginApi() {
    const response = api.post(ENDPOINTS.AUTH.LOGIN);
}