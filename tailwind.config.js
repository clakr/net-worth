/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [],
	theme: {
		extend: {
			colors: {
				primary: {
					// backgrounds
					1: "color(display-p3 0.983 0.996 0.992)",
					2: "color(display-p3 0.958 0.983 0.976)",

					// components
					3: "color(display-p3 0.895 0.971 0.952)",
					4: "color(display-p3 0.831 0.949 0.92)",
					5: "color(display-p3 0.761 0.914 0.878)",

					// borders
					6: "color(display-p3 0.682 0.864 0.825)",
					7: "color(display-p3 0.581 0.798 0.756)",
					8: "color(display-p3 0.433 0.716 0.671)",

					// solid color
					9: "color(display-p3 0.297 0.637 0.581)",
					10: "color(display-p3 0.275 0.599 0.542)",

					// accessible texts
					11: "color(display-p3 0.08 0.5 0.43)",
					12: "color(display-p3 0.11 0.235 0.219)",
				},
			},
		},
	},
	plugins: [],
};
