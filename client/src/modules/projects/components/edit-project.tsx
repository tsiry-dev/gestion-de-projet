import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/shared/components/ui/button";
import Form from "@/shared/components/ui/form/form";
import { FormItem } from "@/shared/components/ui/form/form-item";
import FormTitle from "@/shared/components/ui/form/form-title";
import Input from "@/shared/components/ui/form/input";
import Textarea from "@/shared/components/ui/form/textarea";
import { notify } from "@/core/feedback/notify";
import LoaderDelete from "@/shared/components/loader-delete";
import Select from "@/shared/components/ui/form/form-select";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import { updateProjectSchema, type UpdateProjectDTO } from "../schema/update-project.schema";
import useUpdateProject from "../hooks/useUpdateProject";
import { edit, onCloseUpdateProject, resetEdit } from "@/app/store/features/projectSlice";
import { useState } from "react";
import { handleApiError } from "@/core/errors/handleApiError";


type StatusType = {
    key: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
    value: string;
}

const STATUS: StatusType[] = [
    {key: "NOT_STARTED", value: 'Non commené'},
    {key: "IN_PROGRESS", value: 'En cours'},
    {key: "COMPLETED", value: 'Terminé'},
];


export default function EditProject() {

    const [apiErrors, setApiErrors] = useState<Record<string, string>>({});
    const { mutate: updateProject, data, isPending, error} = useUpdateProject();
    const { editProject } = useSelector((state: RootState) => state.projects);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<UpdateProjectDTO>({
        resolver: zodResolver(updateProjectSchema),
        defaultValues: {
            title: editProject?.title ?? "",
            description: editProject?.description ?? "",
            status: editProject?.status
        }
    });

    const onSubmit = (data: UpdateProjectDTO) => {
        if (!editProject) return;

        const dataUpdate = {
            id: editProject._id,
            title: data.title,
            description: data.description,
            status: data.status,
        };

        console.log(dataUpdate);

        updateProject(
            {
               data: dataUpdate,
            },
            {
                onSuccess: () => {
                    notify.success("Modification avec succès");

                    dispatch(resetEdit());

                    dispatch(onCloseUpdateProject());

                    reset({
                        title: dataUpdate.title,
                        description: dataUpdate.description,
                        status: dataUpdate.status,
                    });

                },
                onError: (error) => {
                   handleApiError(error, setApiErrors);
                },
            }
        );
    };

    return <div>
        <FormTitle 
          title="Modifier le projet"
          description="Modifier votre projet"
        />
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormItem error={errors.title?.message || apiErrors.title} label="Nom du projet">
                <Input disabled={isPending} {...register('title')} />
            </FormItem>

            <FormItem error={errors.description?.message} label="Description du projet">
                <Textarea disabled={isPending} {...register('description')} />
            </FormItem>

            <FormItem label="Status du projet">
                <Select  {...register("status")}>
                    <option value="" disabled>
                        Sélectionner le status
                    </option>

                    {STATUS.map((status) => (
                        <option 
                            key={status.key} 
                            value={status.key}
                        >
                        {status.value}
                        </option>
                    ))}

                </Select>
            </FormItem>

            <Button type="submit" disabled={isPending} className="relative z-50 mt-50">
              {isPending ?
                <LoaderDelete />
               :
                 "Modifier"
               }
            </Button>
        </Form>
    </div>
}