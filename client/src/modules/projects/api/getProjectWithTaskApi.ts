import { ENDPOINTS } from "@/core/api/endpoint";
import api from "@/core/api/httpClient"

const getProjectWithTasksApi = async (id: string): Promise<any> => {
    const response = await api.get(ENDPOINTS.PROJECT.FINDWITHTASKS(id));
    return response.data;
}

export default getProjectWithTasksApi;