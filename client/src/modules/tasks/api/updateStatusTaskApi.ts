import privateApi from "@/core/api/privateHttpClient";
import type { UpdateTaskStatusDTO } from "../type";
import { ENDPOINTS } from "@/core/api/endpoint";


export const updateStatusTaskApi = async(data: UpdateTaskStatusDTO): Promise<any> => {
    await privateApi.put(ENDPOINTS.TASKS.UPDATESTATUS, data)
}