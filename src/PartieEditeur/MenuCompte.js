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
		this._menuDiv.innerHTML = `
            <div class="elementMenuCompte" id="boutonDeconnexion">Deconnexion</div>
            <div class="elementMenuCompte" id="boutonTheme"></div>
			<div class="elementMenuCompte">
				<select id="indicateursPage">
					<option value="disabled">Aucun indicateur</option>
					<option value="a4-portrait">Indicateur A4 Portrait</option>
					<option value="a4-landscape">Indicateur A4 Paysage</option>
					<option value="a3-portrait">Indicateur A3 Portrait</option>
					<option value="a3-landscape">Indicateur A3 Paysage</option>
				</select>
			</div>
			<div class="elementMenuCompte element-compte-switch" id="switchGlow">
				Effet Glow 
				<div id="switchGlowContainer" class="element-compte-switch-container">
					<div id="switchGlowDisplayer" class="element-compte-switch-displayer"></div>
				</div>
			</div>
			<div class="elementMenuCompte element-compte-switch" id="switchDock">
				Effet Dock 
				<div id="switchDockContainer" class="element-compte-switch-container">
					<div id="switchDockDisplayer" class="element-compte-switch-displayer"></div>
				</div>
			</div>
        `;
		const boutonTheme = this._menuDiv.querySelector("#boutonTheme");

		const selectIndicateurs =
			this._menuDiv.querySelector("#indicateursPage");

		const switchGlow = this._menuDiv.querySelector("#switchGlow");
		const switchGlowContainer = this._menuDiv.querySelector(
			"#switchGlowContainer",
		);
		const switchGlowDisplayer = this._menuDiv.querySelector(
			"#switchGlowDisplayer",
		);

		const switchDock = this._menuDiv.querySelector("#switchDock");
		const switchDockContainer = this._menuDiv.querySelector(
			"#switchDockContainer",
		);
		const switchDockDisplayer = this._menuDiv.querySelector(
			"#switchDockDisplayer",
		);

		this._selectionTheme = document.querySelector("select#theme");
		boutonTheme.appendChild(this._selectionTheme);

		this._selectionTheme.style.display = "block";

		this._boutonDeconnexion =
			this._menuDiv.querySelector("#boutonDeconnexion");
		this._boutonDeconnexion.addEventListener("click", () => {
			this.deconnexion();
		});

		selectIndicateurs.addEventListener("change", () => {
			document.documentElement.setAttribute(
				"data-page-size",
				selectIndicateurs.value,
			);
		});

		selectIndicateurs.value =
			document.documentElement.getAttribute("data-page-size") ||
			"disabled";

		selectIndicateurs.style.display = "block";

		if (preferences.glow) {
			switchGlowContainer.style.backgroundColor = "var(--titleColor)";
			switchGlowDisplayer.style.left = "auto";
			switchGlowDisplayer.style.right = "0.1vw";
		} else {
			switchGlowContainer.style.backgroundColor =
				"var(--fgColorSemiTransparent)";
			switchGlowDisplayer.style.left = "0.1vw";
			switchGlowDisplayer.style.right = "auto";
		}

		switchGlow.addEventListener("click", () => {
			if (preferences.glow) {
				preferences.glow = false;
				editeur.setCookie("glow", "false", 365);
				switchGlowContainer.style.backgroundColor =
					"var(--fgColorSemiTransparent)";
				switchGlowDisplayer.style.left = "0.1vw";
				switchGlowDisplayer.style.right = "auto";
			} else {
				preferences.glow = true;
				editeur.setCookie("glow", "true", 365);
				switchGlowContainer.style.backgroundColor = "var(--titleColor)";
				switchGlowDisplayer.style.left = "auto";
				switchGlowDisplayer.style.right = "0.1vw";
			}
		});

		if (preferences.dockEffect) {
			switchDockContainer.style.backgroundColor = "var(--titleColor)";
			switchDockDisplayer.style.left = "auto";
			switchDockDisplayer.style.right = "0.1vw";
		} else {
			switchDockContainer.style.backgroundColor =
				"var(--fgColorSemiTransparent)";
			switchDockDisplayer.style.left = "0.1vw";
			switchDockDisplayer.style.right = "auto";
		}

		switchDock.addEventListener("click", () => {
			if (preferences.dockEffect) {
				preferences.dockEffect = false;
				editeur.setCookie("dockEffect", "false", 365);
				switchDockContainer.style.backgroundColor =
					"var(--fgColorSemiTransparent)";
				switchDockDisplayer.style.left = "0.1vw";
				switchDockDisplayer.style.right = "auto";
			} else {
				preferences.dockEffect = true;
				editeur.setCookie("dockEffect", "true", 365);
				switchDockContainer.style.backgroundColor = "var(--titleColor)";
				switchDockDisplayer.style.left = "auto";
				switchDockDisplayer.style.right = "0.1vw";
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
