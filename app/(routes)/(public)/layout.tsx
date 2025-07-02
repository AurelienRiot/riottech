import Footer from "@/components/footer";
import NavBar from "@/components/navbar-public/navbar";
import { IsProProvider } from "@/hooks/use-is-pro";
import { CategoriesProvider } from "@/providers/categories-provider";
import ModalProvider from "@/providers/modal-provider";
import GetCategories from "@/server-actions/get-categories";
import dynamic from "next/dynamic";
const CookiesBanner = dynamic(() => import("@/components/cookies-banner"), {
  ssr: false,
});

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <IsProProvider>
        {/* <Suspense fallback={null}>
          <ServerCategories />
        </Suspense> */}
        <ModalProvider />
        <NavBar />
        <main className="pt-16 ">{children}</main>
        <CookiesBanner />
        <Footer />
      </IsProProvider>
    </>
  );
}

async function ServerCategories() {
  const categories = await GetCategories();
  // const categories = [
  //   {
  //     id: "c036ac4f-3bfc-4420-885c-76ec960a563a",
  //     billboardId: "13ce0a59-43f6-470e-8c6d-14e554b88e31",
  //     name: "Camera ",
  //     createdAt: new Date("2023-07-14T13:31:39.756Z"),
  //     updatedAd: new Date("2023-09-20T07:20:30.349Z"),
  //     billboard: {
  //       id: "13ce0a59-43f6-470e-8c6d-14e554b88e31",
  //       label: "Camera",
  //       imageUrl:
  //         "https://res.cloudinary.com/dsztqh0k7/image/upload/v1689341458/ho3aywwdq14cieqegc9g.png",
  //       createdAt: new Date("2023-07-14T13:31:02.694Z"),
  //       updatedAt: new Date("2023-07-22T16:51:30.474Z"),
  //     },
  //   },
  //   {
  //     id: "8b235ea6-1f69-469b-8f0d-703fbd66721d",
  //     billboardId: "ac9311b9-a2fe-43a5-a27a-10d5d83e40e6",
  //     name: "Accessoire ",
  //     createdAt: new Date("2023-07-14T13:31:22.460Z"),
  //     updatedAd: new Date("2023-07-22T16:53:51.909Z"),
  //     billboard: {
  //       id: "ac9311b9-a2fe-43a5-a27a-10d5d83e40e6",
  //       label: "Acessoire",
  //       imageUrl:
  //         "https://res.cloudinary.com/dsztqh0k7/image/upload/v1689341413/evsjnfice8irqdpnyrjv.png",
  //       createdAt: new Date("2023-07-14T13:30:16.054Z"),
  //       updatedAt: new Date("2023-07-22T16:52:15.085Z"),
  //     },
  //   },
  // ];
  return <CategoriesProvider categories={categories} />;
}
