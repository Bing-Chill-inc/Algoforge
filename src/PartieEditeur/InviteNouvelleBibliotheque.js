/**
 * Classe représentant une invitation pour ajouter une nouvelle bibliothèque.
 * @extends HTMLElement
 */
class InviteNouvelleBibliotheque extends HTMLElement {
	_editeur = document.querySelector("editeur-interface"); // Editeur
	_algoJSON; // String (JSON.stringify())
	inputNom = document.createElement("input");
	inputDescription = document.createElement("input");
	boutonAjouter = document.createElement("button");
	boutonCancel = document.createElement("button");

	/**
	 * Crée une instance de InviteNouvelleBibliotheque.
	 * @param {string} algoJSON - Le JSON de l'algorithme.
	 */
	constructor(algoJSON) {
		super();
		this._algoJSON = algoJSON;

		let algoPreview = document.createElement("div");
		// Paramétrage de la prévisualisation
		let divTransparent = document.createElement("div"); // Pour empêcher l'utilisateur d'intéragir avec le plan de travail miniature
		divTransparent.classList.add("divTransparent");
		algoPreview.appendChild(divTransparent);

		algoPreview.classList.add("previewAlgo");
		try {
			let planTravail = new PlanTravail();
			planTravail.chargerDepuisJSON(JSON.parse(algoJSON), false);
			let tailles = planTravail.getCoordMinEtMax();
			if (verbose) console.log(tailles);
			// À partir des tailles, on peut déterminer la taille de la prévisualisation, et ainsi calculer le zoom à appliquer
			let largeur = tailles.coordMax.x - tailles.coordMin.x;
			let hauteur = tailles.coordMax.y - tailles.coordMin.y;
			planTravail.toutDeplacer(-tailles.coordMin.x, -tailles.coordMin.y);

			// Compenser la taille avec un scale() pour obtenir du 25vw et 15vw
			let scale = Math.min(25 / largeur, 15 / hauteur);
			planTravail.style.setProperty("--sizeModifier", scale);
			//planTravail.style.transform = `scale(${scale})`;

			algoPreview.appendChild(planTravail);
		} catch (e) {
			console.error(e);
			let error = document.createElement("p");
			error.innerHTML = "Erreur lors de la prévisualisation";
			algoPreview.appendChild(error);
		}
		this.appendChild(algoPreview);
		this.appendChild(this.inputNom);
		this.appendChild(this.inputDescription);
		this.appendChild(this.boutonAjouter);
		this.appendChild(this.boutonCancel);

		this.inputNom.placeholder = "Nom de la bibliothèque";
		this.inputDescription.placeholder = "Description de la bibliothèque";
		this.boutonAjouter.textContent = "Ajouter";
		this.boutonAjouter.addEventListener("click", () => {
			this.ajouterBibliotheque();
		});

		this.boutonCancel.textContent = "Annuler";
		this.boutonCancel.addEventListener("click", () => {
			this.remove();
		});
	}

	/**
	 * Ajoute une bibliothèque personnalisée à l'éditeur.
	 */
	ajouterBibliotheque() {
		const nom = this.inputNom.value;
		const description = this.inputDescription.value;
		const algo = this._algoJSON;

		this._editeur._bibliotheque.ajouterAlgorithmeCustom(
			nom,
			algo,
			description,
		);

		this.remove();
	}
}
customElements.define(
	"invite-nouvelle-bibliotheque",
	InviteNouvelleBibliotheque,
);
