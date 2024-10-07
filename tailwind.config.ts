import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#E8F5F5',
          100: '#CBF5F6',
          200: '#8EEAEC',
          300: '#37DADD',
          400: '#21BDC0',
          500: '#1B9C9E',
          600: '#198E90',
          700: '#167D7E',
          800: '#126769',
          900: '#0C4546',
          950: '#0A3839',
        },
        red: {
          '50': '#FAEBEB',
          '100': '#F4D8D7',
          '200': '#EBB4B2',
          '300': '#E08D8A',
          '400': '#D56662',
          '500': '#CB413B',
          '600': '#A5302C',
          '700': '#7D2421',
          '800': '#551916',
          '900': '#280C0B',
          '950': '#140605',
        },
        orange: {
          '50': '#FDF2E8',
          '100': '#FAE5D1',
          '200': '#F5CBA3',
          '300': '#F1B379',
          '400': '#EC994B',
          '500': '#E77D1D',
          '600': '#BD6614',
          '700': '#8F4D0F',
          '800': '#5C320A',
          '900': '#2E1905',
          '950': '#170C02',
        },
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        avenir: ['var(--font-avenir)', 'sans-serif'],
      },
    },
  },
};
export default config;
