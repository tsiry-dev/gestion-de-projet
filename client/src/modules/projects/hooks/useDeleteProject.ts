import { useMutation, useQueryClient } from "@tanstack/react-query"
import deleteProjectService from "../services/deleteProject.service"

const useDeleteProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProjectService,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projects"],
            });
        },
    })
}

export default useDeleteProject;