import z from "zod";
import  { Types } from "mongoose";
import { ProjectStatus } from "@/models/project.model";


export const createProjectSchema = z.object({
    title: z.string()
             .min(2)
             .nonempty('Le titre est requis'),

    description: z.string(),
    ownerId: z.string()
             .nonempty('L\'id du propriétaire est requis'),
});


export const projectIdSchema = z.object({
  id: z.string().refine(
    (value) => Types.ObjectId.isValid(value),
    {
      message: "Le projet n'est pas valide ou n'existe pas",
    }
  )
});

export type CreateProjectDTO = z.infer<typeof createProjectSchema>;

export const removeIdsSchema = z.object({
  ids: z.array(
    z.string().refine(
       (id) => Types.ObjectId.isValid(id),
       {message: "ID invalides"}
    )
    .min(1, "Au moins un ID est requis"),
  )
});


export const updateProjectSchema = z.object({
   id: z.string()
         .nonempty("L'id est requis"),

   title: z.string()
            .nonempty("Le titre est requis"),

   description: z.string(),

   status: z.enum(ProjectStatus)
});

export type UpdateProjectDTO = z.infer<typeof updateProjectSchema>;