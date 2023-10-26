"use client";
import { useCursor } from "@/hooks/use-cursor";
import { Color } from "@/lib/color";
import {
  HTMLMotionProps,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const base64Svg = btoa(
  '<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="black" /></svg>'
);

const MouseHover = () => {
  const { cursorConfig, initialCursorConfig } = useCursor();
  const ref = useRef<HTMLDivElement>(null);
  const digitsRef = useRef<HTMLUListElement>(null);

  const proximityRadius = 100;
  const distanceMapper = gsap.utils.mapRange(250, 50, 0, 1);
  const [digits, setDigits] = useState<Element[]>([]);
  useEffect(() => {
    if (digitsRef.current) {
      setDigits(Array.from(digitsRef.current.children));
    }
  }, []);

  const springConfig = { damping: 20, stiffness: 300 };

  const size = useSpring(20, springConfig);
  const mousePositionX = useSpring(0, springConfig);
  const mousePositionY = useSpring(0, springConfig);
  const dimDiv = { width: useMotionValue(400), height: useMotionValue(300) };

  const maskPositionX = useTransform(mousePositionX, (x) => x - size.get() / 2);
  const maskPositionY = useTransform(mousePositionY, (y) => y - size.get() / 2);

  function handleMouseMove(
    event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>
  ) {
    let clientX, clientY;

    if ("clientX" in event) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    }

    if (ref.current) {
      const { left, top } = ref.current.getBoundingClientRect();
      mousePositionX.set(clientX - left);
      mousePositionY.set(clientY - top);
    }

    if (digitsRef.current) {
      const container = digitsRef.current.getBoundingClientRect();

      const distanceToContainer = Math.hypot(
        clientX - (container.x + container.width * 0.5),
        clientY - (container.y + container.height * 0.5)
      );

      if (
        distanceToContainer >
        Math.max(container.width, container.height) * 0.5 + proximityRadius
      ) {
        return;
      }

      for (const digit of digits) {
        const digitBounds = digit.getBoundingClientRect();
        const distanceToDigit = Math.hypot(
          clientX - (digitBounds.x + digitBounds.width * 0.5),
          clientY - (digitBounds.y + digitBounds.height * 0.5)
        );

        const active = gsap.utils.clamp(0, 1, distanceMapper(distanceToDigit));
        (digit as HTMLElement).style.setProperty("--active", active.toString());
      }
    }
  }

  return (
    <main
      className="h-screen relative w-full flex justify-center bg-black bgGrid"
      onTouchStart={handleMouseMove}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onMouseEnter={() => {
        cursorConfig.color.set(Color("primary-foreground"));
      }}
      onMouseLeave={() => {
        cursorConfig.color.set(initialCursorConfig.color);
      }}
    >
      <motion.div
        className="absolute top-1/2 left-[70%] translate-x-[-50%] translate-y-[-50%]    flex flex-col justify-center items-center   border-2 bg-gray-500 pointer-events-none"
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
          className="mx-0 font-SourceCodePro mb-0 mt-2.5 p-0 text-center text-2xl
  "
        >
          Solutions de connexion à internet
        </h3>
      </motion.div>
      <motion.div
        ref={ref}
        className="text-black absolute  top-1/2 left-[70%] from-30%  from-white to-black bg-gradient-radial  translate-x-[-50%] translate-y-[-50%] flex justify-center   cursor-default border-2 flex-col "
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
        <p className="relative text-center px-2 ">
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

      <section
        className={`grid gap-16 items-center justify-center absolute top-[20%] left-[10%] `}
      >
        <p className="m-0 text-4xl  text-center text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-500">
          Glide To Reveal Secret Code
        </p>
        <ul
          ref={digitsRef}
          className="text-5xl flex flex-nowrap text-white rounded-2xl bg-[hsl(0_0%_6%)] justify-center p-[4.5rem_0] shadow-[0_1px_hsl(0_0%_100%_/_0.25)_inset] z-10 hover:cursor-grab"
        >
          <li className="flex h-full p-4 focus-visible:outline-[hsl(0_0%_50%_/_0.25)] focus-visible:outline-[1rem]">
            <span className="digit">0</span>
          </li>
          <li className="flex h-full p-4 focus-visible:outline-[hsl(0_0%_50%_/_0.25)] focus-visible:outline-[1rem]">
            <span className="digit">3</span>
          </li>
          <li className="flex h-full p-4 focus-visible:outline-[hsl(0_0%_50%_/_0.25)] focus-visible:outline-[1rem]">
            <span className="digit">4</span>
          </li>
          <li className="flex h-full p-4 focus-visible:outline-[hsl(0_0%_50%_/_0.25)] focus-visible:outline-[1rem]">
            <span className="digit">8</span>
          </li>
          <li className="flex h-full p-4 focus-visible:outline-[hsl(0_0%_50%_/_0.25)] focus-visible:outline-[1rem]">
            <span className="digit">7</span>
          </li>
          <li className="flex h-full p-4 focus-visible:outline-[hsl(0_0%_50%_/_0.25)] focus-visible:outline-[1rem]">
            <span className="digit"> 2</span>
          </li>
        </ul>
      </section>
      <style jsx>{`
        .bgGrid::before {
          --line: hsl(0 0% 95% / 0.25);
          content: "";
          height: 100%;
          width: 100%;
          position: absolute;
          background: linear-gradient(
                90deg,
                var(--line) 1px,
                transparent 1px 5vmin
              )
              0 -5vmin / 5vmin 5vmin,
            linear-gradient(var(--line) 1px, transparent 1px 5vmin) 0 -5vmin / 5vmin
              5vmin;
          mask: linear-gradient(-15deg, transparent 30%, white);
        }
        .digit {
          color: transparent;
          background: linear-gradient(hsl(0 0% 90%), hsl(0 0% 50%));
          background-clip: text;
          scale: calc(var(--active, 0) + 0.5);
          filter: blur(calc((1 - var(--active, 0)) * 1.5rem));
          border-radius: 50%;
        }
      `}</style>
    </main>
  );
};

export default MouseHover;

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
