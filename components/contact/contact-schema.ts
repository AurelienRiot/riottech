import { isValidPhoneNumber } from "libphonenumber-js";
import * as z from "zod";

export const contactSchema = z.object({
  name: z
    .string({
      error: "Veuillez entrer votre nom",
    })
    .min(1, { message: "Veuillez entrer votre nom" })
    .max(50, { message: "Le nom ne peut pas dépasser 50 caractères" }),
  email: z
    .email({
      error: (issue) => (issue ? "Veuillez entrer votre adresse email" : "Veuillez entrer une adresse email valide"),
    })
    .min(1, { message: "Veuillez entrer votre adresse email" })
    .max(100, { message: "L'email ne peut pas dépasser 100 caractères" }),
  subject: z.string().default(""),
  phone: z
    .string({
      error: "Veuillez entrer votre numéro de téléphone",
    })
    .refine(
      (value) => {
        return isValidPhoneNumber(value);
      },
      {
        message: "Le numéro de téléphone n'est pas valide",
      },
    ),
  postalCode: z.coerce
    .number({
      error: "Veuillez entrer un code postal valide",
    })
    .min(6, { message: "Veuillez entrer un code postal valide" }),
  message: z
    .string({ error: "Veuillez entrer votre message" })
    .min(1, { message: "Veuillez entrer votre message" })
    .max(1000, { message: "Le message ne peut pas dépasser 1000 caractères" }),
  inBretagne: z.boolean().refine((value) => value === true, {
    message: "Veuillez cochez la case",
  }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
