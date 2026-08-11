import Button from "@/shared/components/ui/button";
import Form from "@/shared/components/ui/form/form";
import { FormItem } from "@/shared/components/ui/form/form-item";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { taskCreateSchema, type TaskCreateDTO } from "../schema/task-create.schema";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import { notify } from "@/core/feedback/notify";
import Textarea from "@/shared/components/ui/form/textarea";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { handleResetEditTask } from "@/app/store/features/taskSlice";
import LoaderButton from "@/shared/components/ui/loader-button";

export default function EditTask()  {

   const { projectDetailId: projectId,  } = useSelector((state: RootState) => state.projects);
   const { taskEdit } = useSelector((state: RootState) => state.tasks);
   const dispatch = useDispatch();
     const {
       mutate: updateTaskQuery, 
       isPending: isPendingUpdateTask
     } = useUpdateTask(projectId);


  const {
      register,
      handleSubmit,
      formState: {errors}
  } = useForm<TaskCreateDTO>({
      resolver: zodResolver(taskCreateSchema),
      defaultValues: {
        title: taskEdit?.title,
      }
  });



  const handleUpdateTask = (data: any) => {
    const newTask = {
      ...data,
      id: taskEdit?._id
    }
    updateTaskQuery(newTask, {
      onSuccess: () => {
          notify.success("Modification réussit!");
          dispatch(handleResetEditTask());
      }
    });
    console.log(newTask);
  }

  return (

      <Form 
       onClick={e => e.stopPropagation()}
       onSubmit={handleSubmit(handleUpdateTask)}>

        <FormItem
          label=""
          error={errors.title?.message}
        >
          <Textarea disabled={isPendingUpdateTask} rows={3} {...register("title")}>
          </Textarea >
        </FormItem>

            <Button $variant="warning" disabled={isPendingUpdateTask}>
              {isPendingUpdateTask ?
                <LoaderButton title="Mis à jour..."/>
               :
                 "Modifier"
               }
            </Button>

      </Form>
  );
}