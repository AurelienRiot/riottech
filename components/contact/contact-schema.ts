import { isValidPhoneNumber } from "libphonenumber-js";
import * as z from "zod";

export const contactSchema = z.object({
  name: z
    .string({
      required_error: "Veuillez entrer votre nom",
    })
    .min(1, { message: "Veuillez entrer votre nom" })
    .max(50, { message: "Le nom ne peut pas dépasser 50 caractères" }),
  email: z
    .string({
      required_error: "Veuillez entrer votre adresse email",
    })
    .email({ message: "L'email doit être un email valide" })
    .min(1, { message: "Veuillez entrer votre adresse email" })
    .max(100, { message: "L'email ne peut pas dépasser 100 caractères" }),
  subject: z.string().default(""),
  phone: z
    .string({
      required_error: "Veuillez entrer votre numéro de téléphone",
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
      invalid_type_error: "Veuillez entrer un code postal valide",
      required_error: "Veuillez entrer votre code postal",
    })
    .min(6, { message: "Veuillez entrer un code postal valide" }),
  message: z
    .string({ required_error: "Veuillez entrer votre message" })
    .min(1, { message: "Veuillez entrer votre message" })
    .max(1000, { message: "Le message ne peut pas dépasser 1000 caractères" }),
  inBretagne: z.boolean().refine((value) => value === true, {
    message: "Veuillez cochez la case",
  }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
