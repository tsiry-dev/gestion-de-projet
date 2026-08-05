import privateApi from "@/core/api/privateHttpClient";
import type { AddTeamDTO } from "../dto/addTeam.dto";
import { ENDPOINTS } from "@/core/api/endpoint";

async function addTeamApi (data: AddTeamDTO) {
   const response = privateApi.post(ENDPOINTS.TEAMS.ADD,data); 
   return response;
}

export default addTeamApi;