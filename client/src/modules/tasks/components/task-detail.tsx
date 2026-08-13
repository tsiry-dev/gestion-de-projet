import { CgDanger } from "react-icons/cg";
import { VscClose } from "react-icons/vsc";
import { FaRegCommentDots } from "react-icons/fa";

import { removeTaskViewStore } from "@/app/store/features/taskSlice";
import type { RootState } from "@/app/store/store";
import { filterStatus, filterStatusBadge } from "@/modules/projects/utils";
import Badge from "@/shared/components/ui/badge";
import Button from "@/shared/components/ui/button";
import Form from "@/shared/components/ui/form/form";
import Textarea from "@/shared/components/ui/form/textarea";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { LiaTelegramPlane } from "react-icons/lia";
import ContainerOverflowYSm from "@/shared/components/ui/container-overflow-y-sm";
import { truncate } from "@/shared/utils/string.utils";
import { useEffect, useRef, useState } from "react";
import useCommentTask from "@/modules/comments/hooks/useCommentTask";
import { useForm } from "react-hook-form";
import type { CommenTaskDTO } from "@/modules/comments/dto/commentTaskDTO";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentTaskSchema } from "@/modules/comments/schema/comment-task.schema";
import { FormItem } from "@/shared/components/ui/form/form-item";
import { notify } from "@/core/feedback/notify";
import type { Project } from "@/modules/projects/type";
import type { Comment } from "../type";
import { formatRelativeDate } from "@/shared/utils/date";


import LoaderButton from "@/shared/components/ui/loader-button";





type Props = {
  project: Project
}

export default function TaskDetail({ project }: Props) {

  const [isOpenFullTitle, setIsOpenFullTitle] = useState<boolean>(false);
  const commentsContainerRef = useRef<HTMLDivElement | null>(null);

  const { taskView: task } = useSelector((state: RootState) => state.tasks);
  const { user} = useSelector((state: RootState) => state.session);
  const dispatch = useDispatch();

  const { mutate: commentTaskQuery, isPending, error } = useCommentTask(project?._id);

  console.log(task);

  useEffect(() => {
    if (!commentsContainerRef.current) return;

    commentsContainerRef.current.scrollTo({
        top: commentsContainerRef.current.scrollHeight,
        behavior: "smooth",
    });
  }, [task?.comments?.length]);

  const  {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CommenTaskDTO>({
       resolver: zodResolver(commentTaskSchema),
      defaultValues: {
        ownerProject: project.ownerId,
        taskId: task?._id,
        content: ""
      }
  })

  const handleCommentTask = (data: CommenTaskDTO) => {
    console.log(data)
    commentTaskQuery(data, {
        onSuccess: (response) => {
           console.log(response);
           reset();
        },
        onError: (error: any) => {
           notify.error(error.response?.data?.message);
        }
    });
  }

  const viewChat = (userId: string) => {
    if(userId === user?._id) {
      return "";
    }else {
      return "ml-auto"
    }
  }
  const bgChat = (userId: string) => {
    if(userId === user?._id) {
      return "bg-gray-200";
    }else {
      return "bg-blue-200"
    }
  }



  return (
      <div className="p-1 rounded-md">
          <div className="flex justify-between">
            <div>
              <Badge $variant={filterStatusBadge(task?.status as string)}>
                {filterStatus(task?.status as string)}
              </Badge>
            </div>
            <Button $variant="danger" onClick={() => dispatch(removeTaskViewStore())}>
              <MdClose />
            </Button>
          </div>

          <div className="text-xs mt-2">
          {task?.teamId ? (
            <span>
                Assigné à <strong>{task?.teamId?.name}</strong>
            </span>
          ): (
            <span className="text-red-500">Non assigné</span>
          )}
          </div>

          <h2
            onClick={() => setIsOpenFullTitle(old => !old)} 
            className="mt-2 cursor-pointer text-sm font-mediumbreak-words hover:text-blue-500">
             {isOpenFullTitle ? task?.title : truncate(task?.title as string ?? "" ,30)}
          </h2>

          <div className="mt-">
              <strong className="text-sm">
                  Messages ({task?.comments.length ?? 0})
              </strong>
              <ContainerOverflowYSm ref={commentsContainerRef} className="h-[295px] mt-2">
                  {task?.comments.length ?? 0 > 0 ?
                    <div>
                        {task?.comments.map((comment: Comment) => (
                            <div key={comment._id} className={`w-[80%] ${viewChat(comment?.userId)}`}>
                                <span className="text-[8px] text-gray-500">
                                    {formatRelativeDate(comment?.createdAt)}
                                </span>

                                <div className={`flex mb-2 relative ${bgChat(comment?.userId)} rounded-md group`}>
                                   { user?._id === comment?.userId && (
                                      <Badge $variant="danger" className="absolute top-[-4px] right-[-2px] opacity-0 group-hover:opacity-100">
                                        <VscClose />
                                      </Badge>
                                   )}
                                    <div className=" p-2">
                                        <p className="text-xs">
                                            {comment.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                  :
                    <div className="text-center p-2">
                        <h2 className="flex gap-2 items-center mt-5 text-yellow-600">
                          <CgDanger  size={25}/> 
                          <span>Aucun commentaire!!</span>
                        </h2>
                    </div>
                  }
              </ContainerOverflowYSm>
          </div>

          {/* form comment  */}
          {task?.teamId ? (
            <div className="mt-2 mr-1">
              <Form onSubmit={handleSubmit(handleCommentTask)} className="flex gap-2 items-start">
                <FormItem error={errors.content?.message}>
                  <Textarea disabled={isPending} {...register('content')}></Textarea>
                </FormItem>
                <div className="w-[10%]">
                  <Button>
                    {isPending ? 
                    <LoaderButton />
                    : 
                      <LiaTelegramPlane />
                    }
                  </Button>
                </div>
              </Form>
            </div>
          ) : (
            <div className="text-center">
               <h2 className="text-md text-red-600 flex gap-2 items-center justify-center">
                 <FaRegCommentDots size={20} /> 
                 <span className="font-bold">Chat non disponible!!</span>
               </h2>
               <p className="text-sm">Veiller réassigner le tache!!</p>
            </div>
          )}
      </div>
  )
}