class EvenementSuppressionLiaison extends EvenementEdition {
	// ATTRIBUTS
	// _elementConcerne; // ElementGraphique, ici parent de la relation. Déclaré dans la classe parente.
	_elementEnfant; // ElementGraphique

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {ElementGraphique} elementConcerne L'élément graphique concerné par l'événement
	 * @param {ElementGraphique} elementEnfant L'élément graphique à délier
	 */
	constructor(elementConcerne, elementEnfant) {
		super(elementConcerne);
		this._elementEnfant = elementEnfant;
	}

	// METHODES
	/**
	 * @description Annule l'événement
	 */
	annuler() {
		if (verbose)
			console.log("Annulation de l'événement de suppression de liaison");
		this._elementConcerne._elemParent.lierEnfant(this._elementEnfant);
	}

	/**
	 * @description Rétablit l'événement
	 */
	retablir() {
		if (verbose)
			console.log(
				"Rétablissement de l'événement de suppression de liaison",
			);
		this._elementConcerne._elemParent.delierEnfant(this._elementEnfant);
	}
}
