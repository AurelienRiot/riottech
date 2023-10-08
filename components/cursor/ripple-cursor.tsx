import Magnetic, {
  MagneticProps,
} from "@/app/(routes)/test/components/magnetic";
import { useIsHoverContext } from "@/hooks/use-cursor";
import { cn } from "@/lib/utils";
import { resetCursor } from "@/providers/cursor-provider";
import { motion, transform, useMotionValue, useTransform } from "framer-motion";

type RippleCursorProps = MagneticProps & {
  scaleOffset?: number;
};

export function RippleCursor({
  children,
  className,
  as,
  scaleOffset = 3,
  onMouseMove = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  ...props
}: RippleCursorProps) {
  const { isHover, cursorConfig, initialCursorConfig, elementDimension } =
    useIsHoverContext();

  const color = "black";

  const offsetAngle = useMotionValue(0);
  const rotate = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    elementDimension.width.set(width);
    elementDimension.height.set(height);
    elementDimension.left.set(left);
    elementDimension.top.set(top);

    const center = { x: left + width / 2, y: top + height / 2 };
    const distance = { x: clientX - center.x, y: clientY - center.y };
    const absDistance = Math.max(Math.abs(distance.x), Math.abs(distance.y));
    const maxDist = Math.max(width / 2, height / 2) * scaleOffset;
    const baseFrequency = transform(
      absDistance,
      [0, (maxDist * 3) / 4, maxDist],
      [0, 0.01, 0.1]
    );
    cursorConfig.turbConfig.baseFrequency.set(baseFrequency);

    const newAngle =
      (Math.atan2(distance.y, distance.x) * (180 / Math.PI) +
        180 +
        initialCursorConfig.angle) %
      360;
    rotate.set(newAngle);

    cursorConfig.circleConfig.cx.set(
      0.9 * distance.x + cursorConfig.size.width.get() / 2
    );
    cursorConfig.circleConfig.cy.set(
      0.9 * distance.y + cursorConfig.size.height.get() / 2
    );

    onMouseMove(e);
  };

  const handleOnEnter = (e: React.MouseEvent<HTMLElement>) => {
    const { width, height } = e.currentTarget.getBoundingClientRect();
    cursorConfig.size.height.set(height * 1.3);
    cursorConfig.size.width.set(width * 1.3);
    cursorConfig.color.set(color);

    offsetAngle.set(
      (Math.acos(width / Math.sqrt(width ** 2 + height ** 2)) * 180) / Math.PI +
        initialCursorConfig.angle
    );
    cursorConfig.angle.set(initialCursorConfig.angle);

    cursorConfig.circleConfig.r.set(20);

    isHover.set(true);
    onMouseEnter(e);
  };

  const handleOnLeave = (e: React.MouseEvent<HTMLElement>) => {
    resetCursor({ initialCursorConfig, cursorConfig, isHover });

    onMouseLeave(e);
  };

  console.log("render ripple cursor");

  return (
    <Magnetic
      onMouseMove={handleMouseMove}
      onMouseEnter={handleOnEnter}
      onMouseLeave={handleOnLeave}
      as={as}
      className={cn(
        "items-center group justify-center flex hover:z-[51]   ",
        className
      )}
      whileHover={{
        backgroundColor: "rgba(0, 0, 0, 0)",
        color: "rgb(255, 255, 255)",
      }}
      {...props}
    >
      <motion.div
        style={{
          // rotate: useTransform(rotate, (a) => (a + offsetAngle.get()) % 180),
          scale: useTransform(isHover, (value) => (value ? scaleOffset : 1)),
        }}
        className=" w-full h-full absolute top-0 left-0"
      />

      {children}
    </Magnetic>
  );
}
