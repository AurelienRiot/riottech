"use client";
import { useCursor } from "@/hooks/use-cursor";
import { Color } from "@/lib/color";
import { GetWindowHeight } from "@/lib/utils";
import {
  AnimatePresence,
  animate,
  motion,
  motionValue,
  useAnimate,
  useAnimation,
  useMotionValue,
  usePresence,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { interpolate } from "flubber";

const CursorDifference = () => {
  const { cursorConfig, initialCursorConfig } = useCursor();
  const [isActive, setIsActive] = useState(false);

  function handleMouseEnter() {
    cursorConfig.size.height.set(300);
    cursorConfig.size.width.set(300);
    cursorConfig.size.rx.set(300);
    cursorConfig.size.ry.set(300);
    cursorConfig.cursorMixBlendMode.set("difference");
    cursorConfig.color.set(Color("white", "standard"));
  }
  function handleMouseLeave() {
    cursorConfig.size.height.set(initialCursorConfig.size.height);
    cursorConfig.size.width.set(initialCursorConfig.size.width);
    cursorConfig.size.rx.set(initialCursorConfig.size.rx);
    cursorConfig.size.ry.set(initialCursorConfig.size.ry);
    cursorConfig.cursorMixBlendMode.set(initialCursorConfig.cursorMixBlendMode);
    cursorConfig.color.set(Color("220, 38, 38", "rgb"));
  }

  return (
    <main
      className="h-screen relative group flex justify-center flex-col items-center"
      onMouseEnter={() => {
        cursorConfig.color.set(Color("red", "standard"));
      }}
      onMouseLeave={() => {
        cursorConfig.color.set(Color(initialCursorConfig.color));
      }}
    >
      <div
        className="w-fit h-fit flex justify-center items-center text-blue-600 text-[64px] leading-[66px] "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <p className="p-10 w-[1000px] ">
          {"I'm a "}
          <span className="text-red-600">selectively skilled</span> product
          designer with strong focus on producing high quality & impactful
          digital experience.
        </p>
      </div>
      {/* <SVG /> */}
      <div
        onClick={() => {
          setIsActive(!isActive);
        }}
        className={`
      sticky right-0 bottom-0 m-5  w-[80px] h-[80px] rounded-full bg-[#455CE9] cursor-pointer flex justify-center items-center
      `}
      >
        <div
          data-state={isActive ? "open" : "closed"}
          className={`w-full
      after:h-[2px] after:w-[40%] after:m-auto after:bg-white after:relative after:block after:transform after:duration-300 after:top-[-5px]
      before:h-[2px] before:w-[40%] before:m-auto before:bg-white before:relative before:block before:transform before:duration-300 before:top-[5px]
       data-[state=open]:after:top-[-1px] data-[state=open]:before:top-0 data-[state=open]:after:rotate-45 data-[state=open]:before:-rotate-45
      `}
        ></div>
      </div>
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </main>
  );
};

export default CursorDifference;

function SVG() {
  return (
    <div className="flex w-full items-center justify-center">
      {/* <svg className={" bg-transparent overflow-visible  "}>
        <defs>
          <filter id="ripple">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.05 "
              numOctaves="4"
              result="TURB"
              seed="1"
            />
            <feDisplacementMap
              xChannelSelector="R"
              yChannelSelector="G"
              in="SourceGraphic"
              in2="TURB"
              scale="20"
            />
          </filter>
          <filter id="erode">
            <feMorphology operator="erode" radius="1" />
          </filter>
          <filter id="dilate">
            <feMorphology operator="dilate" radius="2" />
          </filter>
          <filter id="shadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
            <feOffset dx="20" dy="20" result="offsetblur" />
            <feFlood floodColor="pink" />
            <feComposite in2="offsetblur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect
          width={100}
          height={100}
          rx={10}
          ry={10}
          fill="red"
          filter="url(#ripple)"
        />
      </svg> */}
      <svg className="w-full h-[200px] border-2 border-red-600">
        <path d="M0 80 Q 100 10, 200 80 L 200 10 L 0 10 Z" fill="red" />
      </svg>
      {/* <svg width="200" height="200">
        <path d="M10 80 L 190 80 L 190 10 L 10 10 Z" fill="red" />
      </svg> */}
    </div>
  );
}

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Work",
    href: "/work",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

function Nav() {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);
  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={
        "h-screen bg-slate-800 fixed right-0 top-0 text-white box-border z-50 "
      }
    >
      <div className={"h-full p-[100px] flex flex-col justify-between "}>
        <div
          onMouseLeave={() => {
            setSelectedIndicator(pathname);
          }}
          className={"flex flex-col text-[56px] gap-3 mt-20  "}
        >
          <div
            className={
              "text-slate-500 border-slate-500 border-b border-solid uppercase text-xs mb-10 pb-4"
            }
          >
            <p>Navigation</p>
          </div>
          {navItems.map((data, index) => {
            return (
              <MenueItem
                key={index}
                data={{ ...data, index }}
                isActive={selectedIndicator == data.href}
                setSelectedIndicator={setSelectedIndicator}
              ></MenueItem>
            );
          })}
        </div>
        <div className={"flex w-full justify-between text-xs gap-10"}>
          <a>Awwwards</a>
          <a>Instagram</a>
          <a>Dribble</a>
          <a>LinkedIn</a>
        </div>
      </div>
      <Curve />
    </motion.div>
  );
}

const menuSlide = {
  initial: { x: "calc(100% + 100px)" },
  enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

const slide = {
  initial: { x: 150 },
  enter: (i: number) => ({
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.1 * i,
    },
  }),
  exit: (i: number) => ({
    x: 250,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
};

const scale = {
  open: { scale: 1, transition: { duration: 0.3 } },

  closed: { scale: 0, transition: { duration: 0.4 } },
};

type MenueItemProps = {
  data: {
    title: string;
    href: string;
    index: number;
  };
  isActive: boolean;
  setSelectedIndicator: React.Dispatch<React.SetStateAction<string>>;
};
function MenueItem({ data, isActive, setSelectedIndicator }: MenueItemProps) {
  const { title, href, index } = data;
  return (
    <motion.div
      className={"relative flex items-center"}
      onMouseEnter={() => {
        setSelectedIndicator(href);
      }}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? "open" : "closed"}
        className={
          "w-[10px] h-[10px] rounded-full absolute left-[-30px] bg-white"
        }
      ></motion.div>
      <Link className="text-white font-light" href={href}>
        {title}
      </Link>
    </motion.div>
  );
}

function Curve() {
  const windowHeight = GetWindowHeight();
  const [isPresent, safeToRemove] = usePresence();

  const initialPath = `M100 0 L100 ${windowHeight} Q-100 ${
    windowHeight / 2
  } 100 0`;
  const targetPath = `M100 0 L100 ${windowHeight} Q100 ${
    windowHeight / 2
  } 100 0`;

  const progress = useMotionValue(0);
  const path = useTransform(progress, [0, 1], [initialPath, targetPath], {
    mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 20 }),
  });

  useEffect(() => {
    animate(progress, 1, {
      type: "tween",
      duration: 1,
      ease: "easeInOut",
    });
  }, [progress]);

  useEffect(() => {
    if (!isPresent && setTimeout(safeToRemove, 1000)) {
      animate(progress, 0, {
        type: "tween",
        duration: 0.5,
        ease: "easeInOut",
      });
    }
  }, [isPresent, safeToRemove, progress]);

  return (
    <motion.svg
      className={"absolute top-0 left-[-99px] w-[100px] h-full "}
      stroke="none"
      fill="rgb(30 41 59)"
      onClick={() => {}}
    >
      <motion.path d={path}></motion.path>
    </motion.svg>
  );
}
