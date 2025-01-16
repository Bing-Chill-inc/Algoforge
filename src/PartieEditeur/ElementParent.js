/**
 * @class ElementParent
 * @classdesc La classe ElementParent gère les éléments enfants d'un élément graphique.
 */
class ElementParent {
	// ATTRIBUTS
	_listeElementsEnfants; // Liste contient les ElementGraphiques et les Lignes
	_proprietaire; // ElementGraphique
	_editeur = document.querySelector("editeur-interface"); // Editeur

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {ElementGraphique} proprietaire - L'élément graphique propriétaire.
	 * @param {Array} [listeElementsEnfants=[]] - La liste des éléments enfants.
	 */
	constructor(proprietaire, listeElementsEnfants = []) {
		this._proprietaire = proprietaire;
		this._listeElementsEnfants = listeElementsEnfants;

		setInterval(() => {
			this.updateAll();
		}, 1000 / 12); // 12FPS
	}

	// ENCAPSULATION
	/**
	 * @description Obtient la liste des éléments enfants.
	 * @returns {Array} La liste des éléments enfants.
	 */
	get _listeElementsEnfants() {
		return this._listeElementsEnfants;
	}

	/**
	 * @description Définit la liste des éléments enfants.
	 * @param {Array} value - La nouvelle liste des éléments enfants.
	 */
	set _listeElementsEnfants(value) {
		this._listeElementsEnfants = value;
	}

	/**
	 * @description Obtient le propriétaire de l'élément parent.
	 * @returns {ElementGraphique} Le propriétaire de l'élément parent.
	 */
	get _proprietaire() {
		return this._proprietaire;
	}

	/**
	 * @description Définit le propriétaire de l'élément parent.
	 * @param {ElementGraphique} value - Le nouveau propriétaire de l'élément parent.
	 */
	set _proprietaire(value) {
		this._proprietaire = value;
	}

	/**
	 * @description Obtient le nombre d'enfants.
	 * @returns {number} Le nombre d'enfants.
	 */
	get nombreEnfants() {
		return this._listeElementsEnfants.length;
	}

	// METHODES
	/**
	 * @description Lie un élément enfant à l'élément parent.
	 * @param {ElementGraphique} elementAAjouter - L'élément à ajouter.
	 * @param {boolean} [provientAnnulation=false] - Indique si l'action provient d'une annulation.
	 * @returns {boolean} Indique si l'élément a été ajouté avec succès.
	 */
	lierEnfant(elementAAjouter, provientAnnulation = false) {
		if (!provientAnnulation)
			this._editeur.ajouterEvenement(
				new EvenementLiaison(this._proprietaire, elementAAjouter),
			);
		if (elementAAjouter instanceof ElementGraphique) {
			// Si l'élément à ajouter est déjà un enfant, on l'enlève de son parent
			for (var lien of this._listeElementsEnfants) {
				if (lien.element === elementAAjouter) {
					if (verbose)
						console.log(
							"L'élément à ajouter est déjà un enfant, on l'enlève de son parent",
						);
					this.delierEnfant(elementAAjouter);
					elementAAjouter._parent = null;
					return false;
				}
			}
			if (elementAAjouter._parent != null) {
				if (verbose)
					console.log(
						"L'élément à ajouter a déjà un parent, on l'enlève de son parent",
					);
				elementAAjouter._parent.delierEnfant(elementAAjouter);
			}
			elementAAjouter._parent = this;
			let ligneEntreLesElements = this.creerLienAdequat(
				this._proprietaire,
				elementAAjouter,
				this._proprietaire.espaceTravail,
			);
			this._listeElementsEnfants.push({
				element: elementAAjouter,
				ligne: ligneEntreLesElements,
			});
			return true;
		}
		return false;
	}

	/**
	 * @description Délie un élément enfant de l'élément parent.
	 * @param {ElementGraphique} elementASupprimer - L'élément à supprimer.
	 * @param {boolean} [provientAnnulation=false] - Indique si l'action provient d'une annulation.
	 */
	delierEnfant(elementASupprimer, provientAnnulation = false) {
		if (!provientAnnulation)
			this._editeur.ajouterEvenement(
				new EvenementSuppressionLiaison(
					this._proprietaire,
					elementASupprimer,
				),
			);
		var lien;
		for (lien of this._listeElementsEnfants) {
			if (lien.element === elementASupprimer) {
				lien.ligne.supprimer();
				this._listeElementsEnfants.splice(
					this._listeElementsEnfants.indexOf(lien),
					1,
				);
				lien.element._parent = null;
				break;
			}
		}
	}

	/**
	 * @description Délie tous les éléments enfants de l'élément parent.
	 */
	delierTousLesEnfants() {
		while (this._listeElementsEnfants.length > 0) {
			this.delierEnfant(this._listeElementsEnfants[0].element);
		}
	}

	/**
	 * @description Convertit l'élément parent en JSON.
	 * @returns {Array} La représentation JSON des éléments enfants.
	 */
	toJSON() {
		let listeEnfants = [];
		this._listeElementsEnfants.forEach((lien) => {
			listeEnfants.push(lien.element.toJSON());
		});
		return listeEnfants;
	}

	/**
	 * @description Convertit l'élément parent en JSON en spécifiant les éléments enfants à conserver.
	 * @param {Array} listeElemEnfantsAConcerver - La liste des éléments enfants à conserver.
	 * @returns {Array} La représentation JSON des éléments enfants spécifiés.
	 */
	toJSONspecifier(listeElemEnfantsAConcerver) {
		let listeEnfants = [];
		if (verbose) console.log(listeElemEnfantsAConcerver);
		this._listeElementsEnfants.forEach((lien) => {
			if (listeElemEnfantsAConcerver.includes(lien.element)) {
				listeEnfants.push(
					lien.element.toJSONspecifier(listeElemEnfantsAConcerver),
				);
			}
		});
		return listeEnfants;
	}

	/**
	 * @description Crée un lien adéquat entre un élément graphique parent et un élément graphique enfant.
	 * @param {ElementGraphique} elemGraphiqueParent - L'élément graphique parent.
	 * @param {ElementGraphique} elemGraphiqueEnfant - L'élément graphique enfant.
	 * @param {HTMLElement} espaceTravail - L'espace de travail.
	 * @returns {Lien} Le lien créé.
	 */
	creerLienAdequat(elemGraphiqueParent, elemGraphiqueEnfant, espaceTravail) {
		let nouveauLien;
		switch (elemGraphiqueParent.constructor.name) {
			case Probleme.name:
			case Procedure.name:
				nouveauLien = new LienCompositionProbleme(
					elemGraphiqueParent,
					elemGraphiqueEnfant,
					espaceTravail,
				);
				break;
			case StructureIterativeBornee.name:
			case StructureIterativeNonBornee.name:
				nouveauLien = new LienTriple(
					elemGraphiqueParent,
					elemGraphiqueEnfant,
					espaceTravail,
				);
				break;
			case Condition.name:
				// Si la condition n'a qu'un seul enfant (0 au moment de l'exécution de cette fonction), alors on crée un lien droit (LienDroit)
				// Sinon, on crée un lien triple (LienTriple)
				if (
					elemGraphiqueParent._elemParent._listeElementsEnfants
						.length == 0
				) {
					nouveauLien = new LienDroit(
						elemGraphiqueParent,
						elemGraphiqueEnfant,
						espaceTravail,
					);
				} else {
					nouveauLien = new LienTriple(
						elemGraphiqueParent,
						elemGraphiqueEnfant,
						espaceTravail,
					);
					// Pour tous les autres enfants de la condition, on change le LienDroit en LienTriple
					elemGraphiqueParent._elemParent._listeElementsEnfants.forEach(
						(lien) => {
							if (lien.ligne.constructor.name == LienDroit.name) {
								lien.ligne.supprimer();
								lien.ligne = new LienTriple(
									elemGraphiqueParent,
									lien.element,
									espaceTravail,
								);
							}
						},
					);
				}
				break;
			default:
				nouveauLien = new Lien(
					elemGraphiqueParent,
					elemGraphiqueEnfant,
					espaceTravail,
				);
				break;
		}
		return nouveauLien;
	}

	/**
	 * @description Met à jour tous les liens des éléments enfants.
	 */
	updateAll() {
		for (let lien of this._listeElementsEnfants) {
			lien.ligne.update();
		}
	}
}
