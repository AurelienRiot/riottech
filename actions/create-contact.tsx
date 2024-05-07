"use server";

import { ContactFormValues } from "@/components/contact-form";
import prismadb from "@/lib/prismadb";

export type ContactReturnType = {
  success: boolean;
  message: string;
};

async function createContact({
  email,
  name,
  message,
  phone,
  subject,
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
        subject: subject || "",
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
