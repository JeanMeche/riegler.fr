/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,md}'],
  theme: {
    extend: {
      typography(theme) {
        return {
          DEFAULT: {
            css: {
              'blockquote p:first-of-type::before': {content: 'none'},
              'blockquote p:first-of-type::after': {content: 'none'},
              'code::before': {
                content: 'none', // don’t generate the pseudo-element
              },
              'code::after': {
                content: 'none',
              },
              'a code': {
                'text-decoration': 'underline',
              },
              code: {
                color: 'var(--tw-prose-pre-code) !important',
                backgroundColor: 'var(--tw-prose-pre-bg)',
                borderRadius: theme('borderRadius.DEFAULT'),
                paddingLeft: theme('spacing[1.5]'),
                paddingRight: theme('spacing[1.5]'),
                paddingTop: theme('spacing.1'),
                paddingBottom: theme('spacing.1'),
              },
              img: {
                borderRadius: theme('borderRadius.DEFAULT'),
              },
            },
          },
          dark: {
            css: {
              code: {
                color: theme('colors.red.800'),
                backgroundColor: theme('colors.red.900'),
              },
            },
          },
        };
      },
    },
  },
  plugins: [require('tailwindcss/nesting'), require('@tailwindcss/typography')],
};
