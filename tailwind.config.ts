import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#667000",

          secondary: "#a3b18a",

          accent: "#70e000",

          "accent-content": "#c8dcff",

          neutral: "#1a232b",

          "base-100": "#faf7f5",

          "base-200": "#dbdbdb",

          "base-300": "#bbbbbb",

          info: "#00a9ff",

          success: "#00ba58",

          warning: "#e18500",

          error: "#e63946",
        },
      },
    ],
  },
  plugins: [daisyui],
} satisfies Config;
