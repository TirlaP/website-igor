class ComponentLoader {
	constructor() {
		this.init();
	}

	async init() {
		try {
			// Load persistent components first
			await Promise.all([
				this.loadComponent("navbar-container", "/components/navbar.html"),
				this.loadComponent("footer-container", "/components/footer.html"),
			]);

			// Load initial page content
			await this.loadPage(window.location.pathname);

			// Initialize features
			this.initFAQAccordion();
			this.initTranslations();
			this.initRouteListeners();
		} catch (error) {
			console.error("Error loading components:", error);
		}
	}

	async loadComponent(containerId, componentPath) {
		const container = document.getElementById(containerId);
		if (!container) {
			console.warn(`Container ${containerId} not found`);
			return;
		}

		try {
			const response = await fetch(componentPath);
			const html = await response.text();
			container.innerHTML = html;
			console.log(`${containerId} loaded successfully`);
		} catch (error) {
			console.error(`Error loading ${containerId}:`, error);
		}
	}

	async loadPage(path) {
		const mainContent = document.getElementById("main-content");
		const pagePath = this.getPagePath(path);

		try {
			const response = await fetch(pagePath);
			const html = await response.text();
			mainContent.innerHTML = html;

			// Reinitialize components after page load
			this.initFAQAccordion();
			this.reinitializeScripts();
			window.scrollTo(0, 0);
		} catch (error) {
			console.error("Error loading page:", error);
		}
	}

	getPagePath(path) {
		const routes = {
			"/": "/components/home.html",
			"/about": "/components/about.html",
			"/services": "/components/services.html",
			"/portfolio": "/components/portfolio.html",
			"/contact": "/components/contact.html",
			"/services/new-creations": "/components/services/new-creations.html",
			"/services/restoration": "/components/services/restoration.html",
			"/services/consultation": "/components/services/consultation.html",
		};
		return routes[path] || routes["/"];
	}

	initRouteListeners() {
		document.addEventListener("click", (e) => {
			const link = e.target.closest("a");
			if (link && link.href.startsWith(window.location.origin)) {
				e.preventDefault();
				const path = link.href.replace(window.location.origin, "");
				this.handleRoute(path);
			}
		});

		window.addEventListener("popstate", () => {
			this.loadPage(window.location.pathname);
		});
	}

	async handleRoute(path) {
		window.history.pushState({}, "", path);
		await this.loadPage(path);
	}

	initFAQAccordion() {
		const accordions = document.querySelectorAll(".home_faq_accordion");
		if (!accordions.length) {
			return;
		}

		accordions.forEach((accordion) => {
			const question = accordion.querySelector(".home_faq_question");
			const answer = accordion.querySelector(".home_faq_answer");

			if (question && answer) {
				// Initialize height to 0
				answer.style.height = "0px";

				question.addEventListener("click", () => {
					const isOpen = accordion.classList.contains("active");

					// Close all accordions
					accordions.forEach((acc) => {
						acc.classList.remove("active");
						const ans = acc.querySelector(".home_faq_answer");
						if (ans) ans.style.height = "0px";
					});

					// Open clicked accordion if it was closed
					if (!isOpen) {
						accordion.classList.add("active");
						answer.style.height = `${answer.scrollHeight}px`;
					}
				});
			}
		});
	}

	reinitializeScripts() {
		// Reinitialize SVG animation
		const path = document.querySelector("#svgPath");
		if (path) {
			const pathLength = path.getTotalLength();
			path.style.strokeDasharray = `${pathLength} ${pathLength}`;
			path.style.strokeDashoffset = pathLength;
			path.getBoundingClientRect();
		}

		// Other script reinitializations can be added here
	}

	initTranslations() {
		document.dispatchEvent(new CustomEvent("componentsLoaded"));
	}
}

export default ComponentLoader;
