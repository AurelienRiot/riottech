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

  const existingUser = await prismadb.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return {
      success: false,
      message: "Un compte avec cet email existe déja",
    };
  }

  try {
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
    await stripe.customers.update(user.stripeCustomerId, {
      email,
    });

    const paymentMethods = await stripe.paymentMethods.list({
      customer: user.stripeCustomerId,
    });
    for (const paymentMethod of paymentMethods.data) {
      await stripe.paymentMethods.update(paymentMethod.id, {
        billing_details: {
          email,
        },
      });
    }
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
