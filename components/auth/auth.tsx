"use client";

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      role: string;
      isPro: boolean;
      stripeCustomerId: string;
    } & DefaultSession["user"];
  }
}
