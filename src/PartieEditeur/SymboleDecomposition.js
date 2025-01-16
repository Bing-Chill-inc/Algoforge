/**
 * @classdesc Classe SymboleDecomposition, un symbole de décomposition (double barre)
 * @description Crée une instance de SymboleDecomposition.
 * @class SymboleDecomposition
 * @extends {HTMLElement}
 */
class SymboleDecomposition extends HTMLElement {
	_pointAncrageX;
	_pointAncrageY;

	/**
	 * @constructor
	 * @param {number} abscisse - L'abscisse du point d'ancrage.
	 * @param {number} ordonnee - L'ordonnée du point d'ancrage.
	 */
	constructor(abscisse, ordonnee) {
		super();
		this._pointAncrageX = parseFloat(abscisse);
		this._pointAncrageY = parseFloat(ordonnee);
		this.update();
	}

	/**
	 * Définit le point d'ancrage du symbole de décomposition.
	 * @param {number} abscisse - L'abscisse du point d'ancrage.
	 * @param {number} ordonnee - L'ordonnée du point d'ancrage.
	 */
	setPointAncrage(abscisse, ordonnee) {
		this._pointAncrageX = parseFloat(abscisse);
		this._pointAncrageY = parseFloat(ordonnee);
		this.update();
	}

	/**
	 * Met à jour la position du symbole de décomposition.
	 */
	update() {
		this.style.left =
			"calc(var(--sizeModifier) * " + (this._pointAncrageX - 0.6) + "vw)";
		this.style.top =
			"calc(var(--sizeModifier) * " + this._pointAncrageY + "vw)";
	}
}
window.customElements.define(
	"symbole-decomposition-element",
	SymboleDecomposition,
);
