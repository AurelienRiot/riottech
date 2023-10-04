import GetCategories from "@/server-actions/get-categories";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar-public/navbar";
import ModalProvider from "@/providers/modal-provider";
import React, { Suspense } from "react";
import { IsProProvider } from "@/hooks/use-is-pro";
import { CategoriesProvider } from "@/providers/categories-provider";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <IsProProvider>
        <Suspense fallback={null}>
          <ServerCategories />
        </Suspense>
        <ModalProvider />
        <NavBar />
        <div className="pt-16 ">{children}</div>
        <Footer />
      </IsProProvider>
    </>
  );
}

async function ServerCategories() {
  const categories = await GetCategories();
  return <CategoriesProvider categories={categories} />;
}
