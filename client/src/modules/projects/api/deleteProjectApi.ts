import { ENDPOINTS } from "@/core/api/endpoint"
import privateApi from "@/core/api/privateHttpClient";

export const deleteProjectApi = async(id: string): Promise<any>  => {
    await privateApi.delete(ENDPOINTS.PROJECT.DELETE(id));
}