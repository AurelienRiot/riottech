"use client";
import Image from "next/image";

const ImageV2 = () => {
  return (
    <div className=" relative flex h-[50vh] w-full items-start  justify-center text-white sm:h-[65vh]">
      <Image
        src="/surveillance.webp"
        alt="image"
        fill
        priority
        className="h-full w-full object-cover   grayscale"
      />

      <div className="absolute inset-0 z-10 h-full w-full bg-gradient-to-b from-neutral-800/80 from-25% to-neutral-800/0 " />
      <div className="absolute left-[5%]  right-[50%] top-[10%] z-10 space-y-10 text-center sm:top-[20%]">
        <h1 className="font-display  text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
          Installation de système de surveillance Video{" "}
        </h1>
        <p className="text-xs sm:text-sm md:text-base">
          RIOT TECH installe sur toute la Bretagne des systèmes de cameras de
          surveillances spécialisé en agricole, intérieur et extérieur.
        </p>
      </div>
    </div>
  );
};

export default ImageV2;
