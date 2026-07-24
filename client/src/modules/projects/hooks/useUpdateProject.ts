import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateProjectDTO } from "../schema/update-project.schema";
import updateProjectService from "../services/updateProject.service";


type UpdateProjectPayload = {
  data: UpdateProjectDTO & {id: string};
};

const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({data}: UpdateProjectPayload) =>
      updateProjectService(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["project-with-tasks"],
      });
    },
  });
};

export default useUpdateProject;