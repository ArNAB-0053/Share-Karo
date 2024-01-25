/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
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
        primary: '#006da4',
        secondary: '#004d74',
        sidebar_color: '#012245',
        header_hover: '#006494',
      },
      gridTemplateColumns: {
        'customgrid': '0.3fr 1.5fr repeat(2, 0.8fr) repeat(2, 0.2fr)',
        'smallDev': '0.4fr 2fr 0.8fr repeat(2, 0.3fr)'
      }
    },
  },
  plugins: [],
}
