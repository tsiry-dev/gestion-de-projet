import { ENDPOINTS } from "@/core/api/endpoint"
import type { Project } from "../type";
import privateApi from "@/core/api/privateHttpClient";

type ProjectResponse = {
    projects: Project[]
} 

const getAllProjectsApi = async (): Promise<ProjectResponse> => {
    const response = await privateApi.get(ENDPOINTS.PROJECT.FINDALL);
    return response.data;
}

export default getAllProjectsApi;