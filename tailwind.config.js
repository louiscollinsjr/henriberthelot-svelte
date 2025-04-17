// tailwind.config.mjs
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
  content: [
    './src/**/*.{html,js,svelte,ts,svx,md}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    forms,
    typography
  ],
}