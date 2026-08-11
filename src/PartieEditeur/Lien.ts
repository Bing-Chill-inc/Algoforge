/**
 * @class Lien
 * @classdesc La classe Lien fait la liaison graphique entre des éléments graphiques, et a pour but d'être héritée
 * @description Crée une instance de lien
 * @abstract
 */
export class Lien {
	// ATTRIBUTS
	__elemGraphiqueParent: any; // L'élément graphique parent de la relation
	__elemGraphiqueEnfant: any; // L'élément graphique enfant de la relation
	_espaceTravail; // EspaceTravail

	// CONSTRUCTEUR -non instanciable-
	/**
	 * @constructor
	 * @param {ElementGraphique} elemGraphiqueParent L'élément graphique parent de la relation
	 * @param {ElementGraphique} elemGraphiqueEnfant L'élément graphique enfant de la relation
	 * @param {HTMLElement} espaceTravail L'espace de travail
	 */
	constructor(elemGraphiqueParent: any, elemGraphiqueEnfant: any, espaceTravail: any) {
		this._elemGraphiqueParent = elemGraphiqueParent;
		this._elemGraphiqueEnfant = elemGraphiqueEnfant;
		this._espaceTravail = espaceTravail;
	}

	// ENCAPSULATION
	/**
	 * @description Renvoie l'élément graphique parent
	 * @returns {ElementGraphique} L'élément graphique parent
	 */
	get _elemGraphiqueParent() {
		return this.__elemGraphiqueParent;
	}

	/**
	 * @description Définit l'élément graphique parent
	 * @param {ElementGraphique} value L'élément graphique parent
	 */
	set _elemGraphiqueParent(value: any) {
		this.__elemGraphiqueParent = value;
	}

	/**
	 * @description Renvoie l'élément graphique enfant
	 * @returns {ElementGraphique} L'élément graphique enfant
	 */
	get _elemGraphiqueEnfant() {
		return this.__elemGraphiqueEnfant;
	}

	/**
	 * @description Définit l'élément graphique enfant
	 * @param {ElementGraphique} value L'élément graphique enfant
	 */
	set _elemGraphiqueEnfant(value: any) {
		this.__elemGraphiqueEnfant = value;
	}

	// METHODES
	/**
	 * @description Dessine le lien
	 */
	update() {
		// Défini dans les classes filles
	}

	/**
	 * @description Supprime le lien
	 */
	supprimer() {
		// Défini dans les classes filles
	}
}
