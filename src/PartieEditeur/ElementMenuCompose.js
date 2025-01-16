/**
 * @class ElementMenuCompose
 * @classdesc L'élément de menu déroulant composé.
 * @extends {ElementMenu}
 */
class ElementMenuCompose extends ElementMenu {
	_menuDeroulant = new MenuDeroulant();

	/**
	 * @constructor
	 * @param {string} texte - Le texte du menu.
	 * @param {Function} action - L'action à exécuter lors du clic.
	 */
	constructor(texte, action) {
		super(texte, action);

		let rightArrow = document.createElement("span");
		rightArrow.innerText = ">";
		this.appendChild(rightArrow);
		this.appendChild(this._menuDeroulant);
	}

	/**
	 * @description Obtient le texte du menu.
	 * @returns {string} Le texte du menu.
	 */
	get _texte() {
		return this.innerText;
	}

	/**
	 * @description Définit le texte du menu.
	 * @param {string} value - Le nouveau texte du menu.
	 */
	set _texte(value) {
		this.innerText = value;
	}

	/**
	 * @description Définit l'action du menu.
	 * @param {Function} value - La nouvelle action du menu.
	 */
	set _action(value) {
		this.addEventListener("click", value);
	}

	/**
	 * @description Ajoute un élément de menu au menu déroulant.
	 * @param {ElementMenu} elementMenu - L'élément de menu à ajouter.
	 */
	ajouterElementMenu(elementMenu) {
		this._menuDeroulant.ajouterElementMenu(elementMenu);
	}
}
window.customElements.define("element-menu-compose", ElementMenuCompose);
