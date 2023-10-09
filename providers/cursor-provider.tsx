"use client";
import { CursorContextType, CursorContext } from "@/hooks/use-cursor";
import { Color } from "@/lib/color";
import {
  MotionValue,
  SpringOptions,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const springConfig: SpringOptions = {
    damping: 20,
    stiffness: 300,
    mass: 0.5,
  };
  const springConfigRotate = { damping: 20, stiffness: 350, mass: 0.5 };

  const initialCursorConfig = useMemo(
    () => ({
      opacity: 1,
      size: { height: 20, width: 20, rx: 10, ry: 10 },
      angle: 0,
      scale: { x: 1, y: 1 },
      color: "primary",
      circleConfig: { cx: 0, cy: 0, r: 0 },
      turbConfig: {
        baseFrequency: 0,
        seed: "1",
        scale: "100",
      },
    }),
    []
  );

  const turbConfig = {
    baseFrequency: useMotionValue(initialCursorConfig.turbConfig.baseFrequency),
    seed: useMotionValue(initialCursorConfig.turbConfig.seed),
    scale: useMotionValue(initialCursorConfig.turbConfig.scale),
  };
  const cursorSize = {
    height: useMotionValue(initialCursorConfig.size.height),
    width: useMotionValue(initialCursorConfig.size.width),
    rx: useMotionValue(initialCursorConfig.size.rx),
    ry: useMotionValue(initialCursorConfig.size.ry),
  };

  const circleConfig = {
    cx: useMotionValue(initialCursorConfig.circleConfig.cx),
    cy: useMotionValue(initialCursorConfig.circleConfig.cy),
    r: useMotionValue(initialCursorConfig.circleConfig.r),
  };

  const cursorOpacity = useSpring(initialCursorConfig.opacity, springConfig);
  const mousePositionX = useSpring(0, springConfig);
  const mousePositionY = useSpring(0, springConfig);
  const color = useMotionValue("transparent");

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

  const elementDimension = {
    width: useMotionValue(0),
    height: useMotionValue(0),
    left: useMotionValue(0),
    top: useMotionValue(0),
  };

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const { clientX, clientY } = event;
    const { left, top } = event.currentTarget.getBoundingClientRect();

    if (isHover.get()) {
      const center = {
        x: elementDimension.left.get() + elementDimension.width.get() / 2,
        y: elementDimension.top.get() + elementDimension.height.get() / 2,
      };
      const distance = { x: clientX - center.x, y: clientY - center.y };

      const posX = center.x - left + distance.x * 0.1;
      const posY = center.y - top + distance.y * 0.1;

      mousePositionX.set(posX);
      mousePositionY.set(posY);
    } else {
      mousePositionX.set(clientX - left);
      mousePositionY.set(clientY - top);
    }
  }

  function template({ x, y, rotate, scaleX, scaleY }: any) {
    return `translateX(${x}) translateY(${y}) rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY}) translateZ(0) `;
  }

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (isHover.get()) {
  //       const currentScrollY = window.scrollY;
  //       const previousScrollY = scrollPosY.get();
  //       cursorPositionY.set(
  //         cursorPositionY.get() + (previousScrollY - currentScrollY)
  //       );
  //       scrollPosY.set(currentScrollY);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [scrollPosY, isHover, cursorPositionY]);

  useEffect(() => {
    color.set(Color(initialCursorConfig.color));
    console.log("set color:", Color(initialCursorConfig.color));
  }, [color, initialCursorConfig]);
  return (
    <CursorContext.Provider
      value={{
        elementDimension,
        initialCursorConfig,
        cursorConfig: {
          position: {
            x: mousePositionX,
            y: mousePositionY,
          },
          turbConfig,
          opacity: cursorOpacity,
          size: cursorSize,
          angle: angleCursor,
          scale,
          color,
          circleConfig,
        },
        isHover,
      }}
    >
      <div
        className="relative h-full w-full cursor-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => cursorOpacity.set(initialCursorConfig.opacity)}
        onMouseLeave={() => cursorOpacity.set(0)}
      >
        <motion.svg
          className={
            "absolute inset-0 bg-transparent z-[51] pointer-events-none overflow-visible bg-gradient-radial "
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
          <defs>
            <motion.radialGradient
              id="radialGradient"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <motion.stop
                offset="0%"
                style={{ stopColor: "white", stopOpacity: 1 }}
              />
              <motion.stop
                offset="100%"
                style={{ stopColor: "transparent", stopOpacity: 1 }}
              />
            </motion.radialGradient>
            <filter id="ripple">
              <motion.feTurbulence
                type="fractalNoise"
                baseFrequency={turbConfig.baseFrequency}
                numOctaves="4"
                result="TURB"
                seed={turbConfig.seed}
              />
              <motion.feDisplacementMap
                xChannelSelector="R"
                yChannelSelector="G"
                in="SourceGraphic"
                in2="TURB"
                scale={turbConfig.scale}
              />
            </filter>
          </defs>
          <motion.rect
            style={{
              width: cursorSize.width,
              height: cursorSize.height,
            }}
            rx={cursorSize.rx}
            ry={cursorSize.ry}
            fill={color}
            filter="url(#ripple)"
          />
          <motion.circle
            cx={circleConfig.cx}
            cy={circleConfig.cy}
            r={circleConfig.r}
            fill="url(#radialGradient)"
          />
        </motion.svg>

        {children}
      </div>
    </CursorContext.Provider>
  );
};

export function resetCursor({
  cursorConfig,
  initialCursorConfig,
  isHover,
}: {
  cursorConfig: CursorContextType["cursorConfig"];
  initialCursorConfig: CursorContextType["initialCursorConfig"];
  isHover: MotionValue<boolean>;
}) {
  cursorConfig.opacity.set(initialCursorConfig.opacity);
  cursorConfig.size.height.set(initialCursorConfig.size.height);
  cursorConfig.size.width.set(initialCursorConfig.size.width);
  cursorConfig.size.rx.set(initialCursorConfig.size.rx);
  cursorConfig.size.ry.set(initialCursorConfig.size.ry);

  cursorConfig.scale.x.set(initialCursorConfig.scale.x);
  cursorConfig.scale.y.set(initialCursorConfig.scale.y);
  cursorConfig.color.set(Color(initialCursorConfig.color));
  console.log("set color:", Color(initialCursorConfig.color));

  cursorConfig.turbConfig.scale.set(initialCursorConfig.turbConfig.scale);
  cursorConfig.turbConfig.seed.set(initialCursorConfig.turbConfig.seed);
  cursorConfig.turbConfig.baseFrequency.set(
    initialCursorConfig.turbConfig.baseFrequency
  );

  cursorConfig.circleConfig.r.set(initialCursorConfig.circleConfig.r);

  isHover.set(false);
}
