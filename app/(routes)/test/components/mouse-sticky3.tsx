"use client";
import { StickyCursor } from "@/hooks/use-cursor";
import { Menu, MenuSquare } from "lucide-react";

const MouseSticky3 = () => {
  return (
    <div className="w-full h-full flex flex-wrap gap-4 items-center justify-center">
      <StickyCursor
        as="button"
        className=" bg-red-600   rounded-md"
        onClick={() => {
          console.log("click");
        }}
      >
        <Menu className="h-10 w-10 " />
      </StickyCursor>
      {/* <ExtraDiv /> */}
      <StickyCursor as="div" className=" bg-red-600 rounded-md">
        <MenuSquare className="h-10 w-10  " />
      </StickyCursor>
    </div>
  );
};

export default MouseSticky3;

function ExtraDiv() {
  return (
    // <StickyCursor className="rounded-md">
    <div>
      <h1 className="text-3xl font-bold">{"Secteur d'intervention"}</h1>
      <p>
        RIOT TECH est basé dans le Morbihan (56) et intervient pour les
        installations et SAV sur toute la région.
      </p>
      <p>Et sur toute la France métropolitaine pour les Box 4G.</p>
    </div>
    // </StickyCursor>
  );
}
