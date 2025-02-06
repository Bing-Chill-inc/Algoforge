/**
 * @classdesc Classe représentant un événement composé de plusieurs événements.
 * @description Crée une instance de EvenementComposite.
 * @class EvenementComposite
 * @extends EvenementEdition
 */
class EvenementComposite extends EvenementEdition {
	// ATTRIBUTS
	_evenements = []; // Array<EvenementEdition>

	// CONSTRUCTEUR
	/**
	 * @constructor
	 */
	constructor() {
		super(null);
	}

	// METHODES
	/**
	 * @description Ajoute un événement à la liste des événements
	 * @param {EvenementEdition} evenement L'événement à ajouter
	 */
	ajouterEvenement(evenement) {
		this._evenements.push(evenement);
	}

	/**
	 * @description Annule les événements
	 */
	annuler() {
		if (verbose) console.log("Annulation de l'événement composite");
		this._evenements.forEach((evenement) => evenement.annuler());
	}

	/**
	 * @description Rétablit les événements
	 */
	retablir() {
		if (verbose) console.log("Rétablissement de l'événement composite");
		this._evenements.forEach((evenement) => evenement.retablir());
	}
}
