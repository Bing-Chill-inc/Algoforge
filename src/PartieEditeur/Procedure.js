/**
 * @class Procedure
 * @classdesc La classe procédure qui hérite de Probleme
 * @extends {Probleme}
 * @description Crée une instance de Procedure
 */
class Procedure extends Probleme {
	// ATTRIBUTS -non-

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {number|string} abscisse - L'abscisse de la procédure
	 * @param {number|string} ordonnee - L'ordonnée de la procédure
	 * @param {string} libelle - Le libellé de la procédure
	 * @param {Array} listeDonnes - Obsolète
	 * @param {Array} listeResultats - Obsolète
	 */
	constructor(
		abscisse,
		ordonnee,
		libelle,
		listeDonnes = [],
		listeResultats = [],
	) {
		super(abscisse, ordonnee, libelle, listeDonnes, listeResultats);
	}

	// ENCAPSULATION -non-

	// METHODES
	/**
	 * @description Affiche la procédure en utilisant la méthode de Probleme
	 */
	afficher() {
		super.afficher();
	}
}
window.customElements.define("procedure-element", Procedure);
