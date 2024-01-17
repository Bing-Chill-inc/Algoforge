/**
 * @class ConditionSortie
 * @classdesc L'ElementGraphique qui permet la sortie d'une structure itérative non bornée
 * @description Crée une instance de ConditionSortie
 * @extends {ElementGraphique}
 */
class ConditionSortie extends ElementGraphique {
    // ATTRIBUTS -non-

    // CONSTRUCTEUR
    /**
     * @constructor
     * @param {string|number} abscisse l'abscisse
     * @param {string|number} ordonnee l'ordonnée
     */
    constructor(abscisse = 0, ordonnee = 0) {
        super(abscisse, ordonnee);
    }

    // ENCAPSULATION -non-

    // METHODES
    /**
     * @deprecated
     * @returns {}
     */
    afficher() {
        // Inutile car géré par le CSS, mais présent pour la cohérence
        return null;
    }

    /**
     * @description Recherche les anomalies dans la conditions de sortie<br>
     * Liste des Erreurs:<br>
     * 
     * 5 : Conditions d’arrêt hors d’une structure itérative 
     * @returns {Array<AnomalieConceptuelle>} La listes des anomalies trouvées
     */
    rechercherAnomalies() {
        let mesAnomalies = [];

        //5
        if(ErreurArretHorsIteratif.detecterAnomalie(this)) {
            mesAnomalies.push(new ErreurArretHorsIteratif(this));
        }

        if(mesAnomalies.length == 0){
            if(ErreurArretIteratifBornee.detecterAnomalie(this)){
                mesAnomalies.push(new ErreurArretIteratifBornee(this));
            }
        }
        let problemeJamaisExecute = AvertissementSProblemeJamaisExecute.detecterAnomalie(this);
        if(problemeJamaisExecute[0]){
            mesAnomalies.push(new AvertissementSProblemeJamaisExecute(this, problemeJamaisExecute[1]));
        }
        return super.rechercherAnomalies(mesAnomalies);
    }

    /**
     * @deprecated
     * @returns {Array}
     */
    extraireInformation() {
        return [];
    }

    /**
     * 
     * @returns {JSON} Le corp JSON de la condition de sortie
     * @property {ElementGraphique} typeElement Le type d'ElementGraphique de condition de sortie
     * @property {string|number} abscisse l'abscisse
     * @property {string|number} ordonnee l'ordonnée
     */
    toJSON() {
        return {
            typeElement: this.constructor.name,
            abscisse: this._abscisse,
            ordonnee: this._ordonnee
        };
    }
} window.customElements.define("condition-sortie-element", ConditionSortie);
