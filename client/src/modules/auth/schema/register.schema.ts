import z from "zod";

export const registerSchema = z.object({
    name: z.string()
           .trim()
           .nonempty('Le nom est requis')
           .min(2, 'Le nom doit contenir au moin 2 caractère'),

    email: z.string()
            .trim()
            .nonempty('L\'email est requis')
            .email('L\'email n\'est pas valide'),

    password: z.string()
               .nonempty('Le mot de passe est requis')
               .min(6, 'Le mot de passe est trop courte'),

    confirmPassword: z.string()
                      .nonempty('Le mot de passe de confirmation est requis'),

}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["password"]
});


export type RegisterForm = z.infer<typeof registerSchema>;