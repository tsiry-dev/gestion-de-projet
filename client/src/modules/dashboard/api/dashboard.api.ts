import { ENDPOINTS } from "@/core/api/endpoint"
import privateApi from "@/core/api/privateHttpClient";
import type { ProjectCountResponse } from "@modules/dashboard/type";

export const projectCountApi = async() => {
    return privateApi.get<ProjectCountResponse>(ENDPOINTS.PROJECT.COUNT);
}