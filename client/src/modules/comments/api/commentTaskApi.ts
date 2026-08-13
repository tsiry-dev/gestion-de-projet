import { ENDPOINTS } from "@/core/api/endpoint";
import privateApi from "@/core/api/privateHttpClient";
import type { CommenTaskDTO } from "../dto/commentTaskDTO";

async function commentTaskApi (data: CommenTaskDTO) {
  const response = await privateApi.post(ENDPOINTS.COMMENT.CREATE, data);
  return response.data;
}

export default commentTaskApi;