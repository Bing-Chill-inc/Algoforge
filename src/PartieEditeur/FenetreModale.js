/**
 * @class FenetreModale
 * @classdesc La classe FenetreModale gère l'affichage des fenêtres modales.
 * @extends {HTMLElement}
 */
class FenetreModale extends HTMLElement {
	content;

	/**
	 * @constructor
	 * @param {string} contenu - Le contenu HTML de la fenêtre modale.
	 */
	constructor(contenu) {
		super();
		this.content = document.createElement("div");
		this.content.innerHTML = contenu;
		this.content.classList.add("contenu");
		this.appendChild(this.content);
		this.fermer();

		this.fermerBouton = document.createElement("button");
		this.fermerBouton.innerHTML = "x";
		this.fermerBouton.classList.add("fermer");
		this.fermerBouton.addEventListener("click", () => {
			this.fermer();
		});
		this.content.appendChild(this.fermerBouton);

		this.addEventListener("click", (e) => {
			if (e.target === this) {
				this.fermer();
			}
		});
	}

	/**
	 * @description Ouvre la fenêtre modale.
	 */
	ouvrir() {
		this.style.display = "block";
	}

	/**
	 * @description Ferme la fenêtre modale.
	 */
	fermer() {
		this.style.display = "none";
	}
}
window.customElements.define("fenetre-modale", FenetreModale);
