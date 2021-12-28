// https://tailwindcss.com/docs/optimizing-for-production
const { fontFamily, screens, colors } = require('tailwindcss/defaultTheme');

module.exports = {
  // mode: 'jit',
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge:
    process.env.NODE_ENV === 'production'
      ? {
          enabled: true,
          mode: 'all',
          content: [
            './packages/**/*.{js,ts,jsx,tsx}',
            './pages/**/*.{js,ts,jsx,tsx}',
          ],
          options: {
            safelist: [],
          },
        }
      : false,
  darkMode: 'class',
  theme: {
    screens: {
      sm: screens.sm,
      md: screens.md,
      lg: screens.lg,
      xl: screens.xl,
    },
    colors: {
      red: colors.red,
      blue: colors.blue,
      green: colors.green,
      yellow: colors.yellow,
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      electric: '#db00ff',
      ribbon: '#0047ff',
      gray: {
        50: '#f9fafb',
        100: '#f4f5f7',
        200: '#e5e7eb',
        300: '#d5d6d7',
        400: '#9e9e9e',
        500: '#707275',
        600: '#4c4f52',
        700: '#24262d',
        800: '#1a1c23',
        900: '#121317',
      },
    },
    fontFamily: {
      sans: ['Inter', ...fontFamily.sans],
    },
    extend: {},
  },
  corePlugins: {
    fontFamily: false,
    float: false,
  },
  plugins: [require('@tailwindcss/typography')],
};
