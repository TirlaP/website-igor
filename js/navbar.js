class Navbar {
	constructor() {
		this.init();
	}

	init() {
		this.initMobileMenu();
		this.initMobileDropdowns();
	}

	initMobileMenu() {
		const toggle = document.getElementById("navToggle");
		const menu = document.getElementById("navMenu");

		if (toggle && menu) {
			toggle.addEventListener("click", () => {
				menu.classList.toggle("active");
				toggle.classList.toggle("active");
			});
		}
	}

	initMobileDropdowns() {
		const dropdowns = document.querySelectorAll(".nav-dropdown");

		dropdowns.forEach((dropdown) => {
			const trigger = dropdown.querySelector(".dropdown-trigger");

			if (trigger) {
				trigger.addEventListener("click", (e) => {
					if (window.innerWidth <= 991) {
						e.preventDefault();
						dropdown.classList.toggle("active");
					}
				});
			}
		});
	}
}

// Initialize navbar when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
	new Navbar();
});

export default Navbar;
