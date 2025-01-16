/**
 * @class ElementGraphique
 * @classdesc La classe ElementGraphique est la base de tous les éléments de l'éditeur d'algorithmes.
 * @description Est utilisé pour instancier les héritiers de la classe ElementGraphique. Par défaut, la position à la création de l'instance est à (0,0).
 * @abstract
 * @extends {HTMLElement}
 */
class ElementGraphique extends HTMLElement {
	// ATTRIBUTS
	_abscisse; // Entier
	_ordonnee; // Entier
	_parent; // ElementParent
	_listeAnomalie; // List<AnomalieConceptuelle>
	_elementGraphique;

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {number} [abscisse=0] - L'abscisse de l'ElementGraphique.
	 * @param {number} [ordonnee=0] - L'ordonnée de l'ElementGraphique.
	 * @param {ElementParent} [parent=null] - Le parent de l'ElementGraphique, par défaut n'a pas de parent.
	 */
	constructor(abscisse = 0, ordonnee = 0, parent = null) {
		super();
		this._abscisse = abscisse;
		this._ordonnee = ordonnee;
		this._parent = parent;
		this._elementGraphique = this;
		this.setPosition(abscisse, ordonnee);

		// Empêchez le focus automatique sur d'autres éléments
		document.activeElement.blur();
	}

	// ENCAPSULATION
	/**
	 * @description Renvoie la valeur de l'abscisse de l'ElementGraphique.
	 * @returns {number} L'abscisse.
	 */
	get _abscisse() {
		return this._abscisse;
	}

	/**
	 * @description Définit la valeur de l'abscisse de l'ElementGraphique.
	 * @param {number} value - La nouvelle valeur de l'abscisse.
	 */
	set _abscisse(value) {
		this._abscisse = value;
	}

	/**
	 * @description Renvoie la valeur de l'ordonnée de l'ElementGraphique.
	 * @returns {number} L'ordonnée.
	 */
	get _ordonnee() {
		return this._ordonnee;
	}

	/**
	 * @description Définit la valeur de l'ordonnée de l'ElementGraphique.
	 * @param {number} value - La nouvelle valeur de l'ordonnée.
	 */
	set _ordonnee(value) {
		this._ordonnee = value;
	}

	/**
	 * @description Renvoie le parent de l'ElementGraphique.
	 * @returns {ElementParent} Le parent de l'ElementGraphique.
	 */
	get _parent() {
		return this._parent;
	}

	/**
	 * @description Définit le parent de l'ElementGraphique.
	 * @param {ElementParent} value - Le nouveau parent de l'ElementGraphique.
	 */
	set _parent(value) {
		this._parent = value;
	}

	/**
	 * @description Renvoie l'espace de travail de l'ElementGraphique.
	 * @returns {HTMLElement} L'espace de travail.
	 */
	get espaceTravail() {
		return this.parentNode;
	}

	/**
	 * @description Renvoie l'ancre de sélection de l'ElementGraphique.
	 * @returns {Object} L'ancre de sélection avec les coordonnées x et y.
	 */
	get selectAnchor() {
		let anchor = { x: 0, y: 0 };
		anchor.x = parseFloat(this._abscisse) + this.getTailleAbscisse() / 2;
		anchor.y = parseFloat(this._ordonnee) + this.getTailleOrdonnee() / 2;
		return anchor;
	}

	/**
	 * @description Renvoie la taille en abscisse de l'ElementGraphique.
	 * @returns {number} La taille en abscisse.
	 */
	getTailleAbscisse() {
		let rect = this.getBoundingClientRect();

		// Calculez la largeur en unité vw
		let largeurEnVw = ((rect.right - rect.left) / window.innerWidth) * 100;
		return largeurEnVw;
	}

	/**
	 * @description Renvoie la taille en ordonnée de l'ElementGraphique.
	 * @returns {number} La taille en ordonnée.
	 */
	getTailleOrdonnee() {
		let rect = this.getBoundingClientRect();

		// Calculez la hauteur en unité vh
		let hauteurEnVh = ((rect.bottom - rect.top) / window.innerHeight) * 100;
		return hauteurEnVh;
	}

	/**
	 * @description Renvoie le centre de l'ElementGraphique.
	 * @returns {Object} Le centre avec les coordonnées x et y.
	 */
	getCentre() {
		return {
			x: parseFloat(this._abscisse) + this.getTailleAbscisse() / 2,
			y: parseFloat(this._ordonnee) + this.getTailleOrdonnee() / 2,
		};
	}

	/**
	 * @description Définit la position de l'ElementGraphique.
	 * @param {number} [abscisse=-1] - L'abscisse.
	 * @param {number} [ordonnee=-1] - L'ordonnée.
	 */
	setPosition(abscisse = -1, ordonnee = -1) {
		if (abscisse == -1 && ordonnee == -1) {
			this.style.left =
				"calc(var(--sizeModifier) * " + this._abscisse + ")";
			this.style.top =
				"calc(var(--sizeModifier) * " + this._ordonnee + ")";
		} else {
			this.style.left = "calc(var(--sizeModifier) * " + abscisse + ")";
			this.style.top = "calc(var(--sizeModifier) * " + ordonnee + ")";
		}
	}

	/**
	 * @description Renvoie la position de l'ElementGraphique sous forme de dictionnaire.
	 * @returns {Object} Un objet contenant l'abscisse et l'ordonnée de l'ElementGraphique.
	 */
	getPosition() {
		return { abscisse: this.style.left, ordonnee: this.style.top };
	}

	// METHODES
	/**
	 * @description Affiche dans la console la position de l'ElementGraphique.
	 */
	afficher() {
		console.log(
			`Abscisse : ${this._abscisse} Ordonnée : ${this._ordonnee}`,
		);
	}

	/**
	 * @description Comportement natif de extraireInformation(), affiche dans la console une erreur d'initialisation et sa position.
	 * @returns {Array<Information>} Une liste de classe Informations.
	 */
	extraireInformation() {
		console.log(
			"Extraire J'ai pas été initialisé abcisse " +
				this._abscisse +
				" ordonee " +
				this._ordonnee,
		);
		return [];
	}

	/**
	 * @description Comportement natif de getEnfants(), ne renvoie rien.
	 * @param {ElementGraphique} [typeRechercher=ElementGraphique] - Le type demandé.
	 * @returns {Array<ElementGraphique>} La liste des enfants du type recherché.
	 */
	getEnfants(typeRechercher = ElementGraphique) {
		return [];
	}

	/**
	 * @description Renvoie l'arbre des descendants contenant les descendants des descendants.
	 * @param {ElementGraphique} [typeRechercher=ElementGraphique] - Le type recherché.
	 * @returns {Array<ElementGraphique>} L'arbre des descendants de l'ElementGraphique.
	 */
	getDescendants(typeRechercher = ElementGraphique) {
		const listeDeMesEnfants = this.getEnfants();
		let listeDeMesDescendants = listeDeMesEnfants;
		for (let enfant of listeDeMesEnfants) {
			listeDeMesDescendants = [
				...listeDeMesDescendants,
				...enfant.getDescendants(),
			];
		}
		return PlanTravail.FiltrerElementsGraphique(
			listeDeMesDescendants,
			typeRechercher,
		);
	}

	/**
	 * @description Renvoie le parent de l'ElementGraphique du type recherché.
	 * @param {ElementGraphique} [typeRechercher=ElementGraphique] - Le type recherché.
	 * @returns {ElementGraphique} Le parent.
	 */
	getParent(typeRechercher = ElementGraphique) {
		if (this._parent) {
			return this._parent._proprietaire._elementGraphique instanceof
				typeRechercher
				? this._parent._proprietaire._elementGraphique
				: null;
		}
		return null;
	}

	/**
	 * @description Renvoie la liste des antécédents d'ElementGraphique en fonction du type recherché.
	 * @param {ElementGraphique} [typeRechercher=ElementGraphique] - Le type recherché.
	 * @returns {Array<ElementGraphique>} L'arbre des antécédents de l'ElementGraphique.
	 */
	getAntescedants(typeRechercher = ElementGraphique) {
		const parent = this.getParent();
		let listeDeMesAntescedants = [];
		if (parent !== null) {
			listeDeMesAntescedants.push(parent);
			listeDeMesAntescedants = [
				...listeDeMesAntescedants,
				...parent.getAntescedants(),
			];
		}
		return PlanTravail.FiltrerElementsGraphique(
			listeDeMesAntescedants,
			typeRechercher,
		);
	}

	/**
	 * @description Comportement natif de include(), affiche dans la console une erreur d'initialisation et sa position.
	 * @param {string} nameInformation - Les informations recherchées.
	 * @returns {boolean} Renvoie false par défaut.
	 */
	include(nameInformation) {
		console.log(
			"Include J'ai pas été initialisé je suis " +
				this._abscisse +
				" ordonee " +
				this._ordonnee,
		);
		return false;
	}

	/**
	 * @description Comportement natif de getPlanTravail(), retourne le plan de travail.
	 * @returns {PlanTravail} Le plan de travail appartenant au résultat défini, dans Probleme.
	 */
	getPlanTravail() {
		return this.parentElement;
	}

	/**
	 * @description Comportement natif de getInformationResultat(), affiche dans la console une erreur d'initialisation et sa position.
	 * @returns {Array<Information>} Les informations contenues dans résultat défini, dans Probleme.
	 */
	getInformationResultat() {
		console.log(
			"get Information Resultat non défini dans ma classe abscisse" +
				this._abscisse +
				" ordonee " +
				this._ordonnee,
		);
		return [];
	}

	/**
	 * @description Comportement natif de getInformationDonnee(), affiche dans la console une erreur d'initialisation et sa position.
	 * @returns {Array<Information>} Les informations contenues dans données définies, dans Probleme.
	 */
	getInformationDonnee() {
		console.log(
			"get Information Donnée non défini dans ma classe je suis " +
				this._abscisse +
				" ordonee " +
				this._ordonnee,
		);
		return [];
	}

	/**
	 * @description Recherche les anomalies dans l'ElementGraphique et ses enfants.
	 * @param {Array<AnomalieConceptuelle>} mesAnomalies - La liste des anomalies à rechercher.
	 * @returns {Array<AnomalieConceptuelle>} La liste des anomalies trouvées.
	 */
	rechercherAnomalies(mesAnomalies) {
		this._listeAnomalie = mesAnomalies;
		let anomalieDeMesEnfantsEtLesMiennes = [];
		let enfants = this.getEnfants();
		for (let enfant of enfants) {
			anomalieDeMesEnfantsEtLesMiennes = [
				...anomalieDeMesEnfantsEtLesMiennes,
				...enfant.rechercherAnomalies(),
			];
		}
		anomalieDeMesEnfantsEtLesMiennes = [
			...anomalieDeMesEnfantsEtLesMiennes,
			...mesAnomalies,
		];
		return anomalieDeMesEnfantsEtLesMiennes;
	}

	/**
	 * @description Colore l'ElementGraphique.
	 */
	colorierElement() {
		//console.log(`Coloriage Couleur primaire: ${this._couleurPrimaire}`);
	}

	/**
	 * @description Renomme une information dans l'ElementGraphique.
	 * @param {string} ancienNom - L'ancien nom de l'information.
	 * @param {string} nouveauNom - Le nouveau nom de l'information.
	 */
	renameInformation(ancienNom, nouveauNom) {}

	/**
	 * @description Renvoie l'ancre de décomposition de l'ElementGraphique.
	 * @returns {Object} L'ancre de décomposition avec les coordonnées abscisse et ordonnee.
	 */
	getAncreDecomposition() {
		let abscisse =
			parseFloat(this._abscisse) + this.getTailleAbscisse() / 2;
		let ordonnee = parseFloat(this._ordonnee) + this.getTailleOrdonnee();
		return { abscisse: abscisse, ordonnee: ordonnee - 0.7 };
	}

	/**
	 * @description Renvoie l'ancre de composition de l'ElementGraphique.
	 * @returns {Object} L'ancre de composition avec les coordonnées abscisse et ordonnee.
	 */
	getAncreComposition() {
		let abscisse =
			parseFloat(this._abscisse) + this.getTailleAbscisse() / 2;
		let ordonnee = parseFloat(this._ordonnee);
		return { abscisse: abscisse, ordonnee: ordonnee };
	}

	/**
	 * @description Vérifie si l'ElementGraphique peut être décomposé.
	 * @returns {boolean} Renvoie false par défaut.
	 */
	peutEtreDecompose() {
		return false;
	}

	/**
	 * @description Supprime l'ElementGraphique.
	 */
	supprimer() {
		if (this._parent != null) this._parent.delierEnfant(this, true);
		this.remove();
	}

	/**
	 * @description Génère les options contextuelles pour l'ElementGraphique.
	 * @param {Editeur} editeur - L'éditeur d'algorithmes.
	 * @returns {Array<ElementMenu>} La liste des options contextuelles.
	 */
	genererOptionsContextuelles(editeur) {
		let lesOptions = [];
		if (this.peutEtreDecompose()) {
			lesOptions.push(
				new ElementMenu("Décomposer", () => {
					editeur.selectTool(6); // Outil de liaison
					editeur._pointePrecedementLien = this;
					this.classList.add("pointePourLien");
				}),
			);
			if (this._elemParent.nombreEnfants != 0) {
				lesOptions.push(
					new ElementMenu("Délier tous les enfants", () => {
						this._elemParent.delierTousLesEnfants();
					}),
				);
			}
		}
		if (this._parent != null) {
			lesOptions.push(
				new ElementMenu("Délier du parent", () => {
					this._parent.delierEnfant(this);
				}),
			);
		}
		return lesOptions;
	}
}
