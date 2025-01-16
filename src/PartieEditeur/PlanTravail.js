/**
 * @class PlanTravail
 * @extends {HTMLElement}
 * @classdesc Le plan de travail pour éditer les algorithmes.
 */
class PlanTravail extends HTMLElement {
	// ATTRIBUTS
	_editeur = document.querySelector("editeur-interface"); // Editeur d'algorithme
	_refScroll;

	// CONSTRUCTEUR
	/**
	 * @constructor
	 */
	constructor() {
		super();

		this._refScroll = document.createElement("div");
		this._refScroll.style.position = "absolute";
		this._refScroll.style.left = "50%";
		this._refScroll.style.display = "list-item";
		this._refScroll.style.opacity = "0";
		this.appendChild(this._refScroll);

		// 30 fois par seconde, on vérifie si des éléments sont en dehors du plan de travail (trop haut ou trop à gauche)
		setInterval(() => {
			for (let element of this.children) {
				if (element instanceof ElementGraphique) {
					if (
						element.getCentre().x < 0 ||
						parseFloat(element._ordonnee) < 0
					) {
						element._abscisse =
							Math.max(0, parseFloat(element._abscisse)) + "vw";
						element._ordonnee =
							Math.max(0, parseFloat(element._ordonnee)) + "vw";
						element.setPosition();
					}
				}
			}

			// On va aussi trouver l'élément le plus en bas et déplacer refScroll 200px plus bas
			let coordMinEtMax = this.getCoordMinEtMax();

			// On déplace refScroll
			this._refScroll.style.top = coordMinEtMax.coordMax.y + 5 + "vw";
		}, 33);
	}

	// ENCAPSULATION

	/**
	 * @returns {Object} Le dictionnaire des données.
	 */
	get leDictionnaireDesDonnees() {
		return this._editeur._dictionnaireDesDonnees;
	}

	// METHODES

	/**
	 * Retourne les problèmes du plan de travail n'ayant pas de parent.
	 * @returns {Array<Probleme>} La liste des problèmes principaux.
	 */
	getProblemePrincipal() {
		let listeElementsGraphiques = PlanTravail.FiltrerElementsGraphique(
			this.children,
			ElementGraphique,
		);
		listeElementsGraphiques = listeElementsGraphiques.filter(
			(unElementGraphique) => unElementGraphique.getParent() == undefined,
		);
		return listeElementsGraphiques;
	}

	/**
	 * Retourne le problème le plus haut dans le plan de travail.
	 * @returns {Probleme} Le problème le plus haut.
	 */
	getProblemeLePlusHaut() {
		let listeProblemes = this.getProblemePrincipal();
		let problemeLePlusHaut = listeProblemes[0];
		for (let probleme of listeProblemes) {
			if (
				parseFloat(probleme._ordonnee) <
				parseFloat(problemeLePlusHaut._ordonnee)
			) {
				problemeLePlusHaut = probleme;
			}
		}
		return problemeLePlusHaut;
	}

	/**
	 * Recherche les erreurs dans le plan de travail.
	 * @returns {Array<AnomalieConceptuelle>} La liste des anomalies trouvées.
	 */
	rechercherAnomalies() {
		let listeAnomalies = [];
		if (AvertissementPlanTropGrand.detecterAnomalie(this)) {
			listeAnomalies.push(new AvertissementPlanTropGrand(this));
		}
		for (let elementgraphique of this.getProblemePrincipal()) {
			listeAnomalies = [
				...listeAnomalies,
				...elementgraphique.rechercherAnomalies(),
			];
		}
		console.log(listeAnomalies);
		return listeAnomalies;
	}

	/**
	 * Filtre les éléments graphiques d'un type donné.
	 * @param {Array<ElementGraphique>} listeElementGraphique - La liste des éléments graphiques.
	 * @param {ElementGraphique} typeRechercher - Le type d'élément graphique à rechercher.
	 * @returns {Array<ElementGraphique>} La liste des éléments graphiques filtrés.
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
	 * Trie les éléments graphiques par leur position en abscisse.
	 * @param {Array<ElementGraphique>} listeElementGraphique - La liste des éléments graphiques.
	 * @returns {Array<ElementGraphique>} La liste des éléments graphiques triés.
	 */
	static trierElementsGraphique(listeElementGraphique) {
		const n = listeElementGraphique.length;
		for (let i = 0; i < n - 1; i++) {
			let minIndex = i;
			for (let j = i + 1; j < n; j++) {
				if (
					listeElementGraphique[j].getCentre().x <
					listeElementGraphique[minIndex].getCentre().x
				) {
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
	 * Exporte le plan de travail en JSON.
	 * @returns {Array} Le plan de travail sous forme JSON.
	 */
	exporterEnJSON() {
		let listeElementsSansParents = [];
		for (let element of this.children) {
			if (
				element._parent == null &&
				element instanceof ElementGraphique
			) {
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

	/**
	 * Exporte le plan de travail en JSON en spécifiant les enfants à conserver.
	 * @param {Array} listeElemEnfantsAConcerver - La liste des enfants à conserver.
	 * @returns {Array} Le plan de travail sous forme JSON.
	 */
	exporterEnJSONSpecifier(listeElemEnfantsAConcerver) {
		let listeElementsSansParents = [];
		for (let element of this.children) {
			if (
				element._parent == null &&
				element instanceof ElementGraphique
			) {
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
	 * Charge un fichier JSON dans le plan de travail.
	 * @param {string} fichier - Le fichier JSON à charger.
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
	 * Charge un corps JSON dans le plan de travail.
	 * @param {JSON} corpsJSON - Le corps JSON à charger.
	 * @param {boolean} [cancellable=true] - Indique si l'opération est annulable.
	 * @param {boolean} [dico=true] - Indique si le dictionnaire doit être chargé.
	 * @returns {Array<ElementGraphique>} La liste des éléments graphiques chargés.
	 */
	chargerDepuisJSON(corpsJSON, cancellable = true, dico = true) {
		if (corpsJSON == undefined) {
			return [];
		}
		let listeElems = [];
		for (let element of corpsJSON) {
			switch (element.typeElement) {
				case "Probleme":
					let probleme = new Probleme(
						element.abscisse,
						element.ordonnee,
						element.libelle,
					);
					for (let donnee of element.listeDonnes) {
						probleme._listeDonnes.push(new Information(donnee));
					}
					for (let resultat of element.listeResultats) {
						probleme._listeResultats.push(
							new Information(resultat),
						);
					}
					this.appendChild(probleme);
					if (cancellable)
						this._editeur.ajouterEvenement(
							new EvenementCreationElement(probleme, this),
						);
					for (let enfant of this.chargerDepuisJSON(
						element.enfants,
						cancellable,
					)) {
						probleme._elemParent.lierEnfant(enfant, !cancellable);
					}
					probleme.afficher();
					probleme.setPosition();
					listeElems.push(probleme);
					if (element.estDecomposeAilleurs) {
						probleme.decomposerAutrePlan();
					}
					break;
				case "Procedure":
					let procedure = new Procedure(
						element.abscisse,
						element.ordonnee,
						element.libelle,
					);
					for (let donnee of element.listeDonnes) {
						procedure._listeDonnes.push(new Information(donnee));
					}
					for (let resultat of element.listeResultats) {
						procedure._listeResultats.push(
							new Information(resultat),
						);
					}
					this.appendChild(procedure);
					if (cancellable)
						this._editeur.ajouterEvenement(
							new EvenementCreationElement(procedure, this),
						);
					for (let enfant of this.chargerDepuisJSON(
						element.enfants,
						cancellable,
					)) {
						procedure._elemParent.lierEnfant(enfant, !cancellable);
					}
					procedure.afficher();
					procedure.setPosition();
					listeElems.push(procedure);
					break;
				case "StructureSi":
					let listeConditionsSi = [];
					for (let condition of this.chargerDepuisJSON(
						element.conditions,
					)) {
						condition._structure = element;
						listeConditionsSi.push(condition);
					}
					let structureSi = new StructureSi(
						element.abscisse,
						element.ordonnee,
						listeConditionsSi,
					);
					structureSi.afficher();
					structureSi.setPosition();
					this.appendChild(structureSi);
					if (cancellable)
						this._editeur.ajouterEvenement(
							new EvenementCreationElement(structureSi, this),
						);
					for (let condition of structureSi._listeConditions
						.children) {
						if (verbose) console.log(condition);
						for (let enfant of this.chargerDepuisJSON(
							condition.enfantsAAjouter,
							cancellable,
						)) {
							if (verbose) console.log(enfant);
							condition._elemParent.lierEnfant(
								enfant,
								!cancellable,
							);
						}
					}
					listeElems.push(structureSi);
					break;
				case "StructureSwitch":
					let listeConditionsSwitch = [];
					for (let condition of this.chargerDepuisJSON(
						element.conditions,
					)) {
						condition._structure = element;
						listeConditionsSwitch.push(condition);
					}
					let structureSwitch = new StructureSwitch(
						element.abscisse,
						element.ordonnee,
						listeConditionsSwitch,
						element.expressionATester,
					);
					structureSwitch.afficher();
					structureSwitch.setPosition();
					this.appendChild(structureSwitch);
					if (cancellable)
						this._editeur.ajouterEvenement(
							new EvenementCreationElement(structureSwitch, this),
						);
					for (let condition of structureSwitch._listeConditions
						.children) {
						if (verbose) console.log(condition);
						for (let enfant of this.chargerDepuisJSON(
							condition.enfantsAAjouter,
							cancellable,
						)) {
							if (verbose) console.log(enfant);
							condition._elemParent.lierEnfant(
								enfant,
								!cancellable,
							);
						}
					}
					listeElems.push(structureSwitch);
					break;
				case "Condition":
					let condition = new Condition(element.libelle);
					// condition.afficher();
					condition.enfantsAAjouter = element.enfants;
					listeElems.push(condition);
					break;
				case "StructureIterativeNonBornee":
					let structureIterativeNonBornee =
						new StructureIterativeNonBornee(
							element.abscisse,
							element.ordonnee,
						);
					this.appendChild(structureIterativeNonBornee);
					for (let enfant of this.chargerDepuisJSON(
						element.enfants,
						cancellable,
					)) {
						structureIterativeNonBornee._elemParent.lierEnfant(
							enfant,
							!cancellable,
						);
					}
					if (cancellable)
						this._editeur.ajouterEvenement(
							new EvenementCreationElement(
								structureIterativeNonBornee,
								this,
							),
						);
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
						element.pas,
						element.croissant,
					);
					this.appendChild(structureIterativeBornee);
					for (let enfant of this.chargerDepuisJSON(
						element.enfants,
						cancellable,
					)) {
						structureIterativeBornee._elemParent.lierEnfant(
							enfant,
							!cancellable,
						);
					}
					if (cancellable)
						this._editeur.ajouterEvenement(
							new EvenementCreationElement(
								structureIterativeBornee,
								this,
							),
						);
					structureIterativeBornee.afficher();
					structureIterativeBornee.setPosition();
					listeElems.push(structureIterativeBornee);
					break;
				case "ConditionSortie":
					let conditionSortie = new ConditionSortie(
						element.abscisse,
						element.ordonnee,
					);
					this.appendChild(conditionSortie);
					if (cancellable)
						this._editeur.ajouterEvenement(
							new EvenementCreationElement(conditionSortie, this),
						);
					conditionSortie.afficher();
					conditionSortie.setPosition();
					listeElems.push(conditionSortie);
					break;
				case "DictionnaireDonnee":
					if (dico)
						this.leDictionnaireDesDonnees.chargerDepuisJSON(
							element,
						);
				default:
					break;
			}
		}
		this.updateAllLines();
		return listeElems;
	}

	/**
	 * Effectue le dictionnaire des données.
	 */
	effectuerDictionnaireDesDonnee() {
		// Suppression de toutes les Informations
		this.leDictionnaireDesDonnees.suppressionTout();

		// Ajout des Informations
		let lesInformations = [];
		for (let courantObjetGraphique of this.children) {
			if (courantObjetGraphique instanceof ElementGraphique)
				lesInformations = [
					...lesInformations,
					...courantObjetGraphique.extraireInformation(),
				];
		}
		for (let uneInformation of lesInformations) {
			this.leDictionnaireDesDonnees.AjouterUneVariable(uneInformation);
		}

		// this.leDictionnaireDesDonnees.retirerInformationsAbsentes(lesInformations);
	}

	/**
	 * Trouve tous les éléments graphiques dans le plan de travail.
	 * @returns {Array<ElementGraphique>} La liste des éléments graphiques.
	 */
	trouverToutLesElementsGraphiques() {
		let elements = [];
		for (let element of this.children) {
			if (element instanceof ElementGraphique) {
				elements.push(element);
			}
		}
		return elements;
	}

	/**
	 * Renomme une information dans tous les éléments graphiques.
	 * @param {string} ancienNom - L'ancien nom de l'information.
	 * @param {string} nouveauNom - Le nouveau nom de l'information.
	 */
	renameInformation(ancienNom, nouveauNom) {
		for (let enfantGraphique of this.trouverToutLesElementsGraphiques()) {
			enfantGraphique.renameInformation(ancienNom, nouveauNom);
		}
	}

	/**
	 * Ajoute un élément au plan de travail.
	 * @param {ElementGraphique} element - L'élément à ajouter.
	 * @param {number} abscisse - L'abscisse de l'élément.
	 * @param {number} ordonnee - L'ordonnée de l'élément.
	 * @param {boolean} estEnVW - Indique si les coordonnées sont en vw.
	 * @returns {ElementGraphique} L'élément ajouté.
	 */
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
		if (verbose)
			console.log(
				"largeurElement = " +
					largeurElement +
					" et hauteurElement = " +
					hauteurElement,
			);
		newElement._abscisse =
			parseFloat(newElement._abscisse) - largeurElement / 2 + "vw";
		newElement._ordonnee =
			parseFloat(newElement._ordonnee) - hauteurElement / 2 + "vw";
		newElement.setPosition();
		this.appendChild(newElement);
		this._editeur.ajouterEvenement(
			new EvenementCreationElement(newElement, this),
		);
		return newElement;
	}

	/**
	 * Met à jour toutes les lignes du plan de travail.
	 */
	updateAllLines() {
		for (let element of this.children) {
			if (element instanceof ElementGraphique) {
				if (element._parent != null) element._parent.updateAll();
			}
		}
	}

	/**
	 * Obtient les coordonnées minimales et maximales des éléments graphiques.
	 * @returns {Object} Les coordonnées minimales et maximales.
	 */
	getCoordMinEtMax() {
		let coordMin = { x: Infinity, y: Infinity };
		let coordMax = { x: -Infinity, y: -Infinity };
		for (let element of this.children) {
			if (element instanceof ElementGraphique) {
				let coord = element.getCentre();
				coordMin.x = Math.min(
					coordMin.x,
					parseFloat(element._abscisse),
				);
				coordMin.y = Math.min(
					coordMin.y,
					parseFloat(element._ordonnee),
				);
				coordMax.x = Math.max(
					coordMax.x,
					parseFloat(element._abscisse) + element.getTailleAbscisse(),
				);
				coordMax.y = Math.max(
					coordMax.y,
					parseFloat(element._ordonnee) + element.getTailleOrdonnee(),
				);
			}
		}
		return { coordMin, coordMax };
	}

	/**
	 * Déplace tous les éléments graphiques d'un certain décalage.
	 * @param {number} x - Le décalage en abscisse.
	 * @param {number} y - Le décalage en ordonnée.
	 */
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
