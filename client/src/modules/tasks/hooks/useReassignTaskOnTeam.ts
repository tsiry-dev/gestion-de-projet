import { useMutation, useQueryClient } from "@tanstack/react-query";
import reassignTaskOnTeamServive from "../services/reassignTaskOnTeam.service";

function useReassignTaskOnTeam (projectId: string) {

    const queryClient = useQueryClient();
    
    return useMutation({
       mutationFn: reassignTaskOnTeamServive,
       

       onSuccess: (newData) => {
         const { team } = newData;

         queryClient.invalidateQueries({
            queryKey: ['project-with-tasks', projectId],
         });
       }
    });
    
}


export default useReassignTaskOnTeam;