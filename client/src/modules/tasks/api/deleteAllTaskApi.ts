import { ENDPOINTS } from "@/core/api/endpoint";
import privateApi from "@/core/api/privateHttpClient";

export const deleteAllTaskApi = async(ids: string[]): Promise<any> => {
    await privateApi.delete(ENDPOINTS.TASKS.DELETEALL, {
        data: {
            ids
        }
    });
}