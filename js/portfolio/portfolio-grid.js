import { portfolioItems } from "./portfolio-data.js";

document.addEventListener("DOMContentLoaded", function () {
	const portfolioGrid = document.querySelector(".portfolio-grid");
	const categoryButtons = document.querySelectorAll(".category-btn");

	if (!portfolioGrid) return;

	let currentCategory = "All Works";

	function generatePortfolioItem(project) {
		return `
            <article class="bg-white rounded-xl overflow-hidden transition hover:-translate-y-1 duration-300">
                <a href="portfolio-template.html?id=${project.id}" class="block">
                    <!-- Image Container -->
                    <div class="relative aspect-[4/3] overflow-hidden">
                        <img
                            src="${project.mainImage}"
                            alt="${project.title}"
                            class="w-full h-full object-cover transition duration-700 ease-out hover:scale-105"
                        />
                        <div class="absolute top-4 right-4">
                            <span class="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-sm">
                                ${project.category}
                            </span>
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="p-6">
                        <!-- Title & Location -->
                        <div class="mb-4">
                            <h3 class="text-xl font-light mb-2">${project.title}</h3>
                            <div class="flex items-center text-sm text-gray-500">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                </svg>
                                ${project.location}
                            </div>
                        </div>

                        <!-- Divider -->
                        <div class="w-full h-px bg-gray-100 mb-4"></div>

                        <!-- Project Details -->
                        <div class="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span class="text-gray-500">Duration</span>
                                <p class="font-medium mt-0.5">${project.duration}</p>
                            </div>
                            <div>
                                <span class="text-gray-500">Completed</span>
                                <p class="font-medium mt-0.5">${project.completionDate}</p>
                            </div>
                        </div>
                    </div>
                </a>
            </article>
        `;
	}

	function updateGrid() {
		const filteredProjects =
			currentCategory === "All Works"
				? portfolioItems
				: portfolioItems.filter(
						(project) => project.category === currentCategory
				  );

		// Fade out current items
		const currentItems = portfolioGrid.querySelectorAll("article");
		currentItems.forEach((item) => {
			item.style.opacity = "0";
			item.style.transform = "translateY(10px)";
		});

		// Update grid after fade out
		setTimeout(() => {
			portfolioGrid.innerHTML = filteredProjects
				.map(generatePortfolioItem)
				.join("");

			// Fade in new items
			const newItems = portfolioGrid.querySelectorAll("article");
			newItems.forEach((item, index) => {
				item.style.opacity = "0";
				item.style.transform = "translateY(10px)";

				setTimeout(() => {
					item.style.transition = "all 0.5s ease";
					item.style.opacity = "1";
					item.style.transform = "translateY(0)";
				}, index * 100);
			});
		}, 300);
	}

	// Initialize grid
	updateGrid();

	// Handle category filtering
	categoryButtons.forEach((button) => {
		button.addEventListener("click", function () {
			// Update active state
			categoryButtons.forEach((btn) => {
				btn.classList.remove("bg-vitros-primary", "text-white");
				btn.classList.add("bg-white", "text-gray-900");
			});

			this.classList.remove("bg-white", "text-gray-900");
			this.classList.add("bg-vitros-primary", "text-white");

			// Update category and grid
			currentCategory =
				this.querySelector("span")?.textContent?.trim() || "All Works";
			updateGrid();
		});
	});
});

// Add CSS styles
const styles = `
    /* Grid Layout */
    .portfolio-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 2rem;
        padding: 2rem 0;
    }

    @media (min-width: 1024px) {
        .portfolio-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    /* Card Styles */
    .portfolio-grid article {
        background: white;
        border-radius: 0.75rem;
        overflow: hidden;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        transition: all 0.3s ease;
    }

    .portfolio-grid article:hover {
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    }

    /* Animation Classes */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .portfolio-grid article {
        animation: fadeInUp 0.6s ease forwards;
    }

    .portfolio-grid article:nth-child(1) { animation-delay: 0.1s; }
    .portfolio-grid article:nth-child(2) { animation-delay: 0.2s; }
    .portfolio-grid article:nth-child(3) { animation-delay: 0.3s; }
    .portfolio-grid article:nth-child(4) { animation-delay: 0.4s; }
    .portfolio-grid article:nth-child(5) { animation-delay: 0.5s; }
    .portfolio-grid article:nth-child(6) { animation-delay: 0.6s; }

    /* Category Buttons */
    .category-btn {
        transition: all 0.3s ease;
    }

    .category-btn:hover {
        transform: translateY(-1px);
    }
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
