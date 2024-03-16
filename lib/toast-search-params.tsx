"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

type ToastSearchParamsProps = {
  searchParam: string;
  message: string;
  toastType: "success" | "error";
  url: string;
  customFunction?: () => void;
};

export const ToastSearchParams = ({
  searchParam,
  message,
  url,
  toastType,
  customFunction,
}: ToastSearchParamsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get(searchParam)) {
      toast[toastType](message);
      router.replace(url);

      if (customFunction) {
        customFunction();
      }
    }
  }, [
    searchParams,
    router,
    searchParam,
    message,
    url,
    toastType,
    customFunction,
  ]);

  return null;
};
