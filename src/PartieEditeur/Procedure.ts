import { Probleme } from "./Probleme";

/**
 * @class Procedure
 * @classdesc La classe procédure qui hérite de Probleme
 * @extends {Probleme}
 * @description Crée une instance de Procedure
 */
export class Procedure extends Probleme {
	static readonly typeElement = "Procedure";
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
		abscisse: number|undefined,
		ordonnee: number|undefined,
		libelle = " ", // Espacement insécable, pour que le navigateur sache où placer le curseur
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
