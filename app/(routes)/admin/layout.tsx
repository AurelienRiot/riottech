import { Logout } from "@/components/auth/auth";
import { checkAdmin } from "@/components/auth/checkAuth";
import Navbar from "@/components/navbar-admin/navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import React from "react";

const baseUrl = process.env.NEXT_PUBLIC_URL;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const callbackUrl = "/admin";

  const isAuth = await checkAdmin();
  if (!isAuth) {
    return (
      <Logout
        callbackUrl={`/login?callbackUrl=${encodeURIComponent(baseUrl + callbackUrl)}`}
      />
    );
  }

  return (
    <TooltipProvider delayDuration={100} skipDelayDuration={0}>
      <div className="relative h-full ">
        <Navbar />
        {children}
      </div>
    </TooltipProvider>
  );
}
