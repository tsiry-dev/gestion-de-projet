import { useQuery } from "@tanstack/react-query";
import searchTeamService from "../services/searchTeam.service";

const useSearchTeam = (query: string) => {
  return useQuery({
    queryKey: ["searchTeam", query],
    queryFn: () => searchTeamService(query),
    enabled: query.trim().length > 0, // 👈 ne lance la requête que s'il y a du texte
  });
};

export default useSearchTeam;