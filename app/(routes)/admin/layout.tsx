import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/auth/authOptions";
import React from "react";
import Navbar from "@/components/navbar-admin/navbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const callbackUrl = "/admin";
  if (!session || !session.user || session.user.role !== "admin") {
    redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  return (
    <div className="relative h-full ">
      <Navbar />
      {children}
    </div>
  );
}
