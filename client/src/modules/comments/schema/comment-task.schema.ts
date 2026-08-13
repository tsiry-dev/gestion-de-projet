import z from "zod";

export const commentTaskSchema = z.object({
    ownerProject: z.string()
            .nonempty("Le tache n'est pas valide!"),
    taskId: z.string()
            .nonempty("Le tache n'est pas valide!"),

    content: z.string()
            .nonempty("Le tache n'est pas valide!")
            .max(255,"Le commentaire est trop long!")
});

