"use server";

import prismadb from "@/lib/prismadb";
import safeServerAction from "@/lib/server-action";
import { stripe } from "@/lib/stripe";
import * as z from "zod";

const schema = z.object({
  isActive: z.boolean(),
  subscriptionId: z.string(),
});

async function changeActivity(data: z.infer<typeof schema>) {
  return await safeServerAction({
    schema,
    data,
    roles: ["admin"],
    serverAction: async ({ isActive, subscriptionId }) => {
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
        pause_collection: isActive
          ? null
          : {
              behavior: "keep_as_draft", // or 'mark_uncollectible' based on your needs
            },
      });
      await prismadb.subscriptionOrder.update({
        where: {
          id: subscriptionId,
        },
        data: {
          isActive: isActive,
        },
      });
      return {
        success: true,
        message: isActive ? "Abonnement résumé" : "Abonnement mis en pause",
        data: null,
      };
    },
  });
}

export default changeActivity;
