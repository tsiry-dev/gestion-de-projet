import { useState } from "react";
import { filterStatus, filterStatusBadge } from "@/modules/projects/utils";
import Badge from "@/shared/components/ui/badge";
import CardMini from "@/shared/components/ui/card-mini";
import { truncate } from "@/shared/utils/string.utils";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { VscClose } from "react-icons/vsc";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { notify } from "@/core/feedback/notify";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import { 
  handleCreateMoveTask, 
  handleDeleteAllTask, 
  handleDeleteTaskInStore, 
  handleEditTaskTitle, 
  handleResetEditTask, 
  handleResetMoveTask, 
  removeReassignTaskTeamId, 
  setReassignTaskTeamId
} from "@/app/store/features/taskSlice";
import { useConfirmAction } from "@/shared/hooks/useConfirmAction";
import { useUpdateTaskStatus } from "../hooks/useUpdateTaskStatus";
import { TaskStatus, type TaskStatusType } from "../type";
import EditTask from "./edit-task";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { RiDragMove2Line } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { setReassignTeamStore } from "@/app/store/features/teamSlice";
import useGetProjectWithTasks from "@/modules/projects/hooks/useGetProjectWithTask";
import { IoIosArrowRoundBack } from "react-icons/io";
import Button from "@/shared/components/ui/button";
import TeamReassignForm from "@/modules/teams/components/team-reassign-form";




type Props = {
  task: any;
  isLoad: boolean,
  project: any
};

const statusBtns = [
   {
     title: 'A faire',
     value: TaskStatus.TODO
   },
   {
     title: 'En cours',
     value: TaskStatus.IN_PROGRESS
   },
   {
     title: 'Terminer',
     value: TaskStatus.DONE
   },
   {
     title: 'A revoir',
     value: TaskStatus.IN_REVIEW
   },
   {
     title: 'Annuler',
     value: TaskStatus.CANCELLED
   },
];

export default function TaskItem({ task , isLoad, project}: Props) {
  const [showFullTitle, setShowFullTitle] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const { projectDetailId: projectId } = useSelector((state: RootState) => state.projects);
  const { user } = useSelector((state: RootState) => state.session);
  const { deleteTaskIds, taskEdit, isMoveTask,reassignTaskId } = useSelector((state: RootState) => state.tasks);
  const { mutate: deleteTask, isPending, error } = useDeleteTask(task._id, projectId);
  const dispatch = useDispatch();
  const {confirm} = useConfirmAction();
  const {
    mutate: updateTaskStatusQuery, 
    isPending: loadUpdateTaskStatus
  } = useUpdateTaskStatus(projectId);
  const [loadingStatus, setLoadingStatus] = useState<TaskStatusType | null>(null);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging
  } = useDraggable({
    id: task._id,
  });

  const { isReassignTeam } = useSelector((state: RootState) => state.teams);
  const { data } = useGetProjectWithTasks(projectId);

  const { team } = data;
  


  const handleDeleteTask = (e: any) => {
     e.stopPropagation();
    confirm(async() => {
      await deleteTask(task._id, {
        onSuccess: () => {
            notify.success("Ajout avec success");
            dispatch(handleDeleteTaskInStore(task._id))
        }
      });

    }, {
      title: "Ete vous sur??",
      text: "Cette action est irreversible"
    });
  }

  const handleUpdateStatus = (status: TaskStatusType) => {
      // updateTaskStatus();
      setLoadingStatus(status);
      const data = {
        taskId: task._id,
        status
      }
      dispatch(handleCreateMoveTask({
        load: true,
        status,
        taskId: task._id,
      }))
      updateTaskStatusQuery(data, {
         onSuccess: () => {
            notify.success(`Le tache à éte déplacé`);
            setLoadingStatus(null);
            dispatch(handleResetMoveTask());
         },
         onError: (error) => {
            notify.error(error.message);
            setLoadingStatus(null);
         }
      });
  }



  return (
    <CardMini 
    ref={setNodeRef}
    style={{
      transform: CSS.Translate.toString(transform),
      zIndex: isDragging ? 9999 : undefined,
      position: isDragging ? "relative" : undefined,
    }}

    
    className={`
        group
        relative mb-2 ${deleteTaskIds.includes(task._id) ? 
        'bg-red-400' : 
        'bg-white'}
        ${
          isMoveTask?.load && isMoveTask?.taskId === task._id
            ? "hidden"
            : "opacity-100"
        }
        ${
          isLoad && deleteTaskIds.includes(task._id)
            ? "pointer-events-none! opacity-30!"
            : ""
        }
    `}>

      {/* Menu */}
      <div  className="absolute top-2 right-2">
      {taskEdit?._id !== task._id && (
          <button
            className="
              flex h-7 w-7 items-center justify-center
              rounded-md
              text-gray-500
              hover:bg-gray-100
              hover:text-gray-700
              transition
            "
          >
            <div className={`${open && 'bg-red-600 text-white'} cursor-pointer rounded-md`}>
             
              {isReassignTeam && reassignTaskId === task._id ? 
               <div
                 onClick={(e: any) => {
                   e.stopPropagation();
                   dispatch(removeReassignTaskTeamId())
                   setOpen(true)
                 }}
               >
                 <IoIosArrowRoundBack size={20}/>
               </div>
              :
                <div 
                    onClick={(e: any) => {
                      setOpen(!open);
                      e.stopPropagation();
                      dispatch(removeReassignTaskTeamId())
                    
                  }}
                >
                  {open ? (
                    <VscClose size={18}/>
                  ) : (
                    <BiDotsHorizontalRounded size={18} />
                  )}
                </div>
              }

            </div>
          </button>
      )}

        {open && (
          <div 
            className="
                absolute right-[-0.3rem] mt-1
                w-36
                overflow-hidden
                rounded-lg
                border border-gray-200
                bg-white
                shadow-lg
                z-50
              "
          >
           {isReassignTeam && reassignTaskId === task._id ? (
              <div className="p-2">
                 <h3 className="mb-2">Reassigner à</h3>

                {/* Team reassign form  */}
                <TeamReassignForm members={team?.members}/>
              </div>
           ) : (
            <div
              onClick={e => e.stopPropagation()}
            >
             {project?.ownerId === user?._id && (
              <div>
                <button
                  onClick={() => {
                    dispatch(handleEditTaskTitle(task));
                    dispatch(handleDeleteTaskInStore(task._id))
                    setOpen(false);
                  }}
                  className="
                    flex w-full items-center gap-2
                    px-3 py-2
                    text-sm
                    hover:bg-gray-100
                  "
                >
                  <FiEdit2 size={14} />
                  Modifier
                </button>

                <button
                  onClick={() => {
                    dispatch(setReassignTeamStore())
                    dispatch(setReassignTaskTeamId(task._id))
                  }}
                  className="
                    flex w-full items-center gap-2
                    px-3 py-2
                    text-sm
                    hover:bg-gray-100
                  "
                >
                  <MdOutlineAssignmentInd size={14}/>

                  Réasigné
                </button>

                <button
                  onClick={handleDeleteTask}
                  className="
                    flex w-full items-center gap-2
                    px-3 py-2
                    text-sm text-red-600
                    hover:bg-red-50
                  "
                >
                {isPending ? <>
                  <span  className="inline-block
                        h-3
                        w-3
                        animate-spin
                        rounded-full
                        border-2
                        border-red
                        border-t-transparent
                        mr-2"></span> Suppression...
                </>
                : 
                  <>
                    <FiTrash2 onClick={(e: any) => e.stopPropagation()} size={14} />
                    Supprimer
                  </>
                }
                </button>
              </div>
             )}

              <h2 className="text-sm ml-2">Déplacer ver...</h2>

              {statusBtns.map((btn) => (
                <div>
                  { task.status !== btn.value && (
                    <button
                      key={btn.value}
                      onClick={() => handleUpdateStatus(btn.value)}
                      value={btn.value}
                      disabled={loadUpdateTaskStatus}
                      className="
                        flex w-full items-center gap-2
                        px-3 py-2
                        text-sm text-gray-600
                        hover:bg-red-50
                      "
                    >
                    {loadUpdateTaskStatus && loadingStatus === btn.value ?
                    <div className="flex items-center gap-1">
                        <span  className="inline-block
                          h-3
                          w-3
                          animate-spin
                          rounded-full
                          border-2
                          border-red
                          border-t-transparent
                          mr-2"></span> Déplacé...
                    </div>
                    : 
                    
                      <div className="flex gap-2">
                        {btn.title} <IoIosArrowForward />
                      </div>
                    }
                    </button>
                  )}
                </div>
              ))}


            </div>
           )}
          </div>
        )}
      </div>
      <div>
        
          {taskEdit && taskEdit?._id === task._id ?
            (
              <div>
                <button
                    onClick={e =>  {
                      e.stopPropagation();
                      dispatch(handleResetEditTask());
                    }}
                    className="flex h-6 w-6 bg-red-600 ml-auto flex items-center justify-center mb-2 rounded-sm text-white"
                >
                      <VscClose size={18}/>
                </button>
               <EditTask />
              </div>
            )
          :
            (
              <div>
                <div className="
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                      duration-200 flex gap-2"
                >

                  {/* Drag Icon     */}
                  <div
                    {...listeners}
                    {...attributes}
                    className={`
                      inline-flex
                      cursor-grab
                      ${isDragging ? "!cursor-grabbing" : ""}
                    `}
                  >
                      <RiDragMove2Line 
                        size={13} 
                        title="Déplacer"
                      />
                  </div>
                  
                  {project?.ownerId === user?._id && (
                    <div className="flex gap-2">
                        {/* RemoveIcon  */}
                        <div 
                            onClick={() => {
                              if (!taskEdit || taskEdit._id !== task._id) {
                                dispatch(handleDeleteAllTask(task._id));
                              }
                            }}
                            className="cursor-pointer hover:text-red-500 transition"
                        >
                          {deleteTaskIds.includes(task._id) ? (
                              <IoMdClose title="Fermer"  size={13} className="text-white"/>
                          ) : (
                            <FaRegTrashAlt 
                              size={13} 
                              title="Selectionner"
                            />
                          )}
                        </div>

                        {/* Assignerd icon  */}
                        <div>
                            <MdOutlineAssignmentInd 
                              size={14}
                              title="reassigner"
                            />
                        </div>
                    </div>
                  )}

                </div>

                <div>
                  <Badge>
                     {/* {JSON.stringify(task)} */}
                     {task.teamId == null ? 'Non assigner' : task?.teamId?.name}
                  </Badge>
                </div>

                <h4
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowFullTitle((prev) => !prev);
                  }}
                  className="
                    mt-2
                    cursor-pointer
                    text-sm
                    font-medium
                    break-words
                  "
                >
                  {showFullTitle ? task.title : truncate(task.title, 18)}
                </h4>
              </div>
            )
          }

      </div>

    </CardMini>
  );
}   