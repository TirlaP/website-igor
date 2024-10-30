module.exports = {
	content: [
		"./*.html",
		"./components/**/*.html",
		// Only include your custom JS files
		"./js/script.js",
		"./js/component-loader.js",
		"./js/language-switcher.js",
		"./js/navbar.js",
		"./js/router.js",
		// Exclude large vendor files:
		// - jquery.js
		// - webflow-script.js
	],
	theme: {
		extend: {
			colors: {
				"vitros-primary": "#3498db",
				"vitros-secondary": "#2c3e50",
				"vitros-accent": "#f1c40f",
			},
		},
	},
	plugins: [],
};
