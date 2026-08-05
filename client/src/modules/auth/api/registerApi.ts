import { ENDPOINTS } from "@/core/api/endpoint"
import type { RegisterDTO } from "../dto/register.dto";
import publicApi from "@/core/api/publicHttpClient";

export const registerApi = async(data: RegisterDTO): Promise<void> => {
   await publicApi.post(ENDPOINTS.AUTH.REGISTER, data);
}