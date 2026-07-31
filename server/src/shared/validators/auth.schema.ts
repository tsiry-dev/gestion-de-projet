import z from "zod";

export const registerSchema = z.object({
    name: z.string()
           .trim()
           .min(2, 'Le nom doit contenir au moin 2 caractère')
           .nonempty('Le nom est requis'),

    email: z.string()
            .trim()
            .email('L\'email n\'est pas valide')
            .nonempty('L\'email est requis'),

    password: z.string()
               .min(6, 'Le mot de passe est trop courte')
               .nonempty('Le mot de passe est requis'),

    confirmPassword: z.string(),

}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["password"]
});


export const loginSchema = z.object({

    email: z.string()
            .trim()
            .nonempty('L\'email est requis'),

    password: z.string()
               .nonempty('Le mot de passe est requis'),

});
