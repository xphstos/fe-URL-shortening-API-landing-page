import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      screens: {
        lg: "69.375rem",
      },
    },
    colors: {
      inherit: "inherit",
      current: "currentColor",
      transparent: "transparent",
      white: "hsl(0deg 0% 100% / 1)",
      black: "hsl(0deg 0% 0% / 1)",
      error: "hsl(354 62% 64% / 1)",
      cyan: {
        DEFAULT: "hsl(180 66% 49% / 1)",
      },
      violet: {
        DEFAULT: "hsl(257 27% 26% / 1)",
        100: "hsl(257 7% 63% / 1)",
        900: "hsl(260 8% 14% / 1)",
      },
      blue: {
        DEFAULT: "hsl(255 11% 22% / 1)",
      },
      neutral: {
        DEFAULT: "hsl(0 0% 75% / 1)",
        100: "hsl(230 25% 95% / 1)",
      },
    },
    borderRadius: {
      full: "100vw",
      soft: ".5rem",
    },
    fontFamily: {
      sans: "Poppins, system-ui, sans-serif",
      serif:
        "'Iowan Old Style', 'Palatino Linotype', 'URW Palladio L', P052, serif",
      mono: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace",
    },
    fontSize: {
      md: ["0.9375rem"],
      lg: ["fluid(1rem,1.125rem)"],
      xl: ["1.25rem"],
      "2xl": ["1.375rem"],
      "3xl": ["fluid(1.75rem,2.5rem)", { letterSpacing: "-0.03em" }],
      super: ["fluid(2.5rem,5rem)"],
    },
    extend: {},
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("hocus", ["&:hover", "&:focus"]);
      addVariant("hocus-visible", ["&:hover", "&:focus-visible"]);
    }),
  ],
};
