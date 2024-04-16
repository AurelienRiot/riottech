"use server";

import prismadb from "@/lib/prismadb";
import { ContactFormValues } from "./form";

export type ContactReturnType = {
  success: boolean;
  message: string;
};

async function createContact({
  email,
  name,
  message,
  phone,
  postalCode,
}: ContactFormValues): Promise<ContactReturnType> {
  try {
    await prismadb.contact.create({
      data: {
        name,
        email,
        message,
        phone,
        postalCode,
        subject: "Demande de contact",
      },
    });

    return {
      success: true,
      message: "Message envoyé",
    };
  } catch (error) {
    return {
      success: false,
      message: "Erreur, veuillez reessayer",
    };
  }
}

export { createContact };
