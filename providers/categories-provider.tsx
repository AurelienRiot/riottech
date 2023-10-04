"use client";
import { useCategories } from "@/hooks/use-categories";
import { CategoryWithBillboard } from "@/types";
import { useEffect } from "react";

export function CategoriesProvider({
  categories,
}: {
  categories: CategoryWithBillboard[];
}) {
  const addCategories = useCategories((s) => s.addCategories);

  useEffect(() => {
    addCategories(categories);
  }, [categories, addCategories]);

  return null;
}
