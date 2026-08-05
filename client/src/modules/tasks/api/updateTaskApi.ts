import privateApi from "@/core/api/privateHttpClient";
import type { UpdateTaskDTO } from "../type";
import { ENDPOINTS } from "@/core/api/endpoint";

export const updateTaskApi = async(data: UpdateTaskDTO): Promise<void> => {
    await privateApi.patch(ENDPOINTS.TASKS.UPDATE, data);
}  