/**
 * @class SelectionRectangle
 * @classdesc La classe SelectionRectangle est une classe représentant une sélection graphique sur l'écran.
 * @description Est utilisé pour instancier un objet de type SelectionRectangle.
 * @extends {HTMLElement}
 */
class SelectionRectangle extends HTMLElement {
	_x1; // Abscisse du point de départ de la sélection
	_y1; // Ordonnée du point de départ de la sélection
	_x2; // Abscisse du point d'arrivée de la sélection
	_y2; // Ordonnée du point d'arrivée de la sélection

	/**
	 * @constructor
	 */
	constructor() {
		super();
	}

	placer(x1, y1, x2, y2) {
		this.style.left = `calc(var(--sizeModifier) * ${Math.min(x1, x2)}vw)`;
		this.style.top = `calc(var(--sizeModifier) * ${Math.min(y1, y2)}vw)`;
		this.style.width = `calc(var(--sizeModifier) * ${Math.abs(x1 - x2)}vw)`;
		this.style.height = `calc(var(--sizeModifier) * ${Math.abs(y1 - y2)}vw)`;
		this._x1 = Math.min(x1, x2);
		this._y1 = Math.min(y1, y2);
		this._x2 = Math.max(x1, x2);
		this._y2 = Math.max(y1, y2);
	}

	listerElementsGraphiques() {
		let listeElems = [];
		for (let element of this.parentNode.children) {
			if (verbose)
				console.log(
					`L'élément ${element.constructor.name} a pour abscisse ${element._abscisse} et pour ordonnée ${element._ordonnee}`,
				);
			if (verbose)
				console.log(
					`Le rectangle a pour x1 ${this._x1} et pour y1 ${this._y1}`,
				);
			if (verbose)
				console.log(
					`Le rectangle a pour x2 ${this._x2} et pour y2 ${this._y2}`,
				);
			if (element instanceof ElementGraphique) {
				if (
					this._x1 <= parseFloat(element.selectAnchor.x) &&
					parseFloat(element.selectAnchor.x) <= this._x2 &&
					this._y1 <= parseFloat(element.selectAnchor.y) &&
					parseFloat(element.selectAnchor.y) <= this._y2
				) {
					if (verbose) console.log("Element sélectionné :");
					if (verbose) console.log(element);
					listeElems.push(element);
				}
			}
		}
		return listeElems;
	}
}
window.customElements.define("selection-rectangle", SelectionRectangle);
