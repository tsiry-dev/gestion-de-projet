import { ENDPOINTS } from "@/core/api/endpoint"
import api from "@/core/api/httpClient"

export const deleteAllProjectApi = async(ids: string[]): Promise<any>  => {
    await api.delete(ENDPOINTS.PROJECT.DELETEALL, {
       data: {
          ids
       }
    });
}

export default deleteAllProjectApi;