"use client";
import BoutonRedirection from "./bouton-redirection";

const Client = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <>
      <div
        className="relative aspect-square overflow-hidden rounded-b-xl bg-cover md:aspect-[3.3/1]"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <BoutonRedirection />
    </>
  );
};

export default Client;
