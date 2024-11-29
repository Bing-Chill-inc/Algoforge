class MenuCompte extends HTMLElement {
    // ATTRIBUTS
    _menuDiv;
    _boutonDeconnexion;
    _boutonTheme;
    _menuIcone;
    _selectionTheme;
    _estOuvert = false;
    _init = false;

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

    // MÉTHODES
    ouvrirMenu() {
        this._menuDiv = document.createElement("div");
        this._menuDiv.id = "MenuCompteDiv";
        this._menuDiv.classList.add("menu-compte");
        this._menuDiv.innerHTML = `
            <div class="elementMenuCompte" id="boutonDeconnexion">Deconnexion</div>
        `;
        if(!this._init) {
            this._selectionTheme = document.querySelector("select#theme");
            this._menuDiv.appendChild(this._selectionTheme);
            this._selectionTheme.style.display = "block";
        }
        

        this._boutonDeconnexion = this._menuDiv.querySelector("#boutonDeconnexion");
        this._boutonDeconnexion.addEventListener("click", () => {
            this.deconnexion();
        });
        this.appendChild(this._menuDiv);
        this._estOuvert = true;
        this._init = true;
    }

    fermerMenu() {
        this.removeChild(this._menuDiv);
        this._estOuvert = false;
    }

    deconnexion() {
        console.log("Déconnexion");
    }
    
}

window.customElements.define("menu-compte-element", MenuCompte);