import { ProductWithCategoryAndImages } from "@/types";
import { toast } from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartStore {
  items: ProductWithCategoryAndImages[];
  quantities: { [productId: string]: number };
  addItem: (data: ProductWithCategoryAndImages) => void;
  addOneItem: (id: string) => void;
  removeOneItem: (id: string) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      quantities: {},

      addItem: (data: ProductWithCategoryAndImages) => {
        const quantities = get().quantities;
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          quantities[data.id]++;
        } else {
          quantities[data.id] = 1;
          set({ items: [...get().items, data] });
        }
        set({ quantities });
        toast.success("Produit ajouté au panier.");
      },

      addOneItem: (id: string) => {
        const quantities = get().quantities;
        quantities[id]++;
        set({ quantities });
      },

      removeOneItem: (id: string) => {
        const quantities = get().quantities;
        quantities[id]--;
        if (quantities[id] === 0) {
          set({ items: [...get().items.filter((item) => item.id !== id)] });
        } else {
          set({ quantities });
        }
      },

      removeItem: (id: string) => {
        const quantities = get().quantities;
        quantities[id] = 0;
        set({
          items: [...get().items.filter((item) => item.id !== id)],
          quantities,
        });
      },

      removeAll: () => {
        const quantities = get().quantities;
        Object.keys(get().quantities).forEach((productId) => {
          quantities[productId] = 0;
        });
        set({ items: [], quantities });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
