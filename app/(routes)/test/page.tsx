import { IsProProvider } from "@/hooks/use-is-pro";
import { CategoriesProvider } from "@/providers/categories-provider";
import { CursorProvider } from "@/providers/cursor-provider";
import Image from "next/image";
import CursorDifference from "./components/cursor-difference";
import MouseHover from "./components/mouse-hover";
import MouseSticky2 from "./components/mouse-sticky2";
import MouseSticky3, { Carousel } from "./components/mouse-sticky3";
import Navigations from "./components/navigations";
import ParticleRing from "./components/particle-ring";
import CSSCarousel from "./components/css-carousel";
import BlopSVG from "./components/blop";
import SubscriptionEmail from "@/components/email/subscription";

const HomePage = async () => {
  // const categories = await GetCategories();

  const categories = [
    {
      id: "a14f5be7-1253-44b5-a151-0ff95a0f5035",
      billboardId: "13ce0a59-43f6-470e-8c6d-14e554b88e31",
      name: "Camera ",
      createdAt: new Date("2023-07-14T13:31:39.756Z"),
      updatedAd: new Date("2023-09-20T07:20:30.349Z"),

      imageUrl:
        "https://res.cloudinary.com/dsztqh0k7/image/upload/v1689341458/ho3aywwdq14cieqegc9g.png",
    },
    {
      id: "5595e683-4e0b-43da-8c56-586680353bf5",
      billboardId: "ac9311b9-a2fe-43a5-a27a-10d5d83e40e6",
      name: "Accessoire ",
      createdAt: new Date("2023-07-14T13:31:22.460Z"),
      updatedAd: new Date("2023-07-22T16:53:51.909Z"),

      imageUrl:
        "https://res.cloudinary.com/dsztqh0k7/image/upload/v1689341413/evsjnfice8irqdpnyrjv.png",
    },
  ];

  return (
    <IsProProvider>
      {/* <CursorProvider className="cursor-none  "> */}
      <CategoriesProvider categories={categories} />
      <Image
        src="/film_guimbert.jpg"
        alt="image background"
        width={1920}
        height={1080}
        className="fixed left-0 top-0 -z-10 h-screen w-screen object-cover object-center"
      />
      <Navigations />
      {/* 
       
        <div className=" relative flex h-screen w-full bg-primary-foreground/90  ">
          <div
            className={
              "absolute left-[33%] top-[40%] h-72 w-72 animate-blob rounded-full  bg-purple-300 opacity-70 mix-blend-multiply blur-xl"
            }
          />
          <div
            className="absolute left-[47%] top-[40%]  h-72 w-72 animate-blob rounded-full bg-yellow-300 opacity-70 mix-blend-multiply blur-xl"
            style={{ animationDelay: "5000ms" }}
          ></div>
          <div
            className="absolute left-[40%] top-[45%] h-72 w-72 animate-blob rounded-full bg-pink-300 opacity-70 mix-blend-multiply  blur-xl "
            style={{ animationDelay: "10000ms" }}
          ></div>

          <div className="absolute  left-1/2 top-[45%] flex w-11/12 -translate-x-1/2 flex-col gap-2 rounded-lg bg-primary-foreground/40 p-2  opacity-100 sm:w-4/5 sm:p-4 lg:w-2/3 xl:w-1/2 ">
            <h1 className="text-center text-[clamp(20px,4vw+5px,50px)] ">
              Spécialisé en réseaux isolés et systèmes de surveillance
            </h1>
            <p className="text-center text-xl">
              {
                "Profitez d'une expertise reconnue pour relever les défis technologiques d'aujourd'hui et de demain."
              }
            </p>
          </div>
          <BlopSVG />
        </div>
        <div className="h-screen w-full bg-green-600/90 ">
          <MouseHover />
        </div>
        <div className="h-screen w-full bg-yellow-400/90 ">
          <CursorDifference />
        </div>

        <div className="h-[100vh] w-full bg-blue-600/90    ">
          <MouseSticky2 />
        </div>
        <div className="h-screen w-full bg-teal-600/90  ">
          <MouseSticky3 />
        </div> */}
      <div className="h-screen w-full bg-teal-600/90  "></div>
      <Carousel />
      {/* <div className="h-screen  w-full  ">
          <ParticleRing />
        </div> */}
      {/* </CursorProvider> */}
    </IsProProvider>
  );
};

export default HomePage;
