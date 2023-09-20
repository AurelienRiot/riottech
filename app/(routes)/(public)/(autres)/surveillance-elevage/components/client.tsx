"use client";
import { Billboard } from "@/types";
import BoutonRedirection from "./bouton-redirection";

const Client = ({ billboard }: { billboard: Billboard }) => {
  return (
    <>
      <div
        className="rounded-b-xl relative aspect-square md:aspect-[3.3/1] overflow-hidden bg-cover"
        style={{ backgroundImage: `url(${billboard.imageUrl})` }}
      ></div>
      <BoutonRedirection />
    </>
  );
};

export default Client;
