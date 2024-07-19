import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,astro}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "geistSansVariable",
          "sans-serif",
          ...defaultTheme.fontFamily.sans,
        ],
        geistMonoVariable: ["geistMonoVariable", "serif"],
        newsreader: ["Newsreader Variable", "serif"],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            ".anchor-link": {
              marginRight: "0.25rem",
              opacity: "0.3",
              textDecoration: "none !important",
              transitionProperty: "opacity !important",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1);",
              transitionDuration: "150ms",
              "&:hover": {
                opacity: "1",
              },
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            "pre code": {
              fontFamily: ["geistMonoVariable"],
            },
            ":not(pre) > code": {
              fontFamily: ["geistMonoVariable"],
              backgroundColor: theme("colors.zinc.200"),
              borderColor: theme("colors.zinc.300"),
              padding: "0.250rem 0.4rem",
              borderRadius: "0.250rem",
              fontWeight: "400",
            },
          },
        },
        invert: {
          css: {
            "pre code": {
              fontFamily: ["geistMonoVariable"],
            },
            ":not(pre) > code": {
              fontFamily: ["geistMonoVariable"],
              backgroundColor: theme("colors.zinc.900"),
              borderColor: theme("colors.zinc.800"),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
