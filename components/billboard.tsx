import Loading from "@/components/loading";
import { Billboard as BillboardType } from "@prisma/client";
import { Suspense } from "react";
import ImageLoaderBillboard from "@/components/ui/image-loader-billboard";

interface BillboardProps {
  data: BillboardType;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  return (
    <div className="p-4 overflow-hidden sm:p-6 lg:p-8 rounded-xl">
      <Suspense fallback={<Loading />}>
        <ImageLoaderBillboard src={data?.imageUrl}>
          <div className="flex flex-col items-center justify-center w-full h-full text-center gap-y-8">
            <div className="max-w-xs p-2 pb-3 text-3xl font-bold bg-gray-800 rounded-lg sm:text-5xl lg:text-6xl sm:max-w-xl bg-opacity-40 text-gray-50">
              {data.label}
            </div>
          </div>
        </ImageLoaderBillboard>
      </Suspense>
    </div>
  );
};

export default Billboard;
