/**
 * @classdesc Classe représentant un événement dans l'éditeur. Utilisé pour constituer les piles d'annulation et de rétablissement. Principalement utilisée comme classe parente.
 * @description Crée une instance de EvenementEdition.
 * @abstract
 * @class EvenementEdition
 */
class EvenementEdition {
	// ATTRIBUTS
	_elementConcerne; // ElementGraphique || Condition

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {ElementGraphique|Condition} elementConcerne L'élément graphique ou la condition concernée
	 */
	constructor(elementConcerne) {
		this._elementConcerne = elementConcerne;
	}

	// ENCAPSULATION
	/**
	 * @description Renvoie l'élément concerné par l'événement
	 * @returns {ElementGraphique|Condition} L'élément concerné
	 */
	get _elementConcerne() {
		return this._elementConcerne;
	}

	/**
	 * @description Définie l'élément concerné par l'événement
	 * @param {ElementGraphique|Condition} value Le nouvel élément concerné
	 */
	set _elementConcerne(value) {
		this._elementConcerne = value;
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
