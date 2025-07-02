import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
  apiVersion: "2025-06-30.basil",
  typescript: true,
});

export const taxe = 1.2;
