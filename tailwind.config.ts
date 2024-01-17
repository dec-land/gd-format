import daisyui from "daisyui";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          secondary: "#c026d3",
          primary: "#478cbf",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          secondary: "#c026d3",
          primary: "#478cbf",
          "secondary-content": "#ffffff",
          "accent-content": "#ffffff",
          "base-100": "#31394d", // Background
          "base-content": "#ebecf0", //  text + icon colour
        },
      },
    ],
  },
  plugins: [daisyui],
};
export default config;
