/**
 * La Classe AvertissementSProblemeJamaisExecute stock les ElementGraphique qui sont après une condition de sortie et qui ne sont donc pas exécutés.
 *
 * @class AvertissementSProblemeJamaisExecute
 * @typedef {AvertissementSProblemeJamaisExecute}
 * @extends {AvertissementConceptuel}
 */
class AvertissementSProblemeJamaisExecute extends AvertissementConceptuel {
    // ATTRIBUTS
    _listeElementsConcernes ; // array<ElementGraphique>

    // CONSTRUCTEUR
    /**
     * Crée une instance d'AvertissementSProblemeJamaisExecute.
     * 
     * Par défaut la liste des éléments qui ne sont pas exécutés est à la création de l'instance vide.
     *
     * @constructor
     * @param {ConditionSortie} elementEmetteur
     * @param {ElementGraphique} [listeElementsConcernes=new Array()]
     */
    constructor(elementEmetteur, listeElementsConcernes = new Array()) {
        super(elementEmetteur);
        this._listeElementsConcernes = listeElementsConcernes;
    }

    // ENCAPSULATION
    /**
     * Définit la valeur de _listeElementsConcernes de AvertissementSProblemeJamaisExecute
     *
     * @type {ElementGraphique}
     */
    set _listeElementsConcernes(value) {
        this._listeElementsConcernes = value;
    }
    /**
     * renvoi la valeur de _listeElementsConcernes de AvertissementSProblemeJamaisExecute
     *
     * @readonly
     * @type {ElementGraphique}
     */
    get _elementEmetteur() {
        return this._listeElementsConcernes;
    }

    // METHODES
    /**
     * Cette méthode renvoi un message qui nous dit qu'une condition de sortie est exécutée avant un problème.
     *
     * @returns {string}
     */
    toString() {
        return "Les éléments en surbrillances ne sont jamais exécutés.";

    }

    /**
     * La méthode detecterAnomalie cherche si le parent de la condition d'arrêt a des enfants qui sont après la condition d'arrêt si oui la méthode renvoie True avec la liste des éléments concernés si non False.
     *
     * @static
     * @param {ConditionSortie} unArret
     * @returns {{}}
     */
    static detecterAnomalie(unArret) {
        const parent = unArret.getParent();
        if (parent == null) {
            return [false];
        }
        const listeEnfantsDuParent = parent.getEnfants();
        let tailleListe = listeEnfantsDuParent.length;
        if (listeEnfantsDuParent[tailleListe - 1] != unArret) {
            let courant = tailleListe - 1;
            let elementsConcernes = [];
            while (listeEnfantsDuParent[courant] != unArret){
                elementsConcernes.push(listeEnfantsDuParent[courant]);
                courant--;
            }
            return [true, elementsConcernes];
        }
        return [false];
    }
} 