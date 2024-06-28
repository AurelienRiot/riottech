import type { Metadata } from "next";
import type React from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Profil utilisateur",
    description: "Consultez votre profil utilisateur et vos informations de paiement RIOT TECH",
  };
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="relative h-full ">{children}</div>;
}
