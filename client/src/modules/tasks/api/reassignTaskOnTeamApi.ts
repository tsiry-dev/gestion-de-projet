import { ENDPOINTS } from "@/core/api/endpoint";
import privateApi from "@/core/api/privateHttpClient";
import type { reassignTaskOnTeamDTO } from "../task.dto";

async function reassignTaskOnTeamApi (data: reassignTaskOnTeamDTO) {
   const response = await privateApi.post(ENDPOINTS.TASKS.REASSIGN, data);
   return response.data;
}

export default reassignTaskOnTeamApi;