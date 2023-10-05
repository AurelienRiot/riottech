import Image from "next/image";
import Navigations from "./components/navigations";
import GetCategories from "@/server-actions/get-categories";
import { IsProProvider } from "@/hooks/use-is-pro";
import { CategoriesProvider } from "@/providers/categories-provider";
import MouseHover from "./components/mouse-hover";
import MouseSticky from "./components/mouse-sticky";
import MouseSticky2 from "./components/mouse-sticky2";
import MouseSticky3 from "./components/mouse-sticky3";
import { CursorProvider } from "@/providers/cursor-provider";

const HomePage = async () => {
  const categories = await GetCategories();

  return (
    <IsProProvider>
      <CursorProvider>
        <CategoriesProvider categories={categories} />
        <div className="relative">
          <Image
            priority
            src="/videos/film_guimbert.jpg"
            alt="image background"
            width={1920}
            height={1080}
            className="fixed top-0 -z-10 left-0 object-cover object-center h-screen w-screen"
          />

          <Navigations />
          <div className=" relative h-screen bg-red-500/50 w-full ">
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
          <div className="h-screen bg-white/90 w-full  ">
            <MouseSticky />
          </div>
          <div className="h-screen bg-blue-600/90 w-full    ">
            <MouseSticky2 />
          </div>
          <div className="h-screen bg-teal-600/90 w-full  cursor-none  ">
            <MouseSticky3 />
          </div>
        </div>
      </CursorProvider>
    </IsProProvider>
  );
};

export default HomePage;
