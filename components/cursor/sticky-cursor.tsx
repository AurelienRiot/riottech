import Magnetic, {
  MagneticProps,
} from "@/app/(routes)/test/components/magnetic";
import { useCursor } from "@/hooks/use-cursor";
import { cn } from "@/lib/utils";
import { resetCursor } from "@/providers/cursor-provider";
import { motion, transform, useMotionValue } from "framer-motion";

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
    useCursor();

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
    const diffAngle = newAngle - currentAngle;
    const finalAngle =
      diffAngle > 180
        ? newAngle - 360
        : diffAngle < -180
        ? newAngle + 360
        : newAngle;
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
    cursorConfig.angle.set(initialCursorConfig.angle);

    offsetAngle.set(
      (Math.acos(width / Math.sqrt(width ** 2 + height ** 2)) * 180) / Math.PI +
        initialCursorConfig.angle
    );

    isHover.set("sticky");
    onMouseEnter(e);
  };

  const handleOnLeave = (e: React.MouseEvent<HTMLElement>) => {
    resetCursor({ initialCursorConfig, cursorConfig, isHover });
    cursorConfig.angle.set(initialCursorConfig.angle);

    onMouseLeave(e);
  };

  return (
    <Magnetic
      onMouseMove={handleMouseMove}
      onMouseEnter={handleOnEnter}
      onMouseLeave={handleOnLeave}
      as={as}
      className={cn(
        "items-center group justify-center flex hover:z-[51] hover:bg-transparent   ",
        className
      )}
      {...props}
    >
      <motion.div className=" w-full h-full absolute top-0 left-0 group-hover:scale-[3]" />

      {children}
    </Magnetic>
  );
}
