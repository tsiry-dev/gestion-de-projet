import { ENDPOINTS } from "@/core/api/endpoint";
import privateApi from "@/core/api/privateHttpClient";

export const deleteTaskApi = async(id: string): Promise<any> => {
    await privateApi.delete(ENDPOINTS.TASKS.DELETE(id));
}