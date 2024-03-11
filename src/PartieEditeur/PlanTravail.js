/**
 * @classdesc Le plan de travail pour éditer les algorithmes
 * @description Crée une instance de PlanTravail.
 * @class PlanTravail
 * @extends {HTMLElement}
 */
class PlanTravail extends HTMLElement {
	// ATTRIBUTS
	_editeur = document.querySelector("editeur-interface"); // Editeur d'algorithme

	// CONSTRUCTEUR
	/**
	 * @constructor
	 */
	constructor() {
		super();

		// this.addEventListener("dragover", (event) => {
		//     event.preventDefault(); // Necessary to allow a drop
		// });

		// this.addEventListener("drop", (event) => {
		//     event.preventDefault();

		//     // Get the id of the dragged element
		//     const data = event.dataTransfer.getData("text/plain");
		//     if (verbose) console.log("Dropped:", data);

		//     // Get the X and Y coordinates
		//     const x = event.layerX;
		//     const y = event.layerY;

		//     if (verbose) console.log("Dropped at coordinates:", x, y);
		//     if (verbose) console.log("eval(data) = " + eval(data));
		//     this.ajouterElement(eval(data), x, y, false);
		// });

		// Une fois par seconde, on vérifie si des éléments sont en dehors du plan de travail (trop haut ou trop à gauche)
		setInterval(() => {
			for (let element of this.children) {
				if (element instanceof ElementGraphique) {
					if (element.getCentre().x < 0 || parseFloat(element._ordonnee) < 0) {
						element._abscisse = Math.max(0, parseFloat(element._abscisse)) + "vw";
						element._ordonnee = Math.max(0, parseFloat(element._ordonnee)) + "vw";
						element.setPosition();
					}
				}
			}
		}, 1000);
	}

	// ENCAPSULATION

	get leDictionnaireDesDonnees() {
		return this._editeur._dictionnaireDesDonnees;
	}

    // METHODES
    /**
     * @description Retourne lesProblèmes du plans de travail n'ayant pas de parent
     *
     * @type {Probleme}
     * @returns {Probleme} Le premier problème du plan de travail
     */
    getProblemePrincipal() {
        let listeElementsGraphiques = PlanTravail.FiltrerElementsGraphique(this.children, ElementGraphique);
        listeElementsGraphiques = listeElementsGraphiques.filter((unElementGraphique) => unElementGraphique.getParent()==undefined);
        return listeElementsGraphiques;
    }

    /**
     * Recherche les erreurs dans le plan de travail<br>
     *
     * Liste des erreurs :<br>
     *
     * 13 : Algorithme trop grand
     *
     * @returns {Array<AnomalieConceptuelle>} La liste des problèmes de plan de travail (actuellement qu'une erreur)
     */
    rechercherAnomalies() {
        let listeAnomalies = [];
        if (AvertissementPlanTropGrand.detecterAnomalie(this)) {
            listeAnomalies.push(new AvertissementPlanTropGrand(this));
        }
        for(let elementgraphique of this.getProblemePrincipal()) {
            listeAnomalies = [...listeAnomalies, ...elementgraphique.rechercherAnomalies()];
        }
        console.log(listeAnomalies);
        return listeAnomalies;
    }

	/**
     * @description Renvoie une liste contenant les éléments ElementGraphique du type donné
     *
     * @static
     * @param {Array<ElementGraphique>} listeElementGraphique La listes de tous les ElementsGraphiques
     * @param {ElementGraphique} typeRechercher le type de l'ElementGraphique à rechercher dans la liste
     * @returns {Array<ElementGraphique>} La liste de tous les ElementGraphique du type rechercher
     */
		static FiltrerElementsGraphique(listeElementGraphique, typeRechercher) {
			let nouvelleListe = [];
			for (let element of listeElementGraphique) {
				if (element instanceof typeRechercher) {
					nouvelleListe.push(element);
				}
			}
			return nouvelleListe;
		}

	/**
	 * @description Renvoie une liste contenant les éléments ElementGraphique du type donné
	 *
	 * @static
	 * @param {Array<ElementGraphique>} listeElementGraphique La listes de tous les ElementsGraphiques
	 * @param {ElementGraphique} typeRechercher le type de l'ElementGraphique à rechercher dans la liste
	 * @returns {Array<ElementGraphique>} La liste de tous les ElementGraphique du type rechercher
	 */
    static trierElementsGraphique(listeElementGraphique)
    {
        const n = listeElementGraphique.length;
        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
                if (listeElementGraphique[j].getCentre().x < listeElementGraphique[minIndex].getCentre().x) {
                    minIndex = j;
                }
            }
            if (minIndex !== i) {
                // Échangez les éléments
                let temp = listeElementGraphique[i];
                listeElementGraphique[i] = listeElementGraphique[minIndex];
                listeElementGraphique[minIndex] = temp;
            }
        }
        return listeElementGraphique;
    }

	/**
	 * @description Renvoie les informations de l'instance du PlanTravail sous forme JSON
	 *
	 * @returns {{}}
	 */
	exporterEnJSON() {
		let listeElementsSansParents = [];
		for (let element of this.children) {
			if (element._parent == null && element instanceof ElementGraphique) {
				listeElementsSansParents.push(element);
			}
		}

		let corpsJSON = [];
		listeElementsSansParents.forEach((element) => {
			corpsJSON.push(element.toJSON());
		});

		corpsJSON.push(this.leDictionnaireDesDonnees.toJSON());
		return corpsJSON;
	}

	exporterEnJSONSpecifier(listeElemEnfantsAConcerver) {
		let listeElementsSansParents = [];
		for (let element of this.children) {
			if (element._parent == null && element instanceof ElementGraphique) {
				listeElementsSansParents.push(element);
			}
		}

		let corpsJSON = [];
		listeElementsSansParents.forEach((element) => {
			corpsJSON.push(element.toJSONspecifier(listeElemEnfantsAConcerver));
		});

		corpsJSON.push(this.leDictionnaireDesDonnees.toJSON());
		return corpsJSON;
	}

	/**
	 * @description Lis un fichier json et le charge en mémoire. Vérifie également si le fichier est bien un JSON
	 *
	 * @param {string} fichier Le fichier json à charger en mémoire
	 */
	chargerFichier(fichier) {
		try {
			var parsedData = JSON.parse(fichier);
			this.chargerDepuisJSON(parsedData);
		} catch (error) {
			alert("Le fichier n'est pas au format JSON.");
			if (verbose) console.log(error);
		}
	}

	/**
	 * @description Charge le corpsJSON donnée pour charger l'algorithme contenu à l'intérieur sur le plan de travail
	 *
	 * @param {JSON} corpsJSON le corps JSON à charger sur le plan de travail
	 * @returns {Array<ElementGraphique>} La liste des ElementGraphique chargés
	 */
	chargerDepuisJSON(corpsJSON, cancellable = true) {
		if (corpsJSON == undefined) {
			return [];
		}
		let listeElems = [];
		for (let element of corpsJSON) {
			switch (element.typeElement) {
				case "Probleme":
					let probleme = new Probleme(element.abscisse, element.ordonnee, element.libelle);
					for (let donnee of element.listeDonnes) {
						probleme._listeDonnes.push(new Information(donnee));
					}
					for (let resultat of element.listeResultats) {
						probleme._listeResultats.push(new Information(resultat));
					}
					this.appendChild(probleme);
					if (cancellable) this._editeur.ajouterEvenement(new EvenementCreationElement(probleme, this));
					for (let enfant of this.chargerDepuisJSON(element.enfants, cancellable)) {
						probleme._elemParent.lierEnfant(enfant, !cancellable);
					}
					probleme.afficher();
					probleme.setPosition();
					listeElems.push(probleme);
					break;
				case "Procedure":
					let procedure = new Procedure(element.abscisse, element.ordonnee, element.libelle);
					for (let donnee of element.listeDonnes) {
						procedure._listeDonnes.push(new Information(donnee));
					}
					for (let resultat of element.listeResultats) {
						procedure._listeResultats.push(new Information(resultat));
					}
					this.appendChild(procedure);
					if (cancellable) this._editeur.ajouterEvenement(new EvenementCreationElement(procedure, this));
					for (let enfant of this.chargerDepuisJSON(element.enfants, cancellable)) {
						procedure._elemParent.lierEnfant(enfant, !cancellable);
					}
					procedure.afficher();
					procedure.setPosition();
					listeElems.push(procedure);
					break;
				case "StructureSi":
					let listeConditionsSi = [];
					for (let condition of this.chargerDepuisJSON(element.conditions)) {
						condition._structure = element;
						listeConditionsSi.push(condition);
					}
					let structureSi = new StructureSi(element.abscisse, element.ordonnee, listeConditionsSi);
					structureSi.afficher();
					structureSi.setPosition();
					this.appendChild(structureSi);
					if (cancellable) this._editeur.ajouterEvenement(new EvenementCreationElement(structureSi, this));
					for (let condition of structureSi._listeConditions.children) {
						if (verbose) console.log(condition);
						for (let enfant of this.chargerDepuisJSON(condition.enfantsAAjouter, cancellable)) {
							if (verbose) console.log(enfant);
							condition._elemParent.lierEnfant(enfant, !cancellable);
						}
					}
					listeElems.push(structureSi);
					break;
				case "StructureSwitch":
					let listeConditionsSwitch = [];
					for (let condition of this.chargerDepuisJSON(element.conditions)) {
						condition._structure = element;
						listeConditionsSwitch.push(condition);
					}
					let structureSwitch = new StructureSwitch(
						element.abscisse,
						element.ordonnee,
						listeConditionsSwitch,
						element.expressionATester
					);
					structureSwitch.afficher();
					structureSwitch.setPosition();
					this.appendChild(structureSwitch);
					if (cancellable)
						this._editeur.ajouterEvenement(new EvenementCreationElement(structureSwitch, this));
					for (let condition of structureSwitch._listeConditions.children) {
						if (verbose) console.log(condition);
						for (let enfant of this.chargerDepuisJSON(condition.enfantsAAjouter, cancellable)) {
							if (verbose) console.log(enfant);
							condition._elemParent.lierEnfant(enfant, !cancellable);
						}
					}
					listeElems.push(structureSwitch);
					break;
				case "Condition":
					let condition = new Condition(element.libelle);
					condition.afficher();
					condition.enfantsAAjouter = element.enfants;
					listeElems.push(condition);
					break;
				case "StructureIterativeNonBornee":
					let structureIterativeNonBornee = new StructureIterativeNonBornee(
						element.abscisse,
						element.ordonnee
					);
					this.appendChild(structureIterativeNonBornee);
					for (let enfant of this.chargerDepuisJSON(element.enfants, cancellable)) {
						structureIterativeNonBornee._elemParent.lierEnfant(enfant, !cancellable);
					}
					if (cancellable)
						this._editeur.ajouterEvenement(new EvenementCreationElement(structureIterativeNonBornee, this));
					structureIterativeNonBornee.afficher();
					structureIterativeNonBornee.setPosition();
					listeElems.push(structureIterativeNonBornee);
					break;
				case "StructureIterativeBornee":
					let structureIterativeBornee = new StructureIterativeBornee(
						element.abscisse,
						element.ordonnee,
						element.variableAIterer,
						element.borneInferieure,
						element.borneSuperieure,
						element.pas
					);
					this.appendChild(structureIterativeBornee);
					for (let enfant of this.chargerDepuisJSON(element.enfants, cancellable)) {
						structureIterativeBornee._elemParent.lierEnfant(enfant, !cancellable);
					}
					if (cancellable)
						this._editeur.ajouterEvenement(new EvenementCreationElement(structureIterativeBornee, this));
					structureIterativeBornee.afficher();
					structureIterativeBornee.setPosition();
					listeElems.push(structureIterativeBornee);
					break;
				case "ConditionSortie":
					let conditionSortie = new ConditionSortie(element.abscisse, element.ordonnee);
					this.appendChild(conditionSortie);
					if (cancellable)
						this._editeur.ajouterEvenement(new EvenementCreationElement(conditionSortie, this));
					conditionSortie.afficher();
					conditionSortie.setPosition();
					listeElems.push(conditionSortie);
					break;
				case "DictionnaireDonnee":
					this.leDictionnaireDesDonnees.chargerDepuisJSON(element);
				default:
					break;
			}
		}
		this.updateAllLines();
		return listeElems;
	}

	// Effectue le dictionnaire des données
	/**
	 * @description Recherche toutes les variables à l'intérieur du PlanTravail et les donne au dictionnaire de donnée
	 */
	effectuerDictionnaireDesDonnee() {
		// Suppression de toutes les Informations
		this.leDictionnaireDesDonnees.suppressionTout();

		// Ajout des Informations
		let lesInformations = [];
		for (let courantObjetGraphique of this.children) {
			if (courantObjetGraphique instanceof ElementGraphique)
				lesInformations = [...lesInformations, ...courantObjetGraphique.extraireInformation()];
		}
		for (let uneInformation of lesInformations) {
			this.leDictionnaireDesDonnees.AjouterUneVariable(uneInformation);
		}

		// this.leDictionnaireDesDonnees.retirerInformationsAbsentes(lesInformations);
	}
	trouverToutLesElementsGraphiques() {
		let elements = [];
		for (let element of this.children) {
			if (element instanceof ElementGraphique) {
				elements.push(element);
			}
		}
		return elements;
	}
	renameInformation(ancienNom, nouveauNom) {
		for (let enfantGraphique of this.trouverToutLesElementsGraphiques()) {
			enfantGraphique.renameInformation(ancienNom, nouveauNom);
		}
	}

	ajouterElement(element, abscisse, ordonnee, estEnVW) {
		if (element == null) {
			return;
		}
		if (!estEnVW) {
			// Conversion des coordonnées en vw
			abscisse = (abscisse / window.innerWidth) * 100;
			ordonnee = (ordonnee / window.innerWidth) * 100;

			// Il faut prendre en compte le décalage du plan de travail en scroll
			abscisse += (this.scrollLeft / window.innerWidth) * 100;
			ordonnee += (this.scrollTop / window.innerWidth) * 100;

			// Et le niveau de zoom
			abscisse /= this._editeur._indicateurZoom._zoom;
			ordonnee /= this._editeur._indicateurZoom._zoom;
		}
		let newElement = new element(abscisse + "vw", ordonnee + "vw");
		newElement.afficher();

		// Adapter les coordonnées de l'élément pour le placer centré sur le curseur
		let largeurElement = newElement.getTailleAbscisse();
		let hauteurElement = newElement.getTailleOrdonnee();
		if (verbose) console.log("largeurElement = " + largeurElement + " et hauteurElement = " + hauteurElement);
		newElement._abscisse = parseFloat(newElement._abscisse) - largeurElement / 2 + "vw";
		newElement._ordonnee = parseFloat(newElement._ordonnee) - hauteurElement / 2 + "vw";
		newElement.setPosition();
		this.appendChild(newElement);
		this._editeur.ajouterEvenement(new EvenementCreationElement(newElement, this));
	}

	updateAllLines() {
		for (let element of this.children) {
			if (element instanceof ElementGraphique) {
				if (element._parent != null) element._parent.updateAll();
			}
		}
	}

	getCoordMinEtMax() {
		let coordMin = { x: Infinity, y: Infinity };
		let coordMax = { x: -Infinity, y: -Infinity };
		for (let element of this.children) {
			if (element instanceof ElementGraphique) {
				let coord = element.getCentre();
				coordMin.x = Math.min(coordMin.x, parseFloat(element._abscisse));
				coordMin.y = Math.min(coordMin.y, parseFloat(element._ordonnee));
				coordMax.x = Math.max(coordMax.x, parseFloat(element._abscisse) + element.getTailleAbscisse());
				coordMax.y = Math.max(coordMax.y, parseFloat(element._ordonnee) + element.getTailleOrdonnee());
			}
		}
		return { coordMin, coordMax };
	}

	toutDeplacer(x, y) {
		for (let element of this.children) {
			if (element instanceof ElementGraphique) {
				element._abscisse = parseFloat(element._abscisse) + x + "vw";
				element._ordonnee = parseFloat(element._ordonnee) + y + "vw";
				element.setPosition();
			}
		}
		// Actualiser tous les liens
		this.updateAllLines();
	}
}
window.customElements.define("plan-travail", PlanTravail);
