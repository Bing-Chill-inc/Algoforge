/**
 * @class AnomalieConceptuelle
 * @classdesc La classe AnomalieConceptuelle est la base de tous les classes d'anomalie de l'éditeur d'algorithmes
 * @description Crée une instance d'AnomalieConceptuelle.
 */
export class AnomalieConceptuelle {
	// ATTRIBUTS
	__elementEmetteur: any; // Element Graphique

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {ElementGraphique} elementEmetteur - L'élément graphique émetteur de l'anomalie.
	 * @type {ElementGraphique}
	 */
	constructor(elementEmetteur: any) {
		this._elementEmetteur = elementEmetteur;
	}

	// ENCAPSULATION
	/**
	 * @param {ElementGraphique} value - La nouvelle valeur de l'élément émetteur.
	 * @type {ElementGraphique}
	 * @description Définit la valeur de _elementEmetteur d'AnomalieConceptuelle
	 */
	set _elementEmetteur(value: any) {
		this.__elementEmetteur = value;
	}
	/**
	 * @returns {ElementGraphique} - Revoi un ElementGraphique.
	 * @description Renvoie la valeur de _elementEmetteur d'AnomalieConceptuelle
	 */
	get _elementEmetteur() {
		return this.__elementEmetteur;
	}

	// METHODES
	/**
	 * @description Méthode abstraite définit dans les sous-classes
	 */
	toString() {}
}
