const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      xs: ['0.75rem', '1.15'],
      sm: ['0.8125rem', '1.15'],
      tiny: ['1.19rem', '1.15'],
      base: ['0.9375rem', '1.1333'],
      lg: ['1.25rem', '1.15'],
      xl: ['1.5625rem', '1.15'],
      '2xl': ['2rem', '1.15'],
      '3xl': ['2.5rem', '1.15'],
      '4xl': ['2.7rem', '1.15'],
      '5xl': ['3.25rem', '1.15'],
      '6xl': ['4.3rem', '1.15'],
      '7xl': ['5.8rem', '1.15']
    },
    screens: {
      ss:'320px',
      sm: '360px',
      md: '430px',
      lg: '768px',
      xl: '1024px',
      '2xl': '1440px',
      '3xl': '1650px',
      '4xl': '1750px'
    },
    extend: {
      spacing: {
        5.5: '1.375rem'
      },
      colors: {
        dark: '#252528',
        'dark-800': 'rgba(37, 37, 40, 0.8)',
        blizzard: '#F6F5FF',
        hole: '#080808',
        fog: '#D4D6DB',
        ash: '#868686',
        celesta: '#E62B2B',
        blizz: '#48494d',
        'blizzard-100': 'rgba(255, 255, 255, 0.1)',
        'blizzard-500': 'rgba(255, 255, 255, 0.5)',
        'blizzard-750': 'rgba(255, 255, 255, 0.75)',
        'bobo-150': 'rgba(176, 176, 176, 0.15);',
        nezabudka: '#6884E8',
        yellow: '#d1ba8d',
        lime: '#76D374',
        weakness: 'rgba(44,45,49,0.35)',
        wash: '#333439',
        asphalt: '#77777E',
        poppy: '#DE5F68',
        primary: '#0EC9D6',
        kai: '#2383B9',
        'primary-150': 'rgba(14, 201, 214, 0.14)',
        'primary-200': 'rgba(14, 201, 214, 0.28)',
        'primary-300': 'rgba(14, 201, 214, 0.3)',
        'primary-400': 'rgba(14, 201, 214, 0.4)',
        'primary-500': 'rgba(14, 201, 214, 0.5)',
        secondary: '#101928',
        graph: {
          green: '#2DDE98',
          bronze: '#FFC168',
          orange: '#FF6C5F',
          magenta: '#FF4F81',
          blue: '#3369E7',
          violet: '#AF6CFF',
          yellow: '#E2CF1D',
          pink: '#D46198',
          cyan: '#79BFFF'
        }
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-out'
      },
      transitionDuration: {
        DEFAULT: '350ms'
      },
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.flex-center': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      })
    })
  ]
}
