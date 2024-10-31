import { portfolioItems } from "./portfolio-data.js";

document.addEventListener("DOMContentLoaded", function () {
	const urlParams = new URLSearchParams(window.location.search);
	const projectId = urlParams.get("id");
	const project = portfolioItems.find((item) => item.id === projectId);

	if (!project) {
		window.location.href = "/404.html";
		return;
	}

	document.title = `${project.title} - Artistry in Glass`;

	const heroSection = `
<!-- Minimalist Hero Section -->
<section class="pt-32 pb-16 bg-white">
    <div class="max-w-7xl mx-auto px-4">
        <!-- Clean Breadcrumb -->
        <nav class="mb-12">
            <ol class="flex items-center space-x-2 text-sm text-gray-600">
                <li><a href="/" class="hover:text-vitros-primary transition-colors">Home</a></li>
                <li><span class="px-2">→</span></li>
                <li><a href="/portfolio.html" class="hover:text-vitros-primary transition-colors">Portfolio</a></li>
                <li><span class="px-2">→</span></li>
                <li class="text-vitros-primary">${project.title}</li>
            </ol>
        </nav>

        <!-- Two-Column Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <!-- Left Column: Text Content -->
            <div class="space-y-8">
                <div class="space-y-6">
                    <h1 class="text-5xl font-bold text-gray-900 leading-tight">${project.title}</h1>
                    <p class="text-xl text-gray-600">${project.shortDescription}</p>
                </div>

                <!-- Project Quick Facts -->
                <div class="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                    <div>
                        <span class="text-sm text-gray-500 block mb-1">Category</span>
                        <span class="text-lg font-medium text-gray-900">${project.category}</span>
                    </div>
                    <div>
                        <span class="text-sm text-gray-500 block mb-1">Duration</span>
                        <span class="text-lg font-medium text-gray-900">${project.duration}</span>
                    </div>
                    <div>
                        <span class="text-sm text-gray-500 block mb-1">Completed</span>
                        <span class="text-lg font-medium text-gray-900">${project.completionDate}</span>
                    </div>
                </div>
            </div>

            <!-- Right Column: Featured Image -->
            <div class="relative">
                <div class="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                        src="${project.mainImage}" 
                        alt="${project.title}" 
                        class="w-full h-full object-cover"
                    />
                </div>
                <!-- Decorative Elements -->
                <div class="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-vitros-primary/5 rounded-full blur-3xl"></div>
                <div class="absolute -z-10 -top-6 -left-6 w-48 h-48 bg-vitros-secondary/5 rounded-full blur-2xl"></div>
            </div>
        </div>
    </div>
</section>

<!-- Project Navigation Bar -->
<section class="sticky top-0 z-50 bg-white border-y border-gray-100 shadow-sm">
    <div class="max-w-7xl mx-auto px-4">
        <nav class="flex items-center justify-between h-16">
            <ul class="flex items-center space-x-8">
                <li>
                    <a href="#overview" class="text-sm font-medium text-gray-900 hover:text-vitros-primary transition-colors">
                        01 Overview
                    </a>
                </li>
                <li>
                    <a href="#challenge" class="text-sm font-medium text-gray-900 hover:text-vitros-primary transition-colors">
                        02 Challenge
                    </a>
                </li>
                <li>
                    <a href="#solution" class="text-sm font-medium text-gray-900 hover:text-vitros-primary transition-colors">
                        03 Solution
                    </a>
                </li>
                <li>
                    <a href="#gallery" class="text-sm font-medium text-gray-900 hover:text-vitros-primary transition-colors">
                        04 Gallery
                    </a>
                </li>
            </ul>

            <!-- Contact Button -->
            <a 
                href="/contact.html" 
                class="inline-flex items-center gap-2 px-4 py-2 bg-vitros-primary/10 text-vitros-primary rounded-lg hover:bg-vitros-primary hover:text-white transition-colors"
            >
                <span class="text-sm font-medium">Start Project</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
            </a>
        </nav>
    </div>
</section>
`;

	// Replace the entire content string with:
	const content = `
${heroSection}

<!-- Main Content Sections -->
<div class="bg-white py-16">
    <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <!-- Left Column - Content -->
            <div class="space-y-24">
                <!-- Overview Section -->
                <section id="overview" class="scroll-mt-16">
                    <div class="space-y-6">
                        <div class="flex items-center gap-4">
                            <span class="text-4xl font-bold text-vitros-primary">01</span>
                            <h2 class="text-2xl font-bold text-gray-900">Project Overview</h2>
                        </div>
                        <div class="prose prose-lg">
                            <p class="text-gray-600">${project.overview}</p>
                        </div>
                    </div>
                </section>

                <!-- Challenge Section -->
                <section id="challenge" class="scroll-mt-16">
                    <div class="space-y-6">
                        <div class="flex items-center gap-4">
                            <span class="text-4xl font-bold text-vitros-primary">02</span>
                            <h2 class="text-2xl font-bold text-gray-900">The Challenge</h2>
                        </div>
                        <div class="prose prose-lg">
                            <p class="text-gray-600">${project.challenge}</p>
                        </div>
                    </div>
                </section>

                <!-- Solution Section -->
                <section id="solution" class="scroll-mt-16">
                    <div class="space-y-6">
                        <div class="flex items-center gap-4">
                            <span class="text-4xl font-bold text-vitros-primary">03</span>
                            <h2 class="text-2xl font-bold text-gray-900">Our Solution</h2>
                        </div>
                        <div class="prose prose-lg">
                            <p class="text-gray-600">${
															project.solution.text
														}</p>
                            <ul class="mt-6 space-y-4">
                                ${project.solution.points
																	.map(
																		(point) => `
                                    <li class="flex items-start gap-3">
                                        <svg class="w-5 h-5 text-vitros-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                                        </svg>
                                        <span class="text-gray-600">${point}</span>
                                    </li>
                                `
																	)
																	.join("")}
                            </ul>
                        </div>
                    </div>
                </section>
            </div>

            <!-- Right Column - Sticky Information -->
            <div class="relative lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16">
                <div class="space-y-8">
                    <!-- Project Details Card -->
                    <div class="bg-gray-50 rounded-2xl p-8">
                        <h3 class="text-lg font-bold mb-6">Project Details</h3>
                        <dl class="space-y-4">
                            <div class="flex justify-between items-center py-3 border-b border-gray-200">
                                <dt class="text-gray-500">Location</dt>
                                <dd class="font-medium">${project.location}</dd>
                            </div>
                            <div class="flex justify-between items-center py-3 border-b border-gray-200">
                                <dt class="text-gray-500">Category</dt>
                                <dd class="font-medium">${project.category}</dd>
                            </div>
                            <div class="flex justify-between items-center py-3 border-b border-gray-200">
                                <dt class="text-gray-500">Duration</dt>
                                <dd class="font-medium">${project.duration}</dd>
                            </div>
                            <div class="flex justify-between items-center py-3">
                                <dt class="text-gray-500">Completion</dt>
                                <dd class="font-medium">${
																	project.completionDate
																}</dd>
                            </div>
                        </dl>
                    </div>

                    <!-- Contact CTA -->
                    <div class="bg-gray-900 rounded-2xl p-8 text-white">
                        <h3 class="text-2xl font-bold mb-4">Start Your Project</h3>
                        <p class="text-gray-300 mb-6">Ready to bring your vision to life? Let's create something extraordinary together.</p>
                        <a 
                            href="/contact.html" 
                            class="block text-center bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Gallery Section -->
<section id="gallery" class="py-24 bg-gray-50 scroll-mt-16">
    <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
            <span class="text-4xl font-bold text-vitros-primary">04</span>
            <h2 class="text-2xl font-bold text-gray-900 mt-4">Project Gallery</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${project.gallery
							.map(
								(image) => `
                <div class="group relative aspect-w-3 aspect-h-4 rounded-xl overflow-hidden bg-gray-100">
                    <img 
                        src="${image}" 
                        alt="${project.title} Gallery Image" 
                        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            `
							)
							.join("")}
        </div>
    </div>
</section>

<!-- Related Projects -->
<section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-2xl font-bold text-center mb-16">More Projects</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            ${generateRelatedProjects(project.relatedProjects)}
        </div>
    </div>
</section>
`;

	document.getElementById("portfolio-content").innerHTML = content;
});

function generateRelatedProjects(relatedIds) {
	return relatedIds
		.map((id) => {
			const relatedProject = portfolioItems.find((item) => item.id === id);
			if (!relatedProject) return "";

			return `
            <article class="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
                <div class="aspect-w-3 aspect-h-4 bg-gray-100">
                    <img
                        src="${relatedProject.mainImage}"
                        alt="${relatedProject.title}"
                        class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div class="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                            <span class="text-vitros-primary text-sm font-medium">${relatedProject.category}</span>
                            <h3 class="text-2xl font-bold text-white mb-2">${relatedProject.title}</h3>
                            <p class="text-gray-300 mb-4">${relatedProject.shortDescription}</p>
                            <a
                                href="/portfolio-template.html?id=${relatedProject.id}"
                                class="inline-flex items-center gap-2 text-white hover:text-vitros-primary transition-colors"
                            >
                                View Project
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </article>
        `;
		})
		.join("");
}
