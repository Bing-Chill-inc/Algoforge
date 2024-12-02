/**
 * @class ErreurArretIteratifBornee
 * @extends {ErreurConceptuelle}
 * @classdesc La Classe ErreurArretIteratifBornee signale si une condition de sortie n'est pas située dans une boucle itérative bornée.
 */
class ErreurArretIteratifBornee extends ErreurConceptuelle {
	// ATTRIBUTS
	_structureIterative; // Structure Iterative

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {ConditionSortie} elementEmetteur - La condition de sortie émettrice de l'erreur.
	 * @type {ConditionSortie}
	 */
	constructor(elementEmetteur) {
		super(elementEmetteur);
	}

	// ENCAPSULATION
	/**
	 * @param {StructureIterative} value - Nouvelle valeur de la structure itérative associée à l'erreur.
	 * @type {StructureIterative}
	 * @description Définit la valeur de _structureIterative de ErreurArretIteratifBornee.
	 */
	set _structureIterative(value) {
		this._structureIterative = value;
	}
	/**
	 * @returns {StructureIterative} - Renvoi une StructureIterative.
	 * @description Retourne la valeur de _structureIterative de ErreurArretIteratifBornee.
	 */
	get _structureIterative() {
		return this._structureIterative;
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
	 * @returns {boolean} - Renvoi true ou false.
	 * @description La méthode detecterAnomalie vérifie si une condition de sortie est située dans une boucle itérative bornée et renvoie true si c'est le cas, sinon false.
	 */
	static detecterAnomalie(unArret) {
		let listeAntescedants = unArret.getAntescedants(
			StructureIterativeBornee,
		);
		if (listeAntescedants.length > 0) {
			return true;
		}
		return false;
	}
}
