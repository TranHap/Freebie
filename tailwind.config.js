/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // green: "#A0C49D",
        green:"#117b58",
        purple: "#a864ec",
        blue: "#116A7B",    
        red:"#7b2311",
      },
    },
  },
  plugins: [],
}
