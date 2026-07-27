import api from "@/core/api/httpClient";
import type { UpdateTaskDTO } from "../type";
import { ENDPOINTS } from "@/core/api/endpoint";

export const updateTaskApi = async(data: UpdateTaskDTO): Promise<void> => {
    await api.patch(ENDPOINTS.TASKS.UPDATE, data);
}  