"use client";
import { useCursor } from "@/hooks/use-cursor";
import { Color } from "@/lib/color";
import { GetWindowWidth } from "@/lib/utils";
import { interpolate } from "flubber";
import {
  HTMLMotionProps,
  motion,
  useAnimate,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const base64Svg = btoa(
  '<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="black" /></svg>'
);

const MouseHover = () => {
  const { cursorConfig, initialCursorConfig } = useCursor();
  const ref = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 20, stiffness: 300 };

  const size = useSpring(20, springConfig);
  const mousePositionX = useSpring(0, springConfig);
  const mousePositionY = useSpring(0, springConfig);
  const dimDiv = { width: useMotionValue(400), height: useMotionValue(300) };

  const maskPositionX = useTransform(mousePositionX, (x) => x - size.get() / 2);
  const maskPositionY = useTransform(mousePositionY, (y) => y - size.get() / 2);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const { clientX, clientY } = event;

    if (ref.current) {
      const { left, top } = ref.current.getBoundingClientRect();
      mousePositionX.set(clientX - left);
      mousePositionY.set(clientY - top);
    }
  }

  const [state, setState] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollThreshold = 30;
    let navbarHeight = 64;
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction === "down" &&
        scrollY > navbarHeight &&
        scrollY - lastScrollY > scrollThreshold
      ) {
        setState(false);
      } else if (direction === "up" || scrollY <= navbarHeight) {
        setState(true);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, []);

  return (
    <main
      className="h-screen relative w-full flex justify-center"
      onMouseMove={handleMouseMove}
      // onMouseEnter={() => {
      //   cursorConfig.opacity.set(0);
      // }}
      // onMouseLeave={() => {
      //   cursorConfig.opacity.set(initialCursorConfig.opacity);
      // }}
    >
      <motion.div
        className="absolute top-1/2 left-1/4 translate-x-[-50%] translate-y-[-50%]    flex flex-col justify-center items-center   border-2 bg-gray-500 pointer-events-none"
        style={{
          width: useMotionTemplate`${dimDiv.width}px`,
          height: useMotionTemplate`${dimDiv.height}px`,
        }}
      >
        <Image
          alt=""
          width={100}
          height={100}
          src={"/levels-of-connection.png"}
          className="max-w-[100px] self-center"
        />
        <h3
          className="mx-0 font-FiraMono mb-0 mt-2.5 p-0 text-center text-2xl
  "
        >
          Solutions de connexion à internet
        </h3>
      </motion.div>
      <motion.div
        ref={ref}
        className="text-black absolute  top-1/2 left-1/4 from-30%  from-white to-black bg-gradient-radial  translate-x-[-50%] translate-y-[-50%] flex justify-center   cursor-default border-2 flex-col"
        style={{
          WebkitMaskImage: `url('data:image/svg+xml;base64,${base64Svg}')`,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: useMotionTemplate`${size}px`,
          WebkitMaskPosition: useMotionTemplate`${maskPositionX}px ${maskPositionY}px`,
          backgroundPosition: useMotionTemplate`${maskPositionX}px ${maskPositionY}px`,
          backgroundSize: "100% 100%",
          width: useMotionTemplate`${dimDiv.width}px`,
          height: useMotionTemplate`${dimDiv.height}px`,
        }}
        onMouseEnter={() => {
          cursorConfig.opacity.set(0);
          size.set(300);
        }}
        onMouseLeave={() => {
          cursorConfig.opacity.set(initialCursorConfig.opacity);
          size.set(20);
        }}
      >
        <p className="relative text-center px-2 text-primary ">
          {`Bénéficiez d'une connexion en toutes circonstances, partout et à moindre coût !
          Grâce aux Box 4G RIOT TECH, vous profitez d'une connexion fiable grâce à l'abonnement multi opérateurs, d'un équipement granit à vie et d'un SAV prioritaire et compétant en cas de problème.
          Visionnage par internet sur smartphone, ordinateur, tablette...
          `}
        </p>
        <Link
          href="/solution-internet"
          className="relative mt-[15px] border border-solid rounded-md border-[#333] p-[5px] font-black text-[#333] self-center  hover:bg-[#333] hover:text-white w-fit hover:animate-bounce group transition-all"
        >
          <div className="absolute inset-0 w-full h-full   group-hover:scale-y-[2] transition-all" />
          En savoir plus
        </Link>
      </motion.div>

      {/* <div
        data-state={state ? "open" : "closed"}
        className="w-full h-[50px] data-[state=closed]:h-[25px]  duration-300 transition-all bg-primary-foreground mt-20  text-primary flex items-center justify-center fixed top-1/2 left-0 z-50 "
      >
        <Curve state={state} />
        <motion.span
          data-state={state ? "open" : "closed"}
          className={`transition-all data-[state=open]:translate-y-6 duration-300 data-[state=open]:scale-[3] `}
        >
          {" "}
          test
        </motion.span>
      </div> */}
    </main>
  );
};

export default MouseHover;

function Curve({ state }: { state: boolean }) {
  const windowWidth = GetWindowWidth() === 0 ? 1000 : GetWindowWidth();

  const initialPath = `M0 0 L${windowWidth} 0 Q${windowWidth / 2} 200 0 0`;
  const targetPath = `M0 0 L${windowWidth} 0 Q${windowWidth / 2} 0 0 0`;
  // const initialPath = useTransform(
  //   windowWidth,
  //   (w) => `M0 0 L${w} 0 Q${w / 2} 500 0 0`
  // );
  // const targetPath = useTransform(
  //   windowWidth,
  //   (w) => `M0 0 L${w} 0 Q${w / 2} 0 0 0`
  // );

  const progress = useMotionValue(state ? 1 : 0);
  const indexOfPath = useMotionValue(state ? 0 : 1);
  const [scope, animate] = useAnimate();

  const path = useTransform(progress, [0, 1], [initialPath, targetPath], {
    mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 20 }),
  });

  useEffect(() => {
    animate(progress, progress.get() === 1 ? 0 : 1, {
      duration: 0.1,
      ease: "easeInOut",
    });
  }, [animate, progress, indexOfPath, state, windowWidth]);
  return (
    <motion.svg
      ref={scope}
      className={"absolute bottom-0 left-0 w-full h-px overflow-visible "}
      stroke="none"

      // fill={"red"}
    >
      <motion.path fill={Color("primary-foreground")} d={path}></motion.path>
    </motion.svg>
  );
}

type MotionHTMLElements =
  | (HTMLMotionProps<"div"> & {
      as: "div";
    })
  | (HTMLMotionProps<"button"> & {
      as: "button";
    })
  | (HTMLMotionProps<"a"> & {
      as: "a";
    });

const TEST = (props: MotionHTMLElements) => {
  if (props.as === "div") {
    return <motion.div className={props.className} {...props} />;
  }
  if (props.as === "button") {
    return <motion.button className={props.className} {...props} />;
  }
  if (props.as === "a") {
    return <motion.a className={props.className} {...props} />;
  }
};
