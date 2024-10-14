"use client";

import Loading from "@/app/(routes)/(public)/loading";
import type { Role } from "@prisma/client";
import type { DefaultSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";
import { signOut } from "next-auth/react";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: Role;
  }
}

export const Logout = ({ callbackUrl = "/" }: { callbackUrl?: string }) => {
  if (typeof window !== "undefined") {
    signOut({
      callbackUrl,
    });
  }
  return <Loading />;
};
