import Magnetic, {
  MagneticProps,
} from "@/app/(routes)/test/components/magnetic";
import { useIsHoverContext } from "@/hooks/use-cursor";
import { cn } from "@/lib/utils";
import { resetCursor } from "@/providers/cursor-provider";
import { motion, transform, useMotionValue, useTransform } from "framer-motion";

type StickyCursorProps = MagneticProps & {
  scaleOffset?: number;
};

export function StickyCursor({
  children,
  className,
  as,
  scaleOffset = 3,
  onMouseMove = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  ...props
}: StickyCursorProps) {
  const { isHover, cursorConfig, initialCursorConfig, elementDimension } =
    useIsHoverContext();

  const color = "black";

  const offsetAngle = useMotionValue(0);

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

    const newAngle =
      (Math.atan2(distance.y, distance.x) * (180 / Math.PI) +
        180 +
        initialCursorConfig.angle) %
      360;

    const currentAngle = cursorConfig.angle.get();
    const angleDifference = shortestAngleDifference(currentAngle, newAngle);
    const finalAngle = (currentAngle + angleDifference) % 360;
    cursorConfig.angle.set(finalAngle);

    const absDistance = Math.max(Math.abs(distance.x), Math.abs(distance.y));
    const newScaleX = transform(absDistance, [0, width / 2], [1, 1.3]);
    const newScaleY = transform(absDistance, [0, height / 2], [1, 0.7]);
    cursorConfig.scale.x.set(newScaleX);
    cursorConfig.scale.y.set(newScaleY);

    onMouseMove(e);
  };

  const handleOnEnter = (e: React.MouseEvent<HTMLElement>) => {
    const { width, height } = e.currentTarget.getBoundingClientRect();
    cursorConfig.size.height.set(height * 1.3);
    cursorConfig.size.rx.set(Math.min(height, width));
    cursorConfig.size.width.set(width * 1.3);
    cursorConfig.size.ry.set(Math.min(height, width));
    cursorConfig.color.set(color);
    cursorConfig.angle.set(initialCursorConfig.angle);

    offsetAngle.set(
      (Math.acos(width / Math.sqrt(width ** 2 + height ** 2)) * 180) / Math.PI +
        initialCursorConfig.angle
    );

    isHover.set(true);
    // setIsHover(true);
    onMouseEnter(e);
  };

  const handleOnLeave = (e: React.MouseEvent<HTMLElement>) => {
    resetCursor({ initialCursorConfig, cursorConfig, isHover });

    onMouseLeave(e);
  };

  console.log("render sticky cursor:", as);
  return (
    <Magnetic
      onMouseMove={handleMouseMove}
      onMouseEnter={handleOnEnter}
      onMouseLeave={handleOnLeave}
      as={as}
      className={cn(
        "items-center group justify-center flex hover:z-[51] ",
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
          rotate: useTransform(
            cursorConfig.angle,
            (a) => (a + offsetAngle.get()) % 180
          ),
          scale: useTransform(isHover, (value) => (value ? scaleOffset : 1)),
        }}
        className=" w-full h-full absolute top-0 left-0 group-hover:scale-[3]"
      />

      {children}
    </Magnetic>
  );
}

function shortestAngleDifference(a: number, b: number) {
  const diff = ((b - a + 180) % 360) - 180;
  return diff < -180 ? diff + 360 : diff;
}

function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t;
}
