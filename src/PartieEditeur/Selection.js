/**
 * @class Selection
 * @classdesc La classe Selection est une classe représentant une sélection d'éléments graphiques.
 * @description Est utilisé pour instancier un objet de type Selection.
 * @extends {HTMLElement}
 */
class Selection extends HTMLElement {
	_listeElementsSelectionnes;
	_editeur = document.querySelector("editeur-interface"); // Editeur
	_planTravail = document.querySelector("plan-travail"); // Plan de travail

	/**
	 * @constructor
	 */
	constructor() {
		super();
		this._listeElementsSelectionnes = [];

		setInterval(() => {
			this.update();
		}, 1000 / 24); // 24 fps
	}

	/**
	 * Retourne le nombre d'éléments sélectionnés.
	 * @returns {number} Nombre d'éléments sélectionnés.
	 */
	get nbElementsSelectionnes() {
		return this._listeElementsSelectionnes.length;
	}

	/**
	 * Sélectionne un élément graphique.
	 * @param {ElementGraphique} element - L'élément graphique à sélectionner.
	 * @returns {boolean} Vrai si l'élément a été sélectionné, sinon faux.
	 */
	selectionnerElement(element) {
		if (
			element instanceof ElementGraphique &&
			!this.estSelectionne(element)
		) {
			let rep = new RepresentationSelectionSimple(element, this);
			this.parentNode.appendChild(rep);
			this._listeElementsSelectionnes.push(rep);
			this.update();
			return true;
		}
		return false;
	}

	/**
	 * Sélectionne un arbre d'éléments graphiques.
	 * @param {ElementGraphique} element - L'élément racine de l'arbre à sélectionner.
	 */
	selectionnerArbre(element) {
		this.selectionnerElement(element);
		if (element.peutEtreDecompose()) {
			for (let enfant of element.getEnfants()) {
				this.selectionnerArbre(enfant);
			}
		}
		if (element instanceof StructureAlternative) {
			for (let condition of element._listeConditions.children) {
				this.selectionnerArbre(condition);
			}
		}
	}

	/**
	 * Désélectionne un élément graphique.
	 * @param {ElementGraphique} element - L'élément graphique à désélectionner.
	 * @returns {boolean} Faux après la désélection.
	 */
	deselectionnerElement(element) {
		if (element instanceof ElementGraphique) {
			for (var selection of this._listeElementsSelectionnes) {
				if (selection._element === element) {
					selection.supprimer();
					this._listeElementsSelectionnes.splice(
						this._listeElementsSelectionnes.indexOf(selection),
						1,
					);
					break;
				}
			}
		}
		this.update();
		return false;
	}

	/**
	 * Désélectionne tous les éléments graphiques.
	 */
	deselectionnerTout() {
		for (var selection of this._listeElementsSelectionnes) {
			selection.supprimer();
		}
		this._listeElementsSelectionnes = [];
		this.style.width = "0vw";
		this.style.height = "0vw";
		this.style.left = "0vw";
		this.style.top = "0vw";
	}

	/**
	 * Supprime tous les éléments sélectionnés.
	 */
	supprimerTout() {
		for (var selection of this._listeElementsSelectionnes) {
			let event = new EvenementSuppressionElement(selection._element);
			selection._element.supprimer();
			this._editeur.ajouterEvenement(event);
			selection.supprimer();
		}
		this._listeElementsSelectionnes = [];
		this.style.width = "0vw";
		this.style.height = "0vw";
		this.style.left = "0vw";
		this.style.top = "0vw";
	}

	/**
	 * Retourne les coordonnées d'un coin du rectangle de sélection.
	 * @param {string} topOuBottom - "top" ou "bottom".
	 * @param {string} leftOuRight - "left" ou "right".
	 * @returns {Object} Coordonnées du coin spécifié.
	 */
	coin(topOuBottom, leftOuRight) {
		let coordonnees = this.coordonneesMinEtMax();
		if (topOuBottom == "top") {
			if (leftOuRight == "left") {
				return {
					x: coordonnees.coordonneesMin.x,
					y: coordonnees.coordonneesMin.y,
				};
			} else if (leftOuRight == "right") {
				return {
					x: coordonnees.coordonneesMax.x,
					y: coordonnees.coordonneesMin.y,
				};
			}
		} else if (topOuBottom == "bottom") {
			if (leftOuRight == "left") {
				return {
					x: coordonnees.coordonneesMin.x,
					y: coordonnees.coordonneesMax.y,
				};
			} else if (leftOuRight == "right") {
				return {
					x: coordonnees.coordonneesMax.x,
					y: coordonnees.coordonneesMax.y,
				};
			}
		} else if (topOuBottom == "center") {
			return {
				x:
					(coordonnees.coordonneesMin.x +
						coordonnees.coordonneesMax.x) /
					2,
				y:
					(coordonnees.coordonneesMin.y +
						coordonnees.coordonneesMax.y) /
					2,
			};
		}
	}

	/**
	 * Retourne les coordonnées minimales et maximales des éléments sélectionnés.
	 * @returns {Object} Coordonnées minimales et maximales.
	 */
	coordonneesMinEtMax() {
		if (this._listeElementsSelectionnes.length === 0) {
			return {
				coordonneesMin: { x: -100, y: -100 },
				coordonneesMax: { x: -100, y: -100 },
			};
		}

		let coordonneesMin = { x: Number.MAX_VALUE, y: Number.MAX_VALUE };
		let coordonneesMax = { x: Number.MIN_VALUE, y: Number.MIN_VALUE };

		for (const selection of this._listeElementsSelectionnes) {
			const rect = selection.getBoundingClientRect();
			const sousPlansTravail =
				document.querySelectorAll("sous-plan-travail");
			const sousPlansTravailArray = Array.from(sousPlansTravail);
			const dernierSousPlanOuvert = sousPlansTravailArray
				.reverse()
				.find((element) => element.classList.contains("ouvert"));

			let offsetX = 0;
			let offsetY = 0;

			if (dernierSousPlanOuvert !== undefined) {
				offsetX = dernierSousPlanOuvert.scrollLeft - 5;
				offsetY = dernierSousPlanOuvert.scrollTop + 5;
			} else {
				offsetX = this._planTravail.scrollLeft;
				offsetY = this._planTravail.scrollTop;
			}

			coordonneesMin.x = Math.min(coordonneesMin.x, rect.left + offsetX);
			coordonneesMin.y = Math.min(coordonneesMin.y, rect.top + offsetY);
			coordonneesMax.x = Math.max(coordonneesMax.x, rect.right + offsetX);
			coordonneesMax.y = Math.max(
				coordonneesMax.y,
				rect.bottom + offsetY,
			);
		}

		return {
			coordonneesMin,
			coordonneesMax,
		};
	}

	/**
	 * Met à jour la sélection.
	 */
	update() {
		for (var selection of this._listeElementsSelectionnes) {
			selection.update();
		}
		let coordonnees = this.coordonneesMinEtMax();

		const left = coordonnees.coordonneesMin.x;
		const top = coordonnees.coordonneesMin.y;
		const width =
			coordonnees.coordonneesMax.x - coordonnees.coordonneesMin.x;
		const height =
			coordonnees.coordonneesMax.y - coordonnees.coordonneesMin.y;

		const boundingRect = this.parentNode.getBoundingClientRect();

		this.style.left = `${left - boundingRect.x}px`;
		this.style.top = `${top - boundingRect.y}px`;
		this.style.width = `${width}px`;
		this.style.height = `${height}px`;
	}

	/**
	 * Déplace tous les éléments sélectionnés.
	 * @param {number} deplacementAbscisse - Déplacement en abscisse.
	 * @param {number} deplacementOrdonnee - Déplacement en ordonnée.
	 */
	moveAllSelectedElements(deplacementAbscisse, deplacementOrdonnee) {
		const coinTopLeft = this.coin("top", "left");
		const deplacementEnPx = {
			x: (deplacementAbscisse / 100) * window.innerWidth,
			y: (deplacementOrdonnee / 100) * window.innerWidth,
		};
		if (verbose) console.log(deplacementEnPx, coinTopLeft);
		if (coinTopLeft.x + deplacementEnPx.x < 0 && deplacementEnPx.x < 0) {
			deplacementAbscisse = 0;
		}
		if (coinTopLeft.y + deplacementEnPx.y < 100 && deplacementEnPx.y < 0) {
			deplacementOrdonnee = 0;
		}
		for (var selection of this._listeElementsSelectionnes) {
			selection._element._abscisse =
				parseFloat(selection._element._abscisse) +
				deplacementAbscisse +
				"vw";
			selection._element._ordonnee =
				parseFloat(selection._element._ordonnee) +
				deplacementOrdonnee +
				"vw";
			selection._element.setPosition();
			selection.update();
			if (
				selection._element instanceof Probleme ||
				selection._element instanceof Procedure ||
				selection._element instanceof StructureIterative
			) {
				selection._element._elemParent.updateAll();
			} else if (selection._element instanceof StructureAlternative) {
				for (let condition of selection._element._listeConditions
					.children) {
					condition._elemParent.updateAll();
				}
			}
			if (selection._element._parent != null)
				selection._element._parent.updateAll();
		}
		this.update();
	}

	/**
	 * Vérifie si un élément est sélectionné.
	 * @param {ElementGraphique} element - L'élément graphique à vérifier.
	 * @returns {boolean} Vrai si l'élément est sélectionné, sinon faux.
	 */
	estSelectionne(element) {
		for (var selection of this._listeElementsSelectionnes) {
			if (selection._element === element) return true;
		}
		return false;
	}

	/**
	 * Retourne la liste des éléments sélectionnés.
	 * @returns {Array} Liste des éléments sélectionnés.
	 */
	getElementsSelectionnes() {
		let listeElements = [];
		for (var selection of this._listeElementsSelectionnes) {
			listeElements.push(selection._element);
		}
		return listeElements;
	}
}
window.customElements.define("selection-editeur", Selection);
