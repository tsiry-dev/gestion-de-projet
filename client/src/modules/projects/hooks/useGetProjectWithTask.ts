import { useQuery } from "@tanstack/react-query"
import getProjectWithTaskService from "../services/getProjectWithTask.service";

const useGetProjectWithTasks = (id: string | null) => {
    return useQuery({
        queryKey: ['project-with-tasks', id],
        queryFn: () => getProjectWithTaskService(id!),
        enabled: !!id
    });
}

export default useGetProjectWithTasks;