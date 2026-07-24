import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllTaskService } from "../services/deleteAllTask.service";

export const useDeleteAllTask = (ids: string[], projectId: string | null) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAllTaskService,

        onSuccess: () => {

            queryClient.setQueryData(
                ["project-with-tasks", projectId],
                (old: any) => {

                    if (!old) return old;

                    return {
                        ...old,
                        tasks: old.tasks.filter(
                            (task: any) => !ids.includes(task._id)
                        ),
                    };
                }
            );

            queryClient.invalidateQueries({
                queryKey: ["projects"],
            });
        },
    });
};