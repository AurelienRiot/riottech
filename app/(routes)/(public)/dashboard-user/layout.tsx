import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/auth/authOptions";
import React from "react";

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
  if (!session) {
    redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  return <div className="relative h-full ">{children}</div>;
}
