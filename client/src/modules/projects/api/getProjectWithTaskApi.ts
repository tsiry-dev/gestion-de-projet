import { ENDPOINTS } from "@/core/api/endpoint";
import privateApi from "@/core/api/privateHttpClient";

const getProjectWithTasksApi = async (id: string): Promise<any> => {
    const response = await privateApi.get(ENDPOINTS.PROJECT.FINDWITHTASKS(id));
    return response.data;
}

export default getProjectWithTasksApi;