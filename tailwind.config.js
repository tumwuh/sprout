/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./index.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ]
}

