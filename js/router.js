// router.js
class Router {
	constructor() {
		this.routes = {
			"/": "/index.html",
			"/about": "/about-us.html",
			"/services": "/services.html",
			"/portfolio": "/portfolio.html",
			"/contact": "/contact.html",
		};

		this.initRouteListeners();
	}

	initRouteListeners() {
		document.addEventListener("click", (e) => {
			const link = e.target.closest("a");
			if (link && link.href.startsWith(window.location.origin)) {
				e.preventDefault();
				const path = link.href.replace(window.location.origin, "");
				this.navigateTo(path);
			}
		});

		window.addEventListener("popstate", () => this.handleRoute());
	}

	async handleRoute() {
		const path = window.location.pathname;
		const route = this.routes[path] || this.routes["/"];

		try {
			const response = await fetch(route);
			const html = await response.text();
			const bodyContent =
				html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] || "";
			document.body.innerHTML = bodyContent;

			// Extract and update title
			const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
			if (titleMatch) document.title = titleMatch[1];

			if (
				window.app &&
				typeof window.app.reinitializeComponents === "function"
			) {
				window.app.reinitializeComponents();
			}
		} catch (error) {
			console.error("Error loading route:", error);
		}
	}

	async navigateTo(path) {
		if (this.routes[path]) {
			window.history.pushState({}, "", path);
			await this.handleRoute();
		}
	}
}

export default Router;
