/**
 * @classdesc Classe représentant un événement de déplacement de plusieurs éléments graphiques dans l'éditeur.
 * @description Crée une instance de EvenementDeplacementElementMultiples.
 * @class EvenementDeplacementElementMultiples
 * @extends EvenementEdition
 */
class EvenementDeplacementElementMultiples extends EvenementEdition {
	// ATTRIBUTS
	_elementsDeplaces = []; // Array<EvenementDeplacementElement>

	// CONSTRUCTEUR
	/**
	 * @constructor
	 */
	constructor() {
		super(null);
	}

	// METHODES
	/**
	 * @description Ajoute un élément déplacé à la liste des éléments déplacés
	 * @param {EvenementDeplacementElement} elementDeplace L'élément déplacé à ajouter
	 */
	ajouterElementDeplace(elementDeplace) {
		this._elementsDeplaces.push(elementDeplace);
	}

	/**
	 * @description Vérifie si les éléments ont été déplacés
	 * @returns {boolean} True si les éléments ont été déplacés, sinon False
	 */
	estDecale() {
		if (this._elementsDeplaces.length == 0) return false;

		let ancinnePos = this._elementsDeplaces[0]._anciennePos;
		let nouvellePos = this._elementsDeplaces[0].ajouterNouvellePos();

		for (let i = 1; i < this._elementsDeplaces.length; i++) {
			this._elementsDeplaces[i].ajouterNouvellePos();
		}

		if (
			ancinnePos[0] == nouvellePos[0] &&
			ancinnePos[1] == nouvellePos[1]
		) {
			return false;
		}
		return true;
	}

	/**
	 * @description Annule l'événement
	 */
	annuler() {
		if (verbose) console.log("Annulation de l'événement de déplacement");
		for (let i = 0; i < this._elementsDeplaces.length; i++) {
			this._elementsDeplaces[i].annuler();
		}
	}

	/**
	 * @description Rétablit l'événement
	 */
	retablir() {
		if (verbose)
			console.log("Rétablissement de l'événement de déplacement");
		for (let i = 0; i < this._elementsDeplaces.length; i++) {
			this._elementsDeplaces[i].retablir();
		}
	}
}
