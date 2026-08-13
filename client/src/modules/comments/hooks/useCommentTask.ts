import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import commentTaskService from "../services/commentTask.service";
import { setTaskViewStore } from "@/app/store/features/taskSlice";

function useCommentTask(projectId: string | null) {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: commentTaskService,

        onSuccess: (response) => {
            const updatedTask = response.task;

            queryClient.setQueryData(
                ["project-with-tasks", projectId],
                (old: any) => {
                    if (!old) return old;

                    return {
                        ...old,

                        tasks: old.tasks.map((task: any) => {
                            if (
                                String(task._id) !==
                                String(updatedTask._id)
                            ) {
                                return task;
                            }

                            return {
                                ...task,
                                comments: updatedTask.comments,
                            };
                        }),
                    };
                }
            );

            dispatch(
                setTaskViewStore({
                    ...updatedTask,
                    teamId: updatedTask.teamId,
                })
            );
        },
    });
}

export default useCommentTask;