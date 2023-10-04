"use client";
import {
  motion,
  useSpring,
  useTransform,
  transform,
  SpringOptions,
} from "framer-motion";
import { useRef, useState } from "react";
import Magnetic from "./magnetic";

const MouseSticky = () => {
  const menueRef = useRef<HTMLDivElement>(null);
  const springConfig: SpringOptions = {
    damping: 20,
    stiffness: 300,
    mass: 0.5,
  };
  const [isHovered, setIsHovered] = useState(false);
  const cursorSize = useSpring(20, springConfig);
  const mousePositionX = useSpring(0, springConfig);
  const mousePositionY = useSpring(0, springConfig);

  const scale = {
    x: useSpring(1, springConfig),
    y: useSpring(1, springConfig),
  };

  const cursorPositionX = useTransform(
    mousePositionX,
    (x) => x - 0.5 * cursorSize.get()
  );
  const cursorPositionY = useTransform(
    mousePositionY,
    (y) => y - 0.5 * cursorSize.get()
  );

  const angleCursor = useSpring(0, springConfig);

  const rotate = (distance: { x: number; y: number }) => {
    const angle = Math.atan2(distance.y, distance.x) * (180 / Math.PI);
    angleCursor.set(angle);
  };

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const { clientX, clientY } = event;
    const { left, top } = event.currentTarget.getBoundingClientRect();

    if (menueRef.current) {
      const {
        left: leftRef,
        top: topRef,
        width,
        height,
      } = menueRef.current.getBoundingClientRect();
      const center = { x: leftRef + width / 2, y: topRef + height / 2 };
      const distance = { x: clientX - center.x, y: clientY - center.y };

      rotate(distance);
      if (isHovered) {
        mousePositionX.set(center.x - left + distance.x * 0.1);
        mousePositionY.set(center.y - top + distance.y * 0.1);

        const absDistance = Math.max(
          Math.abs(distance.x),
          Math.abs(distance.y)
        );
        const newScaleX = transform(absDistance, [0, width / 2], [1, 1.3]);
        const newScaleY = transform(absDistance, [0, height / 2], [1, 0.7]);
        scale.x.set(newScaleX);
        scale.y.set(newScaleY);
      } else {
        mousePositionX.set(clientX - left);
        mousePositionY.set(clientY - top);
        scale.x.set(1);
        scale.y.set(1);
      }
    }
  }
  function template({ x, y, rotate, scaleX, scaleY }: any) {
    return `translateX(${x}) translateY(${y}) rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY}) translateZ(0)`;
  }

  return (
    <div
      className="relative  h-full w-full group flex flex-col items-center justify-center "
      onMouseMove={handleMouseMove}
    >
      <motion.div
        transformTemplate={template}
        className=" bg-black inset-0 absolute rounded-full  opacity-0 group-hover:opacity-100"
        style={{
          height: cursorSize,
          width: cursorSize,
          x: cursorPositionX,
          y: cursorPositionY,
          rotate: angleCursor,
          scaleX: scale.x,
          scaleY: scale.y,
        }}
      />
      <Magnetic className="mix-blend-difference">
        <div
          className={` relative flex w-full justify-center cursor-pointer gap-2 flex-col p-4 
             before:block before:w-8 before:h-1 before:mix-blend-difference before:bg-white
             after:block after:w-8 after:h-1 after:mix-blend-difference after:bg-white
          `}
          onMouseEnter={() => {
            cursorSize.set(50);
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            cursorSize.set(20);
            setIsHovered(false);
          }}
          ref={menueRef}
        >
          <div className=" w-full h-full absolute top-0 left-0  hover:scale-[3]  " />
          {/* <MenuIcon size={30} className="hover:bg-white" /> */}
        </div>
      </Magnetic>
      <h1 className="text-3xl font-bold">{"Secteur d'intervention"}</h1>
      <p>
        RIOT TECH est basé dans le Morbihan (56) et intervient pour les
        installations et SAV sur toute la région.
      </p>
      <p>Et sur toute la France métropolitaine pour les Box 4G.</p>
    </div>
  );
};

export default MouseSticky;
