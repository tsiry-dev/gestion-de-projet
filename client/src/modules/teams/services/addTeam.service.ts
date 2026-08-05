import addTeamApi from "../api/addTeamApi";
import type { AddTeamDTO } from "../dto/addTeam.dto";

async function addTeamService(data: AddTeamDTO) {
  const response = await addTeamApi(data);
  return response;
}

export default addTeamService;