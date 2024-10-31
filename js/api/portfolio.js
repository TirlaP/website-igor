// Portfolio data service
class PortfolioService {
	constructor() {
		this.items = portfolioItems;
	}

	// Get all portfolio items
	getAllItems() {
		return this.items;
	}

	// Get item by ID
	getItemById(id) {
		return this.items.find((item) => item.id === id);
	}

	// Get items by category
	getItemsByCategory(category) {
		return category === "All Works"
			? this.items
			: this.items.filter((item) => item.category === category);
	}

	// Search items
	searchItems(query) {
		query = query.toLowerCase();
		return this.items.filter(
			(item) =>
				item.title.toLowerCase().includes(query) ||
				item.shortDescription.toLowerCase().includes(query) ||
				item.category.toLowerCase().includes(query)
		);
	}

	// Get related projects
	getRelatedProjects(currentId, limit = 3) {
		const currentItem = this.getItemById(currentId);
		if (!currentItem) return [];

		return this.items
			.filter(
				(item) =>
					item.id !== currentId && item.category === currentItem.category
			)
			.slice(0, limit);
	}

	// Get categories
	getCategories() {
		const categories = new Set(this.items.map((item) => item.category));
		return ["All Works", ...Array.from(categories)];
	}
}

export const portfolioService = new PortfolioService();
