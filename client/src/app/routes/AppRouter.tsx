import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import AdminTaskRoute from "./task.route";
import { lazy, Suspense } from "react";
import AdminProjectRoute from "./project.route";
import Loader from "@/shared/components/loader";
import AuthRoute from "./auth.route";

const DashboardPage = lazy(
   () => import("@modules/dashboard/pages/DashboardPage")
);

export default function AppRouter() {
  return (
     <Suspense fallback={<Loader />}>
         <Routes>
            <Route path="/"  element={<Navigate to={"/login"} replace />}/>

            <Route element={<AdminLayout />}>
               <Route path="/admin/dashboard"  element={<DashboardPage />}/>  
               { AdminTaskRoute }
               { AdminProjectRoute }
            </Route>
            <Route>
               { AuthRoute }
            </Route>
         </Routes>
     </Suspense>
  )
}