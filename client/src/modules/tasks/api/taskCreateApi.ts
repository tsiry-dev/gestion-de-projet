import { ENDPOINTS } from "@/core/api/endpoint";
import api from "@/core/api/httpClient"
import type { TaskCreateDTO } from "../schema/task-create.schema";

export const taskCreateApi = async(data: TaskCreateDTO) => {
    const response = await api.post(ENDPOINTS.TASKS.CREATE, data);

    return response.data;
}