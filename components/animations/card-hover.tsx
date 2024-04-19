import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type CardHoverProps = React.HTMLAttributes<HTMLDivElement> & {
  image: string;
  text: string;
  title: string;
  link: string;
};

const CardHover = ({
  image,
  text,
  title,
  link,
  className,
  ...props
}: CardHoverProps) => {
  return (
    <>
      <div
        className={cn("m-0 flex items-center justify-center p-0 ", className)}
        {...props}
      >
        <div className=" relative flex justify-between">
          <div className="group relative   transition-all duration-500  ease-in-out hover:mb-[300px]">
            <div
              className="absolute  inset-0 z-10  min-h-[300px] max-w-[400px]  bg-gray-600 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all  duration-500  group-hover:bg-green-600 group-hover:shadow-none
  "
            >
              <div className="flex h-full flex-col items-center justify-between p-4 opacity-100 transition-all duration-500 group-hover:opacity-100">
                <Image
                  alt=""
                  width={100}
                  height={100}
                  src={image}
                  className="max-w-[100px] "
                />
                <h3
                  className="mx-0 mb-0 mt-2.5  p-0 text-center font-SourceCodePro text-[1.5em] text-green-600 transition-all duration-500 group-hover:text-white
"
                >
                  {title}
                </h3>
                <p className="">En savoir plus</p>
              </div>
            </div>
            <Link
              href={link}
              className="relative box-border flex min-h-[300px]   max-w-[400px] flex-col  justify-between bg-primary-foreground p-5 opacity-50   shadow-[0_20px_50px_rgba(0,0,0,0.8)]  transition-all  duration-500 group-hover:translate-y-[300px]  group-hover:opacity-100 "
            >
              <p className="relative m-0 p-0 px-2 text-center text-primary-foreground  transition-all duration-500 group-hover:text-primary">
                {text}
              </p>
              <div
                className="mx-0 mb-0 mt-[15px] w-fit self-center border border-solid border-[#333] p-[5px] font-black text-[#333] transition-all duration-500 group-hover:bg-[#333] group-hover:text-white
"
              >
                En savoir plus
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardHover;
