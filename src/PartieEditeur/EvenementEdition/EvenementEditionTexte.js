class EvenementEditionTexte extends EvenementEdition {
	// ATTRIBUTS
	// _elementConcerne; // ElementGraphique || Condition. Déclaré dans la classe parente.
	_ancienTexte; // Texte antérieur à l'événement
	_nouveauTexte; // Texte postérieur

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {ElementGraphique} elementConcerne L'élément graphique concerné par l'événement
	 * @param {String} ancienTexte Le texte antérieur à l'événement
	 * @param {String} nouveauTexte Le texte postérieur
	 */
	constructor(elementConcerne, ancienTexte, nouveauTexte) {
		super(elementConcerne);
		this._ancienTexte = ancienTexte;
		this._nouveauTexte = nouveauTexte;
	}

	// METHODES
	/**
	 * @description Annule l'événement
	 */
	annuler() {
		if (verbose)
			console.log("Annulation de l'événement de modification de texte");
	}

	/**
	 * @description Rétablit l'événement
	 */
	retablir() {
		if (verbose)
			console.log(
				"Rétablissement de l'événement de modification de texte",
			);
	}
}
