class EvenementCreationElement extends EvenementEdition {
    // ATTRIBUTS
    _plan; // Plan
    // CONSTRUCTEUR
    /**
     * @constructor
     * @param {ElementGraphique|Condition} elementConcerne L'élément graphique ou la condition concernée
     */
    constructor(elementConcerne, plan) {
    super(elementConcerne);
    this._plan = plan;
    }

      // METHODES
    /**
     * @description Annule l'événement
     */
    annuler() {
        if (verbose) console.log("Annulation de l'événement de création");
        this._plan.removeChild(this._elementConcerne);
    }

    /**
     * @description Rétablit l'événement
     */
    retablir() {
        if (verbose) console.log("Rétablissement de l'événement de création");
        this._plan.appendChild(this._elementConcerne);
    }
}