/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'retro-green': '#006400',
        'retro-cyan': '#008b8b',
        'retro-orange': '#cc6600',
        'retro-yellow': '#b8860b',
        'retro-pink': '#c71585',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'Courier New', 'Monaco', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};

