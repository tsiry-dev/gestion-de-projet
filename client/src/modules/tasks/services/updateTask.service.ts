import { updateTaskApi } from "../api/updateTaskApi";
import type { UpdateTaskDTO } from "../type";

export const updateTaskServive = async(data: UpdateTaskDTO): Promise<any> => {
   await updateTaskApi(data);
}