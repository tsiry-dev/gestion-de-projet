import searchTeamApi from "../api/searchTeamApi";

async function searchTeamService(query: string) {
    const response = await searchTeamApi(query);
    return response;
}


export default searchTeamService;