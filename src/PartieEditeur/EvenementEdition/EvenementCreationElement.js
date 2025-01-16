/**
 * @classdesc Classe représentant un événement de création d'un élément graphique ou d'une condition dans l'éditeur.
 * @description Crée une instance de EvenementCreationElement.
 * @class EvenementCreationElement
 * @extends EvenementEdition
 */
class EvenementCreationElement extends EvenementEdition {
	// ATTRIBUTS
	_plan; // Plan

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {ElementGraphique|Condition} elementConcerne L'élément graphique ou la condition concernée
	 * @param {Plan} plan Le plan dans lequel l'élément est créé
	 */
	constructor(elementConcerne, plan) {
		super(elementConcerne);
		this._plan = plan;
	}

	// METHODES
	/**
	 * @description Annule l'événement
	 */
	annuler() {
		if (verbose) console.log("Annulation de l'événement de création");
		this._plan.removeChild(this._elementConcerne);
	}

	/**
	 * @description Rétablit l'événement
	 */
	retablir() {
		if (verbose) console.log("Rétablissement de l'événement de création");
		this._plan.appendChild(this._elementConcerne);
	}
}
