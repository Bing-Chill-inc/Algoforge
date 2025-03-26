/**
 * @class Type
 * @classdesc Représente les différents types de données.
 */
class Type {
	// Enum type
	static Boolean = "Booléen";
	static Char = "Caractère";
	static String = "Chaine de caractères";
	static double = "Nombre décimal";
	static positive_int = "Entier positif";
	static negative_int = "Entier négatif";
	static positive_int_or_null = "Entier positif ou nul";
	static negative_int_or_null = "Entier négatif ou nul";
	static int = "Entier";
	static undefined = undefined;

	static allTypes = [
		Type.Boolean,
		Type.Char,
		Type.String,
		Type.int,
		Type.positive_int,
		Type.positive_int_or_null,
		Type.negative_int,
		Type.negative_int_or_null,
		Type.double,
	];

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {string} nom - Le nom du type.
	 */
	constructor(nom) {
		this._nom = nom;
	}

	// ENCAPSULATION
	/**
	 * @description Renvoie le nom du type.
	 * @returns {string} Le nom du type.
	 */
	get _nom() {
		return this._nom;
	}

	/**
	 * @description Définit le nom du type.
	 * @param {string} value - Le nouveau nom du type.
	 */
	set _nom(value) {
		this._nom = value;
	}

	// METHODES
	/**
	 * @description Ajoute une fonction de conformité au type.
	 * @param {Function} fonction - La fonction de conformité à ajouter.
	 */
	ajouterFonctionDeConformite(fonction) {
		this.estConforme = fonction;
	}
}
