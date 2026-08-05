import { ENDPOINTS } from "@/core/api/endpoint"
import privateApi from "@/core/api/privateHttpClient";

export const deleteAllProjectApi = async(ids: string[]): Promise<any>  => {
    await privateApi.delete(ENDPOINTS.PROJECT.DELETEALL, {
       data: {
          ids
       }
    });
}

export default deleteAllProjectApi;