"use client";
import { useCursor } from "@/hooks/use-cursor";
import { Color } from "@/lib/color";

const CursorDifference = () => {
  const { cursorConfig, initialCursorConfig } = useCursor();

  function handleMouseEnter() {
    cursorConfig.size.height.set(300);
    cursorConfig.size.width.set(300);
    cursorConfig.size.rx.set(300);
    cursorConfig.size.ry.set(300);
    cursorConfig.cursorMixBlendMode.set("difference");
    cursorConfig.color.set(Color("220, 38, 38", "rgb"));
  }
  function handleMouseLeave() {
    cursorConfig.size.height.set(initialCursorConfig.size.height);
    cursorConfig.size.width.set(initialCursorConfig.size.width);
    cursorConfig.size.rx.set(initialCursorConfig.size.rx);
    cursorConfig.size.ry.set(initialCursorConfig.size.ry);
    cursorConfig.cursorMixBlendMode.set(initialCursorConfig.cursorMixBlendMode);
    cursorConfig.color.set(Color("220, 38, 38", "rgb"));
  }

  return (
    <main
      className="h-screen relative group flex justify-center items-center"
      onMouseEnter={() => {
        cursorConfig.color.set(Color("red", "standard"));
      }}
      onMouseLeave={() => {
        cursorConfig.color.set(Color(initialCursorConfig.color));
      }}
    >
      <div
        className="w-fit h-fit flex justify-center items-center text-[#afa18f] text-[64px] leading-[66px] "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
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

export default CursorDifference;
