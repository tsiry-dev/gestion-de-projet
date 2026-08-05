import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/shared/components/ui/button";
import Form from "@/shared/components/ui/form/form";
import { FormItem } from "@/shared/components/ui/form/form-item";
import FormTitle from "@/shared/components/ui/form/form-title";
import Input from "@/shared/components/ui/form/input";
import Textarea from "@/shared/components/ui/form/textarea";
import { createProjectSchema, type CreateProjectDTO } from "../schema/create-project.schema";
import useCreateProject from "../hooks/useCreateProject";
import { notify } from "@/core/feedback/notify";
import LoaderDelete from "@/shared/components/loader-delete";
import { handleApiError } from "@/core/errors/handleApiError";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import LoaderButton from "@/shared/components/ui/loader-button";


export default function NewProject() {
    const [apiErrors, setApiErrors] = useState<Record<string, string>>({});
    const { mutate: createProject, isPending, error} = useCreateProject();
    const { user } = useSelector((state: RootState) => state.session);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<CreateProjectDTO>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            title: "",
            description: "",
            ownerId: user?._id || ""
        }
    });

    const onSubmit = (data: CreateProjectDTO) => {
        console.log(data);
        createProject(data, {
            onSuccess: () => {
                notify.success("Ajout avec succee");
                reset();
            },
            onError: (error) => {
                handleApiError(error, setApiErrors)
            }
        });
    };

    return <div>
        <FormTitle 
          title="Nouveau projet"
          description="Créer votre nouveau projet"
        />
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormItem error={errors.title?.message || apiErrors.title} label="Nom du projet">
                <Input disabled={isPending} {...register('title')} />
            </FormItem>
            <FormItem error={errors.description?.message} label="Description du projet">
                <Textarea disabled={isPending} {...register('description')} />
            </FormItem>
            <Button  disabled={isPending} className="">
              {isPending ?
                <LoaderButton title="Ajout en cours..."/>
               :
                 "Ajouté"
               }
            </Button>
        </Form>
    </div>
}