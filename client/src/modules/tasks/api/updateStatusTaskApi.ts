import api from "@/core/api/httpClient";
import type { UpdateTaskStatusDTO } from "../type";
import { ENDPOINTS } from "@/core/api/endpoint";


export const updateStatusTaskApi = async(data: UpdateTaskStatusDTO): Promise<any> => {
    await api.put(ENDPOINTS.TASKS.UPDATESTATUS, data)
}