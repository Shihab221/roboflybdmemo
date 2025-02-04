import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        roboto: "var(--font-roboto)",
        openSans: "var(--font-open-sans)",
        lato: "var(--font-lato)",
        poppins: "var(--font-poppins)",
        montserrat: "var(--font-montserrat)",
      },
    },
  },
  plugins: [],
} satisfies Config;
