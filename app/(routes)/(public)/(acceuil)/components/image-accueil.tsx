"use client";
import ImageFerme from "@/public/film_guimbert.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const ImageAccueil = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);

  // const y = useTransform(scrollY, [0, 1], [0, 1], { clamp: false });

  // const Video = () => {
  //   return (
  //     <video
  //       controls={false}
  //       autoPlay
  //       loop
  //       muted
  //       playsInline
  //       className="absolute top-0 left-0 object-cover object-center w-full h-full"
  //       title="video background"
  //     >
  //       <source src="./videos/film_guimbert.webm" type="video/webm" />
  //     </video>
  //   );
  // };

  return (
    <motion.div
      style={{ scale: scale }}
      className="fixed top-0 left-0 w-full h-full -z-10"
    >
      <Image
        priority
        src={ImageFerme}
        alt="image background"
        width={1920}
        height={1080}
        className="absolute top-0 left-0 object-cover object-center w-full h-full"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 " />
    </motion.div>
  );
};

export default ImageAccueil;
