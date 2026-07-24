import HeaderSection from "@/shared/components/header-section";
import { useEffect, useState } from "react";
import { FaTh, FaList } from "react-icons/fa";
import ProjectCard from "../components/grid-card";
import ListCard from "../components/list-card";
import useGetAllProject from "@modules/projects/hooks/useGetAllProjects";
import ProjectCardSkeleton from "../components/grid-card-skeleton";
import ServerError from "@/shared/components/server-error";
import ListCardSkeleton from "../components/list-card-skeleton";
import useDeleteProject from "@modules/projects/hooks/useDeleteProject";
import { notify } from "@/core/feedback/notify";
import Button from "@/shared/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import { onCloseCreateProject, onCloseProjectDetail, onCloseUpdateProject, onOpeCreateProject, resetDeletedIds } from "@/app/store/features/projectSlice";
import { TfiClose } from "react-icons/tfi";
import { GoTrash } from "react-icons/go";
import useDeleAllteProject from "../hooks/useDeleteAllProject";
import LoaderDelete from "@/shared/components/loader-delete";
import { useQueryClient } from "@tanstack/react-query";
import { useConfirmAction } from "@/shared/hooks/useConfirmAction";
import { FaRegFolder } from "react-icons/fa";
import Paragraphe from "@/shared/components/ui/paragraphe";
import NewProject from "../components/new-project";
import { IoMdAdd } from "react-icons/io";
import { Dialog } from "@/shared/components/dialog";
import ProjectDetail from "../components/project-detail";
import EditProject from "../components/edit-project";

type ViewMode = "grid" | "list";

export default function ProjectPage() {

  const [deletingId, setDeletingId] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
      const savedViewMode = localStorage.getItem("projectViewMode");
        return savedViewMode === "list" || savedViewMode === "grid"
          ? savedViewMode
          : "grid";
  });
  const { deletedIds ,isCreateProject, projectDetailId, isUpdateProject} = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch();

  const { 
    data, 
    isPending, 
    error, 
    refetch 
  } = useGetAllProject();

  const { mutate: deleteProject, isPending: isDeletePending} = useDeleteProject();
  const { mutate: deleteAllProject, isPending: isDeleteAllPending} = useDeleAllteProject();
  const { confirm } = useConfirmAction();
  const queryClient = useQueryClient();



  useEffect(() => {
    const savedViewMode = localStorage.getItem("projectViewMode");

    if (
      savedViewMode === "grid" ||
      savedViewMode === "list"
    ) {
      setViewMode(savedViewMode);
    }
  }, []);


  const changeViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem("projectViewMode", mode);
  };

  const handleDelete = async(id: string) => {
    confirm(async() => {
      setDeletingId(id);
        await deleteProject(id, {
          onSuccess: () => {
            queryClient.setQueryData(["projects"], (old: any) => {
              if (!old) return old;

              return {
                ...old,
                projects: old.projects.filter(
                  (project: any) => project._id !== id
                ),
              };
            });
             dispatch(resetDeletedIds());


            notify.success("Projet supprimé avec succès");
          },

          onError: () => {
            notify.error("Erreur lors de la suppression");
          },
        });

    },{
      title: "Supprimer ce projet ?",
    });

  }

  const handleDeleteAll = () => {
    
    confirm(async() => {
        deleteAllProject(deletedIds, {
          onSuccess: () => {
            queryClient.setQueryData(["projects"], (old: any) => {
              if (!old) return old;

              return {
                ...old,
                projects: old.projects.filter(
                  (project: any) => !deletedIds.includes(project._id)
                ),
              };
            });

            notify.success(`(${deletedIds.length}) Projets ont ete supprimés!!`);
            dispatch(resetDeletedIds());

          },

          onError: () => {
            notify.error("Erreur lors de la suppression");
          },
        });
    }, {
      title: `Vous ête sur de vouloir supprimer ${deletedIds.length > 1 ? 'les ('+ deletedIds.length +')projets' : 'le projet'}`
    }); 
  }

  return (
    <section>

      <HeaderSection
        title={`Projects (${data?.projects?.length ?? 0})`}
        content="Gérer vos projets"
      />


      <div className="flex justify-between items-center gap-2 mb-6">
       <div className="flex gap-3">
          <button
            onClick={() => changeViewMode("grid")}
            className={`
              p-2 rounded-lg border transition
              ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }
            `}
          >
            <FaTh />
          </button>

          <button
            onClick={() => changeViewMode("list")}
            className={`
              p-2 rounded-lg border transition
              ${
                viewMode === "list"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }
            `}
          >
            <FaList />
          </button>
       </div>

        {deletedIds.length > 0 &&
          <div className="flex gap-3">
            <Button 
            onClick={handleDeleteAll}
            $variant="danger" className="flex items-center" title="Supprimer tous">
              {isDeleteAllPending ? (
                <>
                  <LoaderDelete /> &nbsp; Suppression...
                </>
              ): (
                <>
                  <GoTrash size={13} /> &nbsp; ({ deletedIds.length })
                </>
              )}
            </Button>


            <Button title="Annuler tous" $variant="warning" onClick={() => dispatch(resetDeletedIds())}>
              <TfiClose />
            </Button>
          </div>
        }
      </div>



      {error?.message && (
        <ServerError
          message={error.message}
          refetch={refetch}
        />
      )}

      {!error?.message && data?.projects?.length == 0 && (
        <div className="flex justify-center flex-col items-center mt-30">
           <FaRegFolder size={50} className="text-blue-600"/>
          <Paragraphe>
               Aucun projet pour le moment
          </Paragraphe>

          <Button  onClick={() => dispatch(onOpeCreateProject())}><IoMdAdd /></Button>
          {isCreateProject && (
              <Dialog
                open={isCreateProject}
                onClose={() => dispatch(onCloseCreateProject())}
              >
                <NewProject />
              </Dialog>
          )}
        </div>
      )}

      {viewMode === "grid" && (
        <>
          {isPending ? (

            <div className="relative max-h-[520px] overflow-hidden">

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <ProjectCardSkeleton key={index} />
                ))}
              </div>


              <div className="
                absolute
                bottom-0
                left-0
                right-0
                h-48
                bg-gradient-to-t
                from-white
                via-white/90
                to-transparent
                pointer-events-none
              "/>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {data?.projects?.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  handleDelete={handleDelete}
                  isDeletePending={isDeletePending}
                  deletingId={deletingId}
                />
              ))}
            </div>

          )}
        </>
      )}

      {viewMode === "list" && (
        <div className="space-y-4">

          {isPending ? (

            Array.from({ length: 4 }).map((_, index) => (
              <ListCardSkeleton key={index}/>
            ))

          ) : (

            data?.projects?.map((project) => (
              <ListCard
                key={project._id}
                project={project}
                handleDelete={handleDelete}
                isDeletePending={isDeletePending}
                deletingId={deletingId}
              />
            ))

          )}

        </div>
      )}

      {isUpdateProject && (
          <Dialog
            open={isUpdateProject}
            onClose={() => dispatch(onCloseUpdateProject())}
          >
            <EditProject />
          </Dialog>
      )}

    </section>
  );
}