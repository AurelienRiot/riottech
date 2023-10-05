"use client";
import Magnetic, {
  MagneticProps,
} from "@/app/(routes)/test/components/magnetic";
import { HTMLElements } from "@/components/animations/visible-element";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import {
  MotionValue,
  motion,
  transform,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { createContext, useContext } from "react";

type IsHoverContextType = {
  cursorConfig: {
    opacity: MotionValue<number>;
    size: { height: MotionValue<number>; width: MotionValue<number> };
    angle: MotionValue<number>;
    scale: { x: MotionValue<number>; y: MotionValue<number> };
    position: { x: MotionValue<number>; y: MotionValue<number> };
    color: MotionValue<string>;
    positionOffset: { x: MotionValue<number>; y: MotionValue<number> };
  };
  initialCursorConfig: {
    opacity: number;
    size: { height: number; width: number };
    angle: number;
    scale: { x: number; y: number };
    color: string;
  };
  rotate: (distance: { x: number; y: number }, extraAngle?: number) => void;
  isHover: MotionValue<boolean>;
};

export const isHoverContext = createContext<IsHoverContextType | undefined>(
  undefined
);

export function useIsHoverContext() {
  const context = useContext(isHoverContext);

  if (context === undefined) {
    throw new Error(
      "useOpacityContext must be used within a useIsHoverContext.Provider"
    );
  }

  return context;
}

type StickyCursorProps = MagneticProps;

export function StickyCursor({
  children,
  className,
  as,
  ...props
}: StickyCursorProps) {
  const { isHover, cursorConfig, rotate, initialCursorConfig } =
    useIsHoverContext();

  const color = "black";
  const scaleOffset = 3;

  const offsetAngle = useMotionValue(0);

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
    cursorConfig.scale.x.set(newScaleX);
    cursorConfig.scale.y.set(newScaleY);

    const posX =
      center.x - cursorConfig.positionOffset.x.get() + distance.x * 0.1;
    const posY =
      center.y - cursorConfig.positionOffset.y.get() + distance.y * 0.1;

    cursorConfig.position.x.set(posX);
    cursorConfig.position.y.set(posY);
  };

  const handleOnEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const { width, height } = e.currentTarget.getBoundingClientRect();
    cursorConfig.size.height.set(height * 1.3);
    cursorConfig.size.width.set(width * 1.3);
    cursorConfig.color.set(color);

    offsetAngle.set(
      (Math.acos(width / Math.sqrt(width ** 2 + height ** 2)) * 180) / Math.PI +
        initialCursorConfig.angle
    );

    e.currentTarget.style.zIndex = "50";

    isHover.set(true);
  };

  const handleOnLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    cursorConfig.opacity.set(initialCursorConfig.opacity);
    cursorConfig.size.height.set(initialCursorConfig.size.height);
    cursorConfig.size.width.set(initialCursorConfig.size.width);

    cursorConfig.scale.x.set(initialCursorConfig.scale.x);
    cursorConfig.scale.y.set(initialCursorConfig.scale.y);
    cursorConfig.color.set(initialCursorConfig.color);
    cursorConfig.angle.set(initialCursorConfig.angle);

    e.currentTarget.style.zIndex = "0";

    isHover.set(false);
  };
  return (
    <Slot
      onMouseMove={handleMouseMove}
      onMouseEnter={handleOnEnter}
      onMouseLeave={handleOnLeave}
    >
      <Magnetic
        as={as}
        className={cn("items-center group justify-center flex   ", className)}
        whileHover={{
          backgroundColor: "rgba(0, 0, 0, 0)",
          color: "rgb(255, 255, 255)",
        }}
        {...props}
      >
        <motion.div
          style={{
            rotate: useTransform(
              cursorConfig.angle,
              (a) => (a + offsetAngle.get()) % 180
            ),
            scale: useTransform(isHover, (value) => (value ? scaleOffset : 1)),
          }}
          // whileHover={{ scale: 3 }}
          className=" w-full h-full absolute top-0 left-0 group-hover:scale-[3]"
        />

        {children}
      </Magnetic>
    </Slot>
  );
}
