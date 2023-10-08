"use client";
import { Menu, MenuSquare } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { StickyCursor } from "@/components/cursor/sticky-cursor";
import { RippleCursor } from "@/components/cursor/ripple-cursor";

const MouseSticky3 = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  console.log("render mouse sticky3");

  return (
    <div className="w-full h-full flex flex-wrap gap-40 items-center justify-center ">
      <StickyCursor as="button" className=" bg-red-600   rounded-md">
        <Menu className="h-10 w-10 " />
      </StickyCursor>
      <ExtraDiv />
      <StickyCursor as="div" className=" bg-red-600 rounded-md">
        <MenuSquare className="h-10 w-20  " />
      </StickyCursor>
    </div>
  );
};

export default MouseSticky3;

function ExtraDiv() {
  console.log("render extra div");

  return (
    <RippleCursor className="rounded-md" scaleOffset={1.5}>
      <div className="w-[250px] h-[200px] overflow-hidden text-white">
        <h1 className="text-3xl font-bold">{"Secteur d'intervention"}</h1>
        <p>
          RIOT TECH est basé dans le Morbihan (56) et intervient pour les
          installations et SAV sur toute la région.
        </p>
      </div>
    </RippleCursor>
  );
}

const generateSinusoidalPath = (
  value: number,
  width: number,
  height: number,
  amplitude: number
) => {
  const nodes = Math.round(value * 4) + 1;
  const frequency = nodes;
  const points = 100;

  let path = "";

  // Top edge
  for (let i = 0; i <= points; i++) {
    const x = (i * width) / points;
    const y =
      amplitude * Math.sin((2 * Math.PI * frequency * i) / points) + amplitude;
    path += i === 0 ? `M${x},${y}` : ` L${x},${y}`;
  }

  // Right edge
  for (let i = 0; i <= points; i++) {
    const x =
      width + amplitude * Math.sin((2 * Math.PI * frequency * i) / points);
    const y = (i * height) / points;
    path += ` L${x},${y}`;
  }

  // Bottom edge
  for (let i = 0; i <= points; i++) {
    const x = width - (i * width) / points;
    const y =
      height + amplitude * Math.sin((2 * Math.PI * frequency * i) / points);
    path += ` L${x},${y}`;
  }

  // Left edge
  for (let i = 0; i <= points; i++) {
    const x =
      amplitude * Math.sin((2 * Math.PI * frequency * i) / points) + amplitude;
    const y = height - (i * height) / points;
    path += ` L${x},${y}`;
  }

  return path + " Z"; // Close the path
};
