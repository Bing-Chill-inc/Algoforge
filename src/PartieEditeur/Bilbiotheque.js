class Bibliotheque extends HTMLElement {
	_estOuvert = false;
	_arborescence = null;

	constructor() {
		super();

		this.addEventListener("click", () => {
			this.ouvrir();
		});

		// Affichage de l'icone
		let iconeBibliotheque = document.createElement("div");
		iconeBibliotheque.classList.add("img");
		this.appendChild(iconeBibliotheque);
		this._estOuvert = false;

		// Construire le contenu de la bibliothèque
		// On commence par récupérer la structure de la bibliothèque
		fetch("Bibliotheque/getStructure.php")
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
				console.error("There has been a problem with your fetch operation:", error);
			});
	}

	ouvrir() {
		if (this._estOuvert) {
			return;
		}

		// Supprimer tout le contenu
		this.innerHTML = "";

		// Ouvrir la bibliothèque
		this.classList.add("ouvert");

		// Ajout de la flèche de fermeture
		let flecheFermeture = document.createElement("span");
		flecheFermeture.innerHTML = "←";
		flecheFermeture.classList.add("fermeture");
		flecheFermeture.addEventListener("click", (e) => {
			e.stopPropagation();
			this.fermer();
		});
		this.appendChild(flecheFermeture);
		this._estOuvert = true;

		if (verbose) {
			console.log("Ouverture de la bibliothèque");
			console.log(this._arborescence);
		}

		/* Construire l'affichage à partir d'un fichier JSON du type :
            [
                {
                    nom: "LeNomDeLaCatégorie",
                    contenu: [
                        {
                            nom: "LeNomDeLAlgorithme",
                            description: "Une description de l'algorithme",
                            algo: "Le JSON de l'algorithme"
                        },
                        ...
                    ]
                },
                ...
            ]
        */

		// Création de la liste des catégories
		let listeCategories = document.createElement("div");
		listeCategories.classList.add("listeCategories");
		this.appendChild(listeCategories);

		// Pour chaque catégorie
		for (let categorie of this._arborescence) {
			// Création de la catégorie
			let categorieElement = document.createElement("div");
			categorieElement.classList.add("categorie");
			let titreCategorie = document.createElement("h3");
			titreCategorie.addEventListener("click", (e) => {
				e.stopPropagation();
				categorieElement.classList.toggle("ouvert");
			});
			titreCategorie.innerHTML = categorie.nom;
			categorieElement.appendChild(titreCategorie);
			// Ajout d'une petite flèche pour indiquer que la catégorie est ouverte
			let flecheOuverture = document.createElement("div");
			flecheOuverture.innerHTML = "▼";
			flecheOuverture.classList.add("flecheOuverture");
			titreCategorie.appendChild(flecheOuverture);
			listeCategories.appendChild(categorieElement);

			// Création de la liste des algorithmes
			let listeAlgorithmes = document.createElement("div");
			listeAlgorithmes.classList.add("listeAlgorithmes");
			categorieElement.appendChild(listeAlgorithmes);

			// Pour chaque algorithme
			for (let algorithme of categorie.contenu) {
				// Création de l'algorithme
				let algorithmeElement = document.createElement("img");
				algorithmeElement.classList.add("algorithmeBibliotheque");
				algorithmeElement.title = algorithme.nom;
				algorithmeElement.contenu = algorithme.algo;
				algorithmeElement.description = algorithme.descriptif;
				algorithmeElement.preview = document.createElement("div");
				// Paramétrage de la prévisualisation
				let divTransparent = document.createElement("div"); // Pour empêcher l'utilisateur d'intéragir avec le plan de travail miniature
				divTransparent.classList.add("divTransparent");
				algorithmeElement.preview.appendChild(divTransparent);

				algorithmeElement.preview.classList.add("previewAlgo");
				try {
					let planTravail = new PlanTravail();
					planTravail.chargerDepuisJSON(JSON.parse(algorithme.algo));
					let tailles = planTravail.getCoordMinEtMax();
					if (verbose) console.log(tailles);
					// À partir des tailles, on peut déterminer la taille de la prévisualisation, et ainsi calculer le zoom à appliquer
					let largeur = tailles.coordMax.x - tailles.coordMin.x;
					let hauteur = tailles.coordMax.y - tailles.coordMin.y;
					// La largeur et la hauteur multipliés par le zoom doivent être inférieurs à 25vw et 15vw respectivement
					let zoom = Math.min(25 / largeur, 15 / hauteur);

					// Tout déplacer pour que ce soit alligné avec le coin en haut à gauche
					planTravail.toutDeplacer(-tailles.coordMin.x, -tailles.coordMin.y);

					planTravail.style.setProperty("--sizeModifier", zoom);
					if (verbose) console.log(`zoom = ${zoom}`);
					algorithmeElement.preview.appendChild(planTravail);
				} catch (e) {
					console.error(e);
					let error = document.createElement("p");
					error.innerHTML = "Erreur lors de la prévisualisation";
					algorithmeElement.preview.appendChild(error);
				}
				// Pour des tests de prévisualisation
				// if (algorithme.nom == "Décomposition en 2 sous-problèmes") {
				// 	this.appendChild(algorithmeElement.preview);
				// }
				let titreAlgo = document.createElement("h4");
				titreAlgo.innerHTML = algorithme.nom;
				algorithmeElement.preview.appendChild(titreAlgo);
				let descriptionAlgo = document.createElement("p");
				descriptionAlgo.innerHTML = algorithmeElement.description;
				algorithmeElement.preview.appendChild(descriptionAlgo);
				algorithmeElement.src = `Bibliotheque/${algorithme.path}/icone.svg`;

				// Appliquer une fonction pour transformer l'algorithme en relatif
				let algoElements = JSON.parse(algorithme.algo);

				// Trouver les coordonnées du problème le plus haut
				let minY = Infinity;
				let coordCentreElement = { x: 0, y: 0 };
				for (let element of algoElements) {
					if (parseFloat(element.ordonnee) < minY) {
						minY = parseFloat(element.ordonnee);
						coordCentreElement.x = parseFloat(element.abscisse);
						coordCentreElement.y = parseFloat(element.ordonnee);
					}
				}

				// On retire 15 à l'abscisse pour centre le problème principal (du coup on ajoute ici 15 pour que ça retire 15 plus tard)
				coordCentreElement.x += 15;

				const appliquerDecalage = (element) => {
					element.abscisse = parseFloat(element.abscisse) - coordCentreElement.x + "vw";
					element.ordonnee = parseFloat(element.ordonnee) - coordCentreElement.y + "vw";

					if (element.enfants) {
						element.enfants.forEach((enfant) => {
							appliquerDecalage(enfant);
						});
					}

					if (element.typeElement == "StructureSi" || element.typeElement == "StructureIterative") {
						for (let condition of element.conditions) {
							condition.enfants.forEach((enfant) => {
								appliquerDecalage(enfant);
							});
						}
					}
				};

				if (verbose) console.log("- - - - - - - - - - - -");
				if (verbose) console.log(algoElements);
				algoElements.forEach((element) => {
					appliquerDecalage(element);
				});
				if (verbose) console.log(algoElements);

				algorithmeElement.addEventListener("dragstart", (event) => {
					if (verbose) console.log(event);
					event.dataTransfer.setData("application/json", JSON.stringify(algoElements));
					this.removeChild(algorithmeElement.preview);
				});

				algorithmeElement.addEventListener("mouseenter", (event) => {
					if (verbose) console.log(event);
					// Afficher la description et le contenu
					this.appendChild(algorithmeElement.preview);
				});

				algorithmeElement.addEventListener("mouseleave", (event) => {
					if (verbose) console.log(event);
					// Cacher la description et le contenu
					if (algorithmeElement.preview.parentNode)
						algorithmeElement.preview.parentNode.removeChild(algorithmeElement.preview);
				});
				listeAlgorithmes.appendChild(algorithmeElement);
			}
		}
	}

	fermer() {
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
}
window.customElements.define("bibliotheque-algorithmique", Bibliotheque);
