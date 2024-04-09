import { redirect } from "next/navigation";
import React from "react";
import { Logout } from "@/components/auth/auth";
import getFullUser from "@/server-actions/get-user";

export const metadata = {
  title: "RIOT TECH - Profil utilisateur",
  description: "Profil utilisateur RIOT TECH",
};

const baseUrl = process.env.NEXT_PUBLIC_URL;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getFullUser();
  const callbackUrl = "/dashboard-user";

  if (!user) {
    return <Logout callbackUrl={baseUrl + callbackUrl} />;
  }

  if (user.role === "admin") {
    redirect("/admin");
  }

  return <div className="relative h-full ">{children}</div>;
}
