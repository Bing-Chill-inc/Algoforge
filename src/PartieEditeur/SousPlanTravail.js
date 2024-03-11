class SousPlanTravail extends PlanTravail {
	// ATTRIBUTS
	_editeur = document.querySelector("editeur-interface"); // Editeur
	_proprietaire; // Probleme
	_spanSousTitre; // Span

	// CONSTRUCTEUR
	constructor(proprietaire) {
		super();
		this._proprietaire = proprietaire;
		this._spanSousTitre = document.createElement("span");
		this._spanSousTitre.classList.add("sous-titre");

		// Ajout de la croix de fermeture
		let croixFermeture = document.createElement("span");
		croixFermeture.innerHTML = "X";
		croixFermeture.classList.add("fermeture");
		croixFermeture.addEventListener("click", (e) => {
			e.stopPropagation();
			this.fermer();
		});
		this.appendChild(croixFermeture);
	}

	// Methodes
	ouvrir() {
		this.classList.add("ouvert");

		// Transférer les représentations des sélections
		let selectionsSimples = document.querySelectorAll("selection-simple");
		let selectionsRectangles = document.querySelectorAll("selection-rectangle");
		let selectionEditeur = document.querySelector("selection-editeur");

		selectionsSimples.forEach((selectionSimple) => {
			this.appendChild(selectionSimple);
		});

		selectionsRectangles.forEach((selectionRectangle) => {
			this.appendChild(selectionRectangle);
		});

		this.appendChild(selectionEditeur);
		selectionEditeur.deselectionnerTout();

		// Ajout du sous-titre
		this._spanSousTitre.innerText = " > " + this._proprietaire._libelle;
		this._editeur.querySelector("#titreAlgo").parentNode.appendChild(this._spanSousTitre);

		this._editeur._planActif = this;
	}

	fermer() {
		this.classList.remove("ouvert");

		// On remet les sélections dans le plan de travail du propriétaire
		let selectionsSimples = document.querySelectorAll("selection-simple");
		let selectionsRectangles = document.querySelectorAll("selection-rectangle");
		let selectionEditeur = document.querySelector("selection-editeur");

		selectionsSimples.forEach((selectionSimple) => {
			this._proprietaire.parentNode.appendChild(selectionSimple);
		});

		selectionsRectangles.forEach((selectionRectangle) => {
			this._proprietaire.parentNode.appendChild(selectionRectangle);
		});

		this._proprietaire.parentNode.appendChild(selectionEditeur);
		selectionEditeur.deselectionnerTout();

		// Suppression du sous-titre
		this._spanSousTitre.remove();

		this._editeur._planActif = this._proprietaire.parentNode;
	}
}
window.customElements.define("sous-plan-travail", SousPlanTravail);
