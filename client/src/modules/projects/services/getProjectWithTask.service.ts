import getProjectWithTasksApi from "../api/getProjectWithTaskApi";

const getProjectWithTaskService = async (id: string) => {
    return await getProjectWithTasksApi(id);
}

export default getProjectWithTaskService;