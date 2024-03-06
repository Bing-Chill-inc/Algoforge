/**
 * @class ErreurArretHorsIteratif
 * @extends {ErreurConceptuelle}
 * @classdesc La Classe ErreurArretHorsIteratif signale si une condition de sortie est en dehors d'une boucle itérative.
 * @description Crée une instance de ErreurArretHorsIteratif.
 */
class ErreurArretHorsIteratif extends ErreurConceptuelle
{
    // ATTRIBUTS  -- Non --


    // CONSTRUCTEUR
    /**
     * @constructor
     * @param {ConditionSortie} elementEmetteur - La condition de sortie émettrice de l'erreur.
     * @type {ConditionSortie}
     */
    constructor(elementEmetteur) {
        super(elementEmetteur);
    }
            
    // ENCAPSULATION  -- Non --

    // METHODES
    /**
     * @returns {string} - Renvoie une chaine de caractères.
     * @description Renvoie un message indiquant que la condition de sortie est en dehors d'une boucle itérative.
     */
    toString() {            
        return "L'arrêt en surbrillance est hors d'une boucle itérative.";
    }
    /**
     * @static
     * @param {ConditionSortie} unArret - Instance de la classe ConditionSortie.
     * @type {ConditionSortie}
     * @returns {boolean} - Renvoi true ou false.
     * @description La méthode detecterAnomalie vérifie si une condition de sortie est en dehors d'une boucle itérative et renvoie true si c'est le cas, sinon false.
     */
    static detecterAnomalie(unArret) {
        
        let listeAntescedants = unArret.getAntescedants(StructureIterativeNonBornee);
        if(listeAntescedants.length > 0){
            return false;
        }
        return true;
    }
}