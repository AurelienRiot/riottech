import { svgToDataUri } from "./utils";

const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

function addGlobalUtilities({ addUtilities }: any) {
  const newUtilities = {
    ".hide-scrollbar": {
      "-ms-overflow-style": "none",
      "scrollbar-width": "none",
      "-webkit-overflow-scrolling": "touch",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    ".timeline-scroll": {
      "animation-timeline": "scroll()",
    },
  };
  addUtilities(newUtilities, ["responsive"]);
}

function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

  addBase({
    ":root": newVars,
  });
}

function ListStyleCheck({ matchUtilities, theme }: any) {
  matchUtilities(
    {
      "list-image": ([color, svg]: any) => ({
        listStyle: "none",
        paddingLeft: "0",

        "& li::before": {
          content: `url("${svgToDataUri(svg)}")`,
          marginRight: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        },
      }),
    },
    {
      values: Object.fromEntries(
        Object.entries(flattenColorPalette(theme("colors"))).flatMap(([color, value]) =>
          SVGs.map((svg) => [`${svg.name}-${color}`, [color, svg.svg(value as string)]]),
        ),
      ),
    },
  );
}

const SVGs = [
  {
    name: "check",
    svg: (
      color: string,
    ) => `<svg width="14" height="12" viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg" fill="${color}">
 <path fill-rule="evenodd" d="M13.685.153a.752.752 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" />
   </svg>`,
  },
  {
    name: "check-circle",
    svg: (color: string) =>
      `<svg stroke="${color}" fill="${color}" stroke-width="0" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>`,
  },
];

export { addGlobalUtilities, addVariablesForColors, ListStyleCheck };
