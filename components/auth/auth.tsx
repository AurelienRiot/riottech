"use client";

import type { DefaultSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";
import { signOut } from "next-auth/react";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: string;
  }
}

export const Logout = ({ callbackUrl }: { callbackUrl: string }) => {
  signOut({
    callbackUrl: `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`,
  });
  return null;
};
