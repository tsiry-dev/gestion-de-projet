import { ENDPOINTS } from "@/core/api/endpoint"
import api from "@/core/api/httpClient"
import type { ProjectCountResponse } from "@modules/dashboard/type";

export const projectCountApi = async() => {
    return api.get<ProjectCountResponse>(ENDPOINTS.PROJECT.COUNT);
}