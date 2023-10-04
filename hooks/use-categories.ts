import { CategoryWithBillboard } from "@/types";
import { create } from "zustand";

type CategoriesStore = {
  categories: CategoryWithBillboard[];
  addCategories: (categories: CategoryWithBillboard[]) => void;
};

export const useCategories = create<CategoriesStore>((set) => ({
  categories: [],
  addCategories: (categories: CategoryWithBillboard[]) =>
    set((state) => ({ categories: categories })),
}));
