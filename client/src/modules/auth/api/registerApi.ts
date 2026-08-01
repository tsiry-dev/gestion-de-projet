import { ENDPOINTS } from "@/core/api/endpoint"
import api from "@/core/api/httpClient"
import type { RegisterDTO } from "../dto/register.dto";

export const registerApi = async(data: RegisterDTO): Promise<void> => {
   await api.post(ENDPOINTS.AUTH.REGISTER, data);
}