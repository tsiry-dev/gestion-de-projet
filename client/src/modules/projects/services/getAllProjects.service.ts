import getAllProjectsApi from "@modules/projects/api/getAllProjects.api";

const getAllProjectService = async () => {
    return await getAllProjectsApi();
}

export default getAllProjectService;