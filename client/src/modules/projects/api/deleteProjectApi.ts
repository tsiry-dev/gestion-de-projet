import { ENDPOINTS } from "@/core/api/endpoint"
import api from "@/core/api/httpClient"

export const deleteProjectApi = async(id: string): Promise<any>  => {
    await api.delete(ENDPOINTS.PROJECT.DELETE(id));
}