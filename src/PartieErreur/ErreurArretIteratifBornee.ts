import { ErreurConceptuelle } from "./ErreurConceptuelle";
import { classes } from "../runtime/classRegistry";

/**
 * @class ErreurArretIteratifBornee
 * @extends {ErreurConceptuelle}
 * @classdesc La Classe ErreurArretIteratifBornee signale si une condition de sortie n'est pas située dans une boucle itérative bornée.
 */
export class ErreurArretIteratifBornee extends ErreurConceptuelle {
	// ATTRIBUTS
	__structureIterative: any; // Structure Iterative

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {ConditionSortie} elementEmetteur - La condition de sortie émettrice de l'erreur.
	 * @type {ConditionSortie}
	 */
	constructor(elementEmetteur: any) {
		super(elementEmetteur);
	}

	// ENCAPSULATION
	/**
	 * @param {StructureIterative} value - Nouvelle valeur de la structure itérative associée à l'erreur.
	 * @type {StructureIterative}
	 * @description Définit la valeur de _structureIterative de ErreurArretIteratifBornee.
	 */
	set _structureIterative(value: any) {
		this.__structureIterative = value;
	}
	/**
	 * @returns {StructureIterative} - Renvoie une StructureIterative.
	 * @description Retourne la valeur de _structureIterative de ErreurArretIteratifBornee.
	 */
	get _structureIterative() {
		return this.__structureIterative;
	}

	// METHODES
	/**
	 * @returns {string} - Renvoie une chaine de caractères.
	 * @description Renvoie un message indiquant que la condition de sortie est située dans une boucle itérative bornée.
	 */
	toString() {
		return "L'arrêt en surbrillance est dans une boucle itérative bornée";
	}
	/**
	 * @static
	 * @param {ConditionSortie} unArret - Instance de la classe ConditionSortie.
	 * @type {ConditionSortie}
	 * @returns {boolean} - Renvoie true ou false.
	 * @description La méthode detecterAnomalie vérifie si une condition de sortie est située dans une boucle itérative bornée et renvoie true si c'est le cas, sinon false.
	 */
	static detecterAnomalie(unArret: this) {
		let listeAntescedants = unArret.getAntescedants(
			classes.StructureIterativeBornee,
		);
		if (listeAntescedants.length > 0) {
			return true;
		}
		return false;
	}
}
