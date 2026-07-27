import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateTaskServive } from "../services/updateTask.service";
import type { UpdateTaskDTO } from "../type";

export const useUpdateTask = (projectId: string | null) => {

  const queryClient = useQueryClient();
   

    return useMutation({
        mutationFn: updateTaskServive,

            onSuccess: (_, variables: UpdateTaskDTO) => {
        
              queryClient.setQueryData(
                ['project-with-tasks', projectId],
                (old: any) => {
        
                  if (!old) return old;
        
                return {
                    ...old,
                    tasks: old.tasks.map((task: any) =>
                    task._id === variables.id
                        ? {
                            ...task,
                            ...variables,
                            updatedAt: new Date(),
                        }
                        : task
                    ),
                };
                }
              );
        
        
              queryClient.invalidateQueries({
                queryKey: ["projects"],
              });
        
            },
    });
}