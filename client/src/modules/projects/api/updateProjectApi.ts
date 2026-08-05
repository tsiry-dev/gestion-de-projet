import { ENDPOINTS } from "@/core/api/endpoint";
import privateApi from "@/core/api/privateHttpClient";

type UpdateProjectPayload = {
  id: string;
  title: string;
  description: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
};


export const updateProjectApi = async (
  data: UpdateProjectPayload
) => {

  const response = await privateApi.patch(
    ENDPOINTS.PROJECT.UPDATE,
    data
  );

  return response.data;
};