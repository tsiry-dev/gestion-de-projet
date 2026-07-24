import { useMutation, useQueryClient } from "@tanstack/react-query";
import createProjectService from "../services/createProject.service";

const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProjectService,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["project-count"],
      });
    },
  });
};

export default useCreateProject;