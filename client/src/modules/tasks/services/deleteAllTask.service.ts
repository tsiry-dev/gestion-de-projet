import { deleteAllTaskApi } from "../api/deleteAllTaskApi"

export const deleteAllTaskService = async(ids: string[]): Promise<any> => {
    return await deleteAllTaskApi(ids)
}