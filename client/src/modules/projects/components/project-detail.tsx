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
import { handleResetDeleteTaskIds, handleToggleCreateTask } from "@/app/store/features/taskSlice";
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
import TaskContent from "@/modules/tasks/components/task-content";
import { useDeleteAllTask } from '../../tasks/hooks/useDeleteAllTask';
import { notify } from "@/core/feedback/notify";
import { useConfirmAction } from "@/shared/hooks/useConfirmAction";
import LoaderDelete from "@/shared/components/loader-delete";
import CardMini from "@/shared/components/ui/card-mini";
import TaskItemSkeleton from "@/modules/tasks/components/task-item-skeleton";





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


    return <div className="h-[85vh] overflow-hidden">
       <DialogHead
         title={"Detail du projet"}
         description="Vous pouvez voir tous les détail de votre projet,manager les taches, les statistiques"
       />



       <div className=" flex mt-3 min-h-[60vh]">
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

                    <SubTitle className="mt-4">
                       Proprietaire: John doe
                    </SubTitle>
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
          </aside>
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
                             <LoaderDelete /> <span>Suppression...</span>
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



              {error?.message && (
                <ServerError
                  message={error.message}
                  refetch={refetch}
                />
              )}

               {/* Tache à faire  */}
               {isCreateTask ? (
                  <TaskCreate />
               ) : (
                <>
                  <ProjectTaskContainer>
                      <TaskItemContainer status="TODO">
                        <TaskSubtitle className="sticky top-0 z-10 bg-inherit py-2">
                             A faire ({taskCount(tasks, "TODO")})
                        </TaskSubtitle>
                        <TaskContent>
                          {isMoveTask?.load && isMoveTask?.status === "TODO" && (
                             <TaskItemSkeleton />
                          )}
                          {tasks?.filter((t: any )=> t.status == "TODO").map((task: any) => (
                             <TaskItem
                                 isLoad={loadRemoveTasks} 
                                 key={task._id} 
                                 task={task}
                              />
                          ))}
                        </TaskContent>
                      </TaskItemContainer>

                      {/* tache en progression */}
                      <TaskItemContainer status="IN_PROGRESS">
                        <TaskSubtitle>En cours ({taskCount(tasks, "IN_PROGRESS")})</TaskSubtitle>
                        <TaskContent>
                        {isMoveTask?.load && isMoveTask?.status === "IN_PROGRESS" && (
                           <TaskItemSkeleton />
                        )}
                          {sortedTasks?.filter((t: any )=> t.status == "IN_PROGRESS").map((task: any) => (
                             <TaskItem
                                 isLoad={loadRemoveTasks} 
                                 key={task._id} 
                                  task={task
                              }/>
                          ))}
                        </TaskContent>
                      </TaskItemContainer>

                      {/* tache en terminer */}
                      <TaskItemContainer status="DONE">
                        <TaskSubtitle>Terminé ({taskCount(tasks, "DONE")})</TaskSubtitle>
                        <TaskContent>
                        {isMoveTask?.load && isMoveTask?.status === "DONE" && (
                           <TaskItemSkeleton />
                        )}
                          {sortedTasks?.filter((t: any) => t.status == "DONE").map((task: any) => (
                             <TaskItem
                                 isLoad={loadRemoveTasks} 
                                 key={task._id} 
                                 task={task}
                              />
                          ))}
                        </TaskContent>
                      </TaskItemContainer>

                      {/* tache en terminer */}
                      <TaskItemContainer status="IN_REVIEW">
                        <TaskSubtitle>A revoir ({taskCount(tasks, "IN_REVIEW")})</TaskSubtitle>
                        <TaskContent>
                        {isMoveTask?.load && isMoveTask?.status === "IN_REVIEW" && (
                           <TaskItemSkeleton />
                        )}
                          {sortedTasks?.filter((t: any) => t.status == "IN_REVIEW").map((task: any) => (
                             <TaskItem
                                 isLoad={loadRemoveTasks} 
                                 key={task._id} 
                                 task={task}
                              />
                          ))}
                        </TaskContent>
                      </TaskItemContainer>

                      {/* tache en terminer */}
                      <TaskItemContainer status="CANCELLED">
                        <TaskSubtitle>Annuler ({taskCount(tasks, "CANCELLED")})</TaskSubtitle>
                        <TaskContent>
                        {isMoveTask?.load && isMoveTask?.status === "CANCELLED" && (
                           <TaskItemSkeleton />
                        )}
                          {sortedTasks?.filter((t: any) => t.status == "CANCELLED").map((task: any) => (
                             <TaskItem
                                 isLoad={loadRemoveTasks} 
                                 key={task._id} 
                                 task={task}
                              />
                          ))}
                        </TaskContent>
                      </TaskItemContainer>
                  </ProjectTaskContainer>
                </>
               ) }



            </div>

            <div className="flex-1 border-l-1 border-gray-300 px-2">
                <SubTitle>
                  Equipes
                </SubTitle>
            </div>
          </main>
       </div>
    </div>
}