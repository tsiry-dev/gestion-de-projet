import { useQuery } from "@tanstack/react-query";
import { projectCountService } from "@modules/dashboard/services/dashboard.service";

export function useProjectCount() {
    return useQuery({
        queryKey: ['project-count'],
        queryFn: projectCountService
    });
}