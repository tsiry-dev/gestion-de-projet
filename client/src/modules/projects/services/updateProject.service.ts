import { updateProjectApi } from "../api/updateProjectApi";
import type { UpdateProjectDTO } from "../schema/update-project.schema";

type UpdateProjectPayload = UpdateProjectDTO & {
  id: string;
};

const updateProjectService = async (data: UpdateProjectPayload) => {
    return await updateProjectApi(data);
}

export default updateProjectService;