/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
        },
        darkBg: '#090d16',
        darkSurface: '#111827',
        darkCard: '#1a2234',
        accentViolet: '#8b5cf6',
        accentCyan: '#06b6d4',
      },
    },
  },
  plugins: [],
}
