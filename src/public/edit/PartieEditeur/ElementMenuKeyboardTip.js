/**
 * @classdesc L'élément de menu déroulant avec un tip du racourci clavier
 * @description Crée une instance de ElementMenuKeyboardTip.
 * @class ElementMenuKeyboardTip
 * @extends {ElementMenu}
 */
class ElementMenuKeyboardTip extends ElementMenu {
	constructor(texte, action, tip, isActive = true) {
		super(texte, action, isActive);

		let spanTip = document.createElement("span");
		spanTip.innerText = tip;
		this.appendChild(spanTip);
	}

	get _texte() {
		return this.innerText;
	}

	set _texte(value) {
		this.innerText = value;
	}

	set _action(value) {
		this.addEventListener("click", value);
	}
}
window.customElements.define("element-menu-keyboard-tip", ElementMenuKeyboardTip);
