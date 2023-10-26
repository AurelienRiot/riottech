"use client";
import { TurbCursor } from "@/components/cursor/turb-cursor";
import { StickyCursor } from "@/components/cursor/sticky-cursor";
import { Menu, MenuSquare } from "lucide-react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const MouseSticky3 = () => {
  return (
    <div className="w-full h-full  flex flex-col items-center justify-center">
      <div className="flex flex-wrap gap-40 items-center justify-center py-20">
        <StickyCursor
          as="button"
          className="  rounded-md text-primary hover:text-primary-foreground"
        >
          <Menu className="h-10 w-10 " />
        </StickyCursor>
        <ExtraDiv />
        <TurbCursor
          as="div"
          className=" bg-red-600 rounded-md text-primary hover:text-primary-foreground"
        >
          <MenuSquare className="h-10 w-20  " />
        </TurbCursor>
      </div>
    </div>
  );
};

export default MouseSticky3;

function ExtraDiv() {
  return (
    <TurbCursor
      className="rounded-md hover:text-primary-foreground text-primary bg-gray-400 transition-colors p-2 text-center pt-4"
      scaleOffset={1.5}
    >
      <div className="w-[250px] h-[200px] overflow-hidden flex flex-col gap-4  ">
        <h1 className="text-3xl font-bold">{"Secteur d'intervention"}</h1>
        <p>
          RIOT TECH est basé dans le Morbihan (56) et intervient pour les
          installations et SAV sur toute la région.
        </p>
      </div>
    </TurbCursor>
  );
}

export const Carousel = () => {
  return (
    <div className="bg-neutral-800">
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll down
        </span>
      </div>
      <HorizontalScrollCarousel />
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll up
        </span>
      </div>
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: CardType }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  );
};

type CardType = {
  url: string;
  title: string;
  id: number;
};

const cards: CardType[] = [
  {
    url: "/camera_ferme.jpeg",
    title: "Title 1",
    id: 1,
  },
  {
    url: "/icone_diagnostic.jpeg",
    title: "Title 2",
    id: 2,
  },
  {
    url: "/icone_rapide.jpeg",
    title: "Title 3",
    id: 3,
  },
];
