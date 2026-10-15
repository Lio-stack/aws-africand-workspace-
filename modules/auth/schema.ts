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

const required = (label: string) => z.string({ error: `${label} est obligatoire.` }).trim().min(1, { error: `${label} est obligatoire.` });
const professionalEmail = z
  .string({ error: "Saisissez votre adresse e-mail." })
  .trim()
  .min(1, { error: "Saisissez votre adresse e-mail." })
  .pipe(z.email({ error: "Saisissez une adresse e-mail valide, par exemple nom@entreprise.com." }));
const acceptedTerms = z.literal("on", { error: "Vous devez accepter les conditions pour continuer." });

// Inscription consultant (écran 07).
export const consultantSignupSchema = z.object({
  firstName: required("Le prénom"),
  lastName: required("Le nom"),
  email: professionalEmail,
  country: required("Le pays de résidence"),
  experience: required("Les années d'expérience"),
  domain: required("Le domaine principal"),
  linkedin: z.union([z.literal(""), z.url({ error: "Saisissez une URL complète, par exemple https://www.linkedin.com/in/..." })]),
  terms: acceptedTerms,
});

// Inscription entreprise (écran 08).
export const companySignupSchema = z.object({
  companyName: required("La raison sociale"),
  country: required("Le pays du siège"),
  organizationType: required("Le type d'organisation"),
  registration: required("Le numéro RCCM ou l'identifiant légal"),
  firstName: required("Le prénom"),
  lastName: required("Le nom"),
  role: required("La fonction"),
  email: professionalEmail,
  terms: acceptedTerms,
});
