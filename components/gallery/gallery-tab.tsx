import Loading from "@/components/loading";
import { cn } from "@/lib/utils";
import { Image as ImageType } from "@prisma/client";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import { Suspense } from "react";

interface GalleryTabProps {
  image: ImageType;
}

const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
  return (
    <Tab className="relative flex items-center justify-center bg-white rounded-md cursor-pointer aspect-square">
      <div>
        <span className="absolute inset-0 w-full h-full overflow-hidden rounded-md aspect-square hover:scale-105">
          <Suspense fallback={<Loading />}>
            <Image
              fill
              src={image.url}
              sizes="80vw"
              alt="image"
              className="object-cover object-center"
            />
          </Suspense>
        </span>
        <span
          className={cn(
            "absolute inset-0 rounded-md ring-2 ring-offset-2 selected"
              ? "ring-black"
              : "ring-transparent"
          )}
        />
      </div>
    </Tab>
  );
};

export default GalleryTab;
