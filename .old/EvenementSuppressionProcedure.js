class EvenementSuppressionProcedure extends EvenementSuppressionElement {
	// ATTRIBUTS
	_abscisse; // Float
	_ordonnee; // Float
	_libelle; // String
	_donnees; // String
	_resultats; // String
	_listeEnfants; // Array<ElementGraphique>
	_parent; // ElementGraphique
	_planTravail; // PlanTravail

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {Procedure} procedure Le problème concerné
	 */
	constructor(procedure) {
		super(procedure);
		this._abscisse = procedure._abscisse;
		this._ordonnee = procedure._ordonnee;
		this._libelle = procedure.getTexte();
		this._donnees = procedure.getDonnee();
		this._resultats = procedure.getResultat();
		this._listeEnfants = procedure.getEnfants();
		this._parent = procedure._parent;
		this._planTravail = procedure.parentNode;
	}

	// METHODES
	/**
	 * @description Annule l'événement
	 */
	annuler() {
		let procedure = new Procedure(
			this._abscisse,
			this._ordonnee,
			this._libelle,
		);
		procedure.afficher();
		procedure.setDonnee(this._donnees);
		procedure.setResultat(this._resultats);
		this._planTravail.appendChild(procedure);
		this._listeEnfants.forEach((enfant) => {
			procedure._elemParent.lierEnfant(enfant);
		});
		if (this._parent) {
			this._parent.lierEnfant(procedure);
		}
		this._elementConcerne = procedure;
	}

	/**
	 * @description Rétablit l'événement
	 */
	retablir() {
		this._elementConcerne.supprimer();
	}
}
