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

	/**
	 * @description Ajoute un élément au menu déroulant.
	 * @param {HTMLElement} elementMenu - L'élément à ajouter au menu.
	 */
	ajouterElementMenu(elementMenu) {
		this.appendChild(elementMenu);

		// On vérifie si le menu se retrouve trop bas
		this.style.opacity = 0;
		this.style.scale = 1;

		setTimeout(() => {
			const rect = this.getBoundingClientRect();
			console.log(rect);
			if (rect.bottom > window.innerHeight) {
				this.style.top = "auto";
				this.style.bottom = "0";
			}
			this.style.scale = null;
			setTimeout(() => {
				this.style.opacity = 1;
			}, 100);
		});
	}
}
window.customElements.define("menu-deroulant", MenuDeroulant);
