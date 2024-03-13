class FenetreModale extends HTMLElement {
	content;

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

	ouvrir() {
		this.style.display = "block";
	}

	fermer() {
		this.style.display = "none";
	}
}
window.customElements.define("fenetre-modale", FenetreModale);
