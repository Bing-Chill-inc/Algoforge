/**
 * @classdesc Classe représentant un événement de déplacement d'une condition dans l'éditeur.
 * @description Crée une instance de EvenementDeplacementCondition.
 * @class EvenementDeplacementCondition
 * @extends EvenementEdition
 */
class EvenementDeplacementCondition extends EvenementEdition {
	// ATTRIBUTS
	// _elementConcerne; // Condition. Déclaré dans la classe parente.
	_indiceDecalage; // Number

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {Condition} elementConcerne La condition concernée par l'événement
	 * @param {Number} indiceDecalage L'indice de décalage de la condition
	 */
	constructor(elementConcerne, indiceDecalage) {
		super(elementConcerne);
		this._indiceDecalage = indiceDecalage;
	}

	// METHODES
	/**
	 * @description Annule l'événement
	 */
	annuler() {
		if (verbose)
			console.log(
				"Annulation de l'événement de déplacement de condition",
			);
		this._elementConcerne._structure.decalerCondition(
			this._elementConcerne,
			-this._indiceDecalage,
			true,
		);
	}

	/**
	 * @description Rétablit l'événement
	 */
	retablir() {
		if (verbose)
			console.log(
				"Rétablissement de l'événement de déplacement de condition",
			);
		this._elementConcerne._structure.decalerCondition(
			this._elementConcerne,
			this._indiceDecalage,
			true,
		);
	}
}
