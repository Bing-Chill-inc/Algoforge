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
	 */
	constructor(abscisse, ordonnee) {
		super();
		this._pointAncrageX = parseFloat(abscisse);
		this._pointAncrageY = parseFloat(ordonnee);
		this.update();
	}

	setPointAncrage(abscisse, ordonnee) {
		this._pointAncrageX = parseFloat(abscisse);
		this._pointAncrageY = parseFloat(ordonnee);
		this.update();
	}

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
