/**
 * @classdesc Le menu déroulant qui apparait lorsque l'on clique sur la barre de menu en haut de l'app
 * @description Crée une instance de MenuDeroulant.
 * @class MenuDeroulant
 * @extends {HTMLElement}
 */
class MenuDeroulant extends HTMLElement {
    constructor() {
        super();
    }

    ajouterElementMenu(elementMenu) {
        this.appendChild(elementMenu);
    }
} window.customElements.define('menu-deroulant', MenuDeroulant);