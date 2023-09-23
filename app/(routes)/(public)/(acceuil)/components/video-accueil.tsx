"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "@/components/loading";

const VideoAccueil = ({ name }: { name: string | undefined | null }) => {
  const { scrollYProgress, scrollY } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
    <div className="relative w-full h-screen ">
      <motion.div
        style={{ y }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <Suspense fallback={<Loading />}>
          <Image
            priority
            src="/videos/film_guimbert.jpg"
            alt="image background"
            width={1920}
            height={1080}
            className="absolute top-0 left-0 object-cover object-center w-full h-full"
          />
        </Suspense>
        {/* <Suspense fallback={null}>
          <Video />
        </Suspense> */}
      </motion.div>
      <motion.div
        style={{ y }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full h-full bg-black opacity-30 "
      ></motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 flex flex-col items-center justify-center w-full h-full font-bold text-white"
      >
        <h1 className="text-5xl sm:text-7xl">Bienvenue </h1>
        <p className="text-3xl sm:text-5xl">sur Riot Tech</p>
        <p className="text-3xl sm:text-5xl">{name}</p>
      </motion.div>
    </div>
  );
};

export default VideoAccueil;
