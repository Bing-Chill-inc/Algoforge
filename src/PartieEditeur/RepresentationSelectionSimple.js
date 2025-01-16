/**
 * @class RepresentationSelectionSimple
 * @classdesc La classe RepresentationSelectionSimple est une classe représentant une sélection d'un élément graphique.
 * @description Est utilisé pour instancier un objet de type RepresentationSelectionSimple.
 * @extends {HTMLElement}
 */
class RepresentationSelectionSimple extends HTMLElement {
	_element; // Element autour duquel la sélection est faite.
	_monSelecteur; // Sélection qui contient la représentation graphique de la sélection.

	/**
	 * @constructor
	 * @param {ElementGraphique} element - L'élément autour duquel la sélection est faite.
	 * @param {Selection} monSelecteur - Sélection qui contient la représentation graphique de la sélection.
	 */
	constructor(element, monSelecteur) {
		super();
		this._element = element;
		this._monSelecteur = monSelecteur;

		this.classList.add("nonCiblable");
	}

	/**
	 * Met à jour la représentation graphique de la sélection.
	 */
	update() {
		if (
			this._element instanceof Probleme ||
			this._element instanceof Procedure
		) {
			this.style.left =
				"calc(var(--sizeModifier) * " +
				(parseFloat(this._element._abscisse) + 10) +
				"vw)";
			this.style.top =
				"calc(var(--sizeModifier) * " +
				parseFloat(this._element._ordonnee) +
				"vw)";
			this.style.width =
				"calc(var(--sizeModifier) * " +
				(this._element.getTailleAbscisse() - 20) +
				"vw)";
			this.style.height =
				"calc(var(--sizeModifier) * " +
				(this._element.getTailleOrdonnee() - 1) +
				"vw)";
		} else if (this._element instanceof StructureAlternative) {
			this.style.left =
				"calc(var(--sizeModifier) * " +
				(parseFloat(this._element._abscisse) - 2.5) +
				"vw)";
			this.style.top =
				"calc(var(--sizeModifier) * " +
				parseFloat(this._element._ordonnee) +
				"vw)";
			this.style.width =
				"calc(var(--sizeModifier) * " +
				(this._element.getTailleAbscisse() + 6) +
				"vw)";
			this.style.height =
				"calc(var(--sizeModifier) * " +
				(this._element.getTailleOrdonnee() + 2) +
				"vw)";
		} else if (this._element instanceof StructureIterative) {
			this.style.left =
				"calc(var(--sizeModifier) * " +
				parseFloat(this._element._abscisse) +
				"vw)";
			this.style.top =
				"calc(var(--sizeModifier) * " +
				parseFloat(this._element._ordonnee) +
				"vw)";
			this.style.width =
				"calc(var(--sizeModifier) * " +
				this._element.getTailleAbscisse() +
				"vw)";
			this.style.height = "calc(var(--sizeModifier) * " + 4 + "vw)";
		} else if (this._element instanceof ConditionSortie) {
			this.style.left =
				"calc(var(--sizeModifier) * " +
				parseFloat(this._element._abscisse) +
				"vw)";
			this.style.top =
				"calc(var(--sizeModifier) * " +
				parseFloat(this._element._ordonnee) +
				"vw)";
			this.style.width =
				"calc(var(--sizeModifier) * " +
				this._element.getTailleAbscisse() +
				"vw)";
			this.style.height = "calc(var(--sizeModifier) * " + 4 + "vw)";
		}
	}

	/**
	 * Supprime la représentation graphique de la sélection.
	 */
	supprimer() {
		this.remove();
	}
}
window.customElements.define("selection-simple", RepresentationSelectionSimple);
