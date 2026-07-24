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
import { handleCreateMoveTask, handleDeleteAllTask, handleDeleteTaskInStore, handleResetMoveTask } from "@/app/store/features/taskSlice";
import { useConfirmAction } from "@/shared/hooks/useConfirmAction";
import { useUpdateTaskStatus } from "../hooks/useUpdateTaskStatus";
import { TaskStatus, type TaskStatusType } from "../type";

type Props = {
  task: any;
  isLoad: boolean
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

export default function TaskItem({ task , isLoad}: Props) {
  const [showFullTitle, setShowFullTitle] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const { projectDetailId: projectId } = useSelector((state: RootState) => state.projects);
  const { deleteTaskIds } = useSelector((state: RootState) => state.tasks);
  const { mutate: deleteTask, isPending, error } = useDeleteTask(task._id, projectId);
  const dispatch = useDispatch();
  const {confirm} = useConfirmAction();
  const {
    mutate: updateTaskStatusQuery, 
    isPending: loadUpdateTaskStatus
  } = useUpdateTaskStatus(projectId);
  const [loadingStatus, setLoadingStatus] = useState<TaskStatusType | null>(null);

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
        status
      }))
      updateTaskStatusQuery(data, {
         onSuccess: () => {
            notify.success("Tache déplacé!!");
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
      
     onClick={() => dispatch(handleDeleteAllTask(task._id))}
    className={`
        relative mb-2 ${deleteTaskIds.includes(task._id) ? 
        'bg-red-400' : 
        'bg-white'}
        ${
          isLoad && deleteTaskIds.includes(task._id)
            ? "pointer-events-none opacity-30"
            : ""
        }
    `}>

      {/* Menu */}
      <div  className="absolute top-2 right-2">
        <button
          onClick={(e: any) => {
            setOpen(!open);
            e.stopPropagation();
            
          }}
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
            {open ? (
              <VscClose size={18}/>
            ) : (
              <BiDotsHorizontalRounded size={18} />
            )}
          </div>
        </button>

        {open && (
          <div
            onClick={e => e.stopPropagation()}
            className="
              absolute right-0 mt-1
              w-36
              overflow-hidden
              rounded-lg
              border border-gray-200
              bg-white
              shadow-lg
              z-50
            "
          >
            <button
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

            <h2 className="text-sm ml-2">Déplacer ver...</h2>

            {statusBtns.map((btn) => (
              <button
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
            ))}


          </div>
        )}
      </div>

      <Badge variant={filterStatusBadge(task.status)}>
        {filterStatus(task.status)}
      </Badge>

      <h4
        onClick={(e) => {
          e.stopPropagation();
          setShowFullTitle((prev) => !prev);
        }}
        className="mt-2 cursor-pointer text-sm font-medium break-words"
      >
        {showFullTitle ? task.title : truncate(task.title, 18)}
      </h4>

    </CardMini>
  );
}   