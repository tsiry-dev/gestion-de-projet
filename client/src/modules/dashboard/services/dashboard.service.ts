import { projectCountApi } from "@modules/dashboard/api/dashboard.api";

export async function projectCountService() {
    return await projectCountApi();
}