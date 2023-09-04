import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} satisfies Config

