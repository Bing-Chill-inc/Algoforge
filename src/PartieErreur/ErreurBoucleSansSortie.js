/**
 * @class ErreurBoucleSansSortie
 * @extends {ErreurConceptuelle}
 * @classdesc La classe ErreurBoucleSansSortie vérifie qu'une boucle non bornée possède une condition de sortie.
 * @description Crée une instance de ErreurBoucleSansSortie.
 */
class ErreurBoucleSansSortie extends ErreurConceptuelle
{
    // ATTRIBUTS  -- Non --


    // CONSTRUCTEUR
    /**
     * @constructor
     * @param {StructureIterativeNonBornee} elementEmetteur - La boucle non bornée émettrice de l'erreur.
     * @type {StructureIterativeNonBornee}
     */
    constructor(elementEmetteur) 
    {
        super(elementEmetteur);
    }
            
    // ENCAPSULATION  -- Non --

    // METHODES
    /**
     * @returns {string} - Renvoi une chaine de caractères.
     * @description Cette méthode renvoie un message indiquant qu'une boucle non bornée en surbrillance n'a pas de condition de sortie.
     */
    toString()
    {
        return "La boucle en surbrillance n'a pas de sortie.";
    }
        
    // Vérifie si la boucle non bornée a une sortie
    /**
     * @static
     * @param {StructureIterativeNonBornee} uneBoucleNonBornee - Instance de la classe StructureIterativeNonBornee.
     * @type {StructureIterativeNonBornee}
     * @returns {boolean} - Renvoi true ou false.
     * @description Cette méthode vérifie que dans les descendants d'une boucle non bornée, il y a une condition de sortie.
     */
    static detecterAnomalie(uneBoucleNonBornee) {
        let listeDescandants = uneBoucleNonBornee.getDescendants(ConditionSortie)
        for (let descendant of listeDescandants) {
            if (descendant.getAntescedants(StructureIterativeNonBornee)[0] == uneBoucleNonBornee ) {
                return false;
            }
        }
        return true;
    }
} 