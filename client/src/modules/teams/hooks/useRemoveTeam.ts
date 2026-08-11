import { useMutation, useQueryClient } from "@tanstack/react-query";
import removeTeamServive from "../services/removeTeam.service";

function useRemoveTeam (projectId: string, teamId: string) {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeTeamServive,

        onSuccess: () => {
            queryClient.setQueryData(
                ["project-with-tasks",projectId],
                (old: any) => {

                    if(!old) return old;

                    return {
                        ...old,
                        team: {
                            ...old.team,
                            members: old.team.members.filter((t: any) => t._id !== teamId)
                        }
                    }
                    
                }
            );
        }
    });
}

export default useRemoveTeam;