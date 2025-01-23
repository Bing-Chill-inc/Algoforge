/**
 * Classe représentant une bibliothèque d'algorithmes.
 * @extends HTMLElement
 */
class Bibliotheque extends HTMLElement {
	_estOuvert = false;
	_arborescence = null;
	_arborescenceCustom = [];
	_editeur = document.querySelector("editeur-interface"); // Editeur

	/**
	 * Crée une instance de Bibliotheque.
	 */
	constructor() {
		super();

		const biblioButton = document.getElementById("biblio_btn");

		biblioButton.addEventListener("click", () => {
			if (this._estOuvert) this.fermer();
			else this.ouvrir();
		});

		if (isExam) {
			biblioButton.parentNode.removeChild(biblioButton);
		}

		// Affichage de l'icone
		let iconeBibliotheque = document.createElement("div");
		iconeBibliotheque.classList.add("img");
		this.appendChild(iconeBibliotheque);
		this._estOuvert = false;

		// Construire le contenu de la bibliothèque
		// On commence par récupérer la structure de la bibliothèque
		fetch("Bibliotheque/getStructure")
			.then((response) => {
				if (!response.ok) {
					// If the server response is not OK, throw an error
					throw new Error("Network response was not ok");
				}
				return response.json(); // Parse the JSON from the response
			})
			.then((data) => {
				// Handle the parsed JSON data
				if (verbose) console.log(data);
				this._arborescence = data;
				// For example, use data.name and data.email here
			})
			.catch((error) => {
				// Handle any errors that occurred during the fetch
				console.error(
					"There has been a problem with your fetch operation:",
					error,
				);
			});

		// On récupère aussi les éléments personnalisés dans le cookie
		if (this._editeur.getCookie("elementsPersonnalises"))
			this._arborescenceCustom = JSON.parse(
				this._editeur.getCookie("elementsPersonnalises"),
			);
	}

	/**
	 * Ajoute un algorithme personnalisé à la bibliothèque.
	 * @param {string} nom - Le nom de l'algorithme.
	 * @param {string} algo - Le JSON de l'algorithme.
	 * @param {string} descriptif - La description de l'algorithme.
	 */
	ajouterAlgorithmeCustom(nom, algo, descriptif) {
		this._arborescenceCustom.push({
			nom: nom,
			algo: algo,
			descriptif: descriptif,
		});
		this._editeur.setCookie(
			"elementsPersonnalises",
			JSON.stringify(this._arborescenceCustom),
			365,
		);
		this.update();
	}

	/**
	 * Ouvre la bibliothèque.
	 */
	ouvrir() {
		document.querySelector("dictionnaire-donnee").fermer();
		document.getElementById("biblio_wrapper").style.zIndex = 40;
		document.getElementById("boutonBiblio").classList.add("elementIsOpen");

		if (this._estOuvert) {
			return;
		}

		this.innerHTML = "";
		this.classList.add("ouvert");
		this._estOuvert = true;

		this._ajouterCroixFermeture();
		if (verbose) {
			console.log("Ouverture de la bibliothèque");
			console.log(this._arborescence);
		}

		const listeCategories = this._creerListeCategories();
		this.appendChild(listeCategories);

		this._arborescence.forEach((categorie) => {
			const categorieElement = this._creerCategorieElement(categorie);
			listeCategories.appendChild(categorieElement);
		});

		if (this._arborescenceCustom.length > 0) {
			const categorieElement = this._creerCategoriePersonnalisee();
			listeCategories.appendChild(categorieElement);
		}
	}

	/**
	 * Ajoute une croix de fermeture à la bibliothèque.
	 * @private
	 */
	_ajouterCroixFermeture() {
		const croixFermeture = document.createElement("span");
		croixFermeture.innerHTML = "X";
		croixFermeture.classList.add("fermeture");
		croixFermeture.addEventListener("click", (e) => {
			e.stopPropagation();
			this.fermer();
		});
		this.appendChild(croixFermeture);
	}

	/**
	 * Crée la liste des catégories.
	 * @returns {HTMLElement} La liste des catégories.
	 * @private
	 */
	_creerListeCategories() {
		const listeCategories = document.createElement("div");
		listeCategories.classList.add("listeCategories");
		return listeCategories;
	}

	/**
	 * Crée un élément de catégorie.
	 * @param {Object} categorie - La catégorie à créer.
	 * @returns {HTMLElement} L'élément de catégorie.
	 * @private
	 */
	_creerCategorieElement(categorie) {
		const categorieElement = document.createElement("div");
		categorieElement.classList.add("categorie");

		const titreCategorie = this._creerTitreCategorie(categorie.nom);
		categorieElement.appendChild(titreCategorie);

		const listeAlgorithmes = this._creerListeAlgorithmes(categorie.contenu);
		categorieElement.appendChild(listeAlgorithmes);

		return categorieElement;
	}

	/**
	 * Crée le titre d'une catégorie.
	 * @param {string} nom - Le nom de la catégorie.
	 * @returns {HTMLElement} Le titre de la catégorie.
	 * @private
	 */
	_creerTitreCategorie(nom) {
		const titreCategorie = document.createElement("h3");
		titreCategorie.addEventListener("click", (e) => {
			e.stopPropagation();
			titreCategorie.parentElement.classList.toggle("ouvert");
		});
		titreCategorie.innerHTML = nom;

		const flecheOuverture = document.createElement("div");
		flecheOuverture.innerHTML = "▼";
		flecheOuverture.classList.add("flecheOuverture");
		titreCategorie.appendChild(flecheOuverture);

		return titreCategorie;
	}

	/**
	 * Crée la liste des algorithmes.
	 * @param {Array} contenu - Le contenu de la catégorie.
	 * @returns {HTMLElement} La liste des algorithmes.
	 * @private
	 */
	_creerListeAlgorithmes(contenu) {
		const listeAlgorithmes = document.createElement("div");
		listeAlgorithmes.classList.add("listeAlgorithmes");

		contenu.forEach((algorithme) => {
			const algorithmeElement = this._creerAlgorithmeElement(algorithme);
			listeAlgorithmes.appendChild(algorithmeElement);
		});

		return listeAlgorithmes;
	}

	/**
	 * Crée un élément d'algorithme.
	 * @param {Object} algorithme - L'algorithme à créer.
	 * @returns {HTMLElement} L'élément d'algorithme.
	 * @private
	 */
	_creerAlgorithmeElement(algorithme) {
		const algorithmeElement = document.createElement("div");
		algorithmeElement.classList.add("algorithmeBibliotheque");
		algorithmeElement.setAttribute("draggable", "true");
		algorithmeElement.contenu = algorithme.algo;
		algorithmeElement.description = algorithme.descriptif;
		algorithmeElement.preview = this._creerPreview(algorithme);

		algorithmeElement.innerText = algorithme.nom;

		const algoElements = this._transformerAlgorithmeEnRelatif(
			algorithme.algo,
		);

		this._ajouterEvenementsAlgorithme(algorithmeElement, algoElements);

		return algorithmeElement;
	}

	/**
	 * Crée une prévisualisation d'un algorithme.
	 * @param {Object} algorithme - L'algorithme à prévisualiser.
	 * @returns {HTMLElement} La prévisualisation de l'algorithme.
	 * @private
	 */
	_creerPreview(algorithme) {
		const preview = document.createElement("div");
		preview.classList.add("previewAlgo");

		const divTransparent = document.createElement("div");
		divTransparent.classList.add("divTransparent");
		preview.appendChild(divTransparent);

		try {
			const planTravail = new PlanTravail();
			planTravail.chargerDepuisJSON(JSON.parse(algorithme.algo), false);
			const tailles = planTravail.getCoordMinEtMax();
			if (verbose) console.log(tailles);

			const largeur = tailles.coordMax.x - tailles.coordMin.x;
			const hauteur = tailles.coordMax.y - tailles.coordMin.y;
			if (verbose)
				console.log(
					`nom = ${algorithme.nom},largeur = ${largeur}, hauteur = ${hauteur}`,
				);

			planTravail.toutDeplacer(-tailles.coordMin.x, -tailles.coordMin.y);
			const scale = Math.min(25 / largeur, 15 / hauteur);
			planTravail.style.setProperty("--sizeModifier", scale);

			preview.appendChild(planTravail);
		} catch (e) {
			console.error(e);
			const error = document.createElement("p");
			error.innerHTML = "Erreur lors de la prévisualisation";
			preview.appendChild(error);
		}

		const titreAlgo = document.createElement("h4");
		titreAlgo.innerHTML = algorithme.nom;
		preview.appendChild(titreAlgo);

		const descriptionAlgo = document.createElement("p");
		descriptionAlgo.innerHTML = algorithme.descriptif;
		preview.appendChild(descriptionAlgo);

		return preview;
	}

	/**
	 * Transforme les coordonnées d'un algorithme en coordonnées relatives.
	 * @param {string} algo - L'algorithme en format JSON.
	 * @returns {Array} Les éléments de l'algorithme avec des coordonnées relatives.
	 * @private
	 */
	_transformerAlgorithmeEnRelatif(algo) {
		const algoElements = JSON.parse(algo);

		let minY = Infinity;
		let coordCentreElement = { x: 0, y: 0 };
		algoElements.forEach((element) => {
			if (parseFloat(element.ordonnee) < minY) {
				minY = parseFloat(element.ordonnee);
				coordCentreElement.x = parseFloat(element.abscisse);
				coordCentreElement.y = parseFloat(element.ordonnee);
			}
		});

		coordCentreElement.x += 15;

		const appliquerDecalage = (element) => {
			element.abscisse =
				parseFloat(element.abscisse) - coordCentreElement.x + "vw";
			element.ordonnee =
				parseFloat(element.ordonnee) - coordCentreElement.y + "vw";

			if (element.enfants) {
				element.enfants.forEach((enfant) => appliquerDecalage(enfant));
			}

			if (
				element.typeElement == "StructureSi" ||
				element.typeElement == "StructureIterative"
			) {
				element.conditions.forEach((condition) => {
					condition.enfants.forEach((enfant) =>
						appliquerDecalage(enfant),
					);
				});
			}
		};

		algoElements.forEach((element) => appliquerDecalage(element));

		return algoElements;
	}

	/**
	 * Ajoute des événements à un élément d'algorithme.
	 * @param {HTMLElement} algorithmeElement - L'élément d'algorithme.
	 * @param {Array} algoElements - Les éléments de l'algorithme.
	 * @private
	 */
	_ajouterEvenementsAlgorithme(algorithmeElement, algoElements) {
		algorithmeElement.addEventListener("dragstart", (event) => {
			if (verbose) console.log(event);
			event.dataTransfer.setData(
				"application/json",
				JSON.stringify(algoElements),
			);
			this.removeChild(algorithmeElement.preview);
			this.style.opacity = 0.2;
		});

		algorithmeElement.addEventListener("dragend", (event) => {
			if (verbose) console.log(event);
			this.style.opacity = 1;
		});

		algorithmeElement.addEventListener("mouseenter", (event) => {
			if (verbose) console.log(event);
			this.appendChild(algorithmeElement.preview);
		});

		algorithmeElement.addEventListener("mouseleave", (event) => {
			if (verbose) console.log(event);
			if (algorithmeElement.preview.parentNode) {
				algorithmeElement.preview.parentNode.removeChild(
					algorithmeElement.preview,
				);
			}
		});
	}

	/**
	 * Crée une catégorie personnalisée.
	 * @returns {HTMLElement} L'élément de catégorie personnalisée.
	 * @private
	 */
	_creerCategoriePersonnalisee() {
		const categorieElement = document.createElement("div");
		categorieElement.classList.add("categorie");

		const titreCategorie = this._creerTitreCategorie("Personnalisés");
		categorieElement.appendChild(titreCategorie);

		const listeAlgorithmes = this._creerListeAlgorithmesPersonnalises();
		categorieElement.appendChild(listeAlgorithmes);

		return categorieElement;
	}

	/**
	 * Crée la liste des algorithmes personnalisés.
	 * @returns {HTMLElement} La liste des algorithmes personnalisés.
	 * @private
	 */
	_creerListeAlgorithmesPersonnalises() {
		const listeAlgorithmes = document.createElement("div");
		listeAlgorithmes.classList.add("listeAlgorithmes");

		this._arborescenceCustom.forEach((algorithme) => {
			const algorithmeElement =
				this._creerAlgorithmeElementPersonnalise(algorithme);
			listeAlgorithmes.appendChild(algorithmeElement);
		});

		return listeAlgorithmes;
	}

	/**
	 * Crée un élément d'algorithme personnalisé.
	 * @param {Object} algorithme - L'algorithme personnalisé à créer.
	 * @returns {HTMLElement} L'élément d'algorithme personnalisé.
	 * @private
	 */
	_creerAlgorithmeElementPersonnalise(algorithme) {
		const algorithmeElement = document.createElement("img");
		algorithmeElement.estCustom = true;
		algorithmeElement.supprimer = () => {
			this._arborescenceCustom.splice(
				this._arborescenceCustom.indexOf(algorithme),
				1,
			);
			this._editeur.setCookie(
				"elementsPersonnalises",
				JSON.stringify(this._arborescenceCustom),
				365,
			);
			this.update();
		};
		algorithmeElement.classList.add("algorithmeBibliotheque");
		algorithmeElement.title = "";
		algorithmeElement.contenu = algorithme.algo;
		algorithmeElement.description = algorithme.descriptif;
		algorithmeElement.preview = this._creerPreview(algorithme);

		algorithmeElement.src = `assetsDynamiques/bibliocustom.svg?fgColor=${document.body.style.getPropertyValue("--fgColor").substring(1)}&nom=${algorithme.nom}`;

		const algoElements = this._transformerAlgorithmeEnRelatif(
			algorithme.algo,
		);

		this._ajouterEvenementsAlgorithme(algorithmeElement, algoElements);

		return algorithmeElement;
	}
	/**
	 * Ferme la bibliothèque.
	 */
	fermer() {
		document.getElementById("biblio_wrapper").style.zIndex = -300;
		document
			.getElementById("boutonBiblio")
			.classList.remove("elementIsOpen");

		// document.getElementById("dico_btn").removeAttribute("disabled");
		if (!this._estOuvert) {
			return;
		}

		// Supprimer tout le contenu
		this.innerHTML = "";

		// Fermer la bibliothèque
		this.classList.remove("ouvert");
		this._estOuvert = false;

		// Affichage de l'icone
		let iconeBibliotheque = document.createElement("div");
		iconeBibliotheque.classList.add("img");
		this.appendChild(iconeBibliotheque);
		this._estOuvert = false;
	}

	/**
	 * Met à jour l'affichage de la bibliothèque.
	 */
	update() {
		// Mettre à jour l'affichage
		if (this._estOuvert) {
			this.fermer();
			this.ouvrir();
		}
	}
}
window.customElements.define("bibliotheque-algorithmique", Bibliotheque);
