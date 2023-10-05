"use client";
import {
  SpringOptions,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import { isHoverContext } from "@/hooks/use-cursor";

export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
  const springConfig: SpringOptions = {
    damping: 20,
    stiffness: 300,
    mass: 0.5,
  };
  const springConfigRotate = { damping: 20, stiffness: 350, mass: 0.5 };

  const initialCursorConfig = {
    opacity: 1,
    size: { height: 20, width: 20 },
    angle: 0,
    scale: { x: 1, y: 1 },
    color: "black",
  };

  const cursorSize = {
    height: useMotionValue(initialCursorConfig.size.height),
    width: useMotionValue(initialCursorConfig.size.width),
  };
  const cx = useTransform(cursorSize.width, (w) => w / 2);
  const cy = useTransform(cursorSize.height, (h) => h / 2);
  const cursorOpacity = useMotionValue(initialCursorConfig.opacity);
  const mousePositionX = useSpring(0, springConfig);
  const mousePositionY = useSpring(0, springConfig);
  const color = useMotionValue(initialCursorConfig.color);

  const positionOffset = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const scale = {
    x: useSpring(initialCursorConfig.scale.x, springConfig),
    y: useSpring(initialCursorConfig.scale.y, springConfig),
  };

  const angleCursor = useSpring(initialCursorConfig.angle, springConfigRotate);

  const isHover = useMotionValue(false);

  const cursorPositionX = useTransform(
    mousePositionX,
    (x) => x - 0.5 * cursorSize.width.get()
  );
  const cursorPositionY = useTransform(
    mousePositionY,
    (y) => y - 0.5 * cursorSize.height.get()
  );

  const rotate = (
    distance: { x: number; y: number },
    extraAngle: number = 0
  ) => {
    const angle =
      (Math.atan2(distance.y, distance.x) * (180 / Math.PI) +
        initialCursorConfig.angle +
        extraAngle) %
      180;
    angleCursor.set(angle);
  };

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const { clientX, clientY } = event;
    const { left, top } = event.currentTarget.getBoundingClientRect();

    if (!isHover.get()) {
      mousePositionX.set(clientX - left);
      mousePositionY.set(clientY - top);
      positionOffset.x.set(left);
      positionOffset.y.set(top);
    }
  }

  function template({ x, y, rotate, scaleX, scaleY }: any) {
    return `translateX(${x}) translateY(${y}) rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY}) translateZ(0) `;
  }

  return (
    <isHoverContext.Provider
      value={{
        initialCursorConfig,
        cursorConfig: {
          position: {
            x: mousePositionX,
            y: mousePositionY,
          },
          opacity: cursorOpacity,
          size: cursorSize,
          angle: angleCursor,
          scale,
          color,
          positionOffset,
        },
        rotate,
        isHover,
      }}
    >
      <div
        className="relative h-full w-full "
        onMouseMove={handleMouseMove}
        onMouseEnter={() => cursorOpacity.set(initialCursorConfig.opacity)}
        onMouseLeave={() => cursorOpacity.set(0)}
      >
        <motion.svg
          className={
            "absolute top-0 left-0  bg-transparent z-50 pointer-events-none"
          }
          transformTemplate={template}
          style={{
            height: cursorSize.height,
            width: cursorSize.width,
            x: cursorPositionX,
            y: cursorPositionY,
            rotate: angleCursor,
            scaleX: scale.x,
            scaleY: scale.y,
            opacity: cursorOpacity,
          }}
        >
          <motion.ellipse cx={cx} cy={cy} rx={cx} ry={cy} fill={color} />
        </motion.svg>

        {children}
      </div>
    </isHoverContext.Provider>
  );
};
