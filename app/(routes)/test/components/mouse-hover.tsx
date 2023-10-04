"use client";
import {
  motion,
  useMotionTemplate,
  useSpring,
  useTransform,
} from "framer-motion";

const base64Svg = btoa(
  '<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="black" /></svg>'
);

const MouseHover = () => {
  const springConfig = { damping: 20, stiffness: 300 };

  const size = useSpring(40, springConfig);
  const mousePositionX = useSpring(0, springConfig);
  const mousePositionY = useSpring(0, springConfig);

  const maskPositionX = useTransform(mousePositionX, (x) => x - size.get() / 2);
  const maskPositionY = useTransform(mousePositionY, (y) => y - size.get() / 2);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    let { clientX, clientY } = event;
    let { left, top } = event.currentTarget.getBoundingClientRect();

    mousePositionX.set(clientX - left);
    mousePositionY.set(clientY - top);
  }

  return (
    <main className="h-screen relative group" onMouseMove={handleMouseMove}>
      <motion.div
        className="text-black absolute bg-red-600 w-full h-full flex justify-center items-center text-[64px] leading-[66px] cursor-default opacity-0 group-hover:opacity-100"
        style={{
          WebkitMaskImage: `url('data:image/svg+xml;base64,${base64Svg}')`,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: useMotionTemplate`${size}px`,
          WebkitMaskPosition: useMotionTemplate`${maskPositionX}px ${maskPositionY}px`,
        }}
      >
        <p
          className="p-10 w-[1000px]"
          onMouseEnter={() => {
            size.set(400);
          }}
          onMouseLeave={() => {
            size.set(40);
          }}
        >
          {
            " A visual designer - with skills that haven't been replaced by A.I (yet) - making good shit only if the paycheck is equally good."
          }
        </p>
      </motion.div>

      <div className="w-full h-full flex justify-center items-center text-[#afa18f] text-[64px] leading-[66px] cursor-default">
        <p className="p-10 w-[1000px] ">
          {"I'm a "}
          <span className="text-red-600">selectively skilled</span> product
          designer with strong focus on producing high quality & impactful
          digital experience.
        </p>
      </div>
    </main>
  );
};

export default MouseHover;
