import daisyui from "daisyui"
import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./src/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
    iconsPlugin({
      // Select the icon collections you want to use
      // You can also ignore this option to automatically discover all individual icon packages you have installed
      // If you install @iconify/json, you should explicitly specify the collections you want to use, like this:
      collections: getIconCollections(["uiw", "lucide"]),
    }),
  ],
  daisyui: {
    themes: ["light", "dark", "retro"],
  },
}
