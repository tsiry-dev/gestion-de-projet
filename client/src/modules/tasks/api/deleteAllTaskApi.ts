import { ENDPOINTS } from "@/core/api/endpoint";
import api from "@/core/api/httpClient"

export const deleteAllTaskApi = async(ids: string[]): Promise<any> => {
    await api.delete(ENDPOINTS.TASKS.DELETEALL, {
        data: {
            ids
        }
    });
}