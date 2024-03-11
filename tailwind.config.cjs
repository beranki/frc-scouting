const daisyui = require('daisyui')


/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				mono: ["Nova Mono", "monospace"],
				poppins: ["Poppins", "sans-serif"]
			}
		}
	},

	plugins: [daisyui]
};

module.exports = config;
