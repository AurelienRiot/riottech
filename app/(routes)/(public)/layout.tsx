import GetCategories from "@/server-actions/get-categories";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar-public/navbar";
import ModalProvider from "@/providers/modal-provider";
import { getServerSession } from "next-auth";
import React from "react";
import { IsProProvider } from "@/hooks/use-is-pro";
import { CategoriesProvider } from "@/providers/categories-provider";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const categories = await GetCategories();

  return (
    <>
      <IsProProvider>
        <CategoriesProvider categories={categories} />
        <ModalProvider />
        <NavBar role={session?.user?.role} />
        <div className="pt-16 ">{children}</div>
        <Footer />
      </IsProProvider>
    </>
  );
}
