import { deleteTaskApi } from "../api/deleteTaskApi"

export const deleteTaskServie = async(id: string): Promise<any> => {
   await deleteTaskApi(id);
}