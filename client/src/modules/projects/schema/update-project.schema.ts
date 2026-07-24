import { z } from "zod";
import { ProjectStatus } from "../type";

export const updateProjectSchema = z.object({
  title: z
    .string()
    .nonempty('Le titre est obligatoire')
    .max(25, "Le nom doit contenir moin de 20 caractère!")
    .min(3, "Le nom du projet doit contenir au moins 3 caractères"),

  description: z
    .string()
    .nonempty("La description est obligatoire")
    .min(10, "La description doit contenir au moins 10 caractères"),

  status: z.enum([
    ProjectStatus.NOT_STARTED,
    ProjectStatus.IN_PROGRESS,
    ProjectStatus.COMPLETED,
  ]),
});

export type UpdateProjectDTO = z.infer<typeof updateProjectSchema>;