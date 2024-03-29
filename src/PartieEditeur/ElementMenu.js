/**
 * @classdesc L'élément de menu déroulant
 * @description Crée une instance de ElementMenu.
 * @class ElementMenu
 * @extends {HTMLElement}
 */
class ElementMenu extends HTMLElement {
	constructor(texte, action, isActive = true) {
		super();
		this._texte = texte;
		this._action = action;
		if (!isActive) {
			this.classList.add("disabled");
		}
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
window.customElements.define("element-menu", ElementMenu);
