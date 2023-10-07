"use client";
import { Menu, MenuSquare } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { StickyCursor } from "@/components/cursor/sticky-cursor";
import { RippleCursor } from "@/components/cursor/ripple-cursor";

const MouseSticky3 = () => {
  const value = {
    value: useMotionValue(1),
    path: useSpring(useMotionValue(generateSinusoidalPath(0, 100, 50, 1))),
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  console.log("rend");

  return (
    <div className="w-full h-full flex flex-wrap gap-40 items-center justify-center ">
      <StickyCursor
        as="button"
        className=" bg-red-600   rounded-md"
        onClick={() => {
          console.log("click");
          value.value.set(value.value.get() + 1);
          value.path.set(generateSinusoidalPath(0, 100, 50, value.value.get()));
        }}
      >
        <Menu className="h-10 w-10 " />
      </StickyCursor>
      <ExtraDiv />
      <StickyCursor as="div" className=" bg-red-600 rounded-md">
        <MenuSquare className="h-10 w-20  " />
      </StickyCursor>

      <motion.svg className=" overflow-visible">
        <defs>
          <clipPath id="ripple-clip">
            {isMounted && <motion.path d={value.path} />}
          </clipPath>
          <filter id="ripple">
            <motion.feTurbulence
              type="fractalNoise"
              // animate={{
              //   baseFrequency: [0, 1, 0],
              // }}
              // initial={{ baseFrequency: 0 }}
              // transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              baseFrequency={0.0005}
              numOctaves="4"
              result="TURB"
              seed="4"
            />
            <feDisplacementMap
              xChannelSelector="G"
              yChannelSelector="R"
              in="SourceGraphic"
              in2="TURB"
              scale="100"
            />
          </filter>
        </defs>
        <motion.rect
          width="100"
          height="50"
          rx="10"
          ry="10"
          fill="red"
          filter="url(#ripple)"

          // clipPath="url(#ripple-clip)"
        />
        {/* <motion.path d={value.path} fill="green" stroke="red" strokeWidth="2" /> */}
      </motion.svg>
    </div>
  );
};

export default MouseSticky3;

function ExtraDiv() {
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
