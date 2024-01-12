"use client";
import { CursorContext, CursorContextType } from "@/hooks/use-cursor";
import { Color } from "@/lib/color";
import { cn } from "@/lib/utils";
import {
    SpringOptions,
    motion,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { useEffect, useMemo } from "react";

export const CursorProvider = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const { scrollY } = useScroll();
    const springConfig: SpringOptions = {
        damping: 20,
        stiffness: 300,
        mass: 0.5,
    };
    const springConfigRotate: SpringOptions = {
        damping: 20,
        stiffness: 350,
        mass: 0.5,
    };

    const initialCursorConfig: CursorContextType["initialCursorConfig"] =
        useMemo(
            () => ({
                opacity: 1,
                cursorMixBlendMode: "normal",
                size: { height: 20, width: 20, rx: 10, ry: 10 },
                angle: 0,
                scale: { x: 1, y: 1 },
                color: "primary",
                circleConfig: { cx: 0, cy: 0, r: 0 },
                turbConfig: {
                    baseFrequency: 0,
                    seed: "1",
                    scale: "100",
                },
                gradientConfig: {
                    stopColor1: "white",
                    stopColor2: "white",
                    stopOpacity1: 1,
                    stopOpacity2: 0,
                    offset1: "0%",
                    offset2: "100%",
                },
                isHover: "default",
            }),
            [],
        );

    const turbConfig = {
        baseFrequency: useMotionValue(
            initialCursorConfig.turbConfig.baseFrequency,
        ),
        seed: useMotionValue(initialCursorConfig.turbConfig.seed),
        scale: useMotionValue(initialCursorConfig.turbConfig.scale),
    };

    const gradientConfig = {
        stopColor1: useMotionValue(
            initialCursorConfig.gradientConfig.stopColor1,
        ),
        stopColor2: useMotionValue(
            initialCursorConfig.gradientConfig.stopColor2,
        ),
        stopOpacity1: useMotionValue(
            initialCursorConfig.gradientConfig.stopOpacity1,
        ),
        stopOpacity2: useMotionValue(
            initialCursorConfig.gradientConfig.stopOpacity2,
        ),
        offset1: useMotionValue(initialCursorConfig.gradientConfig.offset1),
        offset2: useMotionValue(initialCursorConfig.gradientConfig.offset2),
    };

    const cursorSize = {
        height: useSpring(initialCursorConfig.size.height, springConfig),
        width: useSpring(initialCursorConfig.size.width, springConfig),
        rx: useSpring(initialCursorConfig.size.rx, springConfig),
        ry: useSpring(initialCursorConfig.size.ry, springConfig),
    };

    const circleConfig = {
        cx: useMotionValue(initialCursorConfig.circleConfig.cx),
        cy: useMotionValue(initialCursorConfig.circleConfig.cy),
        r: useMotionValue(initialCursorConfig.circleConfig.r),
    };

    const cursorMixBlendMode = useMotionValue(
        initialCursorConfig.cursorMixBlendMode,
    );

    const cursorOpacity = useSpring(initialCursorConfig.opacity, springConfig);
    const mousePositionX = useSpring(0, springConfig);
    const mousePositionY = useSpring(0, springConfig);
    const color = useMotionValue("transparent");

    const scale = {
        x: useSpring(initialCursorConfig.scale.x, springConfig),
        y: useSpring(initialCursorConfig.scale.y, springConfig),
    };

    const angleCursor = useSpring(
        initialCursorConfig.angle,
        springConfigRotate,
    );

    const isHover = useMotionValue(initialCursorConfig.isHover);

    const cursorPositionX = useTransform(
        mousePositionX,
        (x) => x - 0.5 * cursorSize.width.get(),
    );
    const cursorPositionY = useTransform(
        mousePositionY,
        (y) => y - 0.5 * cursorSize.height.get(),
    );

    const elementDimension = {
        width: useMotionValue(0),
        height: useMotionValue(0),
        left: useMotionValue(0),
        top: useMotionValue(0),
    };

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const { clientX, clientY } = event;
        const { left, top } = event.currentTarget.getBoundingClientRect();

        if (scrollY.isAnimating()) {
            console.log("scrolling", scrollY.get(), scrollY.getPrevious());
        }

        const center = {
            x: elementDimension.left.get() + elementDimension.width.get() / 2,
            y: elementDimension.top.get() + elementDimension.height.get() / 2,
        };
        const distance = { x: clientX - center.x, y: clientY - center.y };

        switch (isHover.get()) {
            case "turb":
                mousePositionX.set(center.x - left + distance.x * 0.1);
                mousePositionY.set(center.y - top + distance.y * 0.1);
                break;
            case "sticky":
                mousePositionX.set(center.x - left + distance.x * 0.2);
                mousePositionY.set(center.y - top + distance.y * 0.2);
                break;
            case "default":
                mousePositionX.set(clientX - left);
                mousePositionY.set(clientY - top);
                break;
            default:
                throw new Error(`Unhandled value: ${isHover.get()}`);
        }
    }

    function template({ x, y, rotate, scaleX, scaleY }: any) {
        return `translateX(${x}) translateY(${y}) rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY}) translateZ(0) `;
    }

    useEffect(() => {
        color.set(Color(initialCursorConfig.color));
    }, [color, initialCursorConfig]);

    return (
        <CursorContext.Provider
            value={{
                elementDimension,
                initialCursorConfig,
                cursorConfig: {
                    cursorMixBlendMode,
                    position: {
                        x: mousePositionX,
                        y: mousePositionY,
                    },
                    turbConfig,
                    gradientConfig,
                    opacity: cursorOpacity,
                    size: cursorSize,
                    angle: angleCursor,
                    scale,
                    color,
                    circleConfig,
                },
                isHover,
            }}
        >
            <div
                className={cn("relative h-full w-full ", className)}
                onMouseMove={handleMouseMove}
                onMouseEnter={() =>
                    cursorOpacity.set(initialCursorConfig.opacity)
                }
                onMouseLeave={() => cursorOpacity.set(0)}
            >
                <motion.svg
                    className={
                        "pointer-events-none absolute inset-0 z-[51] overflow-visible bg-transparent  "
                    }
                    transformTemplate={template}
                    style={{
                        height: cursorSize.height,
                        width: cursorSize.width,
                        x: cursorPositionX,
                        y: cursorPositionY,
                        rotate: angleCursor,
                        scaleX: scale.x,
                        scaleY: scale.y,
                        opacity: cursorOpacity,
                        mixBlendMode: cursorMixBlendMode,
                    }}
                >
                    <title>Cursor</title>
                    <defs>
                        <motion.radialGradient
                            id="radialGradient"
                            cx="50%"
                            cy="50%"
                            r="50%"
                            fx="50%"
                            fy="50%"
                        >
                            <motion.stop
                                offset={gradientConfig.offset1}
                                style={{
                                    stopColor: gradientConfig.stopColor1,
                                    stopOpacity: gradientConfig.stopOpacity1,
                                }}
                            />
                            <motion.stop
                                offset={gradientConfig.offset2}
                                style={{
                                    stopColor: gradientConfig.stopColor2,
                                    stopOpacity: gradientConfig.stopOpacity2,
                                }}
                            />
                        </motion.radialGradient>
                        <filter id="ripple">
                            <motion.feTurbulence
                                type="fractalNoise"
                                baseFrequency={turbConfig.baseFrequency}
                                numOctaves="4"
                                result="TURB"
                                seed={turbConfig.seed}
                            />
                            <motion.feDisplacementMap
                                xChannelSelector="R"
                                yChannelSelector="G"
                                in="SourceGraphic"
                                in2="TURB"
                                scale={turbConfig.scale}
                            />
                        </filter>
                    </defs>
                    <motion.rect
                        width={cursorSize.width}
                        height={cursorSize.height}
                        rx={cursorSize.rx}
                        ry={cursorSize.ry}
                        fill={color}
                        filter="url(#ripple)"
                    />
                    <motion.circle
                        cx={circleConfig.cx}
                        cy={circleConfig.cy}
                        r={circleConfig.r}
                        fill="url(#radialGradient)"
                    />
                </motion.svg>

                {children}
            </div>
        </CursorContext.Provider>
    );
};

export function resetCursor({
    cursorConfig,
    initialCursorConfig,
    isHover,
}: {
    cursorConfig: CursorContextType["cursorConfig"];
    initialCursorConfig: CursorContextType["initialCursorConfig"];
    isHover: CursorContextType["isHover"];
}) {
    cursorConfig.opacity.set(initialCursorConfig.opacity);
    cursorConfig.size.height.set(initialCursorConfig.size.height);
    cursorConfig.size.width.set(initialCursorConfig.size.width);
    cursorConfig.size.rx.set(initialCursorConfig.size.rx);
    cursorConfig.size.ry.set(initialCursorConfig.size.ry);

    cursorConfig.scale.x.set(initialCursorConfig.scale.x);
    cursorConfig.scale.y.set(initialCursorConfig.scale.y);
    cursorConfig.color.set(Color(initialCursorConfig.color));

    cursorConfig.turbConfig.scale.set(initialCursorConfig.turbConfig.scale);
    cursorConfig.turbConfig.seed.set(initialCursorConfig.turbConfig.seed);
    cursorConfig.turbConfig.baseFrequency.set(
        initialCursorConfig.turbConfig.baseFrequency,
    );

    cursorConfig.circleConfig.r.set(initialCursorConfig.circleConfig.r);

    isHover.set("default");
}
