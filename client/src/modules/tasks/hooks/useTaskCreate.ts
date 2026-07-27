import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskCreateService } from "../services/taskCreate.service";

const useCreateTask = (projectId: string | null) => {
   const queryClient = useQueryClient();

   return useMutation({
       mutationFn: taskCreateService,

       onSuccess: (newTask) => {

            queryClient.invalidateQueries({
                queryKey: ["projects"],
            });

            queryClient.setQueryData(
            ["project-with-tasks", projectId],
            (old: any) => {
            if (!old) return old;

            return {
                ...old,
                tasks: [
                ...old.tasks,
                newTask,
                ],
            };
            }
        );

            queryClient.refetchQueries({
                queryKey: ["project-with-tasks"],
            });
       },
       onError: () => {}
   });
}


export default useCreateTask;
