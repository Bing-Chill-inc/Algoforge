/**
 * @class ElementMenuKeyboardTip
 * @classdesc L'élément de menu déroulant avec un tip du raccourci clavier.
 * @extends {ElementMenu}
 */
class ElementMenuKeyboardTip extends ElementMenu {
	/**
	 * @constructor
	 * @param {string} texte - Le texte du menu.
	 * @param {Function} action - L'action à exécuter lors du clic.
	 * @param {string} tip - Le raccourci clavier associé.
	 * @param {boolean} [isActive=true] - Indique si l'élément de menu est actif.
	 */
	constructor(texte, action, tip, isActive = true) {
		super(texte, action, isActive);

		let spanTip = document.createElement("span");
		spanTip.innerText = tip;
		this.appendChild(spanTip);
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
		let textElm = document.createElement("p");
		textElm.textContent = value;
		this.appendChild(textElm);
		// this.innerText = value;
	}

	/**
	 * @description Définit l'action du menu.
	 * @param {Function} value - La nouvelle action du menu.
	 */
	set _action(value) {
		this.addEventListener("click", value);
	}
}
window.customElements.define(
	"element-menu-keyboard-tip",
	ElementMenuKeyboardTip,
);
