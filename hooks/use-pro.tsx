"use client";
import { createContext, useContext, useState } from "react";

type IsProContextType = {
  isPro: boolean;
  setIsPro: React.Dispatch<React.SetStateAction<boolean>>;
};

export const IsProContext = createContext<IsProContextType | undefined>(
  undefined
);

export const IsProProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPro, setIsPro] = useState<boolean>(true);
  return (
    <IsProContext.Provider value={{ isPro, setIsPro }}>
      {children}
    </IsProContext.Provider>
  );
};

export function useIsProContext() {
  const context = useContext(IsProContext);

  if (context === undefined) {
    throw new Error("useIsProContext must be used within a IsProProvider");
  }

  return context;
}
