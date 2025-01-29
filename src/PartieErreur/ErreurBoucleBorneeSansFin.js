/**
 * @class ErreurBoucleBorneeSansFin
 * @extends {ErreurConceptuelle}
 * @classdesc La Classe ErreurBoucleBorneeSansFin stocke les StructureIterativebornee dont les bornes ne sont pas correctes e qui en fait une boucle infinie.
 * @description Crée une instance de ErreurBoucleBorneeSansFin
 */
class ErreurBoucleBorneeSansFin extends ErreurConceptuelle {
	// ATTRIBUTS  -- Non --

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {StructureIterativebornee} elementEmetteur - La StructureIterativebornee émettrice de l'avertissement.
	 * @type {StructureIterativebornee}
	 */
	constructor(elementEmetteur) {
		super(elementEmetteur);
	}

	// ENCAPSULATION  -- Non --

	// METHODES
	/**
	 * @returns {string} - Renvoie une chaine de caractères.
	 * @description Renvoie un message indiquant qu'une boucle est mal bornée ce qui fait qu'elle n'a pas de fin.
	 */
	toString() {
		return "La boucle en surbrillance est bornée mais n'a pas de fin.";
	}

	// Vérifie si la boucle bornée est bien bornée
	/**
	 * @static
	 * @param {StructureIterativebornee} uneBoucleBornee - Instance de la classe ConditionSortie.
	 * @type {StructureIterativebornee}
	 * @returns {boolean} - Renvoie true ou false.
	 * @description La méthode detecterAnomalie vérifie si la boucle bornée est bien bornée.
	 */
	static detecterAnomalie(uneBoucleBornee) {
		try {
			// On vérifie que la borne inférieure et supérieure sont des nombres
			if (
				isNaN(uneBoucleBornee._borneInferieure) ||
				isNaN(uneBoucleBornee._borneSuperieure)
			) {
				return false;
			} else {
				// conversion des bornes en nombre
				borneInferieure = Number(uneBoucleBornee._borneInferieure);
				borneSuperieure = Number(uneBoucleBornee._borneSuperieure);
				pas = Number(uneBoucleBornee._pas);
				let courant = borneInferieure;
				while (courant <= borneSuperieure && pas != 0) {
					if (courant >= borneSuperieure) {
						return false;
					}
					courant += pas;
				}
			}
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}
}
