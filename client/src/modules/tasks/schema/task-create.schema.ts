import { z } from "zod";

export const taskCreateSchema = z
  .object({
    title: z
      .string()
      .trim()
      .nonempty("Le titre est obligatoire")
      .min(3, "Le titre doit contenir au moins 3 caractères")
      .max(150, "Le titre ne doit pas dépasser 150 caractères"),

  });

export type TaskCreateDTO = z.infer<typeof taskCreateSchema>;