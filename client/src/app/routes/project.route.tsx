import { lazy } from "react";
import { Route } from "react-router-dom";

const ProjectPage = lazy(() => import("@modules/projects/pages/ProjectPage"));

const AdminProjectRoute = (
  <Route path="/admin/projects" element={<ProjectPage />} />
);

export default AdminProjectRoute;