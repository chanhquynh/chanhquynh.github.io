import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
        handwriting: ['var(--font-handwriting)'],
      },
      colors: {
        cq: {
          primary: '#343131',
          secondary: '#fefeff',
          emphasize: {
            DEFAULT: '#a4784a',
            '50': '#f7f5ef',
            '100': '#ece4d5',
            '200': '#dbcbad',
            '300': '#c7a97d',
            '400': '#b68c59',
            '500': '#a4784a',
            '600': '#8f613f',
            '700': '#734b35',
            '800': '#623f31',
            '900': '#55362e',
            '950': '#301c18',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
