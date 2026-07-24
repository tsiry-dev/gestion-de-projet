import { taskCreateApi } from "../api/taskCreateApi"
import type { TaskCreateDTO } from "../schema/task-create.schema";

export const taskCreateService = async(data: TaskCreateDTO) => {
    return await taskCreateApi(data);
}