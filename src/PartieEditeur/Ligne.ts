/**
 * @class Ligne
 * @classdesc La classe Ligne fait la liaison graphique entre chaque ElementGraphique
 * @description Crée une instance de ligne
 * @extends {HTMLElement}
 */
export class Ligne extends HTMLElement {
	// ATTRIBUTS
	__abscisse1!: number; // Float
	__ordonnee1!: number; // Float
	__abscisse2!: number; // Float
	__ordonnee2!: number; // Float
	_abscisseMilieu!: number; // Float
	_ordonneeMilieu!: number; // Float

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {string|number} abscisse1 abscisse du point 1
	 * @param {string|number} ordonnee1 ordonnée du point 1
	 * @param {string|number} abscisse2 abscisse du point 2
	 * @param {string|number} ordonnee2 ordonnée du point 2
	 */
	constructor(abscisse1: string, ordonnee1: string, abscisse2: string, ordonnee2: string) {
		super();
		this._abscisse1 = parseFloat(abscisse1);
		this._ordonnee1 = parseFloat(ordonnee1);
		this._abscisse2 = parseFloat(abscisse2);
		this._ordonnee2 = parseFloat(ordonnee2);
		this.update();
	}

	// ENCAPSULATION
	/**
	 * @description Renvoie la valeur de l'abscisse du point 1
	 * @returns {string|number} La valeur de l'abscisse
	 */
	get _abscisse1() {
		return this.__abscisse1;
	}
	/**
	 * @description Définit la valeur de l'abscisse du point 1
	 * @param {string|number} value la nouvelle valeur de l'abscisse
	 */
	set _abscisse1(value: number) {
		this.__abscisse1 = value;
	}

	/**
	 * @description Renvoie la valeur de l'ordonnée du point 1
	 * @returns {string|number} La valeur de l'abscisse
	 */
	get _ordonnee1() {
		return this.__ordonnee1;
	}

	/**
	 * @description Définit la valeur de l'ordonnée du point 1
	 * @param {string|number} value la nouvelle valeur de l'abscisse
	 */
	set _ordonnee1(value: number) {
		this.__ordonnee1 = value;
	}
	/**
	 * @description Renvoie la valeur de l'abscisse du point 2
	 * @returns {string|number} La valeur de l'abscisse
	 */
	get _abscisse2() {
		return this.__abscisse2;
	}
	/**
	 * @description Définit la valeur de l'abscisse du point 2
	 * @param {string|number} value la nouvelle valeur de l'abscisse
	 */
	set _abscisse2(value: number) {
		this.__abscisse2 = value;
	}
	/**
	 * @description Renvoie la valeur de l'ordonnée du point 2
	 * @returns {string|number} La valeur de l'abscisse
	 */
	get _ordonnee2() {
		return this.__ordonnee2;
	}
	/**
	 * @description Définit la valeur de l'ordonnée du point 2
	 * @param {string|number} value la nouvelle valeur de l'abscisse
	 */
	set _ordonnee2(value: number) {
		this.__ordonnee2 = value;
	}

	// METHODES
	/**
	 * @description Affiche la ligne sur le plan de travail, et met à jour sa position et rotation.
	 */
	update() {
		if (this._abscisse1 < this._abscisse2) {
			this._abscisseMilieu = (this._abscisse1 + this._abscisse2) / 2;
			this._ordonneeMilieu = (this._ordonnee1 + this._ordonnee2) / 2;
			this.style.left =
				"calc(var(--sizeModifier) * " +
				(this._abscisseMilieu -
					(this._abscisse2 - this._abscisse1) / 2) +
				"vw)";
			this.style.top =
				"calc(var(--sizeModifier) * " +
				(this._ordonneeMilieu -
					(this._ordonnee2 - this._ordonnee1) / 2) +
				"vw)";
			this.style.width =
				"calc(var(--sizeModifier) * " +
				Math.sqrt(
					(this._abscisse1 - this._abscisse2) *
						(this._abscisse1 - this._abscisse2) +
						(this._ordonnee1 - this._ordonnee2) *
							(this._ordonnee1 - this._ordonnee2),
				) +
				"vw)";
			this.style.transform =
				"rotate(" +
				Math.atan2(
					this._ordonnee2 - this._ordonnee1,
					this._abscisse2 - this._abscisse1,
				) +
				"rad)";
		} else {
			this._abscisseMilieu = (this._abscisse1 + this._abscisse2) / 2;
			this._ordonneeMilieu = (this._ordonnee1 + this._ordonnee2) / 2;
			this.style.left =
				"calc(var(--sizeModifier) * " +
				(this._abscisseMilieu -
					(this._abscisse1 - this._abscisse2) / 2) +
				"vw)";
			this.style.top =
				"calc(var(--sizeModifier) * " +
				(this._ordonneeMilieu -
					(this._ordonnee1 - this._ordonnee2) / 2) +
				"vw)";
			this.style.width =
				"calc(var(--sizeModifier) * " +
				Math.sqrt(
					(this._abscisse2 - this._abscisse1) *
						(this._abscisse2 - this._abscisse1) +
						(this._ordonnee2 - this._ordonnee1) *
							(this._ordonnee2 - this._ordonnee1),
				) +
				"vw)";
			this.style.transform =
				"rotate(" +
				Math.atan2(
					this._ordonnee1 - this._ordonnee2,
					this._abscisse1 - this._abscisse2,
				) +
				"rad)";
		}
	}

	/**
	 * @description Définit la position du premier point
	 *
	 * @param {number|string} abscisse l'abscisse
	 * @param {number|string} ordonnee l'ordonnée
	 */
	setDebut(abscisse: string|number, ordonnee: string) {
		this._abscisse1 = parseFloat(abscisse);
		this._ordonnee1 = parseFloat(ordonnee);
		this.update();
	}

	/**
	 * @description Définit la position du deuxième point
	 *
	 * @param {number|string} abscisse l'abscisse
	 * @param {number|string} ordonnee l'ordonnée
	 */
	setFin(abscisse: string|number, ordonnee: string) {
		this._abscisse2 = parseFloat(abscisse);
		this._ordonnee2 = parseFloat(ordonnee);
		this.update();
	}
}
