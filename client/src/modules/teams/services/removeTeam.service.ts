import removeTeamApi from "../api/removeTeamApi";

async function removeTeamServive (id: string) {
   return await removeTeamApi(id);
}

export default removeTeamServive;