/**
 * @class IndicateurZoom
 * @classdesc La classe IndicateurZoom gère le zoom de l'éditeur.
 * @extends {HTMLElement}
 */
class IndicateurZoom extends HTMLElement {
	// ATTRIBUTS
	_editeur = document.querySelector("editeur-interface"); // Editeur
	_zoom = parseFloat(this._editeur.getCookie("zoom"))
		? parseFloat(this._editeur.getCookie("zoom"))
		: 1; // Number

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * Initialise l'indicateur de zoom et configure les boutons de zoom.
	 */
	constructor() {
		super();
		document.body.style.setProperty("--sizeModifier", this._zoom);
		this.buttonZoomOut = document.createElement("button");
		this.buttonZoomOut.className = "zoomOut";
		this.buttonZoomOut.innerHTML = "-";
		this.buttonZoomOut.addEventListener("click", (e) => {
			this.zoomOut();
		});
		this.appendChild(this.buttonZoomOut);

		this.display = document.createElement("div");
		this.display.className = "zoomDisplay";
		this.display.innerText = `${Math.trunc(this._zoom * 100)}%`;
		this.display.contentEditable = "true";

		this.display.addEventListener("keydown", (e) => {
			if (e.key === "Enter") {
				e.preventDefault();
				this.display.blur();
			}
			// Si la touche n'est pas un chiffre ou un point ou backsapce ou delete, on empêche l'écriture
			if (
				!/[\d.]/.test(e.key) &&
				e.key !== "Backspace" &&
				e.key !== "Delete"
			) {
				e.preventDefault();
			}
		});
		this.display.addEventListener("input", (e) => {
			this._zoom = parseFloat(this.display.innerText) / 100;
			this._editeur.setCookie("zoom", this._zoom, 365);
			document.body.style.setProperty("--sizeModifier", this._zoom);
		});
		this.display.addEventListener("focusout", (e) => {
			if (this._zoom < 0.1) this._zoom = 0.1;
			if (this._zoom > 5) this._zoom = 5;
			document.body.style.setProperty("--sizeModifier", this._zoom);
			this._editeur.setCookie("zoom", this._zoom, 365);
			this.display.innerText = `${Math.trunc(this._zoom * 100)}%`;
		});
		this.appendChild(this.display);

		this.buttonZoomIn = document.createElement("button");
		this.buttonZoomIn.className = "zoomIn";
		this.buttonZoomIn.innerHTML = "+";
		this.buttonZoomIn.addEventListener("click", (e) => {
			this.zoomIn();
		});
		this.appendChild(this.buttonZoomIn);
	}

	// ENCAPSULATION
	/**
	 * @description Obtient la valeur actuelle du zoom.
	 * @returns {number} La valeur actuelle du zoom.
	 */
	get _zoom() {
		return this._zoom;
	}

	/**
	 * @description Définit une nouvelle valeur pour le zoom.
	 * @param {number} value - La nouvelle valeur du zoom.
	 */
	set _zoom(value) {
		this._zoom = value;
	}

	/**
	 * @description Augmente le zoom d'un facteur spécifié.
	 * @param {number} amount - Le facteur d'augmentation du zoom.
	 * @param {boolean} round - Si le zoom doit être arrondi.
	 */
	zoomIn(amount = 0.1, round = true) {
		this._zoom += amount;
		if (round) this._zoom = Math.round(this._zoom * 10) / 10;
		if (this._zoom > 5) this._zoom = 5;
		document.body.style.setProperty("--sizeModifier", this._zoom);
		this.display.innerText = `${Math.trunc(this._zoom * 100)}%`;
		this._editeur.setCookie("zoom", this._zoom, 365);
	}

	/**
	 * @description Diminue le zoom d'un facteur spécifié.
	 * @param {number} amount - Le facteur de diminution du zoom
	 * @param {boolean} round - Si le zoom doit être arrondi.
	 */
	zoomOut(amount = 0.1, round = true) {
		this._zoom -= amount;
		if (round) this._zoom = Math.round(this._zoom * 10) / 10;
		if (this._zoom < 0.1) this._zoom = 0.1;
		document.body.style.setProperty("--sizeModifier", this._zoom);
		this.display.innerText = `${Math.trunc(this._zoom * 100)}%`;
		this._editeur.setCookie("zoom", this._zoom, 365);
	}
}
customElements.define("indicateur-zoom", IndicateurZoom);
