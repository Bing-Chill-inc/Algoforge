/**
 * @class ErreurSyntaxeAssignation
 * @extends {ErreurConceptuelle}
 * @classdesc La classe ErreurSyntaxeAssignation vérifie que la syntaxe d'assignation dans un problème ne contient pas d'erreur.
 * @description Crée une instance de ErreurSyntaxeAssignation.
 */
class ErreurSyntaxeAssignation extends ErreurConceptuelle {
	// Pas un égal pour l’assignation mais une flèche
	// ATTRIBUTS  -- Non --

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {Probleme} elementEmetteur - Le problème émetteur de l'erreur.
	 * @type {Probleme}
	 */
	constructor(elementEmetteur) {
		super(elementEmetteur);
	}

	// ENCAPSULATION  -- Non --

	// METHODES
	/**
	 * @static
	 * @param {Probleme} unProbleme - Instance de la classe Probleme.
	 * @type {Probleme}
	 * @returns {boolean} - Renvoi true ou false.
	 * @description Cette méthode vérifie que l'assignation dans un problème est correctement écrite.
	 */
	static detecterAnomalie(unProbleme) {
		try {
			return (
				unProbleme.getTexte().includes("=") ||
				unProbleme.getTexte().includes("->")
			);
		} catch (e) {
			return false;
		}
	}

	/**
	 * @returns {string} - Renvoie une chaine de caractères.
	 * @description Cette méthode renvoie un message indiquant qu'une assignation en surbrillance n'est pas syntaxiquement correcte.
	 */
	toString() {
		return "L'assignation en surbrillance n'est pas syntaxiquement correcte.";
	}
}
