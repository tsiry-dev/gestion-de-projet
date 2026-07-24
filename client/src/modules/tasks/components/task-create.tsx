import Button from "@/shared/components/ui/button";
import Form from "@/shared/components/ui/form/form";
import { FormItem } from "@/shared/components/ui/form/form-item";
import FormTitle from "@/shared/components/ui/form/form-title";
import Input from "@/shared/components/ui/form/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { taskCreateSchema, type TaskCreateDTO } from "../schema/task-create.schema";
import useCreateTask from "../hooks/useTaskCreate";
// import { notify } from "@/core/feedback/notify";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import { useEffect } from "react";
import { notify } from "@/core/feedback/notify";
import LoaderDelete from "@/shared/components/loader-delete";

export default function TaskCreate()  {

   const { projectDetailId } = useSelector((state: RootState) => state.projects);



    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<TaskCreateDTO>({
        resolver: zodResolver(taskCreateSchema),
        defaultValues: {
          title: "",
          startDate: undefined,
          endDate: undefined,
        }
    });


    const { mutate: createTask, isPending, error } = useCreateTask();

  const onSubmit = (data: Omit<TaskCreateDTO, "projectId">) => {
     const payload = {
      ...data,
        projectId: projectDetailId
     };

     createTask(payload, {
        onSuccess: () => {
          notify.success("Tacjhe créer avex success!!")
        }
     });
     console.log(payload);
  }

  return (
    <div>
      <FormTitle
        title="Créer une nouvelle tâche"
        description="Ajouter une nouvelle tâche à ce projet"
      />

      <Form onSubmit={handleSubmit(onSubmit)}>

        <FormItem
          label="Nom de la tâche"
          error={errors.title?.message}
        >
          <Input 
            placeholder="Name of task..."
            {...register("title")}
          />
        </FormItem>


        <div className="flex gap-2">

          <div className="flex-1">
            <FormItem
              label="Date de début"
              error={errors.startDate?.message}
            >
              <Input
                type="date"
                {...register("startDate", {
                  valueAsDate: true,
                })}
              />
            </FormItem>
          </div>


          <div className="flex-1">
            <FormItem
              label="Date de fin"
              error={errors.endDate?.message}
            >
              <Input
                type="date"
                {...register("endDate", {
                  valueAsDate: true,
                })}
              />
            </FormItem>
          </div>

        </div>


            <Button disabled={isPending}>
              {isPending ?
                <LoaderDelete />
               :
                 "Ajouté"
               }
            </Button>

      </Form>
    </div>
  );
}