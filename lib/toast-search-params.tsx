"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

type ToastSearchParamsProps = {
  searchParam: string;
  message: string;
  toastType: "success" | "error";
  url: string;
};

export const ToastSearchParams = ({
  searchParam,
  message,
  url,
  toastType,
}: ToastSearchParamsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get(searchParam)) {
      toast[toastType](message);
      router.replace(url);
    }
  }, [searchParams, router, searchParam, message, url, toastType]);

  return null;
};
