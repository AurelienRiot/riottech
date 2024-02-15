"use client";

import { DefaultSession } from "next-auth";
import { signOut } from "next-auth/react";

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

export const Logout = ({ callbackUrl }: { callbackUrl: string }) => {
  signOut({
    callbackUrl: `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`,
  });
  return null;
};
