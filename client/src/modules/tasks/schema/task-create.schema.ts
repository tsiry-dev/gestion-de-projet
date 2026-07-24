import { z } from "zod";
import { TaskStatus } from "../type";

export const taskCreateSchema = z
  .object({
    title: z
      .string()
      .trim()
      .nonempty("Le titre est obligatoire")
      .min(3, "Le titre doit contenir au moins 3 caractères")
      .max(25, "Le titre ne doit pas dépasser 25 caractères"),

    startDate: z.date({
      error: "La date de début est obligatoire",
    }),

    endDate: z.date({
      error: "La date de fin est obligatoire",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.endDate < data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message:
          "La date de fin doit être supérieure ou égale à la date de début",
      });
    }
  });

export type TaskCreateDTO = z.infer<typeof taskCreateSchema>;