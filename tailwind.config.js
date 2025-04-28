/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                cormorant: ['"Cormorant Garamond"', 'serif'],
                montserrat: ['Montserrat', 'sans-serif'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 1s ease-out forwards',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: 0, transform: 'translateY(20px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
            },
            colors: {
                amber: {
                    700: '#B45309',
                },
            },
        },
    },
    plugins: [],
}