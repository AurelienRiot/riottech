import { cn } from "@/lib/utils";
import { ArrowBigRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Button } from "../../../../../components/ui/button";

type CardHoverProps = React.HTMLAttributes<HTMLDivElement> & {
  image: StaticImageData;
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
    <div
      className={cn("m-0 flex items-center justify-center   p-0", className)}
      {...props}
    >
      <div className=" relative flex justify-between ">
        <div className="group relative   transition-all duration-500  ease-out max-[880px]:hover:mb-[300px] ">
          <div
            className="absolute  inset-0 z-10  min-h-[300px] max-w-[400px]  rounded-2xl bg-gray-600  shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all  duration-500  group-hover:rounded-b-none group-hover:bg-green-600 group-hover:shadow-none
  "
          >
            <div className="flex h-full flex-col items-center justify-between p-4 opacity-100 transition-all duration-500 group-hover:opacity-100">
              <Image
                alt=""
                width={100}
                height={100}
                src={image}
                placeholder="blur"
                className="max-w-[100px] "
              />
              <h3
                className="mx-0 mb-0 mt-2.5  p-0 text-center font-SourceCodePro text-[1.5em] text-green-600 transition-all duration-500 group-hover:text-white
"
              >
                {title}
              </h3>
              <p className="transition-opacity group-hover:opacity-0">
                En savoir plus
              </p>
            </div>
          </div>
          <Link
            href={link}
            className="relative box-border flex min-h-[300px]   max-w-[400px] flex-col  justify-between rounded-2xl bg-primary-foreground p-5 opacity-50   shadow-[0_20px_50px_rgba(0,0,0,0.8)]  transition-all  duration-500 group-hover:translate-y-[300px]  group-hover:rounded-t-none group-hover:opacity-100"
          >
            <p className="relative m-0  text-pretty p-0 px-2  text-primary-foreground  transition-all duration-500 group-hover:text-primary">
              {text}
            </p>

            <Button
              variant={"expandIcon"}
              iconPlacement="right"
              Icon={ArrowBigRight}
              className="font-semibold"
            >
              En savoir plus
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardHover;
