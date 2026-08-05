import { ENDPOINTS } from "@/core/api/endpoint";
import type { TaskCreateDTO } from "../schema/task-create.schema";
import privateApi from "@/core/api/privateHttpClient";

export const taskCreateApi = async(data: TaskCreateDTO) => {
    const response = await privateApi.post(ENDPOINTS.TASKS.CREATE, data);

    return response.data;
}