/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        colorsotherswhite: 'var(--colorsotherswhite)',
        colorsothersblack: 'var(--colorsothersblack)',
        colorscharade: {
          10: 'var(--colorscharade-10)',
          20: 'var(--colorscharade-20)',
          40: 'var(--colorscharade-40)',
          60: 'var(--colorscharade-60)',
          80: 'var(--colorscharade-80)',
          90: 'var(--colorscharade-90)',
          100: 'var(--colorscharade-100)'
        },
        colorssecondary: {
          10: 'var(--colorssecondary-10)',
          20: 'var(--colorssecondary-20)',
          40: 'var(--colorssecondary-40)',
          60: 'var(--colorssecondary-60)',
          80: 'var(--colorssecondary-80)',
          90: 'var(--colorssecondary-90)',
          100: 'var(--colorssecondary-100)'
        },
        colorsprimary: {
          10: 'var(--colorsprimary-10)',
          20: 'var(--colorsprimary-20)',
          40: 'var(--colorsprimary-40)',
          60: 'var(--colorsprimary-60)',
          80: 'var(--colorsprimary-80)',
          90: 'var(--colorsprimary-90)',
          100: 'var(--colorsprimary-100)'
        },
        other: {
          'warning-default': 'var(--other-warning-default)'
        },
        greyscalegrey: {
          400: 'var(--greyscalegrey-400)'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Helvetica', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: []
};
