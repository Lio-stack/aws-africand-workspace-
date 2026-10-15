import { z } from "zod";

// Connexion sans mot de passe : l'utilisateur reçoit un code à 6 chiffres par e-mail.
export const loginRequestSchema = z.object({
  email: z
    .string({ error: "Saisissez votre adresse e-mail." })
    .trim()
    .min(1, { error: "Saisissez votre adresse e-mail." })
    .max(254, { error: "Adresse e-mail trop longue." })
    .pipe(z.email({ error: "Saisissez une adresse e-mail valide, par exemple nom@entreprise.com." })),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;
