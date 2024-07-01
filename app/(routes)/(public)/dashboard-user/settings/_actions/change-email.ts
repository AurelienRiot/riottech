"use server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { getDbUser } from "@/server-actions/get-user";
import type { ReturnTypeServerAction } from "@/types";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email(),
});

async function changeEmail(email: string): Promise<ReturnTypeServerAction<null>> {
  const validate = formSchema.safeParse({ email });
  if (!validate.success) {
    return {
      success: false,
      message: "Le format de l'email n'est pas valide",
    };
  }
  const user = await getDbUser();

  if (!user?.email || !user.stripeCustomerId) {
    return {
      success: false,
      message: "Veuillez vous connecter",
    };
  }

  if (user.email === email) {
    return {
      success: false,
      message: "Le nouvel email est le même que l'ancien",
    };
  }

  try {
    await stripe.customers.update(user.stripeCustomerId, {
      email: email,
    });

    await prismadb.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: email,
        accounts: {
          deleteMany: {},
        },
        sessions: {
          deleteMany: {},
        },
      },
    });
  } catch (error) {
    return {
      success: false,
      message: "Une erreur est survenue",
    };
  }

  return {
    success: true,
    data: null,
  };
}

export default changeEmail;
