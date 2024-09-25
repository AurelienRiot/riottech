"use server";

import prismadb from "@/lib/prismadb";
import safeServerAction from "@/lib/server-action";
import { getSessionUser } from "@/server-actions/get-user";
import { type ContactFormValues, contactSchema } from "./contact-schema";
import { transporter } from "@/lib/nodemailer";
import { render } from "@react-email/render";
import ContactSend from "../email/contact-send";

const NODEMAILER_EMAIL = process.env.NODEMAILER_EMAIL;
const baseUrl = process.env.NEXT_PUBLIC_URL;

const createContact = async (data: ContactFormValues) =>
  await safeServerAction({
    getUser: getSessionUser,
    data,
    ignoreCheckUser: true,
    schema: contactSchema,
    serverAction: async (data) => {
      const contact = await prismadb.contact.create({
        data: {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          phone: data.phone,
          postalCode: data.postalCode,
        },
      });

      if (process.env.NODE_ENV === "production") {
        await transporter
          .sendMail({
            from: NODEMAILER_EMAIL,
            to: NODEMAILER_EMAIL,
            subject: "[NOUVEAU MESSAGE] - RIOT TECH",
            html: await render(
              ContactSend({
                baseUrl,
                url: `${baseUrl}/admin/contacts`,
                name: contact.name,
                message: contact.message,
                subject: contact.subject,
              }),
            ),
          })
          .catch((error) => console.error(error));
      }

      return { success: true, message: "Message envoyé" };
    },
  });

export { createContact };
