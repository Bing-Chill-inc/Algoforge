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
	 * @param {string} nomCourt - Le nom court de l'algorithme.
	 */
	ajouterAlgorithmeCustom(nom, algo, descriptif, nomCourt) {
		this._arborescenceCustom.push({
			nom: nom,
			nomCourt: nomCourt,
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
		document.getElementById("biblio_wrapper").style.display = "initial";
		document.getElementById("boutonBiblio").classList.add("elementIsOpen");

		if (this._estOuvert) {
			return;
		}

		this.innerHTML = "";
		this.classList.add("ouvert");
		this._estOuvert = true;

		this._ajouterHeader();
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
	 * Ajoute le header à la bibliothèque.
	 * @private
	 */
	_ajouterHeader() {
		const header = document.createElement("div");
		header.classList.add("header");

		// Croix de fermeture
		const croixFermeture = document.createElement("span");
		croixFermeture.innerHTML = "⛌";
		croixFermeture.classList.add("fermetureBibliotheque");
		croixFermeture.addEventListener("click", (e) => {
			e.stopPropagation();
			this.fermer();
		});
		header.appendChild(croixFermeture);

		// Barre de recherche
		const searchDiv = document.createElement("div");
		searchDiv.classList.add("searchBibliotheque");

		const searchButton = document.createElement("div");
		searchButton.classList.add("searchButtonBibliotheque");
		searchButton.innerHTML =
			'<svg id="searchButtonSVGBibliotheque" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" ><path d="M 20.5 6 C 12.509634 6 6 12.50964 6 20.5 C 6 28.49036 12.509634 35 20.5 35 C 23.956359 35 27.133709 33.779044 29.628906 31.75 L 39.439453 41.560547 A 1.50015 1.50015 0 1 0 41.560547 39.439453 L 31.75 29.628906 C 33.779044 27.133709 35 23.956357 35 20.5 C 35 12.50964 28.490366 6 20.5 6 z M 20.5 9 C 26.869047 9 32 14.130957 32 20.5 C 32 23.602612 30.776198 26.405717 28.791016 28.470703 A 1.50015 1.50015 0 0 0 28.470703 28.791016 C 26.405717 30.776199 23.602614 32 20.5 32 C 14.130953 32 9 26.869043 9 20.5 C 9 14.130957 14.130953 9 20.5 9 z"/></svg>';
		searchDiv.appendChild(searchButton);

		const searchInput = document.createElement("input");
		searchInput.type = "text";
		searchInput.classList.add("searchTermBibliotheque");
		searchInput.placeholder = "Chercher un algorithme...";
		searchDiv.appendChild(searchInput);

		const clearButton = document.createElement("span");
		clearButton.innerHTML = "×";
		clearButton.classList.add("clearButtonSearchBibliotheque");
		clearButton.style.display = "none";
		clearButton.addEventListener("click", () => {
			searchInput.value = "";
			clearButton.style.display = "none";
			this.rechercher("");
		});
		searchDiv.appendChild(clearButton);

		searchInput.addEventListener("input", () => {
			clearButton.style.display = searchInput.value ? "inline" : "none";
			this.rechercher(searchInput.value);
		});

		header.appendChild(searchDiv);
		this.appendChild(header);
	}

	/**
	 * Recherche dans la liste des catégories et des algorithmes.
	 * @param {string} terme - Le terme de recherche.
	 */
	rechercher(terme) {
		const categories = this.querySelectorAll(".categorie");
		const termesRecherche = terme.toLowerCase().split(" ");

		if (terme === "") {
			categories.forEach((categorie) => {
				categorie.classList.remove("ouvert");
				const algorithmes = categorie.querySelectorAll(
					".algorithmeBibliotheque",
				);
				algorithmes.forEach((algorithme) => {
					algorithme.classList.remove(
						"highlightAlgorithmeBibliotheque",
					);
				});
			});
			return;
		}

		categories.forEach((categorie) => {
			const algorithmes = categorie.querySelectorAll(
				".algorithmeBibliotheque",
			);
			let categorieVisible = false;

			algorithmes.forEach((algorithme) => {
				const description = algorithme.description.toLowerCase();
				const nomCourt = algorithme.nomCourt
					? algorithme.nomCourt.toLowerCase()
					: "";
				const nom = algorithme.nom ? algorithme.nom.toLowerCase() : "";

				const match = termesRecherche.every(
					(terme) =>
						description.includes(terme) ||
						nomCourt.includes(terme) ||
						nom.includes(terme),
				);

				if (match) {
					algorithme.classList.add("highlightAlgorithmeBibliotheque");
					categorieVisible = true;
				} else {
					algorithme.classList.remove(
						"highlightAlgorithmeBibliotheque",
					);
				}
			});

			if (categorieVisible) {
				categorie.classList.add("ouvert");
			} else {
				categorie.classList.remove("ouvert");
			}
		});
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
		flecheOuverture.innerHTML = "›";
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
		algorithmeElement.nom = algorithme.nom;
		algorithmeElement.nomCourt = algorithme.nomCourt;
		algorithmeElement.preview = this._creerPreview(algorithme);

		if (algorithme.nomCourt)
			algorithmeElement.innerText = algorithme.nomCourt;
		else algorithmeElement.innerText = algorithme.nom;

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
			planTravail.classList.add("previewPlanTravail");
			planTravail.chargerDepuisJSON(JSON.parse(algorithme.algo), false);
			const tailles = planTravail.getCoordMinEtMax();
			if (verbose) console.log(tailles);

			tailles.coordMax.x += 2;
			tailles.coordMax.y += 2;
			tailles.coordMin.x -= 2;
			tailles.coordMin.y -= 2;

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
		let previewTimeout;

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
			clearTimeout(previewTimeout);
			this.appendChild(algorithmeElement.preview);
		});

		algorithmeElement.addEventListener("mouseleave", (event) => {
			if (verbose) console.log(event);
			previewTimeout = setTimeout(() => {
				if (!algorithmeElement.preview.matches(":hover")) {
					if (algorithmeElement.preview.parentNode) {
						algorithmeElement.preview.parentNode.removeChild(
							algorithmeElement.preview,
						);
					}
				}
			}, 300);
		});

		algorithmeElement.preview.addEventListener("mouseenter", () => {
			clearTimeout(previewTimeout);
		});

		algorithmeElement.preview.addEventListener("mouseleave", () => {
			previewTimeout = setTimeout(() => {
				if (!algorithmeElement.matches(":hover")) {
					if (algorithmeElement.preview.parentNode) {
						algorithmeElement.preview.parentNode.removeChild(
							algorithmeElement.preview,
						);
					}
				}
			}, 300);
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
		const algorithmeElement = document.createElement("div");
		algorithmeElement.estCustom = true;
		algorithmeElement.classList.add("algorithmeBibliotheque");
		algorithmeElement.setAttribute("draggable", "true");
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
		algorithmeElement.contenu = algorithme.algo;
		algorithmeElement.description = algorithme.descriptif;
		algorithmeElement.nom = algorithme.nom;
		algorithmeElement.nomCourt = algorithme.nomCourt;
		algorithmeElement.preview = this._creerPreview(algorithme);

		if (algorithme.nomCourt)
			algorithmeElement.innerText = algorithme.nomCourt;
		else algorithmeElement.innerText = algorithme.nom;

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
