import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import Gallery from "@/components/gallery/gallery";
import Info from "@/components/info";
import IconButton from "@/components/ui/icon-button";
import usePreviewModal from "@/hooks/use-preview-modal";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const PreviewModal = () => {
  const { onClose, isOpen } = usePreviewModal();
  const product = usePreviewModal((state) => state.data);

  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!product) {
    return null;
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <Dialog.Content className="hide-scrollbar fixed left-[50%] top-[50%] z-50 h-full w-screen translate-x-[-50%] translate-y-[-50%] overflow-y-auto   rounded-lg min-[800px]:w-[800px] shadow-lg duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] ">
        <div className="flex min-h-full w-full    items-center justify-center rounded-lg p-4 text-center">
          <div className="w-full max-w-3xl rounded-lg text-left align-middle">
            <div className="relative flex w-full items-center rounded-lg bg-background px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <Dialog.Close asChild className="absolute right-2 top-2 ">
                <IconButton
                  className="bg-primary"
                  icon={<X size={15} className="text-primary-foreground" />}
                />
              </Dialog.Close>
              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="sm:col-span-4 lg:col-span-5">
                  <Gallery images={product.images} />
                </div>
                <div className="sm:col-span-8 lg:col-span-7">
                  <Info data={product} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default PreviewModal;
