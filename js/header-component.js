class Header extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = `
      <nav class="main-nav">
        <div class="nav-container">
          <a href="/" class="nav-logo">
            <img
              sizes="125px"
              srcset="images/logo-vitros-p-500.png 500w, images/logo-vitros.png 666w"
              alt="VITROS"
              src="images/logo-vitros.png"
              loading="lazy"
              class="navbar6_logo"
            />
          </a>

          <div class="nav-toggle" id="navToggle">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div class="nav-menu" id="navMenu">
            <div class="nav-links">
              <a href="/index.html" class="nav-link" data-i18n="nav.home"></a>
              <a href="/about-us.html" class="nav-link" data-i18n="nav.about"> </a>

              <div class="nav-dropdown">
                <a
                  href="/services.html"
                  class="nav-link dropdown-trigger"
                  data-i18n="nav.services"
                ></a>
                <div class="dropdown-content">
                  <a
                    href="/services/new-creations.html"
                    class="dropdown-link"
                    data-i18n="nav.servicesDropdown.new"
                  >
                  </a>
                  <a
                    href="/services/restoration.html"
                    class="dropdown-link"
                    data-i18n="nav.servicesDropdown.restoration"
                  ></a>
                  <a
                    href="/services/consultation.html"
                    class="dropdown-link"
                    data-i18n="nav.servicesDropdown.consultation"
                  ></a>
                </div>
              </div>

              <a
                href="/portfolio.html"
                class="nav-link"
                data-i18n="nav.portfolio"
              ></a>
            </div>

            <div class="nav-actions">
              <div class="lang-switcher">
                <select
                  class="lang-select"
                  id="langSelect"
                  aria-label="Select Language"
                >
                  <option value="de-DE">DE</option>
                  <option value="en-US">EN</option>
                  <option value="fr-FR">FR</option>
                </select>
              </div>
              <a href="/contact" class="nav-button" data-i18n="nav.contact"></a>
            </div>
          </div>
        </div>
      </nav>
    `;
	}
}

customElements.define("header-component", Header);
