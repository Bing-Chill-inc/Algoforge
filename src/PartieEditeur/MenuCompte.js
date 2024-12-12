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
        `;
		let boutonTheme = this._menuDiv.querySelector("#boutonTheme");
		this._selectionTheme = document.querySelector("select#theme");
		boutonTheme.appendChild(this._selectionTheme);

		this._selectionTheme.style.display = "block";

		this._boutonDeconnexion =
			this._menuDiv.querySelector("#boutonDeconnexion");
		this._boutonDeconnexion.addEventListener("click", () => {
			this.deconnexion();
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
