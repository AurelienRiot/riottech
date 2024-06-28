"use client";
import { useCursor } from "@/hooks/use-cursor";
import { cn } from "@/lib/utils";
import { addMinutes } from "date-fns";
import { AnimatePresence, motion, transform, useMotionValue, useSpring } from "framer-motion";
import { type LucideIcon, Menu, User } from "lucide-react";
import Link from "next/link";
import { forwardRef, useEffect, useRef, useState } from "react";
import { FiLock } from "react-icons/fi";
import Magnetic from "./magnetic";
import { toast } from "sonner";
import CSSCarousel from "./css-carousel";

const MouseSticky2 = () => {
  const { cursorConfig, initialCursorConfig } = useCursor();

  return (
    <div
      className="relative flex h-full w-full cursor-default flex-col items-center justify-center gap-8"
      onMouseEnter={() => {
        cursorConfig.opacity.set(0);
      }}
      onMouseLeave={() => {
        cursorConfig.opacity.set(initialCursorConfig.opacity);
      }}
    >
      <div className="flex gap-8 ">
        <Menu1 />
        <Menu2 />
        <EncryptButton />
        <Card title="Account" subtitle="Manage profile" href="#" Icon={User} />
      </div>
      {/* <ShiftingCountdown className=" w-3/5" /> */}
      <ShiftingCountdown2 />
      <div className="flex gap-4">
        <CSSCarousel />
        <BubbleText
          text="Bubbbbbbbble text"
          className={`relative  overflow-hidden rounded-lg 
                                p-4 before:absolute before:inset-0 
                                before:h-full before:w-full before:bg-gradient-to-b before:from-slate-900   before:to-slate-800`}
        />
      </div>
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
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();

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
  };

  const handleOnLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
        className="flex h-20  w-20 items-center justify-center rounded-2xl  "
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
        <div className=" absolute left-0 top-0 h-full w-full  hover:scale-[3]  " />
        <Menu className=" text-black" />
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
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();

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
        className="group relative flex  h-20 w-20 items-center justify-center rounded-full"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleOnEnter}
        onMouseLeave={handleOnLeave}
        // onClick={() => console.log("click Button")}
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
          className={"absolute left-0 top-0 overflow-visible bg-transparent"}
          transformTemplate={template}
          style={{
            x: position.x,
            y: position.y,
            rotate: angleCursor,
            scaleX: scale.x,
            scaleY: scale.y,
          }}
        >
          <title>Menu</title>
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
        <div className=" absolute left-0 top-0 h-full w-full  group-hover:scale-[3] " />
        <Magnetic className="flex h-full w-full  items-center justify-center ">
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
      className={`relative overflow-hidden  rounded-lg border-[1px] border-slate-500 bg-slate-700 px-4 py-2 font-mono font-medium uppercase text-slate-300 transition-all before:absolute
      before:left-0 before:h-[3px] before:w-full before:animate-[move-up-down_3s_linear_infinite] before:bg-indigo-500 before:opacity-0 before:blur-[2px] before:transition-all  hover:text-indigo-300  hover:before:opacity-100
     `}
    >
      <div className="relative flex items-center gap-2">
        <FiLock /> <span className={"relative z-10 pl-4 uppercase "}>{text}</span>
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
      className={` group relative overflow-hidden rounded-lg border-[1px] border-slate-300 bg-white p-4 pr-20
      before:absolute before:inset-0 before:h-full before:w-full before:translate-y-[100%] before:bg-gradient-to-r before:from-violet-600 before:to-indigo-600 before:transition-transform before:duration-300 before:hover:translate-y-[0%]
      `}
    >
      <Icon
        size={80}
        className="absolute -right-4 -top-4 z-10 text-9xl text-slate-100 transition-transform duration-300 group-hover:rotate-12 group-hover:text-violet-400"
      />
      <Icon className="relative z-10 mb-2 text-2xl text-violet-600 transition-colors duration-300 group-hover:text-white" />
      <h3 className="relative z-10 text-lg font-medium text-slate-950 duration-300 group-hover:text-white">{title}</h3>
      <p className="relative z-10 text-slate-400 duration-300 group-hover:text-violet-200">{subtitle}</p>
    </Link>
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
    const COUNTDOWN_FROM = addMinutes(new Date(), 100);

    const SECOND = 1000;
    const MINUTE = SECOND * 60;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;
    const handleCountdown = () => {
      const end = new Date(COUNTDOWN_FROM);
      const now = new Date();
      const distance = +end - +now;

      if (distance <= 0) {
        clearInterval(intervalRef.current || undefined);
        setRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        toast.error("Le compte à rebours est terminé.");
      } else {
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
      }
    };
    intervalRef.current = setInterval(handleCountdown, 1000);

    return () => clearInterval(intervalRef.current || undefined);
  }, []);

  return (
    <div className={cn("bg-gradient-to-br from-violet-600 to-indigo-600 p-4", className)}>
      <div className="mx-auto flex w-full max-w-5xl items-center bg-white">
        <CountdownItem num={remaining.days} text="jours" />
        <CountdownItem num={remaining.hours} text="heures" />
        <CountdownItem num={remaining.minutes} text="minutes" />
        <CountdownItem num={remaining.seconds} text="secondes" />
      </div>
    </div>
  );
};

const CountdownItem = ({ num, text }: { num: number; text: string }) => {
  return (
    <div className="flex h-24 w-1/4 flex-col items-center justify-center gap-1 border-r-[1px] border-slate-200 font-mono md:h-36 md:gap-2">
      <div className="relative w-full overflow-hidden text-center">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={num}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ ease: "backIn", duration: 0.75 }}
            className="block text-2xl font-medium text-black md:text-4xl lg:text-6xl xl:text-7xl"
          >
            {num}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-xs font-light text-slate-500 md:text-sm lg:text-base">{text}</span>
    </div>
  );
};

const BubbleText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const ref = useRef<HTMLHeadingElement | null>(null);

  const [chars, setChars] = useState<Element[]>([]);
  useEffect(() => {
    if (ref.current) {
      setChars(Array.from(ref.current.children));
    }
  }, []);

  const currentCharclass = ["text-indigo-700", "font-black"];
  const oneOffCharclass = ["text-indigo-600", "font-medium"];
  const twoOffCharclass = ["text-indigo-500", "font-normal"];

  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, index: number) => {
    if (!chars.length) return;
    chars[index].classList.add(...currentCharclass);
    chars[(index - 1 + chars.length) % chars.length].classList.add(...oneOffCharclass);
    chars[(index + 1) % chars.length].classList.add(...oneOffCharclass);
    chars[(index - 2 + chars.length) % chars.length].classList.add(...twoOffCharclass);
    chars[(index + 2) % chars.length].classList.add(...twoOffCharclass);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, index: number) => {
    if (!chars.length) return;
    chars[index].classList.remove(...currentCharclass);
    chars[(index - 1 + chars.length) % chars.length].classList.remove(...oneOffCharclass);
    chars[(index + 1) % chars.length].classList.remove(...oneOffCharclass);
    chars[(index - 2 + chars.length) % chars.length].classList.remove(...twoOffCharclass);
    chars[(index + 2) % chars.length].classList.remove(...twoOffCharclass);
  };

  return (
    <>
      <h2 ref={ref} className={cn("text-center font-sans text-5xl font-thin text-indigo-300 ", className)}>
        {text.split("").map((child, index) => (
          <span
            className={"relative z-10 transition-all duration-300 "}
            key={index}
            onMouseEnter={(e) => handleMouseEnter(e, index)}
            onMouseLeave={(e) => handleMouseLeave(e, index)}
          >
            {child}
          </span>
        ))}
      </h2>
    </>
  );
};

const useCountdown = (endDate: string | Date, refs: { [key: string]: React.RefObject<HTMLDivElement> }) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const SECOND = 1000;
    const MINUTE = SECOND * 60;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;

    const handleCountdown = () => {
      const end = new Date(endDate);
      const now = new Date();
      const distance = +end - +now;

      if (distance <= 0) {
        clearInterval(intervalRef.current || undefined);
        for (const ref of Object.values(refs)) {
          ref.current?.style.setProperty("--value", "0");
        }
        toast.error("Le compte à rebours est terminé.");
      } else {
        const days = Math.floor(distance / DAY);
        const hours = Math.floor((distance % DAY) / HOUR);
        const minutes = Math.floor((distance % HOUR) / MINUTE);
        const seconds = Math.floor((distance % MINUTE) / SECOND);

        refs.days.current?.style.setProperty("--value", days.toString());
        refs.hours.current?.style.setProperty("--value", hours.toString());
        refs.minutes.current?.style.setProperty("--value", minutes.toString());
        refs.seconds.current?.style.setProperty("--value", seconds.toString());
      }
    };

    intervalRef.current = setInterval(handleCountdown, 1000);

    return () => clearInterval(intervalRef.current || undefined);
  }, [endDate, refs]);
};

const ShiftingCountdown2 = ({ className }: { className?: string }) => {
  // const COUNTDOWN_FROM = "10/27/2023";
  const COUNTDOWN_FROM = addMinutes(new Date(), 10000);
  const refs = {
    days: useRef<HTMLDivElement | null>(null),
    hours: useRef<HTMLDivElement | null>(null),
    minutes: useRef<HTMLDivElement | null>(null),
    seconds: useRef<HTMLDivElement | null>(null),
  };

  useCountdown(COUNTDOWN_FROM, refs);

  return (
    <div className={cn("bg-gradient-to-br from-violet-600 to-indigo-600 p-4", className)}>
      <div className="grid auto-cols-max  grid-flow-col bg-white text-center">
        <CountdownItem2 ref={refs.days} defaultValue={0} text="jours" />
        <CountdownItem2 ref={refs.hours} defaultValue={0} text="heures" />
        <CountdownItem2 ref={refs.minutes} defaultValue={0} text="minutes" />
        <CountdownItem2 ref={refs.seconds} defaultValue={0} text="secondes" />
      </div>
    </div>
  );
};

const CountdownItem2 = forwardRef<HTMLDivElement, { text: string; defaultValue: number }>(
  ({ text, defaultValue }, ref) => {
    return (
      <>
        <div
          ref={ref}
          style={{ "--value": String(defaultValue) } as React.CSSProperties}
          className="flex flex-col items-center justify-center border-r-[1px] border-slate-200 p-10 last:border-r-0  "
        >
          <span className="countdown font-mono ">
            <span className="text-2xl font-medium text-red-600 md:text-4xl lg:text-6xl xl:text-7xl " />
          </span>
          <span className="text-xs font-light text-slate-500 md:text-sm lg:text-base ">{text}</span>
        </div>
        <style jsx>{`
        .countdown {
          display: inline-flex;
        }
        .countdown > * {
          height: 1em;
          overflow-y: hidden;
          display: inline-block;
          line-height: 1em;
        }

        .countdown > *::before {
          position: relative;
          font-variant-numeric: lining-nums;
          content: "0\A 1\A 2\A 3\A 4\A 5\A 6\A 7\A 8\A 9\A 10\A 11\A 12\A 13\A 14\A 15\A 16\A 17\A 18\A 19\A 20\A 21\A 22\A 23\A 24\A 25\A 26\A 27\A 28\A 29\A 30\A 31\A 32\A 33\A 34\A 35\A 36\A 37\A 38\A 39\A 40\A 41\A 42\A 43\A 44\A 45\A 46\A 47\A 48\A 49\A 50\A 51\A 52\A 53\A 54\A 55\A 56\A 57\A 58\A 59\A 60\A 61\A 62\A 63\A 64\A 65\A 66\A 67\A 68\A 69\A 70\A 71\A 72\A 73\A 74\A 75\A 76\A 77\A 78\A 79\A 80\A 81\A 82\A 83\A 84\A 85\A 86\A 87\A 88\A 89\A 90\A 91\A 92\A 93\A 94\A 95\A 96\A 97\A 98\A 99\A";
          white-space: pre-wrap;
          display: flex;
          justify-content: center;
          text-align: center;
          transition: all 0.75s cubic-bezier(0.68, -0.5, 0.27, 1);
          top: calc(var(--value) * -0.997em);
        }
      `}</style>
      </>
    );
  },
);
CountdownItem2.displayName = "CountdownItem2";
