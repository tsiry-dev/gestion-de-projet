import { ENDPOINTS } from "@/core/api/endpoint"
import type { CreateProjectDTO } from "../schema/create-project.schema"
import privateApi from "@/core/api/privateHttpClient";

export const createProjectApi = async(data: CreateProjectDTO): Promise<any>  => {
    const response = await privateApi.post(ENDPOINTS.PROJECT.CREATE, data);

    return response.data;
}