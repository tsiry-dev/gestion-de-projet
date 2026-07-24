import { ENDPOINTS } from "@/core/api/endpoint"
import api from "@/core/api/httpClient"
import type { CreateProjectDTO } from "../schema/create-project.schema"

export const createProjectApi = async(data: CreateProjectDTO): Promise<any>  => {
    const response = await api.post(ENDPOINTS.PROJECT.CREATE, data);

    return response.data;
}