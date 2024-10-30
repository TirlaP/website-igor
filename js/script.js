import languageSwitcher from "./language-switcher.js";

class App {
	constructor() {
		this.components = {
			navbar: null,
			footer: null,
			mainContent: null,
		};
		this.initApp();
	}

	async initApp() {
		try {
			console.log("Initializing application...");
			if (document.readyState === "loading") {
				document.addEventListener("DOMContentLoaded", () => this.init());
			} else {
				this.init();
			}
		} catch (error) {
			console.error("Error initializing app:", error);
		}
	}

	async init() {
		try {
			this.components = {
				navbar: document.getElementById("navbar-container"),
				footer: document.getElementById("footer-container"),
				mainContent: document.getElementById("main-content"),
			};

			await Promise.all([this.loadNavbar(), this.loadFooter()]);

			this.initLanguageSwitcher();
			this.initMobileMenu();
			this.initNavbarInteractions();
			this.initSvgAnimation();
			this.handleResize();

			console.log("Application initialized successfully");
		} catch (error) {
			console.error("Error in init:", error);
		}
	}

	async loadNavbar() {
		if (!this.components.navbar) {
			console.warn("Navbar container not found");
			return;
		}

		try {
			const response = await fetch("/components/navbar.html");
			const html = await response.text();
			this.components.navbar.innerHTML = html;
			console.log("Navbar loaded successfully");
		} catch (error) {
			console.error("Error loading navbar:", error);
		}
	}

	async loadFooter() {
		if (!this.components.footer) {
			console.warn("Footer container not found");
			return;
		}

		try {
			const response = await fetch("/components/footer.html");
			const html = await response.text();
			this.components.footer.innerHTML = html;
			console.log("Footer loaded successfully");
		} catch (error) {
			console.error("Error loading footer:", error);
		}
	}

	initNavbarInteractions() {
		const toggle = document.getElementById("navToggle");
		const menu = document.getElementById("navMenu");

		if (toggle && menu) {
			toggle.addEventListener("click", () => {
				menu.classList.toggle("active");
				toggle.classList.toggle("active");
			});
		}

		const dropdowns = document.querySelectorAll(".nav-dropdown");
		dropdowns.forEach((dropdown) => {
			const trigger = dropdown.querySelector(".dropdown-trigger");
			const content = dropdown.querySelector(".dropdown-content");

			if (trigger && content) {
				trigger.addEventListener("click", (e) => {
					if (window.innerWidth <= 991) {
						e.preventDefault();
						dropdown.classList.toggle("active");
						content.style.maxHeight = dropdown.classList.contains("active")
							? `${content.scrollHeight}px`
							: "0";
					}
				});
			}
		});
	}

	initLanguageSwitcher() {
		setTimeout(() => {
			if (languageSwitcher) {
				console.log("Initializing language switcher");
				languageSwitcher.init();

				document.addEventListener("languageChanged", (e) => {
					console.log("Language changed to:", e.detail.language);
					this.updatePageDirection(e.detail.language);
				});
			}
		}, 100);
	}

	initMobileMenu() {
		const navMenu = document.getElementById("navMenu");
		const navToggle = document.getElementById("navToggle");

		document.addEventListener("click", (e) => {
			if (
				navMenu?.classList.contains("active") &&
				!navMenu.contains(e.target) &&
				!navToggle?.contains(e.target)
			) {
				navMenu.classList.remove("active");
				navToggle?.classList.remove("active");
			}
		});
	}

	initSvgAnimation() {
		const path = document.querySelector("#svgPath");
		if (!path) return;

		const pathLength = path.getTotalLength();
		path.style.strokeDasharray = `${pathLength} ${pathLength}`;
		path.style.strokeDashoffset = pathLength;
		path.getBoundingClientRect();

		window.addEventListener("scroll", () => {
			const scrollPercentage =
				(document.documentElement.scrollTop + document.body.scrollTop) /
				(document.documentElement.scrollHeight -
					document.documentElement.clientHeight);

			const drawLength = pathLength * scrollPercentage;
			path.style.strokeDashoffset = pathLength - drawLength;

			if (scrollPercentage >= 0.99) {
				path.style.strokeDasharray = "none";
			} else {
				path.style.strokeDasharray = `${pathLength} ${pathLength}`;
			}
		});
	}

	handleResize() {
		let resizeTimeout;
		window.addEventListener("resize", () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				this.updateMobileMenuState();
			}, 250);
		});
	}

	updateMobileMenuState() {
		const navMenu = document.getElementById("navMenu");
		const navToggle = document.getElementById("navToggle");

		if (window.innerWidth > 991) {
			navMenu?.classList.remove("active");
			navToggle?.classList.remove("active");

			document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
				dropdown.classList.remove("active");
				const content = dropdown.querySelector(".dropdown-content");
				if (content) content.style.maxHeight = "";
			});
		}
	}

	updatePageDirection(language) {
		document.documentElement.dir = "ltr";
	}

	reinitializeComponents() {
		this.initNavbarInteractions();
		this.initLanguageSwitcher();
		this.initMobileMenu();
		this.initSvgAnimation();
		this.updateMobileMenuState();
	}
}

window.app = new App();

window.Webflow = window.Webflow || [];
window.Webflow.push(() => {});

export default window.app;
