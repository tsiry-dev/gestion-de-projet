import { ENDPOINTS } from "@/core/api/endpoint";
import type { LoginDTO } from "../dto/login.dto";
import publicApi from "@/core/api/publicHttpClient";

export default async function loginApi(data: LoginDTO): Promise<any> {
   const response = await publicApi.post(ENDPOINTS.AUTH.LOGIN, data);

   return response;
}