import { HTMLElements } from "@/components/animations/visible-element";
import { cn } from "@/lib/utils";
import {
  MotionProps,
  motion,
  useMotionTemplate,
  useSpring,
} from "framer-motion";

export type MagneticProps = Pick<
  React.HTMLAttributes<HTMLElement>,
  "onMouseEnter" | "onClick" | "children" | "className"
> &
  Pick<MotionProps, "whileHover" | "style"> & {
    as?: HTMLElements;
    onMouseMove?: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
  };

const Magnetic: React.FC<MagneticProps> = ({
  children,
  className,
  style = {},
  onMouseMove = () => {},
  onMouseLeave = () => {},
  as = "div",
  ...props
}) => {
  const springConfig = { damping: 5, stiffness: 350, mass: 0.5 };

  const position = {
    x: useSpring(0, springConfig),
    y: useSpring(0, springConfig),
  };

  const MouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;

    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();

    position.x.set((clientX - (left + width / 2)) * 0.1);
    position.y.set((clientY - (top + height / 2)) * 0.1);

    onMouseMove(event);
  };

  const MouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    position.x.set(0);
    position.y.set(0);

    onMouseLeave(event);
  };

  const MotionComponent = motion[as];

  return (
    <MotionComponent
      className={cn("relative w-fit h-fit", className)}
      onMouseMove={MouseMove}
      onMouseLeave={MouseLeave}
      style={{
        ...{
          x: useMotionTemplate`${position.x}px`,
          y: useMotionTemplate`${position.y}px`,
        },
        ...style,
      }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export default Magnetic;
