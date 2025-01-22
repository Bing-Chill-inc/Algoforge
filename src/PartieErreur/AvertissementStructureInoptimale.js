/**
 * @class AvertissementStructureInoptimale
 * @extends {AvertissementConceptuel}
 * @classdesc La Classe AvertissementStructureInoptimale stocke les StructureSi qui sont mal utilisée.
 * @description Crée une instance de AvertissementConceptuel
 */
class AvertissementStructureInoptimale extends AvertissementConceptuel {
	// ATTRIBUTS
	_nomVariable; // String
	_valeurs; // array<String>

	// CONSTRUCTEUR

	/**
	 * @constructor
	 * @param {StructureSi} elementEmetteur - La structure conditionnelle émettrice de l'avertissement.
	 * @type {StructureSi}
	 * @param {String} [nomVariable=new String()] - Le nom de la variable concernée (par défaut, une chaîne vide).
	 * @param {Array<String>} [valeurs=new Array()] - Les valeurs associées à la variable (par défaut, une liste vide).
	 */
	constructor(
		elementEmetteur,
		nomVariable = new String(),
		valeurs = new Array(),
	) {
		super(elementEmetteur);
		this._nomVariable = nomVariable;
		this._valeurs = valeurs;
	}

	// ENCAPSULATION
	/**
	 * @param {string} value - Nouvelle valeur pour _nomVariable.
	 * @description Définit la valeur de _nomVariable de AvertissementStructureInoptimale.
	 */
	set _nomVariable(value) {
		this._nomVariable = value;
	}
	/**
	 * @returns {string} - Renvoie une chaine de caractères.
	 * @description Renvoie le nom de la variable concernée par l'avertissement.
	 */
	get _nomVariable() {
		return this._nomVariable;
	}
	/**
	 * @param {Array<string>} value - Nouvelle valeur pour _valeurs.
	 * @description Définit la valeur de _valeurs de AvertissementStructureInoptimale.
	 */
	set _valeurs(value) {
		this._valeurs = value;
	}
	/**
	 * @returns {Array<string>} - Renvoie une liste de chaine de caractères.
	 * @description Renvoie les valeurs associées à la variable dans l'avertissement.
	 */
	get _valeurs() {
		return this._valeurs;
	}

	// METHODES
	/**
	 * @returns {string} - Renvoie une chaine de caractères.
	 * @description Cette méthode renvoie un message indiquant qu'une structure conditionnelle en surbrillance est mal utilisée.
	 */
	toString() {
		return "La structure conditionnelle en surbrillance est mal utilisée. Un switch est préférable.";
	}
	/**
	 * @static
	 * @param {StructureSi} StructureSi - Instance de la classe StructureSi.
	 * @type {StructureSi}
	 * @returns {Array} - Renvoie une liste dont le premier élément est true ou false si true le deuxième élément est la variable concernée par l'élément et le troisième élément est la valeur.
	 * @description La méthode detecterAnomalie cherche s'il y a une StructureSi mal utilisée.
	 */
	static detecterAnomalie(StructureAlternative) {
		/* 
        Si a = 0 | a = 1 | a = 2 | Sinon Structure Switch plus adaptée
        */
		try {
			const conditions = StructureAlternative._listeConditions.children;
			if (conditions.length < 3) {
				return [false];
			}
			let libelle = conditions[0].querySelector(".libelle").textContent;
			let caracteresAvantEgal;
			let valeurs = [];

			if (libelle.includes("=")) {
				caracteresAvantEgal = libelle.split("=")[0].trim();
			}
			// Vérifier si tout les conditions contient un = et que la variable traiter est constante
			for (let condition of conditions) {
				console.log(condition);
				libelle = condition.querySelector(".libelle").textContent;
				if (libelle.toLowerCase().includes("sinon")) {
					// default statement structure switch
					continue;
				}
				if (
					!libelle.includes("=") ||
					libelle.toLowerCase().includes("ou") ||
					libelle.toLowerCase().includes("et")
				) {
					return [false];
				}
				if (caracteresAvantEgal != libelle.split("=")[0].trim()) {
					return [false];
				}
				valeurs.push(libelle.split("=")[1].trim());
			}

			return [true, caracteresAvantEgal, valeurs];
		} catch (e) {
			console.error(e);
			return [false];
		}
	}
}
