"use server";

import { checkAdmin } from "@/components/auth/checkAuth";
import prismadb from "@/lib/prismadb";
import safeServerAction from "@/lib/server-action";
import { stripe } from "@/lib/stripe";
import * as z from "zod";

const simSchema = z.object({
  sim: z
    .string({
      invalid_type_error: "La Sim doit être un numéro de 19 chiffres",
      required_error: "La Sim doit être un numéro de 19 chiffres",
    })
    .trim()
    .refine((value) => /^\d{19}$/.test(value), {
      message: "La Sim doit être un numéro de 19 chiffres",
    }),
  subscriptionId: z.string(),
});

async function changeSim(data: z.infer<typeof simSchema>) {
  return await safeServerAction({
    schema: simSchema,
    data,
    getUser: checkAdmin,
    serverAction: async ({ subscriptionId, sim }) => {
      const subscription = await prismadb.subscriptionOrder.findUnique({
        where: {
          id: subscriptionId,
        },
        select: {
          stripeSubscriptionId: true,
        },
      });

      if (!subscription?.stripeSubscriptionId) {
        return {
          success: false,
          message: "Abonnement introuvable",
        };
      }

      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        metadata: {
          sim,
        },
      });

      await prismadb.subscriptionOrder.update({
        where: {
          id: subscriptionId,
        },
        data: {
          sim,
        },
      });

      return {
        success: true,
        message: "Le numéro de SIM a bien été modifié",
        data: null,
      };
    },
  });
}

export default changeSim;
