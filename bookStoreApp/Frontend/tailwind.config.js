/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {  
            colors: {
                'dark-bg': '#1a202c', // Dark mode background color
                'light-bg': '#ffffff', // Light mode background color
            },
        },
    },
    plugins: [
        require('daisyui'),
    ],
};
