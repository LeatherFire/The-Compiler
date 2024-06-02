/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1140px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#ffbe33",
        secondary: "#222831",
        'theme-bg-color': 'rgba(16, 18, 27, 0.4)',
        'border-color': 'rgba(113, 119, 144, 0.25)',
        'theme-color': '#f9fafb',
        'inactive-color': 'rgb(113, 119, 144, 0.78)',
        'hover-menu-bg': 'rgba(12, 15, 25, 0.3)',
        'content-title-color': '#999ba5',
        'content-bg': 'rgb(146, 151, 179, 0.13)',
        'button-inactive': 'rgb(249, 250, 251, 0.55)',
        'dropdown-bg': '#21242d',
        'dropdown-hover': 'rgb(42, 46, 60)',
        'popup-bg': 'rgb(22, 25, 37)',
        'search-bg': '#14162b',
        'overlay-bg': 'rgba(36, 39, 59, 0.3)',
        'scrollbar-bg': 'rgb(1, 2, 3, 0.4)',
      },
      fontFamily: {
        dancing: ["Dancing Script", "cursive"],
        sans: ["Open Sans", "sans-serif"],
        freeman: ["Freeman", "sans-serif"],
      },
      scale: {
        '175': '1.75',
        '200':'2.00',
        '140':'1.40'
      },
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        '50%': '50%',
        '16': '8rem',
      },
      borderWidth: {
        DEFAULT: '0.5px',
        '0': '0.5px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      }
    },
  },
  plugins: [],
};
