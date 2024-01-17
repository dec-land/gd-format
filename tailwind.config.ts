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
          primary: "#793ef9",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          secondary: "#c026d3",
          primary: "#793ef9",
          "secondary-content": "#ffffff",
          "accent-content": "#ffffff",
          "base-100": "#3d4451", // Background
          "base-content": "#ebecf0", //  text + icon colour
        },
      },
    ],
  },
  plugins: [daisyui],
};
export default config;
