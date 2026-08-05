import { ENDPOINTS } from "@/core/api/endpoint";
import privateApi from "@/core/api/privateHttpClient";

async function searchTeamApi(query: string) {
  const response = await privateApi.get(ENDPOINTS.TEAMS.SEARCH(query));
  return response.data;
}

export default searchTeamApi;