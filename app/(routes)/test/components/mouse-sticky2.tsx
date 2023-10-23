"use client";
import { useCursor } from "@/hooks/use-cursor";
import {
  AnimatePresence,
  motion,
  transform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { LucideIcon, Menu, User } from "lucide-react";
import Magnetic from "./magnetic";
import { useEffect, useRef, useState } from "react";
import { FiLock } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Color } from "@/lib/color";
import { useTheme } from "next-themes";
import { addDays } from "date-fns";

const MouseSticky2 = () => {
  const { cursorConfig, initialCursorConfig } = useCursor();
  return (
    <div
      className="relative h-full w-full flex flex-wrap gap-4 items-center justify-center cursor-default"
      onMouseEnter={() => {
        cursorConfig.opacity.set(0);
      }}
      onMouseLeave={() => {
        cursorConfig.opacity.set(initialCursorConfig.opacity);
      }}
    >
      <Menu1 />
      <Menu2 />
      <EncryptButton />
      <Card title="Account" subtitle="Manage profile" href="#" Icon={User} />
      <ShiftingCountdown className="absolute top-0 right-1/2 translate-x-[50%] translate-y-[50%] w-3/5" />
    </div>
  );
};

export default MouseSticky2;

function Menu1() {
  const springConfig = { damping: 5, stiffness: 350, mass: 0.5 };
  const springConfigRotate = { damping: 20, stiffness: 350, mass: 0.5 };

  const defaultColor = "white";

  const backgroundColor = useMotionValue(defaultColor);
  const position = {
    x: useSpring(0, springConfig),
    y: useSpring(0, springConfig),
  };

  const scale = {
    x: useSpring(1, springConfig),
    y: useSpring(1, springConfig),
  };

  const angleCursor = useSpring(0, springConfigRotate);

  const rotate = (distance: { x: number; y: number }) => {
    const angle = Math.atan2(distance.y, distance.x) * (180 / Math.PI);
    angleCursor.set(angle);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();

    const center = { x: left + width / 2, y: top + height / 2 };
    const distance = { x: clientX - center.x, y: clientY - center.y };

    rotate(distance);

    const absDistance = Math.max(Math.abs(distance.x), Math.abs(distance.y));
    const newScaleX = transform(absDistance, [0, (3 * width) / 2], [1, 2]);
    const newScaleY = transform(absDistance, [0, (3 * height) / 2], [1, 0.5]);
    scale.x.set(newScaleX);
    scale.y.set(newScaleY);

    position.x.set((clientX - (left + width / 2)) * 0.2);
    position.y.set((clientY - (top + height / 2)) * 0.2);
  };

  const handleOnEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    backgroundColor.set("red");
    e.stopPropagation();
  };

  const handleOnLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    backgroundColor.set(defaultColor);
    position.x.set(0);
    position.y.set(0);
    scale.x.set(1);
    scale.y.set(1);
    rotate({ x: 0, y: 0 });
  };

  function template({ x, y, rotate, scaleX, scaleY }: any) {
    return `translateX(${x}) translateY(${y}) rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY}) translateZ(0)`;
  }

  return (
    <>
      <motion.div
        transformTemplate={template}
        className="w-20 h-20  items-center rounded-2xl justify-center flex "
        style={{
          backgroundColor: backgroundColor,
          x: position.x,
          y: position.y,
          rotate: angleCursor,
          scaleX: scale.x,
          scaleY: scale.y,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleOnEnter}
        onMouseLeave={handleOnLeave}
      >
        <div className=" w-full h-full absolute top-0 left-0  hover:scale-[3]  " />
        <Menu />
      </motion.div>
    </>
  );
}

function Menu2() {
  const springConfig = { damping: 5, stiffness: 350, mass: 0.5 };
  const springConfigRotate = { damping: 20, stiffness: 350, mass: 0.5 };

  const backgroundColor = useMotionValue("black");
  const position = {
    x: useSpring(0, springConfig),
    y: useSpring(0, springConfig),
  };

  const scale = {
    x: useSpring(1, springConfig),
    y: useSpring(1, springConfig),
  };

  const angleCursor = useSpring(0, springConfigRotate);

  const rotate = (distance: { x: number; y: number }) => {
    const angle = Math.atan2(distance.y, distance.x) * (180 / Math.PI);
    angleCursor.set(angle);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();

    const center = { x: left + width / 2, y: top + height / 2 };
    const distance = { x: clientX - center.x, y: clientY - center.y };

    rotate(distance);

    const absDistance = Math.max(Math.abs(distance.x), Math.abs(distance.y));
    const newScaleX = transform(absDistance, [0, width / 2], [1, 1.5]);
    const newScaleY = transform(absDistance, [0, height / 2], [1, 0.5]);
    scale.x.set(newScaleX);
    scale.y.set(newScaleY);

    position.x.set((clientX - (left + width / 2)) * 0.2);
    position.y.set((clientY - (top + height / 2)) * 0.2);
  };

  const handleOnEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    backgroundColor.set("black");
    e.stopPropagation();
  };

  const handleOnLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    backgroundColor.set("black");
    position.x.set(0);
    position.y.set(0);
    scale.x.set(1);
    scale.y.set(1);
    rotate({ x: 0, y: 0 });
  };

  function template({ x, y, rotate, scaleX, scaleY }: any) {
    return `translateX(${x}) translateY(${y}) rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY}) translateZ(0) `;
  }

  return (
    <>
      <div
        className="relative w-20 h-20  items-center rounded-full justify-center flex group"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleOnEnter}
        onMouseLeave={handleOnLeave}
        onClick={() => console.log("click Button")}
      >
        {/* <motion.div
          className="w-full h-full absolute top-0 left-0 rounded-xl"
          transformTemplate={template}
          style={{
            backgroundColor: backgroundColor,
            x: position.x,
            y: position.y,
            rotate: angleCursor,
            scaleX: scale.x,
            scaleY: scale.y,
          }}
        /> */}
        <motion.svg
          height="80"
          width="80"
          className={"absolute top-0 left-0 overflow-visible bg-transparent"}
          transformTemplate={template}
          style={{
            x: position.x,
            y: position.y,
            rotate: angleCursor,
            scaleX: scale.x,
            scaleY: scale.y,
          }}
        >
          <motion.circle
            cx="40"
            cy="40"
            r="40"
            strokeWidth="0"
            style={{
              fill: backgroundColor,
            }}
          />
        </motion.svg>
        <div className=" w-full h-full absolute top-0 left-0  group-hover:scale-[3] " />
        <Magnetic className="w-full h-full items-center  justify-center flex ">
          <Menu className=" text-white " />
        </Magnetic>
      </div>
    </>
  );
}

const EncryptButton = () => {
  const TARGET_TEXT = "Encrypt data";
  const CYCLES_PER_LETTER = 5;
  const SHUFFLE_TIME = 15;

  const CHARS = "!@#$%^&*():{};|,.<>/?";

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [text, setText] = useState(TARGET_TEXT);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);

    setText(TARGET_TEXT);
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.025,
      }}
      whileTap={{
        scale: 0.975,
      }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      className={`relative overflow-hidden  rounded-lg border-[1px] border-slate-500 bg-slate-700 px-4 py-2 font-mono font-medium uppercase text-slate-300 transition-all hover:text-indigo-300
      before:absolute before:left-0 before:w-full before:h-[3px] before:animate-[move-up-down_3s_linear_infinite] before:transition-all before:opacity-0 hover:before:opacity-100  before:blur-[2px]  before:bg-indigo-500
     `}
    >
      <div className="relative flex items-center gap-2">
        <FiLock />{" "}
        <span className={`relative z-10 pl-4 uppercase `}>{text}</span>
      </div>
    </motion.button>
  );
};

interface CardType {
  title: string;
  subtitle: string;
  Icon: LucideIcon;
  href: string;
}

const Card = ({ title, subtitle, Icon, href }: CardType) => {
  return (
    <Link
      href={href}
      className={` p-4 pr-20 rounded-lg border-[1px] border-slate-300 relative overflow-hidden group bg-white
      before:absolute before:w-full before:h-full before:inset-0 before:bg-gradient-to-r before:from-violet-600 before:to-indigo-600 before:translate-y-[100%] before:hover:translate-y-[0%] before:transition-transform before:duration-300
      `}
    >
      <Icon
        size={80}
        className="absolute z-10 -top-4 -right-4 text-9xl text-slate-100 group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300"
      />
      <Icon className="mb-2 text-2xl text-violet-600 group-hover:text-white transition-colors relative z-10 duration-300" />
      <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
        {title}
      </h3>
      <p className="text-slate-400 group-hover:text-violet-200 relative z-10 duration-300">
        {subtitle}
      </p>
    </Link>
  );
};

const CountdownItem = ({ num, text }: { num: number; text: string }) => {
  return (
    <div className="font-mono w-1/4 h-24 md:h-36 flex flex-col gap-1 md:gap-2 items-center justify-center border-r-[1px] border-slate-200">
      <div className="w-full text-center relative overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={num}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ ease: "backIn", duration: 0.75 }}
            className="block text-2xl md:text-4xl lg:text-6xl xl:text-7xl text-black font-medium"
          >
            {num}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-xs md:text-sm lg:text-base font-light text-slate-500">
        {text}
      </span>
    </div>
  );
};

const ShiftingCountdown = ({ className }: { className?: string }) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [remaining, setRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // const COUNTDOWN_FROM = "12/31/2023";
    const COUNTDOWN_FROM = addDays(new Date(), 1);

    const SECOND = 1000;
    const MINUTE = SECOND * 60;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;
    const handleCountdown = () => {
      const end = new Date(COUNTDOWN_FROM);

      const now = new Date();

      const distance = +end - +now;

      const days = Math.floor(distance / DAY);
      const hours = Math.floor((distance % DAY) / HOUR);
      const minutes = Math.floor((distance % HOUR) / MINUTE);
      const seconds = Math.floor((distance % MINUTE) / SECOND);

      setRemaining({
        days,
        hours,
        minutes,
        seconds,
      });
    };
    intervalRef.current = setInterval(handleCountdown, 1000);

    return () => clearInterval(intervalRef.current || undefined);
  }, []);

  return (
    <div
      className={cn(
        "p-4 bg-gradient-to-br from-violet-600 to-indigo-600",
        className
      )}
    >
      <div className="w-full max-w-5xl mx-auto flex items-center bg-white">
        <CountdownItem num={remaining.days} text="jours" />
        <CountdownItem num={remaining.hours} text="heures" />
        <CountdownItem num={remaining.minutes} text="minutes" />
        <CountdownItem num={remaining.seconds} text="secondes" />
      </div>
    </div>
  );
};
