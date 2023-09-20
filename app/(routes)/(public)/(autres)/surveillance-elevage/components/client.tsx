"use client";
import { Billboard } from "@prisma/client";
import BoutonRedirection from "./bouton-redirection";
import NotFound from "@/app/not-found";

const Client = ({ billboard }: { billboard: Billboard | null }) => {
  if (!billboard) {
    return <NotFound />;
  }

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
