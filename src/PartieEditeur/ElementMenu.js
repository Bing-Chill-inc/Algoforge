/**
 * @class ElementMenu
 * @classdesc L'élément de menu déroulant.
 * @extends {HTMLElement}
 */
class ElementMenu extends HTMLElement {
	/**
	 * @constructor
	 * @param {string} texte - Le texte du menu.
	 * @param {Function} action - L'action à exécuter lors du clic.
	 * @param {boolean} [isActive=true] - Indique si l'élément de menu est actif.
	 */
	constructor(texte, action, isActive = true) {
		super();
		this._texte = texte;
		this._action = action;
		if (this._texte === "Aucune action disponible.")
			this.classList.add("noActionsElementMenu");
		if (!isActive) {
			this.classList.add("disabled");
		}
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
}
window.customElements.define("element-menu", ElementMenu);
