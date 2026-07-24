import { ENDPOINTS } from "@/core/api/endpoint";
import api from "@/core/api/httpClient"

export const deleteTaskApi = async(id: string): Promise<any> => {
    await api.delete(ENDPOINTS.TASKS.DELETE(id));
}