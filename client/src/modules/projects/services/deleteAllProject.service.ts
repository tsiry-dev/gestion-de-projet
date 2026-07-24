import deleteAllProjectApi from "../api/deleteAllProjectApi";

const deleteAllProjectService = async (ids: string[]) => {
    return await deleteAllProjectApi(ids);
}

export default deleteAllProjectService;