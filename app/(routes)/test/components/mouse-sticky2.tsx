"use client";
import { useCursor } from "@/hooks/use-cursor";
import { motion, transform, useMotionValue, useSpring } from "framer-motion";
import { Menu } from "lucide-react";
import Magnetic from "./magnetic";

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
    </div>
  );
};

export default MouseSticky2;

function Menu1() {
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
        <div className=" w-full h-full absolute top-0 left-0  hover:scale-[3] " />
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
