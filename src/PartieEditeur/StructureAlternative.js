/**
 * @class StructureAlternative
 * @classdesc Représente les différentes structures de contrôle.
 * @description Utilisé par les différentes structures de contrôle pour les instancier.
 * @extends {ElementGraphique}
 */
class StructureAlternative extends ElementGraphique {
	// ATTRIBUTS
	_listeConditions; // HTML Collection de Condition•s
	_editeur = document.querySelector("editeur-interface"); // Editeur
	_mouseDownTime = 0; // Temps du clic de souris

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {string|number} abscisse - L'abscisse.
	 * @param {string|number} ordonnee - L'ordonnée.
	 * @param {Array<Condition>} listeConditions - La liste des conditions.
	 */
	constructor(abscisse, ordonnee, listeConditions = []) {
		super(abscisse, ordonnee);
		this._listeConditions = listeConditions;
		if (this._listeConditions.length == 0) {
			this._listeConditions.push(new Condition());
			this._listeConditions[0]._structure = this;
		}

		this.addEventListener("mousemove", function (e) {
			// update les liens vers les enfants
			for (let condition of this._listeConditions.children) {
				condition._elemParent._listeElementsEnfants.forEach((lien) => {
					lien.ligne.update();
				});
			}
		});
	}

	// ENCAPSULATION
	/**
	 * @description Renvoie la liste des conditions.
	 * @returns {Array<Condition>} La liste des conditions.
	 */
	get _listeConditions() {
		return this._listeConditions;
	}

	/**
	 * @description Définit la liste des conditions.
	 * @param {Array<Condition>} value - La nouvelle liste des conditions.
	 */
	set _listeConditions(value) {
		this._listeConditions = value;
	}

	// METHODES
	/**
	 * @description Affiche la structure alternative.
	 */
	afficher() {
		console.log(
			`Abscisse : ${this._abscisse} Ordonnée : ${this._ordonnee}`,
		);
		console.log("Conditions :");
		this._listeConditions.forEach((condition) => {
			condition.afficher();
		});
	}
	/**
	 * @description Récupère les enfants de la structure alternative.
	 * @param {ElementGraphique} typeRechercher - Le type d'ElementGraphique recherché.
	 * @returns {Array<ElementGraphique>} La liste des ElementGraphique correspondant au type recherché.
	 */
	getEnfants(typeRechercher = ElementGraphique) {
		let listeEnfants = [];
		for (let condition of this._listeConditions.children) {
			for (let elem of condition._elemParent._listeElementsEnfants) {
				listeEnfants.push(elem.element);
			}
		}
		listeEnfants = PlanTravail.FiltrerElementsGraphique(
			listeEnfants,
			typeRechercher,
		);
		return PlanTravail.trierElementsGraphique(listeEnfants);
	}

	/**
	 * @description Ajoute une condition à la structure alternative.
	 * @param {Condition} condition - La condition à ajouter.
	 */
	ajouterCondition(condition = new Condition()) {
		condition._structure = this;
		this._listeConditions.appendChild(condition);
		this._editeur.ajouterEvenement(
			new EvenementCreationElement(condition, this._listeConditions),
		);
	}

	/**
	 * @description Retire une condition de la structure alternative.
	 * @param {Condition} condition - La condition à retirer.
	 */
	supprimerCondition(condition = null) {
		if (this._listeConditions.children.length == 1) {
			return; // On ne peut pas supprimer la dernière condition
		}
		if (condition instanceof Condition) {
			this._editeur.ajouterEvenement(
				new EvenementSuppressionElement(condition),
			);
			condition._elemParent.delierTousLesEnfants();
			this._listeConditions.removeChild(condition);
		} else {
			// Parcourons les conditions de la droite vers la gauche et retirons la première qui est vide
			for (
				let i = this._listeConditions.children.length - 1;
				i >= 0;
				i--
			) {
				if (this._listeConditions.children[i]._libelle == "") {
					this._listeConditions.children[
						i
					]._elemParent.delierTousLesEnfants();
					this._listeConditions.removeChild(
						this._listeConditions.children[i],
					);
					break;
				}
			}
		}
	}

	/**
	 * @description Renvoie la taille en abscisse de la structure alternative.
	 * @returns {number} La taille en abscisse.
	 */
	getTailleAbscisse() {
		// Nombre de conditions * taille d'une condition
		let taille = 0;
		for (let condition of this._listeConditions.children) {
			taille += condition.getTailleAbscisse();
		}
		return taille;
	}

	/**
	 * @description Renvoie la taille en ordonnée de la structure alternative.
	 * @returns {number} La taille en ordonnée.
	 */
	getTailleOrdonnee() {
		return 4;
	}

	/**
	 * @description Décale une condition dans la structure alternative.
	 * @param {Condition} pCondition - La condition à décaler.
	 * @param {number} decalage - Le décalage à appliquer.
	 * @param {boolean} estAnnulation - Indique si le décalage est une annulation.
	 */
	decalerCondition(pCondition, decalage, estAnnulation = false) {
		if (!estAnnulation)
			this._editeur.ajouterEvenement(
				new EvenementDeplacementCondition(pCondition, decalage),
			);
		if (decalage == -1 && pCondition instanceof Condition) {
			// Décaler la condition vers la gauche
			let autreCondition = pCondition.previousElementSibling;
			if (autreCondition != null) {
				pCondition.style.animation =
					"jumpOverLeft var(--specialTransitionTime) ease-in-out";
				autreCondition.style.animation =
					"slideUnderRight var(--specialTransitionTime) ease-in-out";
				setTimeout(() => {
					pCondition.parentElement.insertBefore(
						pCondition,
						autreCondition,
					);
					pCondition.style.animation = "";
					autreCondition.style.animation = "";
					// update les liens vers les enfants
					pCondition._elemParent._listeElementsEnfants.forEach(
						(lien) => {
							lien.ligne.update();
						},
					);

					autreCondition._elemParent._listeElementsEnfants.forEach(
						(lien) => {
							lien.ligne.update();
						},
					);
				}, parseFloat(document.body.style.getPropertyValue("--specialTransitionTime")) * 1000);
			}
		} else if (decalage == 1 && pCondition instanceof Condition) {
			// Décaler la condition vers la droite
			let autreCondition = pCondition.nextElementSibling;
			if (autreCondition != null) {
				pCondition.style.animation =
					"jumpOverRight var(--specialTransitionTime) ease-in-out";
				autreCondition.style.animation =
					"slideUnderLeft var(--specialTransitionTime) ease-in-out";
				setTimeout(() => {
					pCondition.parentElement.insertBefore(
						autreCondition,
						pCondition,
					);
					pCondition.style.animation = "";
					autreCondition.style.animation = "";
					pCondition._elemParent._listeElementsEnfants.forEach(
						(lien) => {
							lien.ligne.update();
						},
					);

					autreCondition._elemParent._listeElementsEnfants.forEach(
						(lien) => {
							lien.ligne.update();
						},
					);
				}, parseFloat(document.body.style.getPropertyValue("--specialTransitionTime")) * 1000);
			}
		}
	}

	/**
	 * @description Ajoute une condition par rapport à une autre condition.
	 * @param {Condition} pCondition - La condition de référence.
	 * @param {number} decalage - Le décalage à appliquer.
	 * @param {boolean} estAnnulation - Indique si l'ajout est une annulation.
	 */
	ajouterConditionParRapportA(pCondition, decalage, estAnnulation = false) {
		if (decalage == -1 && pCondition instanceof Condition) {
			// Ajouter une condition à gauche
			let newCondition = new Condition();
			newCondition._structure = this;
			this._listeConditions.insertBefore(newCondition, pCondition);
			if (!estAnnulation)
				this._editeur.ajouterEvenement(
					new EvenementCreationElement(
						newCondition,
						this._listeConditions,
					),
				);
		} else if (decalage == 1 && pCondition instanceof Condition) {
			// Ajouter une condition à droite
			let newCondition = new Condition();
			newCondition._structure = this;
			this._listeConditions.insertBefore(
				newCondition,
				pCondition.nextElementSibling,
			);
			if (!estAnnulation)
				this._editeur.ajouterEvenement(
					new EvenementCreationElement(
						newCondition,
						this._listeConditions,
					),
				);
		}
		setTimeout(() => {
			// update les liens vers les enfants
			pCondition._elemParent._listeElementsEnfants.forEach((lien) => {
				lien.ligne.update();
			});
		}, 200);
	}

	/**
	 * @description Supprime la structure alternative.
	 */
	supprimer() {
		for (let condition of this._listeConditions.children) {
			condition._elemParent.delierTousLesEnfants();
		}
		if (this._parent != null) this._parent.delierEnfant(this);
		this.remove();
	}

	/**
	 * @description Renvoie les enfants de la structure alternative par condition.
	 * @returns {Array<Array<ElementGraphique>>} La liste des enfants par condition.
	 */
	getEnfantsParCondition() {
		let listeConditionsEnfants = [];
		for (let condition of this._listeConditions.children) {
			let listeEnfantsParCondition = [];
			for (let elem of condition._elemParent._listeElementsEnfants) {
				listeEnfantsParCondition.push(elem.element);
			}
			listeEnfantsParCondition = PlanTravail.trierElementsGraphique(
				listeEnfantsParCondition,
			);
			listeConditionsEnfants.push(listeEnfantsParCondition);
		}
		return listeConditionsEnfants;
	}

	/**
	 * @description Renvoie une condition par son index.
	 * @param {number} index - L'index de la condition.
	 * @returns {Condition} La condition correspondante.
	 */
	getCondition(index) {
		return this._listeConditions.children[index];
	}

	/**
	 * @description Génère les options contextuelles pour la structure alternative.
	 * @param {Editeur} editeur - L'éditeur d'algorithmes.
	 * @returns {Array<ElementMenu>} La liste des options contextuelles.
	 */
	genererOptionsContextuelles(editeur) {
		let listeOptions = super.genererOptionsContextuelles(editeur);

		// Ajouter la possibilité de délier les enfants
		listeOptions.push(
			new ElementMenu("Délier toutes les conditions", () => {
				if (verbose) console.log("Supprimer");
				for (let condition of this._listeConditions.children) {
					condition._elemParent.delierTousLesEnfants();
				}
			}),
		);
		return listeOptions;
	}
}
