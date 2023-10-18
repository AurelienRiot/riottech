"use client";
import { TurbCursor } from "@/components/cursor/turb-cursor";
import { StickyCursor } from "@/components/cursor/sticky-cursor";
import { Menu, MenuSquare } from "lucide-react";

const MouseSticky3 = () => {
  return (
    <div className="w-full h-full flex flex-wrap gap-40 items-center justify-center ">
      <StickyCursor
        as="button"
        className="  rounded-md text-primary hover:text-primary-foreground"
      >
        <Menu className="h-10 w-10 " />
      </StickyCursor>
      <ExtraDiv />
      <TurbCursor
        as="div"
        className=" bg-red-600 rounded-md text-primary hover:text-primary-foreground "
      >
        <MenuSquare className="h-10 w-20  " />
      </TurbCursor>
    </div>
  );
};

export default MouseSticky3;

function ExtraDiv() {
  return (
    <TurbCursor
      className="rounded-md hover:text-primary-foreground text-primary bg-gray-400 transition-colors"
      scaleOffset={1.5}
    >
      <div className="w-[250px] h-[200px] overflow-hidden  ">
        <h1 className="text-3xl font-bold">{"Secteur d'intervention"}</h1>
        <p>
          RIOT TECH est basé dans le Morbihan (56) et intervient pour les
          installations et SAV sur toute la région.
        </p>
      </div>
    </TurbCursor>
  );
}
