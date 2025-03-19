/**
 * @classdesc Le menu de compte utilisateur qui apparait lorsque l'on clique sur l'icône de compte.
 * @description Crée une instance de MenuCompte.
 * @class MenuCompte
 * @extends {HTMLElement}
 */
class MenuCompte extends HTMLElement {
	// ATTRIBUTS
	_menuDiv;
	_boutonDeconnexion;
	_boutonTheme;
	_menuIcone;
	_selectionTheme;
	_estOuvert = false;

	// CONSTRUCTEUR
	constructor() {
		super();

		this.MenuIcone = document.createElement("div");
		this.MenuIcone.classList.add("img");
		this.MenuIcone.innerHTML = `<svg id="boutonCompte" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>`;
		this.MenuIcone.alt = "Menu compte";
		this.MenuIcone.id = "MenuCompte";
		this.MenuIcone.addEventListener("click", () => {
			if (this._estOuvert) {
				this.fermerMenu();
			} else {
				this.ouvrirMenu();
			}
		});
		this.appendChild(this.MenuIcone);

		document.addEventListener(
			"click",
			(e) => {
				if (this.contains(e.target)) return;
				else if (this._estOuvert) this.fermerMenu();
			},
			true,
		);
	}

	/**
	 * @description Ouvre le menu de compte.
	 */
	ouvrirMenu() {
		this._menuDiv = document.createElement("div");
		this._menuDiv.id = "MenuCompteDiv";
		this._menuDiv.classList.add("menu-compte");

		// Structure simplifiée pour correspondre à l'image
		this._menuDiv.innerHTML = `
			<div class="menu-header">
				<div class="user-avatar">
					<svg viewBox="0 0 24 24">
						<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
					</svg>
				</div>
				<div class="user-info">
					<p class="greeting">Test1</p>
					<p class="email">test@gmail.com</p>
				</div>
				<button class="close-button" id="closeMenuBtn">
					<svg viewBox="0 0 24 24">
						<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
					</svg>
				</button>
			</div>
			
			<div class="theme-section" id="boutonTheme">
				<!-- Le sélecteur de thème sera ajouté ici -->
			</div>
			
			<div class="menu-actions">
				<button class="menu-item" id="boutonModifierCompte">
					<svg viewBox="0 0 24 24">
						<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
					</svg>
					<span>Modifier votre compte</span>
				</button>
				
				<button class="menu-item" id="boutonDeconnexion">
					<svg viewBox="0 0 24 24">
						<path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
					</svg>
					<span>Se déconnecter</span>
				</button>
			</div>
			
			<div class="menu-separator"></div>
			
			<div class="editor-options">
				<div class="indicators-option">
					<select id="indicateursPage" class="indicators-select">
						<option value="disabled">Aucun indicateur</option>
						<option value="a4-portrait">Indicateur A4 Portrait</option>
						<option value="a4-landscape">Indicateur A4 Paysage</option>
						<option value="a3-portrait">Indicateur A3 Portrait</option>
						<option value="a3-landscape">Indicateur A3 Paysage</option>
					</select>
				</div>
				
				<div class="effect-option">
					<span>Effet Glow</span>
					<div id="switchGlowContainer" class="switch-container">
						<div id="switchGlowDisplayer" class="switch-displayer"></div>
					</div>
				</div>
				
				<div class="effect-option">
					<span>Effet Dock</span>
					<div id="switchDockContainer" class="switch-container">
						<div id="switchDockDisplayer" class="switch-displayer"></div>
					</div>
				</div>
			</div>
		`;

		this.appendChild(this._menuDiv);

		// Récupération des éléments après avoir ajouté le menu au DOM
		const boutonTheme = this._menuDiv.querySelector("#boutonTheme");
		const closeButton = this._menuDiv.querySelector("#closeMenuBtn");
		const boutonModifierCompte = this._menuDiv.querySelector(
			"#boutonModifierCompte",
		);
		const selectIndicateurs =
			this._menuDiv.querySelector("#indicateursPage");

		const switchGlow = this._menuDiv.querySelector(
			".effect-option:nth-child(2)",
		);
		const switchGlowContainer = this._menuDiv.querySelector(
			"#switchGlowContainer",
		);
		const switchGlowDisplayer = this._menuDiv.querySelector(
			"#switchGlowDisplayer",
		);

		const switchDock = this._menuDiv.querySelector(
			".effect-option:nth-child(3)",
		);
		const switchDockContainer = this._menuDiv.querySelector(
			"#switchDockContainer",
		);
		const switchDockDisplayer = this._menuDiv.querySelector(
			"#switchDockDisplayer",
		);

		// Ajout du sélecteur de thème
		this._selectionTheme = document.querySelector("select#theme");
		if (this._selectionTheme) {
			boutonTheme.appendChild(this._selectionTheme);
			this._selectionTheme.style.display = "block";
		}

		// Ajout des event listeners après avoir vérifié que les éléments existent
		if (closeButton) {
			closeButton.addEventListener("click", () => {
				this.fermerMenu();
			});
		}

		if (boutonModifierCompte) {
			boutonModifierCompte.addEventListener("click", () => {
				console.log("Modifier compte (non implémenté)");
			});
		}

		// Bouton de déconnexion
		this._boutonDeconnexion =
			this._menuDiv.querySelector("#boutonDeconnexion");
		if (this._boutonDeconnexion) {
			this._boutonDeconnexion.addEventListener("click", () => {
				this.deconnexion();
			});
		}

		// Gestion des indicateurs de page
		if (selectIndicateurs) {
			selectIndicateurs.addEventListener("change", () => {
				document.documentElement.setAttribute(
					"data-page-size",
					selectIndicateurs.value,
				);
			});

			selectIndicateurs.value =
				document.documentElement.getAttribute("data-page-size") ||
				"disabled";
		}

		// Le reste du code reste inchangé...
		if (preferences.glow) {
			switchGlowContainer.style.backgroundColor = "var(--titleColor)";
			switchGlowDisplayer.style.left = "auto";
			switchGlowDisplayer.style.right = "2px";
		} else {
			switchGlowContainer.style.backgroundColor =
				"var(--fgColorSemiTransparent)";
			switchGlowDisplayer.style.left = "2px";
			switchGlowDisplayer.style.right = "auto";
		}

		switchGlow.addEventListener("click", () => {
			if (preferences.glow) {
				preferences.glow = false;
				editeur.setCookie("glow", "false", 365);
				switchGlowContainer.style.backgroundColor =
					"var(--fgColorSemiTransparent)";
				switchGlowDisplayer.style.left = "2px";
				switchGlowDisplayer.style.right = "auto";
			} else {
				preferences.glow = true;
				editeur.setCookie("glow", "true", 365);
				switchGlowContainer.style.backgroundColor = "var(--titleColor)";
				switchGlowDisplayer.style.left = "auto";
				switchGlowDisplayer.style.right = "2px";
			}
		});

		// Gestion de l'effet Dock
		if (preferences.dockEffect) {
			switchDockContainer.style.backgroundColor = "var(--titleColor)";
			switchDockDisplayer.style.left = "auto";
			switchDockDisplayer.style.right = "2px";
		} else {
			switchDockContainer.style.backgroundColor =
				"var(--fgColorSemiTransparent)";
			switchDockDisplayer.style.left = "2px";
			switchDockDisplayer.style.right = "auto";
		}

		switchDock.addEventListener("click", () => {
			if (preferences.dockEffect) {
				preferences.dockEffect = false;
				editeur.setCookie("dockEffect", "false", 365);
				switchDockContainer.style.backgroundColor =
					"var(--fgColorSemiTransparent)";
				switchDockDisplayer.style.left = "2px";
				switchDockDisplayer.style.right = "auto";
			} else {
				preferences.dockEffect = true;
				editeur.setCookie("dockEffect", "true", 365);
				switchDockContainer.style.backgroundColor = "var(--titleColor)";
				switchDockDisplayer.style.left = "auto";
				switchDockDisplayer.style.right = "2px";
			}
		});

		this.appendChild(this._menuDiv);
		this._estOuvert = true;
		this._init = true;
		document.getElementById("boutonCompte").classList.add("elementIsOpen");
	}

	/**
	 * @description Ferme le menu de compte.
	 */
	fermerMenu() {
		this._selectionTheme = document.querySelector("select#theme");
		this.appendChild(this._selectionTheme);
		this._selectionTheme.style.display = "none";

		this.removeChild(this._menuDiv);
		this._estOuvert = false;
		document
			.getElementById("boutonCompte")
			.classList.remove("elementIsOpen");
	}

	/**
	 * @description Déconnecte l'utilisateur.
	 */
	deconnexion() {
		if (verbose) console.log("Déconnexion");
	}
}

window.customElements.define("menu-compte-element", MenuCompte);
