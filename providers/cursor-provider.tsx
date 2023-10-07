"use client";
import { IsHoverContextType, isHoverContext } from "@/hooks/use-cursor";
import {
  MotionValue,
  SpringOptions,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
  const springConfig: SpringOptions = {
    damping: 20,
    stiffness: 300,
    mass: 0.5,
  };
  const springConfigRotate = { damping: 20, stiffness: 350, mass: 0.5 };

  const initialCursorConfig = {
    opacity: 1,
    size: { height: 20, width: 20, rx: 10, ry: 10 },
    angle: 0,
    scale: { x: 1, y: 1 },
    color: "black",
    circleConfig: { cx: 0, cy: 0, r: 0 },
    turbConfig: {
      baseFrequency: 0,
      seed: "1",
      scale: "100",
    },
  };

  const scrollPosY = useMotionValue(0);

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

  const cursorOpacity = useMotionValue(initialCursorConfig.opacity);
  const mousePositionX = useMotionValue(0);
  const mousePositionY = useMotionValue(0);
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

  // const display = useTransform(isHover, (isHover) =>
  //   isHover ? "absolute" : "fixed"
  // );

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const { clientX, clientY } = event;
    const { left, top } = event.currentTarget.getBoundingClientRect();

    if (!isHover.get()) {
      // mousePositionX.set(clientX - left);
      // mousePositionY.set(clientY - top);
      // positionOffset.x.set(left);
      // positionOffset.y.set(top);
      mousePositionX.set(clientX);
      mousePositionY.set(clientY);
    }
    // console.log(mousePositionX.get(), mousePositionY.get());
  }

  function template({ x, y, rotate, scaleX, scaleY }: any) {
    return `translateX(${x}) translateY(${y}) rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY}) translateZ(0) `;
  }

  useEffect(() => {
    const handleScroll = () => {
      if (isHover.get()) {
        const currentScrollY = window.scrollY;
        const previousScrollY = scrollPosY.get();
        cursorPositionY.set(
          cursorPositionY.get() + (previousScrollY - currentScrollY)
        );
        scrollPosY.set(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosY, isHover, cursorPositionY]);

  return (
    <isHoverContext.Provider
      value={{
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
          positionOffset,
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
            "fixed inset-0 bg-transparent z-[51] pointer-events-none overflow-visible bg-gradient-radial "
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
    </isHoverContext.Provider>
  );
};

export function resetCursor({
  cursorConfig,
  initialCursorConfig,
  isHover,
}: {
  cursorConfig: IsHoverContextType["cursorConfig"];
  initialCursorConfig: IsHoverContextType["initialCursorConfig"];
  isHover: MotionValue<boolean>;
}) {
  cursorConfig.opacity.set(initialCursorConfig.opacity);
  cursorConfig.size.height.set(initialCursorConfig.size.height);
  cursorConfig.size.width.set(initialCursorConfig.size.width);
  cursorConfig.size.rx.set(initialCursorConfig.size.rx);
  cursorConfig.size.ry.set(initialCursorConfig.size.ry);

  cursorConfig.scale.x.set(initialCursorConfig.scale.x);
  cursorConfig.scale.y.set(initialCursorConfig.scale.y);
  cursorConfig.color.set(initialCursorConfig.color);
  // cursorConfig.angle.set(initialCursorConfig.angle);

  cursorConfig.turbConfig.scale.set(initialCursorConfig.turbConfig.scale);
  cursorConfig.turbConfig.seed.set(initialCursorConfig.turbConfig.seed);
  cursorConfig.turbConfig.baseFrequency.set(
    initialCursorConfig.turbConfig.baseFrequency
  );

  cursorConfig.circleConfig.r.set(initialCursorConfig.circleConfig.r);

  isHover.set(false);
}
