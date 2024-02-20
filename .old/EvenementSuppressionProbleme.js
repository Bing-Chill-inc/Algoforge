class EvenementSuppressionProbleme extends EvenementSuppressionElement {
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
     * @param {Probleme} probleme Le problème concerné
     */
    constructor(probleme) {
        super(probleme);
        this._abscisse = probleme._abscisse;
        this._ordonnee = probleme._ordonnee;
        this._libelle = probleme.getTexte();
        this._donnees = probleme.getDonnee();
        this._resultats = probleme.getResultat();
        this._listeEnfants = probleme.getEnfants();
        this._parent = probleme._parent;
        this._planTravail = probleme.parentNode;
    }

    // METHODES
    /**
     * @description Annule l'événement
     */
    annuler() {
        let probleme = new Probleme(this._abscisse, this._ordonnee, this._libelle);
        probleme.afficher();
        probleme.setDonnee(this._donnees);
        probleme.setResultat(this._resultats);
        this._planTravail.appendChild(probleme);
        this._listeEnfants.forEach(enfant => {
            probleme._elemParent.lierEnfant(enfant);
        });
        if (this._parent) {
            this._parent.lierEnfant(probleme);
        }
        this._elementConcerne = probleme;
    }

    /**
     * @description Rétablit l'événement
     */
    retablir() {
        this._elementConcerne.supprimer();
    }
}