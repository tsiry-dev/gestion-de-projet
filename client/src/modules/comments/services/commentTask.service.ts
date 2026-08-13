import commentTaskApi from "../api/commentTaskApi";
import type { CommenTaskDTO } from "../dto/commentTaskDTO";

async function commentTaskService (data: CommenTaskDTO) {
  return await commentTaskApi(data);
}

export default commentTaskService;