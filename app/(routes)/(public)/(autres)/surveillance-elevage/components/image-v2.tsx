"use client";
import Image from "next/image";

const ImageV2 = () => {
  return (
    <div className=" relative flex h-[50vh] w-full items-start   justify-center text-white sm:h-[65vh]">
      <Image
        src="/surveillance-elevage/calf.webp"
        alt="image"
        fill
        priority
        className="h-full w-full object-cover   "
      />

      <div className="absolute inset-0 z-10 h-full w-full bg-gradient-to-b from-neutral-800/90 from-30% to-neutral-800/0 " />
      <div className=" z-10  mt-10 flex max-w-[90vw] flex-col items-center justify-center space-y-10 text-center">
        <h1 className="font-display  text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
          Installation de systèmes de surveillance Video{" "}
        </h1>
        <p className="max-w-[500px] text-xs sm:text-sm md:text-base">
          RIOT TECH installe sur toute la Bretagne des systèmes de cameras de
          surveillances spécialisé en agricole, intérieur et extérieur.
        </p>
      </div>
    </div>
  );
};

export default ImageV2;
