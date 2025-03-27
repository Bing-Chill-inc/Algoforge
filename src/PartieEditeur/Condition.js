/**
 * Classe représentant une condition dans l'éditeur.
 * @extends HTMLElement
 */
class Condition extends HTMLElement {
	// ATTRIBUTS
	_elemParent; // ElementParent (liste des enfants)
	_structure; // StructureAlternative qui contient cette condition
	_editeur = document.querySelector("editeur-interface"); // Editeur
	_ancienLib;

	// CONSTRUCTEUR
	/**
	 * Crée une nouvelle instance de Condition.
	 * @param {string} [libelle=""] - Le libellé de la condition.
	 * @param {ElementParent} [elemParent=new ElementParent()] - L'élément parent.
	 * @param {StructureAlternative} [structure=null] - La structure contenant cette condition.
	 */
	constructor(
		libelle = "",
		elemParent = new ElementParent(),
		structure = null,
	) {
		super();
		this._elemParent = elemParent;
		this._structure = structure;
		this.afficher();
		this._libelle = libelle;
		this._ancienLib = libelle;
		if (this._elemParent != null) {
			elemParent._proprietaire = this;
		}
	}

	// ENCAPSULATION
	/**
	 * Obtient l'élément graphique parent.
	 * @returns {HTMLElement} L'élément graphique parent.
	 */
	get _elementGraphique() {
		return this.parentNode.parentNode;
	}

	/**
	 * Obtient le libellé de la condition.
	 * @returns {string} Le libellé de la condition.
	 */
	get _libelle() {
		return this.divLibelle.innerText;
	}

	/**
	 * Définit le libellé de la condition.
	 * @param {string} value - Le nouveau libellé.
	 */
	set _libelle(value) {
		this.divLibelle.innerText = value;
	}

	/**
	 * Obtient l'élément parent.
	 * @returns {ElementParent} L'élément parent.
	 */
	get _elemParent() {
		return this._elemParent;
	}

	/**
	 * Définit l'élément parent.
	 * @param {ElementParent} value - Le nouvel élément parent.
	 */
	set _elemParent(value) {
		this._elemParent = value;
	}

	/**
	 * Obtient la structure contenant cette condition.
	 * @returns {StructureAlternative} La structure contenant cette condition.
	 */
	get _structure() {
		return this._structure;
	}

	/**
	 * Définit la structure contenant cette condition.
	 * @param {StructureAlternative} value - La nouvelle structure.
	 */
	set _structure(value) {
		this._structure = value;
	}

	/**
	 * Obtient l'ordonnée pour le traitement des liens dans l'interface.
	 * @returns {number} L'ordonnée.
	 */
	get _ordonnee() {
		// Pour le traitement des liens dans l'interface
		return this._structure._ordonnee;
	}

	/**
	 * Obtient l'espace de travail.
	 * @returns {HTMLElement} L'espace de travail.
	 */
	get espaceTravail() {
		return this._structure.parentNode;
	}

	// METHODES
	/**
	 * Affiche les éléments graphiques de la condition.
	 */
	afficher() {
		let buttonSupprimer = document.createElement("button");
		buttonSupprimer.className = "supprimer";
		buttonSupprimer.innerHTML = "-";
		buttonSupprimer.addEventListener("click", (e) => {
			this._structure.supprimerCondition(this);
		});
		this.appendChild(buttonSupprimer);

		this.divLibelle = document.createElement("div");
		this.divLibelle.className = "libelle auto-size-text";
		this.divLibelle.innerText = this._libelle;
		this.divLibelle.contentEditable = "true";
		this.appendChild(this.divLibelle);
		this.divLibelle.addEventListener("focusout", (e) => {
			if (this._structure instanceof StructureSi) {
				this.divLibelle.innerText = this.divLibelle.innerText.replace(
					/&&/g,
					"ET",
				);
				this.divLibelle.innerText = this.divLibelle.innerText.replace(
					/\|\|/g,
					"OU",
				);
			}
			if (this._ancienLib != this._libelle) {
				this._editeur.ajouterEvenement(
					new EvenementEditionLibelleCondition(
						this,
						this._ancienLib,
						this._libelle,
					),
				);
				this._ancienLib = this._libelle;
			}
		});

		this.divLibelle.addEventListener("input", (e) => {
			editeur.adjustFontSize(this.divLibelle);
		});

		let divArrowsWrapper = document.createElement("div");
		divArrowsWrapper.className = "arrowsWrapper";
		divArrowsWrapper.classList.add("no-render"); // Empêche le rendu lors de l'exportation en image
		this.flecheGauche = document.createElement("span");
		this.flecheGauche.innerHTML = "← ";
		this.flecheGauche.addEventListener("click", (e) => {
			this._structure.decalerCondition(this, -1);
		});

		this.flecheDroite = document.createElement("span");
		this.flecheDroite.innerHTML = " →";
		this.flecheDroite.addEventListener("click", (e) => {
			this._structure.decalerCondition(this, 1);
		});

		divArrowsWrapper.appendChild(this.flecheGauche);
		divArrowsWrapper.appendChild(this.flecheDroite);
		this.appendChild(divArrowsWrapper);

		this.divAjouterAGauche = document.createElement("div");
		this.divAjouterAGauche.className = "ajouterAGauche";
		this.divAjouterAGauche.innerHTML = "+";
		this.divAjouterAGauche.classList.add("no-render"); // Empêche le rendu lors de l'exportation en image
		this.divAjouterAGauche.addEventListener("click", (e) => {
			this._structure.ajouterConditionParRapportA(this, -1);
		});
		this.appendChild(this.divAjouterAGauche);

		this.divAjouterADroite = document.createElement("div");
		this.divAjouterADroite.className = "ajouterADroite";
		this.divAjouterADroite.innerHTML = "+";
		this.divAjouterADroite.classList.add("no-render"); // Empêche le rendu lors de l'exportation en image
		this.divAjouterADroite.addEventListener("click", (e) => {
			this._structure.ajouterConditionParRapportA(this, 1);
		});
		this.appendChild(this.divAjouterADroite);

		this.style.animation = "fall 0.2s ease-in";
		setTimeout(() => {
			this.style.animation = "";
		}, 200);
	}

	/**
	 * Supprime la condition.
	 */
	supprimer() {
		this._editeur.ajouterEvenement(new EvenementSuppressionElement(this));
		this._elemParent.delierTousLesEnfants();
		this._structure.supprimerCondition(this);
	}

	/**
	 * Convertit la condition en JSON.
	 * @returns {Object} La représentation JSON de la condition.
	 */
	toJSON() {
		return {
			typeElement: this.constructor.name,
			libelle: this._libelle,
			enfants: this._elemParent.toJSON(),
		};
	}

	/**
	 * Convertit la condition en JSON en spécifiant les enfants à conserver.
	 * @param {Array} listeElemEnfantsAConcerver - La liste des enfants à conserver.
	 * @returns {Object} La représentation JSON de la condition.
	 */
	toJSONspecifier(listeElemEnfantsAConcerver) {
		return {
			typeElement: this.constructor.name,
			libelle: this._libelle,
			enfants: this._elemParent.toJSONspecifier(
				listeElemEnfantsAConcerver,
			),
		};
	}

	/**
	 * Calcule la taille en abscisse de la condition.
	 * @returns {number} La taille en abscisse.
	 */
	getTailleAbscisse() {
		let rect = this.getBoundingClientRect();

		// Calculez la largeur en unité vw
		let largeurEnVw = ((rect.right - rect.left) / window.innerWidth) * 100;
		return 10; // largeurEnVw;
	}

	/**
	 * Obtient l'ancre de décomposition de la condition.
	 * @returns {Object} L'ancre de décomposition avec les coordonnées en abscisse et ordonnée.
	 */
	getAncreDecomposition() {
		let abscisse = parseFloat(this._structure._abscisse);
		for (let condition of this._structure._listeConditions.children) {
			if (condition === this) {
				break;
			}
			abscisse += condition.getTailleAbscisse();
		}
		abscisse += this.getTailleAbscisse() / 2;
		let ordonnee = parseFloat(this._structure._ordonnee) + 5;
		return { abscisse: abscisse, ordonnee: ordonnee - 0.7 };
	}

	/**
	 * Vérifie si la condition peut être décomposée.
	 * @returns {boolean} True si la condition peut être décomposée, sinon false.
	 */
	peutEtreDecompose() {
		return true;
	}

	/**
	 * Obtient les enfants de la condition.
	 * @param {Function} [typeRechercher=ElementGraphique] - Le type d'élément à rechercher.
	 * @returns {Array} La liste des enfants.
	 */
	getEnfants(typeRechercher = ElementGraphique) {
		let listeDesEnfants = [];
		for (let enfant of this._elemParent._listeElementsEnfants) {
			listeDesEnfants.push(enfant.element);
		}
		listeDesEnfants = PlanTravail.FiltrerElementsGraphique(
			listeDesEnfants,
			typeRechercher,
		);
		return listeDesEnfants.sort((a, b) => a._abscisse - b._abscisse);
	}
}
window.customElements.define("condition-element", Condition);
