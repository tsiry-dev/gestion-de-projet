import HeaderSection from "@/shared/components/header-section";
import { useState, useMemo } from "react";
import { FaTh, FaList, FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
import {
  onCloseCreateProject,
  onCloseProjectDetail,
  onCloseUpdateProject,
  onOpeCreateProject,
  resetDeletedIds,
} from "@/app/store/features/projectSlice";
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

const PAGE_SIZE = 9;

function getInitialViewMode(): ViewMode {
  const saved = localStorage.getItem("projectViewMode");
  return saved === "list" || saved === "grid" ? saved : "grid";
}

export default function ProjectPage() {
  const [deletingId, setDeletingId] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>(getInitialViewMode);
  const [page, setPage] = useState(1);

  const { deletedIds, isCreateProject, projectDetailId, isUpdateProject } =
    useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch();

  // On récupère TOUT d'un coup, pas de params de pagination envoyés au backend
  const { data, isPending, error, refetch } = useGetAllProject();

  const { mutateAsync: deleteProject, isPending: isDeletePending } = useDeleteProject();
  const { mutateAsync: deleteAllProject, isPending: isDeleteAllPending } = useDeleAllteProject();
  const { confirm } = useConfirmAction();
  const queryClient = useQueryClient();

  const allProjects = data?.projects ?? [];
  const total = allProjects.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // Découpage côté client de la page courante
  const paginatedProjects = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return allProjects.slice(start, start + PAGE_SIZE);
  }, [allProjects, page]);

  const changeViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem("projectViewMode", mode);
  };

  const goToPage = (targetPage: number) => {
    if (targetPage < 1 || targetPage > totalPages) return;
    setPage(targetPage);
  };

  const handleDelete = async (id: string) => {
    confirm(
      async () => {
        setDeletingId(id);
        try {
          await deleteProject(id);

          queryClient.setQueryData(["projects"], (old: any) => {
            if (!old) return old;
            return {
              ...old,
              projects: old.projects.filter((project: any) => project._id !== id),
            };
          });

          dispatch(resetDeletedIds());
          notify.success("Projet supprimé avec succès");

          // Si on supprime le dernier élément de la page courante, on recule d'une page
          if (paginatedProjects.length === 1 && page > 1) {
            setPage(page - 1);
          }
        } catch {
          notify.error("Erreur lors de la suppression");
        } finally {
          setDeletingId("");
        }
      },
      { title: "Supprimer ce projet ?" }
    );
  };

  const handleDeleteAll = () => {
    confirm(
      async () => {
        try {
          await deleteAllProject(deletedIds);

          queryClient.setQueryData(["projects"], (old: any) => {
            if (!old) return old;
            return {
              ...old,
              projects: old.projects.filter(
                (project: any) => !deletedIds.includes(project._id)
              ),
            };
          });

          notify.success(`(${deletedIds.length}) Projets ont été supprimés !`);
          dispatch(resetDeletedIds());

          // Recalage de la page si la page courante devient vide/inexistante
          const newTotal = total - deletedIds.length;
          const newTotalPages = Math.max(1, Math.ceil(newTotal / PAGE_SIZE));
          if (page > newTotalPages) {
            setPage(newTotalPages);
          }
        } catch {
          notify.error("Erreur lors de la suppression");
        }
      },
      {
        title: `Vous êtes sûr de vouloir supprimer ${
          deletedIds.length > 1 ? `les (${deletedIds.length}) projets` : "le projet"
        }`,
      }
    );
  };

  return (
    <section>
      <HeaderSection title={`Projects (${total})`} content="Gérer vos projets" />

      <div className="flex justify-between items-center gap-2 mb-6">
        <div className="flex gap-3">
          <button
            onClick={() => changeViewMode("grid")}
            className={`p-2 rounded-lg border transition ${
              viewMode === "grid"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FaTh />
          </button>

          <button
            onClick={() => changeViewMode("list")}
            className={`p-2 rounded-lg border transition ${
              viewMode === "list"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FaList />
          </button>
        </div>

        {deletedIds.length > 0 && (
          <div className="flex gap-3">
            <Button
              onClick={handleDeleteAll}
              $variant="danger"
              className="flex items-center"
              title="Supprimer tous"
            >
              {isDeleteAllPending ? (
                <>
                  <LoaderDelete /> &nbsp; Suppression...
                </>
              ) : (
                <>
                  <GoTrash size={13} /> &nbsp; ({deletedIds.length})
                </>
              )}
            </Button>

            <Button
              title="Annuler tous"
              $variant="warning"
              onClick={() => dispatch(resetDeletedIds())}
            >
              <TfiClose />
            </Button>
          </div>
        )}
      </div>

      {error?.message && <ServerError message={error.message} refetch={refetch} />}

      {!error?.message && !isPending && total === 0 && (
        <div className="flex justify-center flex-col items-center mt-30">
          <FaRegFolder size={50} className="text-blue-600" />
          <Paragraphe>Aucun projet pour le moment</Paragraphe>

          <Button onClick={() => dispatch(onOpeCreateProject())}>
            <IoMdAdd />
          </Button>
        </div>
      )}

      {!error?.message && (isPending || total > 0) && (
        <>
          {viewMode === "grid" && (
            <>
              {isPending ? (
                <div className="relative max-h-[520px] overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <ProjectCardSkeleton key={index} />
                    ))}
                  </div>

                  <div
                    className="
                      absolute bottom-0 left-0 right-0 h-48
                      bg-gradient-to-t from-white via-white/90 to-transparent
                      pointer-events-none
                    "
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedProjects.map((project) => (
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
              {isPending
                ? Array.from({ length: 4 }).map((_, index) => (
                    <ListCardSkeleton key={index} />
                  ))
                : paginatedProjects.map((project) => (
                    <ListCard
                      key={project._id}
                      project={project}
                      handleDelete={handleDelete}
                      isDeletePending={isDeletePending}
                      deletingId={deletingId}
                    />
                  ))}
            </div>
          )}

          {!isPending && totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                className="p-2 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                aria-label="Page précédente"
              >
                <FaChevronLeft />
              </button>

              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber)}
                    className={`w-9 h-9 rounded-lg border transition ${
                      page === pageNumber
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                className="p-2 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                aria-label="Page suivante"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </>
      )}

      {isCreateProject && (
        <Dialog open={isCreateProject} onClose={() => dispatch(onCloseCreateProject())}>
          <NewProject />
        </Dialog>
      )}

      {isUpdateProject && (
        <Dialog open={isUpdateProject} onClose={() => dispatch(onCloseUpdateProject())}>
          <EditProject />
        </Dialog>
      )}

      {projectDetailId && (
        <Dialog open={!!projectDetailId} onClose={() => dispatch(onCloseProjectDetail())}>
          <ProjectDetail />
        </Dialog>
      )}
    </section>
  );
}