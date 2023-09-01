/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				"bg-img1": "url('./src/assets/backgrounds/aug_9_01.jpg')",
			},
		},
		plugins: [],
	},
};
