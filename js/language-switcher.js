import translations from "./translations.js";

class LanguageSwitcher {
	constructor() {
		this.translations = translations;
		this.currentLang = localStorage.getItem("preferred-language") || "de-DE";

		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", () => this.init());
		} else {
			this.init();
		}
	}

	init() {
		console.log("Initializing Language Switcher...");
		this.langSelect = document.querySelector("#langSelect, .lang-select");

		if (!this.langSelect) {
			console.error("Language selector not found");
			return;
		}

		// Update language selector options
		this.langSelect.innerHTML = `
      <option value="de-DE">DE</option>
      <option value="en-US">EN</option>
      <option value="fr-FR">FR</option>
    `;

		// Set initial value
		this.langSelect.value = this.currentLang;
		document.documentElement.lang = this.currentLang;

		// Add event listener for language changes
		this.langSelect.addEventListener("change", (e) => {
			this.setLanguage(e.target.value);
		});

		// Initial translation
		this.translatePage();
	}

	setLanguage(lang) {
		console.log("Setting language to:", lang);
		this.currentLang = lang;
		localStorage.setItem("preferred-language", lang);
		document.documentElement.lang = lang;
		this.translatePage();

		// Dispatch event for other components
		const event = new CustomEvent("languageChanged", {
			detail: { language: lang },
		});
		document.dispatchEvent(event);
	}

	translatePage() {
		console.log("Translating page to:", this.currentLang);
		const elements = document.querySelectorAll("[data-i18n]");

		if (!this.translations || !this.translations[this.currentLang]) {
			console.error(
				"No translations available for language:",
				this.currentLang
			);
			return;
		}

		elements.forEach((element) => {
			const key = element.getAttribute("data-i18n");
			if (!key) return;

			const translation = this.getTranslation(key);

			if (translation) {
				if (
					element.tagName.toLowerCase() === "input" ||
					element.tagName.toLowerCase() === "textarea"
				) {
					element.placeholder = translation;
				} else {
					element.textContent = translation;
				}
			} else {
				console.warn(
					`No translation found for key: ${key} in ${this.currentLang}`
				);
			}
		});
	}

	getTranslation(key) {
		if (!key || !this.translations || !this.translations[this.currentLang]) {
			return null;
		}

		try {
			// Handle nested keys (e.g., "nav.services.title")
			return key
				.split(".")
				.reduce((obj, i) => obj[i], this.translations[this.currentLang]);
		} catch (e) {
			console.warn(`Error getting translation for key: ${key}`, e);
			return null;
		}
	}
}

// Create and export a single instance
const languageSwitcher = new LanguageSwitcher();
export default languageSwitcher;
