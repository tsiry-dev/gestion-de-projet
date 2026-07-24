import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskStatusService } from "../services/updateTaskStatus.service";
import type { UpdateTaskStatusDTO } from "../type";

export const useUpdateTaskStatus = (projectId: string | null) => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTaskStatusService,

    onSuccess: (_, variables: UpdateTaskStatusDTO) => {

      queryClient.setQueryData(
        ['project-with-tasks', projectId],
        (old: any) => {

          if (!old) return old;

          return {
            ...old,
            tasks: old.tasks.map((task: any) =>
              task._id === variables.taskId
                ? {
                    ...task,
                    status: variables.status,
                    updatedAt: new Date()
                  }
                : task
            )
          };
        }
      );


      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

    },
  });
};