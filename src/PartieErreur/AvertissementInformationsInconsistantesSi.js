/**
 * @class AvertissementInformationsInconsistantesSi
 * @extends {AvertissementConceptuel}
 * @classdesc La Classe AvertissementInformationsInconsistantesSi stocke les StructureSi qui utilisent des variables qui ne sont pas consistantes.
 * @description Crée une instance de AvertissementInformationsInconsistantesSi
 */
class AvertissementInformationsInconsistantesSi extends AvertissementConceptuel {
	// ATTRIBUTS
	_nomsVariablesConcernees; // array<String>

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {StructureSi} elementEmetteur - L'élément émetteur de l'avertissement.
	 * @type {StructureSi}
	 * @param {Array<String>} [nomsVariablesConcernees=new Array()] - La liste des noms de variables concernées par l'avertissement (par défaut, une liste vide).
	 */
	constructor(elementEmetteur, nomsVariablesConcernees = new Array()) {
		super(elementEmetteur);
		this._nomsVariablesConcernees = nomsVariablesConcernees;
	}

	// ENCAPSULATION

	/**
	 * @param {Array<String>} value - Nouvelle valeur pour _nomsVariablesConcernees.
	 * @description Définit la valeur de _nomsVariablesConcernees de AvertissementInformationsInconsistantesSi.
	 */
	set _nomsVariablesConcernees(value) {
		this._nomsVariablesConcernees = value;
	}
	/**
	 * @returns {Array<String>} - Renvoie une liste de chaine de caractères.
	 * @description Renvoie la liste des noms de variables concernées par l'avertissement.
	 */
	get _nomsVariablesConcernees() {
		return this._nomsVariablesConcernees;
	}
	// METHODES
	/**
	 * @returns {string} - Renvoie une chaine de caractères.
	 * @description Renvoie un message indiquant la variable qui est inconsitante.
	 */
	toString() {
		return (
			"La structure conditionnelle en surbrillance contient les variables suivantes qui ne sont pas consistantes : " +
			this._nomsVariablesConcernees +
			" ."
		);
	}
	/**
	 * @static
	 * @param {StructureSi} StructureAlternative
	 * @type {StructureSi}
	 * @returns {Array} - Renvoie une liste dont le premier élément est true ou false si true le deuxième élément est la variable inconsistant.
	 * @description La méthode detecterAnomalie cherche si dans une StructureSi il y a des variables qui n'ont aucun lien entre eux.
	 */
	static detecterAnomalie(StructureAlternative) {
		try {
			/*
            a = 3 | b = 5
            a = 4 | b= 4 && a = 3 | b=3 && a = 3
            */
			const conditions = StructureAlternative._listeConditions.children;

			//const regex = /^(.*?)\s*([=!<>]=?)\s*(.*?)$/;
			// Expression régulière pour correspondre à tous les mots composés uniquement de caractères de "a" à "z"
			var regex = /[a-z]+/gi;
			let nbCondition = 0;
			for (let condition of conditions) {
				let libelle = condition.querySelector(".libelle").textContent;
				if (
					libelle.trim().toLowerCase() == "sinon" ||
					libelle.trim == ""
				) {
					continue;
				}
				let mesVariables = libelle.match(regex);
				for (let condition of conditions) {
					let libelle2 =
						condition.querySelector(".libelle").textContent;
					if (libelle.trim().toLowerCase() == "sinon") {
						continue;
					}
					let mesVariables2 = libelle2.match(regex);
					if (libelle2.trim().toLowerCase() == "sinon") {
						continue;
					}
					if (!mesVariables || !mesVariables2) {
						continue;
					}
					// Vérifier si les listes ont des éléments en commun
					let ontEnCommun = mesVariables.some((variable) =>
						mesVariables2.includes(variable),
					);
					if (!ontEnCommun) {
						return [true, mesVariables2];
					}
				}
				nbCondition = nbCondition + 1;
			}

			return [false];
		} catch (e) {
			console.error(e);
			return [false];
		}
	}
}
