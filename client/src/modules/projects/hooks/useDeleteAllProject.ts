import { useMutation } from "@tanstack/react-query"
import deleteAllProjectApi from "../api/deleteAllProjectApi";

const useDeleAllteProject = () => {
    // const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAllProjectApi,
    })
}

export default useDeleAllteProject;