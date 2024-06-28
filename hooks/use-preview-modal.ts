import type { ProductWithCategoryAndImages } from "@/types";
import { create } from "zustand";

interface PreviewModalStore {
  isOpen: boolean;
  data?: ProductWithCategoryAndImages;
  onOpen: (data: ProductWithCategoryAndImages) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: ProductWithCategoryAndImages) => set({ data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePreviewModal;
