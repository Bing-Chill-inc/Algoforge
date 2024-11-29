/**
 * @class ErreurComparaisonSwitch
 * @extends {ErreurConceptuelle}
 * @classdesc La Classe ErreurComparaisonSwitch stocke les StructureSwitch qui utilisent des comparaisons.
 * @description Crée une instance de ErreurComparaisonSwitch
 */
class ErreurComparaisonSwitch extends ErreurConceptuelle {
	// ATTRIBUTS
	_nomDonnee; // String

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {StructureSwitch} elementEmetteur - La structure switch émettrice de l'erreur.
	 * @type {StructureSwitch}
	 * @param {String} [nomDonnee=new String()] - Le nom de la variable concernée (par défaut, une chaîne vide).
	 */
	constructor(elementEmetteur, nomDonnee = new String()) {
		super(elementEmetteur);
		this._nomDonnee = nomDonnee;
	}

	// ENCAPSULATION
	/**
	 * @param {string} value - Nouvelle valeur pour _nomDonnee.
	 * @description Définit la valeur de _nomDonnee de ErreurComparaisonSwitch
	 */
	set _nomDonnee(value) {
		this._nomDonnee = value;
	}
	/**
	 * @returns {string} - Renvoi une chaine de caractères.
	 * @description Renvoie le nom de la variable concernés par l'erreur.
	 */
	get _nomDonnee() {
		return this._nomDonnee;
	}

	// METHODES
	/**
	 * @returns {string} - Renvoie une chaine de caractères.
	 * @description Renvoie un message indiquant que une comparaisons contient une comparaisons.
	 */
	toString() {
		return "La structure conditionnelle 'switch' en surbrillance contient des comparaisons.";
	}
	/**
	 * @static
	 * @param {StructureSwitch} StructureSwitch - Instance de la classe StructureSwitch.
	 * @type {StructureSwitch}
	 * @returns {Array} - Renvoi une liste dont le premier élément est true ou false si true le deuxième élément est l'expression a tester de la StructureSwitch.
	 * @description La méthode detecterAnomalie cherche si dans une StructureSwitch il y a des comparaisons.
	 */
	static detecterAnomalie(StructureSwitch) {
		try {
			for (let condition of StructureSwitch._listeConditions.children) {
				if (
					condition
						.querySelector(".libelle")
						.textContent.includes("=")
				) {
					return [true, StructureSwitch._expressionATester];
				}
			}
			return [false];
		} catch (e) {
			console.error(e);
			return [false];
		}
	}
}
