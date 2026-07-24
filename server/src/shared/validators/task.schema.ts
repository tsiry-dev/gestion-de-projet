import { TaskStatus } from "@/models/task.model";
import { Types } from "mongoose";
import z from "zod";

export const createTaskSchema = z.object({
    projectId: z.string().refine(
        (value) => Types.ObjectId.isValid(value),
        {
          message: "Le tache n'est pas valide ou n'existe pas",
        }
    ),

    title: z.string()
         .nonempty('Le titre est obligatoire')
});

export type createTaskDTO = z.infer<typeof createTaskSchema>;

export const taskIdSchema = z.object({
  id: z.string()
});

export const updateTaskSchema = z.object({
     id: z.string()
           .nonempty("L'id est requis"),
  
     title: z.string()
              .nonempty("Le titre est requis"),
    startDate: z.coerce.date({
      message: "La date début est obligatoire",
    }),

    endDate: z.coerce.date({
      message: "La date fin est obligatoire",
    }),
  
     status: z.enum(TaskStatus)
}).refine(
  (date) => date.startDate < date.endDate,
  {
    message: "La date de fin doit etre superieur a celle de la date su début",
    path: ["startDate"]
  }
);


export type UpdateTaskDTO = z.infer<typeof updateTaskSchema>

export const removeTaskIdsSchema = z.object({
  ids: z.array(
    z.string()
  )
});

export const updateTaskStatusSchema = z.object({
   taskId: z.string()
            .nonempty('L id est requis'),

   status: z.enum(TaskStatus)
});

export type UpdateTaskStatusDTO = z.infer<typeof updateTaskStatusSchema>