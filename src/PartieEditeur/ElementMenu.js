/**
 * @classdesc L'élément de menu déroulant
 * @description Crée une instance de ElementMenu.
 * @class ElementMenu
 * @extends {HTMLElement}
 */
class ElementMenu extends HTMLElement {
    constructor(texte, action) {
        super();
        this._texte = texte;
        this._action = action;
    }

    get _texte() {
        return this.innerText;
    }

    set _texte(value) {
        this.innerText = value;
    }

    set _action(value) {
        this.addEventListener('click', value);
    }
} window.customElements.define('element-menu', ElementMenu);