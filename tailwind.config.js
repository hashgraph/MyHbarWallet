/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const forms = require("@tailwindcss/forms");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  mode: "jit",
  darkMode: "media",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "abbadon-black": "#231f20",
      "almost-aqua": "#9cdcc5",
      "andrea-blue": "#4072d4",
      argent: "#888",
      "astro-bound": "#8a9eb5",
      "basalt-grey": "#999",
      "black-out": "#222",
      black: "#000",
      "blue-jay": "#4d80da",
      "bright-navy-blue": "#4679D6",
      "brilliant-white": "#e7eefb",
      carbon: "#333",
      "cerebral-grey": "#ccc",
      "cold-grey": "#a0a0a0",
      "cold-shoulder": "#d5e1ef",
      "dark-shamrock": "#42ce9c",
      dewpoint: "#b2d0d5",
      "dhusar-grey": "#aaa",
      "downriver-700": "#062150",
      "downriver-800": "#042659",
      "dreamless-sleep": "#111",
      "ehite-edgar": "#ededed",
      "ephemeral-blue": "#ccd5e1",
      "first-snow": "#e8f1fc",
      "french-blue": "#0071bc",
      gainsboro: "#dbdbdb",
      "gravel-fint": "#bababa",
      "grey-area": "#ddd",
      "han-blue-600": "#4668c1",
      "han-blue-700": "#3f71d4",
      "harlocks-cape": "#b50202",
      "hei-se-black": "#192333",
      husky: "#e2edfb",
      jupiter: "#e0e0e0",
      kabuto: "#f6931d",
      "koji-orange": "#f8b14b",
      "kuroi-black": "#111621",
      "light-turquoise": "#84ebc6",
      "lynx-white": "#f6f6f6",
      "magnus-blue": "#0a3680",
      "midnight-express": "#1F273B",
      "mountain-meadow": "#39ba8b",
      "pale-grey": "#fbfcfd",
      "palm-green": "#1b3c30",
      perano: "#a1baf0",
      "robo-master": "#adadad",
      "ruined-smores": "#0C0E13",
      "seafoam-blue": "#7CD2B2",
      "silver-polish": "#c7c7c7",
      "snow-ballet": "#dff2eb",
      "soft-blue": "#5b84e7",
      squant: "#666",
      "super-silver": "#eee",
      tangerine: "#ff9500",
      "unburdened-pink": "#fce8e8",
      "under-the-sea": "#1b1464",
      "united-nations-blue": "#709dea",
      white: "#fff",
      "Megaman-Helmet": "#165CFF",
      peach: "#fff7e7",
      "purple-cabbage": "#3d34a5",
      "starfleet-blue": "#0096ff",
      "creamed-raspberry": "#bd6883",
      "devils-advocate": "#ff3344",
      "sugar-grape": "#9437ff",
      "clear-blue": "#247afd",
      "athena-blue": "#66ddff",
      "reddish-purple": "#910951",
      "siniy-blue": "#4c4dff",
      "little-red-corvette": "#e50102"
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
    },

    fontSize:{
      "xxs": ".7rem"
    },
    extend: {

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "100"}
        },
        fadeOut: {
          "0%": { opacity: "100"},
          "100%": { opacity: "0" }
        }
      },

      animation: {
        "spin-slow": "spin 10s linear infinite",
        "fade-in": "fadeIn 4s",
        "fade-out": "fadeOut 4s"
      },
      height: {
        600: "600px",
        324: "324px",
      },
      width: {
        '1/10': "10%"
      },
      ringWidth: {
        3: "3px",
      },
      ringOffsetWidth: {
        3: "3px",
      },
    },
  },
  plugins: [forms],
};
