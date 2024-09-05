import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blue: {
          1: "#A6FAFF",
          2: "#79F7FF",
          3: "#00E1EF",
        },
        green: {
          1: "#c6fab4",
          2: "#B8FF9F",
          3: "#9dfc7c",
        },
        purple: {
          1: "#A5B4FB",
        },
        violet: {
          1: "#FFA6F6",
          2: "#FA8CEF",
          3: "#F774EA",
        },
        yellow: {
          1: "#FFF59F",
        },
      },
      keyframes: {
        "bounce-in-right": {
          "0%": { opacity: "0", transform: "translateX(100%)" },
          "60%": { opacity: "1", transform: "translateX(-20px)" },
          "80%": { transform: "translateX(10px)" },
          "100%": { transform: "translateX(0)" },
        },
        "shift-up": {
          "0%": { transform: "translateY(0)", easing: "ease-in-out" },
          "100%": { transform: "translateY(-100%)", easing: "ease-in-out" },
        },
      },
      animation: {
        "bounce-in-right": "bounce-in-right 0.5s ease-in-out",
        "shift-up": "shift-up 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
