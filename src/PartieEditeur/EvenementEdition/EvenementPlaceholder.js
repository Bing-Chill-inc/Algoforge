/**
 * @classdesc Classe représentant un événement placeholder.
 * @description Crée une instance de EvenementPlaceholder.
 * @class EvenementPlaceholder
 * @extends EvenementEdition
 */
class EvenementPlaceholder extends EvenementEdition {
	// ATTRIBUTS
	// - NON -

	// CONSTRUCTEUR
	/**
	 * @constructor
	 */
	constructor() {
		super(null);
	}

	// METHODES

	/**
	 * @description Annule les événements
	 */
	annuler() {
		if (verbose) console.log("Annulation de l'événement placeholder");
	}

	/**
	 * @description Rétablit les événements
	 */
	retablir() {
		if (verbose) console.log("Rétablissement de l'événement placeholder");
	}
}
