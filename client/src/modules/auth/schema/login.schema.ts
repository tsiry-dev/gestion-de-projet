import z from "zod";

export const loginSchema = z.object({

    email: z.string()
            .trim()
            .nonempty('L\'email est requis'),

    password: z.string()
               .nonempty('Le mot de passe est requis')

});


export type LoginForm = z.infer<typeof loginSchema>;