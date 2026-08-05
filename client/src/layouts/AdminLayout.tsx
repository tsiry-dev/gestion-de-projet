import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../shared/components/admin-sidebar";
import NewProject from "@/modules/projects/components/new-project";
import { Dialog } from "@/shared/components/dialog";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import { onCloseCreateProject, onCloseProjectDetail, resetEdit } from "@/app/store/features/projectSlice";
import ProjectDetail from "@/modules/projects/components/project-detail";
import { handleCloseCreateTask } from "@/app/store/features/taskSlice";
import { IoIosLogOut } from "react-icons/io";
import { useConfirmAction } from "@/shared/hooks/useConfirmAction";
import useLogout from "@/modules/auth/hooks/useLogout";
import { handleClearSessionStore } from "@/app/store/features/sessionSlice.store";
import Button from "@/shared/components/ui/button";
import LoaderButton from "@/shared/components/ui/loader-button";


export default function AdminLayout() {
  const { isCreateProject , projectDetailId} = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch();
  const { confirm } = useConfirmAction();
  const {mutate: logoutQuery, isPending: isPendingLogout} = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    confirm(
       async () => {
         try {

            logoutQuery();
            dispatch(handleClearSessionStore());
            navigate("/login");

         }catch(error) {
            console.error('Logout failed', error);
         }
       }
       , { title: "Confirmer la déconnexion" , text: "Êtes-vous sûr de vouloir vous déconnecter ?" }
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">

      {/* Sidebar */}
      <AdminSidebar />


      {/* Content */}
      <main
        id="content"
        className="
          min-h-screen
          md:ml-64
          overflow-y-auto
          overflow-x-hidden
          relative
        "
      >
        <div className="absolute top-3 right-4">
          {isPendingLogout ? (
             <Button $variant="danger">
               <LoaderButton title="Déconnexion en cours..." />
             </Button>
          ) : (
            <IoIosLogOut 
                onClick={handleLogout}
                className="text-red-500" 
                size={25} 
              />
          )}
        </div>
        <div
          className="
            p-4
            sm:p-6
            md:p-8
            max-w-full
          "
        >
          <Outlet />

          <footer className="mt-8 text-center text-sm text-gray-400">
            <p>© 2026 TaskFlow. All rights reserved.</p>
          </footer>
        </div>
      </main>

        {isCreateProject && (
          <Dialog
            open={isCreateProject}
            onClose={() => {
               dispatch(onCloseCreateProject());
            }}
          >
            <NewProject />
          </Dialog>
        )}

        {!!projectDetailId && (
          <Dialog
            size="xxxl"
            open={!!projectDetailId}
            onClose={() => {
               dispatch(onCloseProjectDetail())
               dispatch(handleCloseCreateTask())
               dispatch(resetEdit())
            }}
          >
            <ProjectDetail />
          </Dialog>
        )}
    </div>
  );
}