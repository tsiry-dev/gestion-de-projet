import { ENDPOINTS } from "@/core/api/endpoint";
import privateApi from "@/core/api/privateHttpClient";

async function removeTeamApi (id: string) {
    const response = await privateApi.delete(
        ENDPOINTS.TEAMS.REMOVE(id), 
    );

    return response;
}

export default removeTeamApi;