/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            transitionProperty: {
                'opacity-transform': 'opacity, transform',
            },
        },
    },
    variants: {},
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['light', 'dark', 'cupcake'],
    },
};
