export function Color(
    color: string,
    type: "css" | "rgb" | "hsl" | "standard" = "css"
) {
    if (typeof window === "undefined") return "";

    switch (type) {
        case "css": {
            const cssVariable = getComputedStyle(document.documentElement)
                .getPropertyValue(`--${color}`)
                .trim();
            return `hsl(${cssVariable})`;
        }
        case "rgb":
            return `rgb(${color})`;
        case "hsl":
            return `hsl(${color})`;
        case "standard":
            return color;
        default:
            throw new Error(`Unexpected type: ${type}`);
    }
}
