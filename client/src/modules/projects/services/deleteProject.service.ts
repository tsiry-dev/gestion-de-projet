import  { deleteProjectApi } from "../api/deleteProjectApi"

const deleteProjectService = async (id: string) => {
    return await deleteProjectApi(id);
}

export default deleteProjectService;