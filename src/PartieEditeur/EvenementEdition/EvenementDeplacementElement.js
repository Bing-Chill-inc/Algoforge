/**
 * @classdesc Classe représentant un événement de déplacement d'un élément graphique dans l'éditeur.
 * @description Crée une instance de EvenementDeplacementElement.
 * @class EvenementDeplacementElement
 * @extends EvenementEdition
 */
class EvenementDeplacementElement extends EvenementEdition {
	// ATTRIBUTS
	// _elementConcerne; // ElementGraphique déplaçé. Déclaré dans la classe parente.
	_anciennePos; // [Number, Number]
	_nouvellePos; // [Number, Number]

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {ElementGraphique} elementConcerne L'élément graphique concerné par l'événement
	 * @param {Array} anciennePos La position de l'élément avant le déplacement
	 * @param {Array} nouvellePos La position de l'élément après le déplacement
	 */
	constructor(elementConcerne) {
		super(elementConcerne);
		this._anciennePos = [
			elementConcerne._abscisse,
			elementConcerne._ordonnee,
		];
	}

	// METHODES
	/**
	 * @description Ajoute la nouvelle position de l'élément
	 */
	ajouterNouvellePos() {
		this._nouvellePos = [
			this._elementConcerne._abscisse,
			this._elementConcerne._ordonnee,
		];
		return this._nouvellePos;
	}
	/**
	 * @description Annule l'événement
	 */
	annuler() {
		console.log("Annulation de l'événement de déplacement");
		this._elementConcerne._abscisse = this._anciennePos[0];
		this._elementConcerne._ordonnee = this._anciennePos[1];
		this._elementConcerne.setPosition();
	}

	/**
	 * @description Rétablit l'événement
	 */
	retablir() {
		console.log("Rétablissement de l'événement de déplacement");
		this._elementConcerne._abscisse = this._nouvellePos[0];
		this._elementConcerne._ordonnee = this._nouvellePos[1];
		this._elementConcerne.setPosition();
	}
}
