import type { Config } from 'tailwindcss'
import aspectRatio from '@tailwindcss/aspect-ratio'
import daisyui from 'daisyui'

// Default are on https://tailwindcss.nuxtjs.org/tailwind/config#default-configuration
import themes from 'daisyui/src/theming/themes'

export default <Partial<Config>>{
  plugins: [
    daisyui,
    aspectRatio,
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
      '3xl': '1600px',
      '4xl': '1920px',
      '5xl': '2560px',
    },

    extend: {
      colors: {
        // Primary Color Shades
        'primary-100': '#d8faeb',
        'primary-200': '#b0f5d7',
        'primary-300': '#89f1c4',
        'primary-400': '#61ecb0',
        'primary-500': '#3ae79c',
        'primary-600': '#48d296',
        'primary-700': '#56be91',
        'primary-800': '#64a98b',
        'primary-900': '#729586',
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...themes.light,
          'primary': '#3ae79c',
          'secondary': '#064d3b',
          'accent': '#FFBE00',

          'neutral': '#333D4D',
          'base-100': '#FFFFFF',
          'info': '#00B6FF',
          'success': '#00AA6E',
          'warning': '#FFBE00',
          'error': '#FF5861',

          '--glass-blur': '20px',
        },
      },
      {
        dark: {
          ...themes.dark,
          primary: '#3ae79c',
          accent: '#FFBE00',
        },
      },
    ],
  },
}
