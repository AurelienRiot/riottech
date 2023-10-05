import { HTMLElements } from "@/components/animations/visible-element";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useSpring } from "framer-motion";

export type MagneticProps = Pick<
  React.HTMLAttributes<HTMLElement>,
  "onMouseEnter" | "onClick" | "children" | "className"
> & {
  as?: HTMLElements;
};

const Magnetic: React.FC<MagneticProps> = ({
  children,
  className,
  as = "div",
  ...props
}) => {
  const springConfig = { damping: 5, stiffness: 350, mass: 0.5 };

  const position = {
    x: useSpring(0, springConfig),
    y: useSpring(0, springConfig),
  };

  const handleMouse = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;

    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();

    position.x.set((clientX - (left + width / 2)) * 0.1);
    position.y.set((clientY - (top + height / 2)) * 0.1);
  };

  const reset = () => {
    position.x.set(0);
    position.y.set(0);
  };

  const MotionComponent = motion[as];

  return (
    <MotionComponent
      className={cn("relative w-fit h-fit", className)}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{
        x: useMotionTemplate`${position.x}px`,
        y: useMotionTemplate`${position.y}px`,
      }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export default Magnetic;
