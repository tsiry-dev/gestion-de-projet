import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTaskServie } from "../services/deleteTask.service";

export const useDeleteTask = (taskId: string,projectId: string | null) => {

    const queryClient = useQueryClient();
  
    return useMutation({
        mutationFn: deleteTaskServie,
        onSuccess: () => {
            queryClient.setQueryData(['project-with-tasks', projectId],(old: any) => {
                if(!old) return old;

                return {
                    ...old,
                    tasks: old.tasks.filter(
                      (task: any) => task._id !== taskId
                    ),
                }
            })

            queryClient.invalidateQueries({
                queryKey: ["projects"],
            });
        },
    })
}