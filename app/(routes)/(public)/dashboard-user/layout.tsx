import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/auth/authOptions";
import React from "react";
import prismadb from "@/lib/prismadb";

export const metadata = {
  title: "Riot Tech - Profil utilisateur",
  description: "Profil utilisateur RIOT TECH",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const callbackUrl = "/dashboard-user";
  if (!session || !session.user) {
    redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  const user = await prismadb.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  return <div className="relative h-full ">{children}</div>;
}
