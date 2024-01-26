/**
 * @classdesc L'élément de menu déroulant composé
 * @description Crée une instance de ElementMenuCompose.
 * @class ElementMenuCompose
 * @extends {ElementMenu}
 */
class ElementMenuCompose extends ElementMenu {
    _menuDeroulant = new MenuDeroulant();

    constructor(texte, action) {
        super(texte, action);

        let rightArrow = document.createElement('span');
        rightArrow.innerText = '>';
        this.appendChild(rightArrow);
        this.appendChild(this._menuDeroulant);
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

    ajouterElementMenu(elementMenu) {
        this._menuDeroulant.ajouterElementMenu(elementMenu);
    }
} window.customElements.define('element-menu-compose', ElementMenuCompose);