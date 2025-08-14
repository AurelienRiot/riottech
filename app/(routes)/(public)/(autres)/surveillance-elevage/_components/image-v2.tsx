import Image from "next/image";
import ImageCalf from "@/public/surveillance-elevage/calf.webp";

const ImageV2 = () => {
  return (
    <div className="relative flex h-[50vh] w-full items-start justify-center text-white sm:h-[65vh]">
      <Image src={ImageCalf} alt="image" placeholder="blur" fill priority className="h-full w-full object-cover" />

      <div className="absolute inset-0 z-10 h-full w-full bg-linear-to-b from-neutral-800/90 from-50% to-neutral-800/0" />
      <div className="z-10 mt-10 flex max-w-[90vw] flex-col items-center justify-center space-y-10 text-center">
        <h1 className="font-display text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
          Installation de systèmes de surveillance Vidéo{" "}
        </h1>
        <p className="max-w-[600px] font-bold sm:text-lg md:text-xl lg:text-2xl">
          {" Vous avez toujours rêvé de pouvoir surveiller vos animaux à tout moment et de n'importe où ?"}
          <br />
          {"Vous souhaitez détecter rapidement toute activité suspecte autour de votre ferme ?"}
        </p>
      </div>
    </div>
  );
};

export default ImageV2;
