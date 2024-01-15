/**
 * La class ErreurBoucleSansSortie vérifie qu'une boucle non bornée possède une condition de sortie.
 *
 * @class ErreurBoucleSansSortie
 * @typedef {ErreurBoucleSansSortie}
 * @extends {ErreurConceptuelle}
 */
class ErreurBoucleSansSortie extends ErreurConceptuelle
{
    // ATTRIBUTS  -- Non --


    // CONSTRUCTEUR
    /**
     * Crée une instance de ErreurBoucleSansSortie.
     *
     * @constructor
     * @param {StructureIterativeNonBornee} elementEmetteur
     */
    constructor(elementEmetteur) 
    {
        super(elementEmetteur);
    }
            
    // ENCAPSULATION  -- Non --

    // METHODES
    /**
     * Cette méthode renvoi un message qui nous dit qu'une boucle non bornée n'a pas de condition de sortie.
     *
     * @returns {string}
     */
    toString()
    {
        return "La boucle en surbrillance n'a pas de sortie.";
    }
        
    // Vérifie si la boucle non bornée a une sortie
    /**
     * Cette méthode vérifie que dans les descendants d'une boucle non bornée il y a une sortie.
     *
     * @static
     * @param {*} uneBoucleNonBornee
     * @returns {boolean}
     */
    static detecterAnomalie(uneBoucleNonBornee) {
        let listeDescandants = uneBoucleNonBornee.getDescendants(ConditionSortie)
        for (let descendant of listeDescandants) {
            if (descendant.getAntescendant(StructureIterativeNonBornee)[0] == uneBoucleNonBornee ) {
                return false;
            }
        }
        return true;
    }
} 