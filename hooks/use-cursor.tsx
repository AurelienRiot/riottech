"use client";
import { MotionValue } from "framer-motion";
import { createContext, useContext } from "react";

type IsHoverType = "default" | "sticky" | "turb";
type cursorMixBlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten"
  | "color-dodge"
  | "color-burn"
  | "hard-light"
  | "soft-light"
  | "difference"
  | "exclusion"
  | "hue"
  | "saturation"
  | "color"
  | "luminosity";

export type CursorContextType = {
  cursorConfig: {
    opacity: MotionValue<number>;
    cursorMixBlendMode: MotionValue<cursorMixBlendMode>;
    size: {
      height: MotionValue<number>;
      width: MotionValue<number>;
      rx: MotionValue<number>;
      ry: MotionValue<number>;
    };
    angle: MotionValue<number>;
    scale: { x: MotionValue<number>; y: MotionValue<number> };
    position: { x: MotionValue<number>; y: MotionValue<number> };
    color: MotionValue<string>;
    turbConfig: {
      baseFrequency: MotionValue<number>;
      seed: MotionValue<string>;
      scale: MotionValue<string>;
    };
    circleConfig: {
      cx: MotionValue<number>;
      cy: MotionValue<number>;
      r: MotionValue<number>;
    };
    gradientConfig: {
      stopColor1: MotionValue<string>;
      stopColor2: MotionValue<string>;
      stopOpacity1: MotionValue<number>;
      stopOpacity2: MotionValue<number>;
      offset1: MotionValue<string>;
      offset2: MotionValue<string>;
    };
  };
  initialCursorConfig: {
    opacity: number;
    cursorMixBlendMode: cursorMixBlendMode;
    size: { height: number; width: number; rx: number; ry: number };
    angle: number;
    scale: { x: number; y: number };
    color: string;
    turbConfig: {
      baseFrequency: number;
      seed: string;
      scale: string;
    };
    circleConfig: { cx: number; cy: number; r: number };
    gradientConfig: {
      stopColor1: string;
      stopColor2: string;
      stopOpacity1: number;
      stopOpacity2: number;
      offset1: string;
      offset2: string;
    };
    isHover: IsHoverType;
  };
  elementDimension: {
    width: MotionValue<number>;
    height: MotionValue<number>;
    top: MotionValue<number>;
    left: MotionValue<number>;
  };
  isHover: MotionValue<IsHoverType>;
};

export const CursorContext = createContext<CursorContextType | undefined>(
  undefined
);

export function useCursor() {
  const context = useContext(CursorContext);

  if (context === undefined) {
    throw new Error(
      "useOpacityContext must be used within a useCursor.Provider"
    );
  }

  return context;
}
