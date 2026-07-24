import { ENDPOINTS } from "@/core/api/endpoint"
import api from "@/core/api/httpClient"
import type { Project } from "../type";

type ProjectResponse = {
    projects: Project[]
} 

const getAllProjectsApi = async (): Promise<ProjectResponse> => {
    const response = await api.get(ENDPOINTS.PROJECT.FINDALL);
    return response.data;
}

export default getAllProjectsApi;