import { ENDPOINTS } from "@/core/api/endpoint";
import api from "@/core/api/httpClient";

type UpdateProjectPayload = {
  id: string;
  title: string;
  description: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
};


export const updateProjectApi = async (
  data: UpdateProjectPayload
) => {

  const response = await api.patch(
    ENDPOINTS.PROJECT.UPDATE,
    data
  );

  return response.data;
};