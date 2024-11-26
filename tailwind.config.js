/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./edit.vue",
    "./error.vue",
    './vueform.config.ts', // or where `vueform.config.js` is located. Change `.js` to `.ts` if required.
    './node_modules/@vueform/vueform/themes/tailwind/**/*.vue',
    './node_modules/@vueform/vueform/themes/tailwind/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nunito Sans"', 'system-ui'],
        serif: ['"Roboto"', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('@vueform/vueform/tailwind'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "#07bf9b",
          "secondary": "#A0D683",
          ".btn-primary": {
            color: "#ffffff", // Set the default button text color
          },
          ".btn-nav-home": {
            backgroundColor: "transparent",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#ABE6AE",
              fontWeight: "bold",
              color: "#62AC66",
            },
            'a': {
              backgroundColor: "transparent",
              color: 'inherit',
            }
          }
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "#07bf9b",
          "secondary": "#A0D683",
          ".btn-primary": {
            color: "#ffffff", // Set the default button text color
          },
        }
      },
    ],
  },
}

