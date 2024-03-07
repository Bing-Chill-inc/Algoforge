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
        return "L'arrêt en surbrillance est hors d'une boucle itérative et d'une structure alternative.";
    }
    /**
     * @static
     * @param {ConditionSortie} unArret - Instance de la classe ConditionSortie.
     * @type {ConditionSortie}
     * @returns {boolean} - Renvoi true ou false.
     * @description La méthode detecterAnomalie vérifie si une condition de sortie est en dehors d'une boucle itérative et renvoie true si c'est le cas, sinon false.
     */
    static detecterAnomalie(unArret) {
        // Recuperer la premiere structure SI
        let listeStructureAlternative = unArret.getAntescedants(StructureAlternative);
        if(listeStructureAlternative.length > 0)
        {
            let listeStructureIterativeNonBornee = listeStructureAlternative[0].getAntescedants(StructureIterativeNonBornee);
            if(listeStructureIterativeNonBornee.length > 0){
                return false;
            }
        }
        return true;
    }
}