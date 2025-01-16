/**
 * @class Information
 * @classdesc Représente une information avec un nom, un type et une signification.
 */
class Information {
	// ATTRIBUTS
	_nom; // String
	_type; // Type
	_signification; // String

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {string} _nom - Le nom de l'information.
	 * @param {Type} _type - Le type de l'information.
	 * @param {string} _signification - La signification de l'information.
	 */
	constructor(_nom, _type, _signification) {
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
		return this._nom;
	}

	/**
	 * @description Définit le nom de l'information.
	 * @param {string} value - Le nouveau nom de l'information.
	 */
	set _nom(value) {
		this._nom = value;
	}

	/**
	 * @description Renvoie le type de l'information.
	 * @returns {Type} Le type de l'information.
	 */
	get _type() {
		return this._type;
	}

	/**
	 * @description Définit le type de l'information.
	 * @param {Type} value - Le nouveau type de l'information.
	 */
	set _type(value) {
		this._type = value;
	}

	/**
	 * @description Renvoie la signification de l'information.
	 * @returns {string} La signification de l'information.
	 */
	get _signification() {
		return this._signification;
	}

	/**
	 * @description Définit la signification de l'information.
	 * @param {string} value - La nouvelle signification de l'information.
	 */
	set _signification(value) {
		this._signification = value;
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
