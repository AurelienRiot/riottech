import { TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface GalleryTabProps {
  imageUrl: string;
  selected?: boolean;
}

const GalleryTab: React.FC<GalleryTabProps> = ({ imageUrl, selected }) => {
  return (
    <TabsTrigger
      value={imageUrl}
      className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white"
    >
      <div>
        <span className="absolute inset-0 aspect-square h-full w-full overflow-hidden rounded-md transition-transform hover:scale-105 ">
          <Image fill src={imageUrl} sizes="50vw" alt="image" className="object-cover object-center" />
        </span>
        <span
          className={cn(
            " absolute inset-0 rounded-md ring-2 ring-offset-2",
            selected ? "ring-black" : "ring-transparent",
          )}
        />
      </div>
    </TabsTrigger>
  );
};

export default GalleryTab;
