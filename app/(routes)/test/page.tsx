import { IsProProvider } from "@/hooks/use-is-pro";
import { CategoriesProvider } from "@/providers/categories-provider";
import { CursorProvider } from "@/providers/cursor-provider";
import Image from "next/image";
import CursorDifference from "./components/cursor-difference";
import MouseHover from "./components/mouse-hover";
import MouseSticky2 from "./components/mouse-sticky2";
import MouseSticky3 from "./components/mouse-sticky3";
import Navigations from "./components/navigations";

const HomePage = async () => {
  // const categories = await GetCategories();

  const categories = [
    {
      id: "c036ac4f-3bfc-4420-885c-76ec960a563a",
      billboardId: "13ce0a59-43f6-470e-8c6d-14e554b88e31",
      name: "Camera ",
      createdAt: new Date("2023-07-14T13:31:39.756Z"),
      updatedAd: new Date("2023-09-20T07:20:30.349Z"),
      billboard: {
        id: "13ce0a59-43f6-470e-8c6d-14e554b88e31",
        label: "Camera",
        imageUrl:
          "https://res.cloudinary.com/dsztqh0k7/image/upload/v1689341458/ho3aywwdq14cieqegc9g.png",
        createdAt: new Date("2023-07-14T13:31:02.694Z"),
        updatedAt: new Date("2023-07-22T16:51:30.474Z"),
      },
    },
    {
      id: "8b235ea6-1f69-469b-8f0d-703fbd66721d",
      billboardId: "ac9311b9-a2fe-43a5-a27a-10d5d83e40e6",
      name: "Accessoire ",
      createdAt: new Date("2023-07-14T13:31:22.460Z"),
      updatedAd: new Date("2023-07-22T16:53:51.909Z"),
      billboard: {
        id: "ac9311b9-a2fe-43a5-a27a-10d5d83e40e6",
        label: "Acessoire",
        imageUrl:
          "https://res.cloudinary.com/dsztqh0k7/image/upload/v1689341413/evsjnfice8irqdpnyrjv.png",
        createdAt: new Date("2023-07-14T13:30:16.054Z"),
        updatedAt: new Date("2023-07-22T16:52:15.085Z"),
      },
    },
  ];

  return (
    <IsProProvider>
      <CursorProvider>
        <CategoriesProvider categories={categories} />
        <Image
          src="/film_guimbert.jpg"
          alt="image background"
          width={1920}
          height={1080}
          className="fixed top-0 -z-10 left-0 object-cover object-center h-screen w-screen"
        />

        <div className=" relative h-screen bg-primary-foreground/90 w-full ">
          <Navigations />
          <div className="absolute  flex flex-col w-11/12 sm:w-4/5 lg:w-2/3 xl:w-1/2 gap-2 top-1/4 left-1/2 -translate-x-1/2  bg-primary-foreground/80 sm:p-4 p-2 rounded-lg ">
            <h1 className="text-center text-5xl ">
              Spécialisé en réseaux isolés et systèmes de surveillance
            </h1>
            <p className="text-center text-xl">
              {
                "Profitez d'une expertise reconnue pour relever les défis technologiques d'aujourd'hui et de demain."
              }
            </p>
          </div>
        </div>
        <div className="h-screen bg-green-600/90 w-full">
          <MouseHover />
        </div>
        <div className="h-screen bg-yellow-400/90 w-full">
          <CursorDifference />
        </div>
        {/* <div className="h-screen bg-white/90 w-full  ">
          <MouseSticky />
        </div> */}
        <div className="h-screen bg-blue-600/90 w-full    ">
          <MouseSticky2 />
        </div>
        <div className="h-screen bg-teal-600/90 w-full  ">
          <MouseSticky3 />
        </div>
      </CursorProvider>
    </IsProProvider>
  );
};

export default HomePage;
