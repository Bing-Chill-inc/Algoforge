/**
 * @class Information
 * @classdesc Représente une information avec un nom, un type et une signification.
 */
export class Information {
	// ATTRIBUTS
	__nom: any; // String
	__type: any; // Type
	__signification: any; // String

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {string} _nom - Le nom de l'information.
	 * @param {Type} _type - Le type de l'information.
	 * @param {string} _signification - La signification de l'information.
	 */
	constructor(_nom: any, _type: any, _signification: any) {
		this._nom = _nom;
		this._type = _type;
		this._signification = _signification;
	}

	// ENCAPSULATION
	/**
	 * @description Renvoie le nom de l'information.
	 * @returns {string} Le nom de l'information.
	 */
	get _nom() {
		return this.__nom;
	}

	/**
	 * @description Définit le nom de l'information.
	 * @param {string} value - Le nouveau nom de l'information.
	 */
	set _nom(value: any) {
		this.__nom = value;
	}

	/**
	 * @description Renvoie le type de l'information.
	 * @returns {Type} Le type de l'information.
	 */
	get _type() {
		return this.__type;
	}

	/**
	 * @description Définit le type de l'information.
	 * @param {Type} value - Le nouveau type de l'information.
	 */
	set _type(value: any) {
		this.__type = value;
	}

	/**
	 * @description Renvoie la signification de l'information.
	 * @returns {string} La signification de l'information.
	 */
	get _signification() {
		return this.__signification;
	}

	/**
	 * @description Définit la signification de l'information.
	 * @param {string} value - La nouvelle signification de l'information.
	 */
	set _signification(value: any) {
		this.__signification = value;
	}

	// METHODES

	/**
	 * @description Convertit l'information en objet JSON.
	 * @returns {Object} L'objet JSON représentant l'information.
	 */
	toJSON() {
		return {
			nom: this._nom,
			type: this._type,
			signification: this._signification,
		};
	}
}
