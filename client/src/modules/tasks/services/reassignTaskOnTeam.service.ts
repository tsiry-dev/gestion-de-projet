import reassignTaskOnTeamApi from "../api/reassignTaskOnTeamApi";
import type { reassignTaskOnTeamDTO } from "../task.dto";

async function reassignTaskOnTeamServive (data: reassignTaskOnTeamDTO) {
    const response = await reassignTaskOnTeamApi(data);
    return response;
}

export default reassignTaskOnTeamServive;