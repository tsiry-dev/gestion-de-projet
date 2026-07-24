import { updateStatusTaskApi } from "../api/updateStatusTaskApi";
import type { UpdateTaskStatusDTO } from "../type";

export const updateTaskStatusService = async(data: UpdateTaskStatusDTO): Promise<any> => {
    await updateStatusTaskApi(data);
}