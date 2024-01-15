/**
 * La Classe ErreurResultatInutilisee stock s'il y a des conditions de sortie qui n'est pas dans une boucle itérative.
 *
 * @class ErreurArretHorsIteratif
 * @typedef {ErreurArretHorsIteratif}
 * @extends {ErreurConceptuelle}
 */
class ErreurArretHorsIteratif extends ErreurConceptuelle
{
    // ATTRIBUTS  -- Non --


    // CONSTRUCTEUR
    constructor(elementEmetteur) {
        super(elementEmetteur);
    }
            
    // ENCAPSULATION  -- Non --

    // METHODES
    /**
     * Cette méthode renvoi un message qui nous donne la condition de sortie qui est hors d'une boucle itérative.
     *
     * @returns {string}
     */
    toString() {            
        return "L'arrêt en surbrillance est hors d'une boucle itérative.";
    }

    /**
     * La méthode detecterAnomalie cherche s'il y a une condition de sortie hors d'une boucle et renvoi false s'il est dans une boucle sinon false.
     *
     * @static
     * @param {ConditionSortie} unArret
     * @returns {boolean}
     */
    static detecterAnomalie(unArret) {
        let listeAntescedants = unArret.getAntescedants(StructureIterativeNonBornee);
        if(listeAntescedants.length > 0){
            return false;
        }
        return true;
    }
}