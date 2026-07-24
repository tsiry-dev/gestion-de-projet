import { lazy } from "react";
import { Route } from "react-router-dom";

const TaskPage = lazy(() => import("@modules/tasks/pages/TaskPage"));

const AdminTaskRoute = (
    <Route path="/admin/tasks"element={<TaskPage /> }/>
);

export default AdminTaskRoute;