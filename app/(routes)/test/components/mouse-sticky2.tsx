"use client";
import { Button } from "@/components/ui/button";
import {
  motion,
  useSpring,
  useTransform,
  SpringOptions,
  useMotionValue,
  transform,
} from "framer-motion";
import { Menu } from "lucide-react";
import { createContext, useContext, useState } from "react";
import Magnetic from "./magnetic";

const MouseSticky2 = () => {
  const springConfig: SpringOptions = {
    damping: 20,
    stiffness: 300,
    mass: 0.5,
  };
  const cursorSize = 20;
  const cursorOpacity = useMotionValue(1);
  const mousePositionX = useSpring(0, springConfig);
  const mousePositionY = useSpring(0, springConfig);

  const [isHover, setIsHover] = useState(true);

  const cursorPositionX = useTransform(
    mousePositionX,
    (x) => x - 0.5 * cursorSize
  );
  const cursorPositionY = useTransform(
    mousePositionY,
    (y) => y - 0.5 * cursorSize
  );

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const { clientX, clientY } = event;
    const { left, top } = event.currentTarget.getBoundingClientRect();

    cursorOpacity.set(isHover ? 0 : 1);
    mousePositionX.set(clientX - left);
    mousePositionY.set(clientY - top);
  }

  console.log("render page");

  return (
    <isHoverContext.Provider value={{ isHover, setIsHover }}>
      <div
        className="relative  h-full w-full  flex flex-col gap-10 items-center justify-center "
        onMouseMove={handleMouseMove}
        onMouseEnter={() => cursorOpacity.set(1)}
        onMouseLeave={() => cursorOpacity.set(0)}
      >
        <motion.div
          className=" bg-black inset-0 absolute rounded-full  "
          style={{
            height: cursorSize,
            width: cursorSize,
            x: cursorPositionX,
            y: cursorPositionY,
            opacity: cursorOpacity,
          }}
        />

        <Menu1 />
        <Menu2 />
      </div>
    </isHoverContext.Provider>
  );
};

export default MouseSticky2;

function Menu1() {
  const { isHover, setIsHover } = useIsHoverContext();
  const springConfig = { damping: 5, stiffness: 350, mass: 0.5 };
  const springConfigRotate = { damping: 20, stiffness: 350, mass: 0.5 };

  const backgroundColor = useMotionValue("white");
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

    position.x.set((clientX - (left + width / 2)) * 0.1);
    position.y.set((clientY - (top + height / 2)) * 0.1);
  };

  const handleOnEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    backgroundColor.set("red");
    e.stopPropagation();
    setIsHover(true);
    console.log("enter Button");
  };

  const handleOnLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsHover(false);
    console.log("leave Button");
    backgroundColor.set("white");
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
        className="w-20 h-20  items-center rounded-full justify-center flex "
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
        <Menu />
      </motion.div>
    </>
  );
}

function Menu2() {
  const { isHover, setIsHover } = useIsHoverContext();
  const springConfig = { damping: 5, stiffness: 350, mass: 0.5 };
  const springConfigRotate = { damping: 20, stiffness: 350, mass: 0.5 };

  const backgroundColor = useMotionValue("transparent");
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
    const newScaleX = transform(absDistance, [0, width / 2], [1, 1.3]);
    const newScaleY = transform(absDistance, [0, height / 2], [1, 0.7]);
    scale.x.set(newScaleX);
    scale.y.set(newScaleY);

    position.x.set((clientX - (left + width / 2)) * 0.2);
    position.y.set((clientY - (top + height / 2)) * 0.2);
  };

  const handleOnEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    backgroundColor.set("black");
    e.stopPropagation();
    setIsHover(true);
    console.log("enter Button");
  };

  const handleOnLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsHover(false);
    console.log("leave Button");
    backgroundColor.set("transparent");
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
      <div
        className="relative w-20 h-20  items-center rounded-full justify-center flex group"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleOnEnter}
        onMouseLeave={handleOnLeave}
      >
        <motion.div
          className="w-full h-full absolute top-0 left-0 rounded-full "
          transformTemplate={template}
          style={{
            backgroundColor: backgroundColor,
            x: position.x,
            y: position.y,
            rotate: angleCursor,
            scaleX: scale.x,
            scaleY: scale.y,
          }}
        />
        <Magnetic className="w-full h-full items-center rounded-full justify-center flex">
          <div className=" w-full h-full absolute top-0 left-0  hover:scale-[3] rounded-full" />
          <Menu className="z-10 group-hover:text-white" />
        </Magnetic>
      </div>
    </>
  );
}

type IsHoverContextType = {
  isHover: boolean;
  setIsHover: React.Dispatch<React.SetStateAction<boolean>>;
};

const isHoverContext = createContext<IsHoverContextType | undefined>(undefined);

export function useIsHoverContext() {
  const context = useContext(isHoverContext);

  if (context === undefined) {
    throw new Error(
      "useOpacityContext must be used within a useIsHoverContext.Provider"
    );
  }

  return context;
}
