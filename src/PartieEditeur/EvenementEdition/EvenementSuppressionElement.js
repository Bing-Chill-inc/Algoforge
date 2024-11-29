class EvenementSuppressionElement extends EvenementEdition {
	// ATTRIBUTS
	_planTravail; // PlanTravail
	_listeEnfants = []; // Array<Array<ElementGraphique/Condition,ElementGraphique>>
	_parent; // ElementGraphique

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {ElementGraphique|Condition} elementConcerne L'élément graphique concerné par l'événement
	 */
	constructor(elementConcerne) {
		super(elementConcerne);
		this._planTravail = elementConcerne.parentNode;
		this._parent = elementConcerne._parent;
		if (elementConcerne instanceof StructureAlternative) {
			this._listeEnfants = elementConcerne.getEnfantsParCondition();
		} else if (elementConcerne instanceof ElementGraphique) {
			for (let enfant of elementConcerne.getEnfants()) {
				this._listeEnfants.push([elementConcerne, enfant]);
			}
		} else if (elementConcerne instanceof Condition) {
			for (let enfant of elementConcerne.getEnfants()) {
				this._listeEnfants.push([elementConcerne, enfant]);
			}
		}
	}

	// METHODES
	/**
	 * @description Annule l'événement
	 */
	annuler() {
		if (verbose) console.log("Annulation de l'événement de suppression");
		this._planTravail.appendChild(this._elementConcerne);
		if (this._parent) {
			this._parent.lierEnfant(this._elementConcerne);
		}
		for (let enfant of this._listeEnfants) {
			enfant[0]._elemParent.lierEnfant(enfant[1]);
		}
	}

	/**
	 * @description Rétablit l'événement
	 */
	retablir() {
		if (verbose)
			console.log("Rétablissement de l'événement de suppression");
		this._elementConcerne.supprimer();
	}
}
