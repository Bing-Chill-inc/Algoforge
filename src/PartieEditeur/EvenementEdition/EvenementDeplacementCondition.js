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
		console.log("Annulation de l'événement de déplacement de condition");
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
