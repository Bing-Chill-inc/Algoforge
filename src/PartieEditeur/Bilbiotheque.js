class Bibliotheque extends HTMLElement {
	_estOuvert = false;
	_arborescence = null;

	constructor() {
		super();

		this.addEventListener("click", () => {
			this.ouvrir();
		});

		// Affichage de l'icone
		let iconeBibliotheque = document.createElement("img");
		iconeBibliotheque.src = "assets/BibliothèqueAlgo.svg";
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
				};

				algoElements.forEach((element) => {
					appliquerDecalage(element);
				});

				algorithmeElement.addEventListener("dragstart", (event) => {
					if (verbose) console.log(event);
					event.dataTransfer.setData("application/json", JSON.stringify(algoElements));
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
		let iconeBibliotheque = document.createElement("img");
		iconeBibliotheque.src = "assets/BibliothèqueAlgo.svg";
		this.appendChild(iconeBibliotheque);
		this._estOuvert = false;
	}
}
window.customElements.define("bibliotheque-algorithmique", Bibliotheque);
