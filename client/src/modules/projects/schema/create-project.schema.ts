import { z } from "zod";

export const createProjectSchema = z.object({
  title: z
    .string()
    .nonempty('Le titre est obligatoire')
    .max(200, "Le nom doit contenir moin de 20 caractère!")
    .min(2, "Le nom du projet doit contenir au moins 3 caractères"),

  description: z
    .string()
    .nonempty("La description est obligatoire")
    .min(2, "La description doit contenir au moins 10 caractères"),

  ownerId: z.string()
});

export type CreateProjectDTO = z.infer<typeof createProjectSchema>;