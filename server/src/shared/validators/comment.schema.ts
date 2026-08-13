import z from "zod";

export const createCommentSchema = z.object({
    ownerProject: z.string()
                   .nonempty(),
    taskId: z.string()
             .nonempty(),

    content: z.string()
              .nonempty("Le champ est requis!"),
});

export type CreateCommentDTO = z.infer<typeof createCommentSchema>;