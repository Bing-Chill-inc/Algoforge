/**
 * @class AvertissementTropDeSousElements
 * @extends {AvertissementConceptuel}
 * @classdesc La Classe AvertissementTropDeSousElements stocke les ElementGraphique qui ont trop d'enfants.
 * @description Crée une instance de AvertissementTropDeSousElements
 */
class AvertissementTropDeSousElements extends AvertissementConceptuel {
    // ATTRIBUTS
    _listeElementsConcernes ; // array<ElementGraphique>

    // CONSTRUCTEUR
    /**
     * @constructor
     * @param {ElementGraphique} elementEmetteur - L'ElementGraphique émettrice de l'avertissement.
     * @type {ElementGraphique}
     * @param {Array<ElementGraphique>} [listeElementsConcernes=[]] - Liste des sous-éléments (par défaut, la liste est vide).
     */
    constructor(elementEmetteur, listeElementsConcernes = new Array()) {
        super(elementEmetteur);
        this._listeElementsConcernes = listeElementsConcernes;
    }

    // ENCAPSULATION
    /**
     * @param {Array<ElementGraphique>} value - Nouvelle liste des éléments concernés par l'avertissement.
     * @type {Array<ElementGraphique>}
     * @description Définit la valeur de _listeElementsConcernes de AvertissementSProblemeJamaisExecute.
     */
    set _listeElementsConcernes(value) {
        this._listeElementsConcernes = value;
    }
    /**
     * @returns {Array<ElementGraphique>} - Renvoi une liste d'ElementGraphique.
     * @description Renvoie la liste des éléments concernés par l'avertissement.
     */
    get _listeElementsConcernes() {
        return this._listeElementsConcernes;
    }
    // METHODES
    /**
     * @returns {string} - Renvoie une chaine de caractères.
     * @description Renvoie un message indiquant qu'il y a trop de sous-éléments.
     */
    toString() {
        return "L'élément en surbrillance a trop de sous-éléments.";
    }
    /**
     * @static
     * @param {ElementGraphique} unElementGraphique - Instance de la classe ConditionSortie.
     * @type {ElementGraphique}
     * @returns {Array} - Renvoi une liste dont le premier élément est true ou false si true le deuxième élément est une liste d'ElementGraphique.
     * @description La méthode detecterAnomalie regarde si un ElementGraphique posède plus de 7 enfants.
     */
    static detecterAnomalie(unElementGraphique) {
        try {
        if(unElementGraphique.getEnfants().length > 7){
            return [true, unElementGraphique.getEnfants()];
        }
        else{
            return [false];
        }
        }
        catch(e) {
            console.error(e);
            return [false];
        }
    }
}