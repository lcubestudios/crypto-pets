/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
			colors: {
				'primary': 'var(--color-primary)',
				'primary-dark': 'var(--color-primary-dark)',
				'primary-darker': 'var(--color-primary-darker)',
				'primary-darkest': 'var(--color-primary-darkest)',
				'secondary': 'var(--color-secondary)',
				'secondary': 'var(--color-secondary)',
				'background': 'var(--bg-color)',
				'toolbar': 'var(--toolbar-color)',
			},
      fontSize: {
        'jumbo': ['var(--jumbo-font-size)', {
          lineHeight: 'var(--jumbo-line-height)'
        }],
        'h1': ['var(--h1-font-size)', {
          lineHeight: 'var(--h1-line-height)'
        }],
        'h2': ['var(--h2-font-size)', {
          lineHeight: 'var(--h2-line-height)'
        }],
        'h3': ['var(--h3-font-size)', {
          lineHeight: 'var(--h3-line-height)'
        }],
        'h4': ['var(--h4-font-size)', {
          lineHeight: 'var(--h4-line-height)'
        }],
        'h5': ['var(--h5-font-size)', {
          lineHeight: 'var(--h5-line-height)'
        }],
        'h6': ['var(--h6-font-size)', {
          lineHeight: 'var(--h6-line-height)'
        }],
        'body': ['var(--body-font-size)', {
          lineHeight: 'var(--body-line-height)'
        }],
        'small': ['var(--small-font-size)', {
          lineHeight: 'var(--small-line-height)'
        }],
        'tiny': ['var(--tiny-font-size)', {
          lineHeight: 'var(--tiny-line-height)'
        }]
      },
			width: {
				'60px': '60px',
				'100px': '100px',
				'120px': '120px',
				'200px': '200px',
			},
			height: {
				'toolbar': 'var(--toolbar-height)'
			},
      screens: {
        'xs': '361px',
        'sm': '481px',
        'md': '769px',
        'lg': '1025px',
        'xl': '1281px',
        'xxl': '1801px',
        'xxxl': '2561px',
      },
			gridTemplateRows: {
				'framework': 'var(--framework-grid-rows)'
			}
		},
  },
  plugins: [],
};
