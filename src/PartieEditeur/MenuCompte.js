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
	}

	ouvrirMenu() {
		this._menuDiv = document.createElement("div");
		this._menuDiv.id = "MenuCompteDiv";
		this._menuDiv.classList.add("menu-compte");
		this._menuDiv.innerHTML = `
            <div class="elementMenuCompte" id="boutonDeconnexion">Deconnexion</div>
            <div class="elementMenuCompte" id="boutonTheme"></div>
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
	}

	fermerMenu() {
		this._selectionTheme = document.querySelector("select#theme");
		this.appendChild(this._selectionTheme);
		this._selectionTheme.style.display = "none";

		this.removeChild(this._menuDiv);
		this._estOuvert = false;
	}

	deconnexion() {
		console.log("Déconnexion");
	}
	deconnexion() {
		console.log("Déconnexion");
	}
}

window.customElements.define("menu-compte-element", MenuCompte);
