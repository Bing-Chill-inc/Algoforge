/**
 * @classdesc Classe représentant un événement dans l'éditeur. Utilisé pour constituer les piles d'annulation et de rétablissement. Principalement utilisée comme classe parente.
 * @description Crée une instance de EvenementEdition.
 * @abstract
 * @class EvenementEdition
 */
export class EvenementEdition {
	// ATTRIBUTS
	__elementConcerne: any; // ElementGraphique || Condition

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {ElementGraphique|Condition} elementConcerne L'élément graphique ou la condition concernée
	 */
	constructor(elementConcerne: any) {
		this._elementConcerne = elementConcerne;
	}

	// ENCAPSULATION
	/**
	 * @description Renvoie l'élément concerné par l'événement
	 * @returns {ElementGraphique|Condition} L'élément concerné
	 */
	get _elementConcerne() {
		return this.__elementConcerne;
	}

	/**
	 * @description Définie l'élément concerné par l'événement
	 * @param {ElementGraphique|Condition} value Le nouvel élément concerné
	 */
	set _elementConcerne(value: any) {
		this.__elementConcerne = value;
	}

	// METHODES
	/**
	 * @description Annule l'événement
	 */
	annuler() {
		console.log("Annulation de l'événement");
	}

	/**
	 * @description Rétablit l'événement
	 */
	retablir() {
		console.log("Rétablissement de l'événement");
	}
}
