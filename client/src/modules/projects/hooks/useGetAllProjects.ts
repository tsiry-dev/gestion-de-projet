import { useQuery } from "@tanstack/react-query"
import getAllProjectService from "@modules/projects/services/getAllProjects.service";

const useGetAllProject = () => {
    return useQuery({
        queryKey: ['projects'],
        queryFn: getAllProjectService
    });
}

export default useGetAllProject;