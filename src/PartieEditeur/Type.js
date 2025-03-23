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
	 * @description Détecte le type d'une chaîne de caractères.
	 * @param {string} unString - La chaîne de caractères à analyser.
	 * @returns {string|undefined} Le type détecté ou undefined si aucun type n'est détecté.
	 */
	static DetecterLeType(unString) {
		unString = unString.trim();
		const ascii0 = "0".charCodeAt(0); // code ASCII de '0'
		const ascii9 = "9".charCodeAt(0); // code ASCII de '9'
		const asciiSeparateur = ".".charCodeAt(0); // code ASCII de '.' (Séparateur de décimale)
		const asciiSigne = "-".charCodeAt(0); // code ASCII de '-' (Signe du décimale)
		//Detection boolean
		if (
			unString.toLowerCase() == "true" ||
			unString.toLowerCase() == "false" ||
			unString.toLowerCase() == "vrai" ||
			unString.toLowerCase() == "faux"
		) {
			return Type.Boolean;
		}

		//Detection char
		if (
			unString[0] == "'" &&
			unString[unString.length - 1] == "'" &&
			unString.length == 3
		) {
			return Type.Char;
		}

		//Detection String
		if (unString[0] == '"' && unString[unString.length - 1] == '"') {
			return Type.String;
		}

		//Dection Nombre
		let containUnPoint = false;
		let isUnsigned = true;
		let isANombre = true;

		for (let i = 0; i < unString.length; i++) {
			const courantCodeAscii = unString.charCodeAt(i);
			//Traitement Signe
			if (courantCodeAscii == asciiSigne) {
				if (i != 0) {
					isANombre = false;
				}
				isUnsigned = false;
				continue;
			}
			//Traitement Séparateur
			if (courantCodeAscii == asciiSeparateur) {
				if (containUnPoint) {
					// Contient 2 point donc pas un nombre
					isANombre = false;
				}
				containUnPoint = true;
				if (i == 0) {
					// Le point se situ au début pas un nombre
					isANombre = false;
				}
				continue;
			}
			//Regarde si c'est le char n'est pas un nombre
			if (courantCodeAscii < ascii0 || courantCodeAscii > ascii9) {
				isANombre = false;
			}
		}
		if (isANombre) {
			if (containUnPoint) {
				return Type.double;
			}
			if (isUnsigned) {
				return Type.unsigned_int;
			}
			return Type.int;
		}
		let courantType = Type.undefined;
		if (unString.includes("+")) {
			const dernierIndex = unString.lastIndexOf("+");
			let type1 = Type.DetecterLeType(
				unString.substring(0, dernierIndex),
			);
			let type2 = Type.DetecterLeType(
				unString.substring(dernierIndex + 1),
			);
			courantType = dictionnaireDeDonnee.convertionVariable(type1, type2);
			return courantType;
		}
		if (unString.includes("-")) {
			const dernierIndex = unString.lastIndexOf("-");
			let type1 = Type.DetecterLeType(
				unString.substring(0, dernierIndex),
			);
			let type2 = Type.DetecterLeType(
				unString.substring(dernierIndex + 1),
			);
			courantType = dictionnaireDeDonnee.convertionVariable(type1, type2);
			return courantType;
		}
		if (unString.includes("*")) {
			const dernierIndex = unString.lastIndexOf("*");
			let type1 = Type.DetecterLeType(
				unString.substring(0, dernierIndex),
			);
			let type2 = Type.DetecterLeType(
				unString.substring(dernierIndex + 1),
			);
			courantType = dictionnaireDeDonnee.convertionVariable(type1, type2);
			return courantType;
		}
		if (unString.includes("/")) {
			const dernierIndex = unString.lastIndexOf("/");
			let type1 = Type.DetecterLeType(
				unString.substring(0, dernierIndex),
			);
			let type2 = Type.DetecterLeType(
				unString.substring(dernierIndex + 1),
			);
			courantType = dictionnaireDeDonnee.convertionVariable(type1, type2);
			return courantType;
		}
		return Type.undefined;
	}

	/**
	 * @description Ajoute une fonction de conformité au type.
	 * @param {Function} fonction - La fonction de conformité à ajouter.
	 */
	ajouterFonctionDeConformite(fonction) {
		this.estConforme = fonction;
	}
}
