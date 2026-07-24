import { createProjectApi } from "../api/createProjectApi";
import type { CreateProjectDTO } from "../schema/create-project.schema";

const createProjectService = async (data: CreateProjectDTO) => {
    return await createProjectApi(data);
}

export default createProjectService;