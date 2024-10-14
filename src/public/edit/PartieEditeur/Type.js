class Type {
	// Enum type
	static Boolean = "Booléen";
	static Char = "Caractère";
	static String = "Chaine de caractères";
	static double = "Nombre décimal";
	static unsigned_int = "Entier non signé";
	static int = "Entier";
	static undefined = undefined;

	static allTypes = [Type.Boolean, Type.Char, Type.String, Type.int, Type.unsigned_int, Type.double];

	// CONSTRUCTEUR
	constructor(nom) {
		this._nom = nom;
	}

	// ENCAPSULATION
	get _nom() {
		return this._nom;
	}

	set _nom(value) {
		this._nom = value;
	}

	// METHODES
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
		if (unString[0] == "'" && unString[unString.length - 1] == "'" && unString.length == 3) {
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
			let type1 = Type.DetecterLeType(unString.substring(0, dernierIndex));
			let type2 = Type.DetecterLeType(unString.substring(dernierIndex + 1));
			courantType = dictionnaireDeDonnee.convertionVariable(type1, type2);
			return courantType;
		}
		if (unString.includes("-")) {
			const dernierIndex = unString.lastIndexOf("-");
			let type1 = Type.DetecterLeType(unString.substring(0, dernierIndex));
			let type2 = Type.DetecterLeType(unString.substring(dernierIndex + 1));
			courantType = dictionnaireDeDonnee.convertionVariable(type1, type2);
			return courantType;
		}
		if (unString.includes("*")) {
			const dernierIndex = unString.lastIndexOf("*");
			let type1 = Type.DetecterLeType(unString.substring(0, dernierIndex));
			let type2 = Type.DetecterLeType(unString.substring(dernierIndex + 1));
			courantType = dictionnaireDeDonnee.convertionVariable(type1, type2);
			return courantType;
		}
		if (unString.includes("/")) {
			const dernierIndex = unString.lastIndexOf("/");
			let type1 = Type.DetecterLeType(unString.substring(0, dernierIndex));
			let type2 = Type.DetecterLeType(unString.substring(dernierIndex + 1));
			courantType = dictionnaireDeDonnee.convertionVariable(type1, type2);
			return courantType;
		}
		return Type.undefined;
	}

	ajouterFonctionDeConformite(fonction) {
		this.estConforme = fonction;
	}
}
