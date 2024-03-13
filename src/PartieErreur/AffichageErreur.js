class AffichageErreur extends HTMLElement {
	_boutton;
	_listeErreur;
	_courant;
	_divErreur;
	_imageTest;
	_messagesAnomalies;
	constructor() {
		super();
		this.afficherBoutton();
		fetch("messageAnomalie.json")
			.then((response) => {
				if (!response.ok) {
					// If the server response is not OK, throw an error
					throw new Error("Network response was not ok");
				}
				return response.json(); // Parse the JSON from the response
			})
			.then((data) => {
				this._messagesAnomalies = data.anomalies;
			})
			.catch((error) => {
				console.error("There has been a problem with your fetch operation:", error);
			});
	}

	afficherBoutton() {
		this._imageTest = document.createElement("div");

		// Ajouter l'attribut src
		this._imageTest.classList.add("img");

		// Ajouter l'attribut alt
		this._imageTest.alt = "Rechercher anomalie(s)";

		// Ajouter l'attribut id
		this._imageTest.id = "RechercheAnomalie";
		this._imageTest.addEventListener("click", () => {
			if (this._divErreur) {
				this.supprimerDivErreur();
			} else {
				this._listeErreur = document.querySelector("plan-travail").rechercherAnomalies();
				this.creerDivErreur();
			}
		});
		this.appendChild(this._imageTest);
		/*// Création du bouton
        this._boutton = document.createElement('button');
        this._boutton.textContent = 'Afficher Erreur';
        
        // Ajout d'un écouteur d'événements au bouton
        this._boutton.addEventListener('click', () => {
            if (this._divErreur) {
                this.supprimerDivErreur();
            }else {
                this._listeErreur = document.querySelector("plan-travail").rechercherAnomalies();
                this.creerDivErreur();
            }

        });
        
        // Ajout du bouton à l'élément affichage-erreur-element
        this.appendChild(this._boutton);*/
	}

	creerDivErreur() {
		//Initialisation courant a 0
		this._courant = 0;
		// Création de la div pour afficher l'erreur
		this._divErreur = document.createElement("div");
		this._divErreur.classList.add("erreur-container");

		// Création de l'élément p pour afficher le texte d'erreur
		const texteErreur = document.createElement("p");
		texteErreur.classList.add("texte-erreur");
		texteErreur.textContent = "Erreur: Ceci est un exemple d'erreur.";

		let divFLeches = document.createElement("div");
		divFLeches.classList.add("fleches");

		// Création de la flèche gauche pour parcourir la liste des erreurs
		const flecheGauche = document.createElement("span");
		flecheGauche.textContent = "← ";
		flecheGauche.classList.add("fleche");

		// Ajout d'un écouteur d'événements à la flèche
		flecheGauche.addEventListener("click", () => {
			// Action à effectuer lors du clic sur la flèche
			this._courant--;
			if (this._courant < 0) {
				this._courant = 0;
			}
			this.afficherSelectionErreur();
		});

		//Ajout d'un texte pour afficher le numéro d'erreur ex: 1/5
		const texteNumero = document.createElement("p");
		texteNumero.classList.add("numero-erreur");

		// Création de la flèche droite pour parcourir la liste des erreurs
		const flecheDroite = document.createElement("span");
		flecheDroite.textContent = "→  ";
		flecheDroite.classList.add("fleche");

		// Ajout d'un écouteur d'événements à la flèche
		flecheDroite.addEventListener("click", () => {
			this._courant++;
			if (this._courant >= this._listeErreur.length) {
				this._courant = this._listeErreur.length - 1;
			}
			this.afficherSelectionErreur();
		});

		// Création du bouton pour supprimer la div d'erreur
		const bouttonSupprimer = document.createElement("button");
		bouttonSupprimer.textContent = "Fermer";
		bouttonSupprimer.classList.add("boutton-supprimer");
		bouttonSupprimer.addEventListener("click", () => {
			this.supprimerDivErreur();
		});

		// Ajout du texte, de la flèche et du bouton supprimer à la div d'erreur
		this._divErreur.appendChild(texteErreur);
		this._divErreur.appendChild(document.createElement("br"));
		this._divErreur.appendChild(divFLeches);
		divFLeches.appendChild(flecheGauche);
		divFLeches.appendChild(texteNumero);
		divFLeches.appendChild(flecheDroite);
		this._divErreur.appendChild(bouttonSupprimer);
		// Ajout de la div d'erreur à l'élément affichage-erreur-element
		this.appendChild(this._divErreur);
		this.afficherSelectionErreur();
	}

	afficherSelectionErreur() {
		if (!this._listeErreur) {
			this.querySelector(".texte-erreur").textContent = "Aucune anomalie détectée";
			this.querySelector(".numero-erreur").textContent = "(0/0)";
		} else if (this._listeErreur.length == 0) {
			this.querySelector(".texte-erreur").textContent = "Aucune anomalie détectée";
			this.querySelector(".numero-erreur").textContent = "(0/0)";
		} else {
			this.querySelector(".texte-erreur").textContent = this._listeErreur[this._courant].toString(this);
			this.querySelector(".numero-erreur").textContent =
				"(" + (this._courant + 1) + "/" + this._listeErreur.length + ")";
		}	
	}

	supprimerDivErreur() {
		if (this._divErreur) {
			this.removeChild(this._divErreur);
			this._divErreur = null;
		}
	}

	getDescriptionAnomalie(typeAnomalie, id) {
		if (this._messagesAnomalies) {
			let anomalie = null;
			switch (typeAnomalie) {
				case "AvertissementConceptuel":
					anomalie = this._messagesAnomalies.avertissements.find(avertissement => avertissement.id == id);
					break;
			
				case "ErreurConceptuelle":
					anomalie = this._messagesAnomalies.erreurs.find(erreur => erreur.id == id);
					break;
			}
			console.log("tkt")
			console.log(anomalie);
			return anomalie ? anomalie.description : "Aucune description disponible pour cette anomalie.";
		} else {
			return "Le fichier de description des anomalies n'a pas été chargé. Veuillez réessayer plus tard.";
		}
	
	}
}

window.customElements.define("affichage-erreur-element", AffichageErreur);
