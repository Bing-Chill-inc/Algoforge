/**
 * Classe représentant une invitation pour ajouter une nouvelle bibliothèque.
 * @extends HTMLElement
 */
class InviteNouvelleBibliotheque extends HTMLElement {
	_editeur = document.querySelector("editeur-interface");
	_algoJSON; // String (JSON.stringify())
	inputNom = document.createElement("input");
	inputNomCourt = document.createElement("input");
	inputDescription = document.createElement("div");
	boutonAjouter = document.createElement("button");
	boutonCancel = document.createElement("button");
	errorMessage = document.createElement("p");

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

			// Enlever le tabindex des éléments pour que l'utilisateur ne puisse pas les sélectionner
			const elements = planTravail.querySelectorAll("*");
			elements.forEach((element) => {
				element.setAttribute("tabindex", "-1");
			});

			algoPreview.appendChild(planTravail);
		} catch (e) {
			console.error(e);
			let error = document.createElement("p");
			error.innerHTML = "Erreur lors de la prévisualisation";
			algoPreview.appendChild(error);
		}

		const title = document.createElement("h2");
		title.textContent = "Ajouter un nouvel algorithme dans la bibliothèque";

		// Ajout des placeholder
		this.inputNom.placeholder = "Nom complet de l'algorithme";
		this.inputNomCourt.placeholder = "Nom court de l'algorithme";
		this.inputDescription.setAttribute(
			"placeholder",
			"Description de l'algorithme",
		);

		const labelNom = document.createElement("label");
		labelNom.textContent = "Nom";
		labelNom.appendChild(this.inputNom);

		this.errorMessage.classList.add("errorMessage");
		this.errorMessage.style.display = "none";
		labelNom.appendChild(this.errorMessage);
		this.inputNom.addEventListener("input", () => {
			const nom = this.inputNom.value;
			if (!nom) {
				this.errorMessage.textContent = "Le nom est obligatoire.";
				this.inputNom.style.outline = "solid 1px var(--errorColor)";
				this.errorMessage.style.display = "block";
				return;
			} else {
				this.inputNom.style.outline = "none";
				this.errorMessage.style.display = "none";
				return;
			}
		});

		const labelNomCourt = document.createElement("label");
		labelNomCourt.textContent = "Nom court";
		labelNomCourt.appendChild(this.inputNomCourt);

		const labelDescription = document.createElement("label");
		labelDescription.textContent = "Description";
		this.inputDescription.contentEditable = true;
		labelDescription.appendChild(this.inputDescription);

		const actionButtons = document.createElement("div");
		actionButtons.classList.add("actionButtons");

		this.boutonAjouter.textContent = "Ajouter";
		this.boutonAjouter.classList.add("primaryButton");
		this.boutonAjouter.addEventListener("click", () => {
			this.ajouterBibliotheque();
		});

		this.boutonCancel.textContent = "Annuler";
		this.boutonCancel.classList.add("secondaryButton");
		this.boutonCancel.addEventListener("click", () => {
			this.remove();
		});

		actionButtons.appendChild(this.boutonAjouter);
		actionButtons.appendChild(this.boutonCancel);

		this.appendChild(title);
		this.appendChild(algoPreview);
		this.appendChild(labelNom);
		this.appendChild(labelNomCourt);
		this.appendChild(labelDescription);
		this.appendChild(actionButtons);
	}

	/**
	 * Ajoute une bibliothèque personnalisée à l'éditeur.
	 */
	ajouterBibliotheque() {
		const nom = this.inputNom.value;
		const nomCourt = this.inputNomCourt.value;
		const description = sanitizeHTML(this.inputDescription.innerHTML);
		const algo = this._algoJSON;

		if (!nom) {
			this.errorMessage.textContent = "Le nom est obligatoire.";
			this.inputNom.style.outline = "solid 1px var(--errorColor)";
			this.errorMessage.style.display = "block";
			return;
		}

		this._editeur._bibliotheque.ajouterAlgorithmeCustom(
			nom,
			algo,
			description,
			nomCourt,
		);

		this.remove();
	}
}

/**
 * Nettoie le contenu HTML en supprimant les balises <script> et leurs contenus.
 * @param {string} html - Le contenu HTML à nettoyer.
 * @returns {string} Le contenu HTML nettoyé.
 */
function sanitizeHTML(html) {
	const div = document.createElement("div");
	div.innerHTML = html;

	const scripts = div.getElementsByTagName("script");
	const scriptsArray = Array.from(scripts);
	scriptsArray.forEach((script) => script.remove());

	return div.innerHTML;
}

customElements.define(
	"invite-nouvelle-bibliotheque",
	InviteNouvelleBibliotheque,
);
