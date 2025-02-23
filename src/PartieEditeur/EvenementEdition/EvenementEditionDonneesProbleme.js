/**
 * @classdesc Classe représentant un événement de modification des données d'un problème dans l'éditeur.
 * @description Crée une instance de EvenementEditionDonneesProbleme.
 * @class EvenementEditionDonneesProbleme
 * @extends EvenementEditionTexte
 */
class EvenementEditionDonneesProbleme extends EvenementEditionTexte {
	// ATTRIBUTS
	// _elementConcerne; // ElementGraphique || Condition. Déclaré dans la classe parente.
	// _ancienTexte // Texte antérieur à l'événement. Déclaré dans la classe parente.
	// _nouveauTexte // Texte postérieur. Déclaré dans la classe parente.

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {ElementGraphique} elementConcerne L'élément graphique concerné par l'événement
	 * @param {String} ancienTexte Le texte antérieur à l'événement
	 * @param {String} nouveauTexte Le texte postérieur
	 */
	constructor(elementConcerne, ancienTexte, nouveauTexte) {
		super(elementConcerne, ancienTexte, nouveauTexte);
	}

	// METHODES
	/**
	 * @description Annule l'événement
	 */
	annuler() {
		if (verbose)
			console.log(
				"Annulation de l'événement de modification de listeDonnes de problème",
			);
		this._elementConcerne.listeDonnes = this._ancienTexte;
		this._elementConcerne.updateAccolades();
	}

	/**
	 * @description Rétablit l'événement
	 */
	retablir() {
		if (verbose)
			console.log(
				"Rétablissement de l'événement de modification de listeDonnes de problème",
			);
		this._elementConcerne.listeDonnes = this._nouveauTexte;
		this._elementConcerne.updateAccolades();
	}
}
