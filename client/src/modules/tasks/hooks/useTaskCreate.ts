import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskCreateService } from "../services/taskCreate.service";

const useCreateTask = () => {
   const queryClient = useQueryClient();

   return useMutation({
       mutationFn: taskCreateService,

       onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["project-with-tasks"],
            });

            queryClient.invalidateQueries({
                queryKey: ["projects"],
            });
       },
       onError: () => {}
   });
}


export default useCreateTask;
