import type { RootState } from "@/app/store/store"
import { DialogHead } from "@/shared/components/dialog";
import { useDispatch, useSelector } from "react-redux"
import useGetProjectWithTasks from "../hooks/useGetProjectWithTask";
import Paragraphe from "@/shared/components/ui/paragraphe";
import SubTitle from "@/shared/components/ui/SubTitle";
import Button from "@/shared/components/ui/button";
import { HiMiniPlus } from "react-icons/hi2";
import ProjectDetailSkeleton from "./project-detail-skeleton";
import ServerError from "@/shared/components/server-error";
import TaskCreate from "@/modules/tasks/components/task-create";
import { handleCreateMoveTask, handleResetDeleteTaskIds, handleResetMoveTask, handleToggleCreateTask } from "@/app/store/features/taskSlice";
import { MdClose } from "react-icons/md";
import { VscEditCompact } from "react-icons/vsc";
import { edit, resetEdit } from "@/app/store/features/projectSlice";
import EditProject from "./edit-project";
import Status from "@/shared/components/ui/status";
import ProjectTaskContainer from "./project-task-container";
import TaskItem from "@/modules/tasks/components/task-item";
import TaskSubtitle from "@/modules/tasks/components/task-subtitle";
import TaskItemContainer from "@/modules/tasks/components/task-item-container";
import { taskCount } from "@/modules/tasks/utils";
import { TfiClose } from "react-icons/tfi";
import { GoTrash } from "react-icons/go";
import { useEffect } from "react";
import { useDeleteAllTask } from '../../tasks/hooks/useDeleteAllTask';
import { notify } from "@/core/feedback/notify";
import { useConfirmAction } from "@/shared/hooks/useConfirmAction";
import TaskItemSkeleton from "@/modules/tasks/components/task-item-skeleton";
import LoaderButton from "@/shared/components/ui/loader-button";
import { type TaskStatusType } from "@/modules/tasks/type";
import { DndContext, useDndContext, type DragEndEvent } from "@dnd-kit/core";
import { useUpdateTaskStatus } from "@/modules/tasks/hooks/useUpdateTaskStatus";
import TaskContentWrapper from "@/modules/tasks/components/task-content-wrapper";
import { bgStatus } from "../utils";
import { truncate } from "@/shared/utils/string.utils";
import ListTeam from "../../teams/components/list-team";
import ProjectDetailError from "./project-detail-error";
import ReactECharts from "echarts-for-react";
import useChartPie from "../hooks/useChartPie";



type ColumType = {
   id: number;
   title: string;
   status: TaskStatusType
 }

const COLUMNS: ColumType[] = [
  {
    id: 1,
    title: "A faire",
    status: "TODO"
  },
  {
    id: 2,
    title: "En cours",
    status: "IN_PROGRESS"
  },
  {
    id: 3,
    title: "Terminer",
    status: "DONE"
  },
  {
    id: 4,
    title: "A revoir",
    status: "IN_REVIEW"
  },
  {
    id: 5,
    title: "Annuler",
    status: "CANCELLED"
  },
];


export default function ProjectDetail() {
   
   const { projectDetailId: projectId, editProject } = useSelector((state: RootState) => state.projects);
   const { data , isPending, error , refetch} = useGetProjectWithTasks(projectId);
   const project = data?.project;
   const tasks = data?.tasks;
   const dispatch = useDispatch();
   const { 
    isCreateTask , 
    deleteTaskIds: ids,
    isMoveTask
  } = useSelector((state: RootState) => state.tasks);
   const { mutate: deleteAllTask , isPending: loadRemoveTasks} = useDeleteAllTask(ids, projectId);
   const {confirm} = useConfirmAction();
   const { mutate: updateTaskStatusQuery } = useUpdateTaskStatus(projectId);
   const { active } = useDndContext();
   const { chartOption } = useChartPie(data?.tasks ?? []);

   console.log(data);

   useEffect(() => {
     dispatch(handleResetDeleteTaskIds())
   }, [projectId])

  //  console.log(tasks);
   
   if (isPending) {
    //  return <ProjectDetailSpinner />;
     return <ProjectDetailSkeleton />;
   }


   const handleDeleteSelectedTask = () => {
      confirm(async() => {
        deleteAllTask(ids, {
            onSuccess: () => {
              notify.success("Les taches on ete supprimer!!");
              dispatch(handleResetDeleteTaskIds());
            }
        });
      }, {
        title: `Ete vous sur de vouloir supprimer ${ids.length > 1 ? 'les ('+ ids.length +') taches' : 'ce tache'}`
      });
      
   }

  const sortedTasks = [...(tasks ?? [])].sort(
  (a, b) =>
    new Date(b.updatedAt).getTime() -
    new Date(a.updatedAt).getTime()
  );

  const handleDragEnd = (event: DragEndEvent) => {
          const { active, over } = event;

      if (!over) return;

      const taskId = String(active.id);
      const newStatus = over.id as TaskStatusType;

      // retrouver la tâche déplacée
      const currentTask = tasks?.find((t: any) => t._id === taskId);

      if (!currentTask) return;

      // ne rien faire si même colonne
      if (currentTask.status === newStatus) return;

      dispatch(
        handleCreateMoveTask({
          load: true,
          status: newStatus,
          taskId
        })
      );

      updateTaskStatusQuery(
        {
          taskId,
          status: newStatus,
        },
        {
          onSuccess: () => {
            notify.success(`Le tache "${truncate(currentTask.title, 25)}" à éte déplacé`);
            dispatch(handleResetMoveTask());
          },
          onError: (error) => {
            notify.error(error.message);
            dispatch(handleResetMoveTask());
          },
        }
      );
  }

  if (error) {
    return (
      <ProjectDetailError
          refetch={refetch} 
          error={error}
      />
    );
  }

  return <div className="h-[85vh] overflow-hidden">
      <DialogHead
        title={"Detail du projet"}
        description="Vous pouvez voir tous les détail de votre projet,manager les taches, les statistiques"
      />



      <div className=" flex mt-3 min-h-[60vh]">
       {/* Sidebar  */}
        <aside className="w-[20%]">
          <div className="group flex justify-between items-start px-2">
            <div className="flex-1">
              {!editProject ? (
                <div className="project-title">
                    <Status type={project?.status} />
                    
                  <h2 className="font-bold text-2xl">{project?.title}</h2>

                  <Paragraphe>
                    {project?.description}
                  </Paragraphe>
                </div>
              ) : (
                <EditProject />
              )}
            </div>

            <div className="ml-2">
              {!editProject ? (
                <Button
                  title="Modifier"
                  onClick={() => dispatch(edit(project))}
                  className="
                    opacity-0
                    invisible
                    transition-all
                    duration-200
                    group-hover:opacity-100
                    group-hover:visible
                  "
                >
                  <VscEditCompact size={15} />
                </Button>
              ) : (
                <Button
                  $variant="danger"
                  onClick={() => dispatch(resetEdit())}
                >
                  <MdClose size={15} />
                </Button>
              )}
            </div>
          </div> 

        {!editProject && (
          <div>
              <SubTitle>
                Statistiques
              </SubTitle> 
              <div className="m-3 rounded-lg border border-gray-200 bg-white p-3">
                {/* Chart */}
                <div className="mt-8 h-[350px]">
                  <ReactECharts
                    option={chartOption}
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                  />
                </div>
              </div>
          </div>
        )}
        </aside>

      {/* main content  */}
        <main className="flex gap-2 border-l-1 border-gray-300 flex-1">
          <div className="ml-3 flex-5">

            <div className="flex justify-between">
              <SubTitle>
                Tache{tasks?.length > 0 && "s"} ({tasks?.length ?? 0})
              </SubTitle>
              
              <div className="flex gap-2">
                {!isCreateTask && <div>
                  {ids.length > 0 &&
                    <div className="flex gap-3">
                      <Button 
                          disabled={loadRemoveTasks}
                          onClick={handleDeleteSelectedTask}
                          $variant="danger" 
                          className="flex items-center" 
                          title="Supprimer tous"
                      >
                        {loadRemoveTasks ?
                          <span className="text-white flex items-center gap-2">
                            <LoaderButton title="Suppression en cours..."/>
                          </span>
                        :
                          <span className="flex items-center">
                              <GoTrash size={13} /> &nbsp; ({ ids.length })
                          </span>
                        }
                      </Button>
          
          
                      <Button 
                          title="Annuler tous" 
                          $variant="warning" 
                          onClick={() => dispatch(handleResetDeleteTaskIds())}
                      >
                        <TfiClose />
                      </Button>
                    </div>
                  }
                </div>
                }

                <Button 
                    $variant={isCreateTask ? 'danger': 'primary'}  
                    onClick={() => dispatch(handleToggleCreateTask())}
                >
                {isCreateTask ? 
                  <div className="flex">
                    Fermer &nbsp;
                    <MdClose size={15}/>
                  </div>
                
                  :
                  <div className="flex" title="Nouveau tache">
                    Nouveau &nbsp;
                    <HiMiniPlus size={15}/>
                  </div>
                }
                </Button>
              </div>
            </div>



            {error && (
              <ServerError
                message={(error as Error).message}
                refetch={refetch}
              />
            )}

              {/* Tache à faire  */}
              {isCreateTask ? (
                <TaskCreate />
              ) : (
              <>
                <DndContext onDragEnd={handleDragEnd}>
                <ProjectTaskContainer project={project}>
                    {COLUMNS.map((column) => (
                        <TaskItemContainer key={column.id} status={column.status}>
                          <TaskContentWrapper>
                          <TaskSubtitle className={`sticky top-0 z-10 bg-inherit py-2`}>
                              <div className={`${bgStatus(column.status)} translate-y-[-.7rem] py-2`}>
                                {column.title} ({taskCount(tasks, column.status)})
                              </div>
                          </TaskSubtitle>
                            {isMoveTask?.load && isMoveTask?.status === column.status && (
                              <TaskItemSkeleton />
                            )}
                            {tasks
                              ?.filter((t: any) => t.status === column.status)
                              .sort(
                                (a: any, b: any) =>
                                  new Date(b.updatedAt).getTime() -
                                  new Date(a.updatedAt).getTime()
                              )
                              .map((task: any) => (
                                <TaskItem
                                  key={task._id}
                                  isLoad={loadRemoveTasks}
                                  task={task}
                                />
                              ))}
                          </TaskContentWrapper>
                        </TaskItemContainer>
                    ))}
                </ProjectTaskContainer>
                </DndContext>
              </>
              ) }



          </div>

            {/* Liste des teams  */}
            <ListTeam team={data.team} />
        </main>
      </div>
  </div>
}