import { cn } from "@/lib/utils";

const HoverWord = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <>
      {" "}
      <span
        className={cn(
          " relative z-10 inline-block before:absolute   before:inset-0 before:z-[-1] before:max-w-0  before:rotate-1 before:skew-y-1 before:rounded-sm before:bg-sky-500 before:duration-300 before:ease-linear group-hover:before:max-w-full dark:before:bg-sky-600",
          className,
        )}
      >
        {children}
      </span>{" "}
    </>
  );
};

export default HoverWord;
