/**
 * @class StructureIterativeBornee
 * @classdesc La structure iterative bornée qui se finit après qu'une variable atteigne une condition données
 * @description Crée une instance de StructureIterativeBornee
 * @extends {StructureIterative}
 */
class StructureIterativeBornee extends StructureIterative {
	// ATTRIBUTS
	_variableAIterer; // Information
	_borneInferieure; // String
	_borneSuperieure; // String
	_pas; // String
	_estCroissant; // Boolean

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {number|string} abscisse
	 * @param {number|string} ordonnee
	 * @type {Information}
	 * @param {Information} variableAIterer
	 * @param {string} borneInferieure
	 * @param {string} borneSuperieure
	 * @param {string} pas
	 */
	constructor(
		abscisse,
		ordonnee,
		variableAIterer = "i",
		borneInferieure = "BORNE_INF",
		borneSuperieure = "BORNE_SUP",
		pas = "1"
	) {
		super(abscisse, ordonnee);
		this._variableAIterer = variableAIterer;
		this._borneInferieure = borneInferieure;
		this._borneSuperieure = borneSuperieure;
		this._pas = pas;
	}

	// ENCAPSULATION
	/**
	 * @description Renvoie la variable à altérer de la boucle iterative bornée
	 * @returns {Information} la variable
	 */
	get _variableAIterer() {
		return this._variableAIterer;
	}

	/**
	 * @description Remplace la variables actuelle par une nouvelle
	 * @param {Information} value la variable qui remplacera l'ancienne
	 */
	setVariableAIterer(value) {
		this._variableAIterer = value;
		if (this.etatClassique()) {
			this.querySelector(
				".informationsBornes"
			).innerHTML = `Pour ${this._variableAIterer} allant de ${this._borneInferieure} à ${this._borneSuperieure}`;
		} else {
			this.querySelector(".informationsBornes").innerHTML = `Pour ${this._variableAIterer} allant de ${
				this._borneInferieure
			} à ${this._borneSuperieure} par pas ${this._estCroissant ? "Croissant" : "Décroissant"} de ${this._pas}`;
		}
	}

	/**
	 * @description Renvoie la borne inférieur de la boucle
	 * @returns {string} la borne inférieur
	 */
	get _borneInferieure() {
		return this._borneInferieure;
	}

	/**
	 * @description Définit la nouvelle borne inférieur de la boucle
	 * @param {string} value la nouvelle borne inférieur
	 */
	set _borneInferieure(value) {
		this._borneInferieure = value;
	}

	/**
	 * @description Renvoie la borne supérieur de la boucle
	 * @returns {string} la borne supérieur
	 */
	get _borneSuperieure() {
		return this._borneSuperieure;
	}

	/**
	 * @description Définit la nouvelle borne supérieur de la boucle
	 * @param {string} value La nouvelle borne supérieur
	 */
	set _borneSuperieure(value) {
		this._borneSuperieure = value;
	}

	/**
	 * @description Renvoie le pas de la boucle, de combien avance ou recule la variable à chaque itération.
	 * @returns {string} Le pas
	 */
	get _pas() {
		return this._pas;
	}
	/**
	 * @description Définit le pas de la boucle, de combien avance ou recule la variable à chaque itération.
	 * @param {string} value Le pas
	 */
	set _pas(value) {
		this._pas = value;
	}

	// METHODES
	/**
	 * @description Affiche la StructureIterativeBornee sur le plan de travail
	 */
	afficher() {
		super.afficher(); // Affichage de la boucle
		// Et des informations sur notre boucle bornée.
		let divInformationsBornes = document.createElement("div");
		divInformationsBornes.className = "informationsBornes";
		if (this.etatClassique()) {
			divInformationsBornes.innerHTML = `Pour ${this._variableAIterer} allant de ${this._borneInferieure} à ${this._borneSuperieure}`;
		} else {
			divInformationsBornes.innerHTML = `Pour ${this._variableAIterer} allant de ${this._borneInferieure} à ${this._borneSuperieure} par pas croissant de ${this._pas}`;
		}
		this.appendChild(divInformationsBornes);
	}

	etatClassique() {
		// Vérifions si les bornes sont des nombres
		let borneInf = parseFloat(this._borneInferieure);
		let borneSup = parseFloat(this._borneSuperieure);

		// Si les bornes ne sont pas des nombres, on est dans une situation non classique
		if (isNaN(borneInf) || isNaN(borneSup)) {
			return false;
		}

		// Sinon, calculons la direction des bornes et vérifions si la croissance est cohérente
		let direction = borneSup - borneInf;
		if (direction == 0) return false;
		if (direction > 0) return this._estCroissant && parseFloat(this._pas) == 1;
		return !this._estCroissant && parseFloat(this._pas) == 1;
	}

	/**
	 * @description Recherche et renvoie la listes des anomalies de la boucle iterative bornée<br>
	 * Liste des Erreurs :<br>
	 *
	 * 11 : Signe de la condition d’arrêt et du pas sont différents<br>
	 * 12 : On vérifie que la boucle contient pas 7 sous-éléments ou plus
	 *
	 * @returns {Array<AnomalieConceptuelle>} La liste des anomalies
	 */
	rechercherAnomalies() {
		let mesAnomalies = [];
		// 11
		if (ErreurBoucleBorneeSansFin.detecterAnomalie(this)) {
			mesAnomalies.push(new ErreurBoucleBorneeSansFin(this));
		}
		// 12
		let tropDeSousElements = AvertissementTropDeSousElements.detecterAnomalie(this);
		if (tropDeSousElements[0]) {
			mesAnomalies.push(new AvertissementTropDeSousElements(this, tropDeSousElements[1]));
		}
		return super.rechercherAnomalies(mesAnomalies);
	}

	/**
	 * @description Renvoie le corp JSON de l'instance de la StructureItérative
	 *
	 * @returns {JSON} Le corps JSON de la StructureIterativeBornee
	 * @type {ElementGraphique}
	 * @property {ElementGraphique} typeElement Le type de la StructureIterativeBornee
	 * @property {string|number} abscisse l'abscisse
	 * @property {string|number} ordonnee l'ordonnée
	 * @property {Information} variableAIterer La variable
	 * @property {string} borneInferieure La borne inférieur
	 * @property {string} borneSuperieure La borne supérieur
	 * @property {string} pas Le pas
	 * @property {JSON} enfants les enfants de la structure itérative
	 */
	toJSON() {
		return {
			typeElement: this.constructor.name,
			abscisse: this._abscisse,
			ordonnee: this._ordonnee,
			variableAIterer: this._variableAIterer,
			borneInferieure: this._borneInferieure,
			borneSuperieure: this._borneSuperieure,
			pas: this._pas,
			enfants: this._elemParent.toJSON(),
		};
	}

	toJSONspecifier(listeElemEnfantsAConcerver) {
		return {
			typeElement: this.constructor.name,
			abscisse: this._abscisse,
			ordonnee: this._ordonnee,
			variableAIterer: this._variableAIterer,
			borneInferieure: this._borneInferieure,
			borneSuperieure: this._borneSuperieure,
			pas: this._pas,
			enfants: this._elemParent.toJSONspecifier(listeElemEnfantsAConcerver),
		};
	}

	/**
	 * @description Extrait les information de la StructureItérativeBornée
	 *
	 * @returns {Array}
	 */
	extraireInformation() {
		let i = new Information();
		i._nom = this._variableAIterer;
		i._type = "int";
		if (i._nom == "") {
			return [];
		}
		return [i];
	}
	/**
	 * @deprecated
	 * @returns {}
	 */
	getInformationDonnee() {
		return this.extraireInformation();
	}
	/**
	 * @deprecated
	 * @returns {}
	 */
	getInformationResultat() {
		return [];
	}

	/**
	 * @description Recherche dans une chaine l'information demandé
	 *
	 * @param {string} nameInformation L'information Rechercher
	 * @returns {string} L'information récupérer
	 */
	include(nameInformation) {
		return (
			this._variableAIterer.includes(nameInformation) ||
			this._pas.includes(nameInformation) ||
			this._borneInferieure.includes(nameInformation) ||
			this._borneSuperieure.includes(nameInformation)
		);
	}
	/**
	 * @description Renome le nom de la variables
	 *
	 * @param {string} ancienNom l'ancien Nom
	 * @param {string} nouveauNom le nouveau Nom
	 */
	renameInformation(ancienNom, nouveauNom) {
		if (this._variableAIterer == ancienNom) {
			this.setVariableAIterer(nouveauNom);
		}
	}
}
window.customElements.define("structure-iterative-bornee-element", StructureIterativeBornee);
