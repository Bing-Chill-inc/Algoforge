/**
 * La Classe ErreurArretIteratifBornee stock s'il y a des conditions de sortie qui n'est pas dans une boucle itérative Bornée.
 *
 * @class ErreurArretIteratifBornee
 * @typedef {ErreurArretIteratifBornee}
 * @extends {ErreurConceptuelle}
 */
class ErreurArretIteratifBornee extends ErreurConceptuelle
{
    // ATTRIBUTS
    _structureIterative; // Structure Iterative 

    // CONSTRUCTEUR
    /**
     * Crée une instance de ErreurArretIteratifBornee.
     *
     * @constructor
     * @param {ConditionSortie} elementEmetteur
     */
    constructor(elementEmetteur) {
        super(elementEmetteur);        
    }
    
    // ENCAPSULATION
    /**
     * Définit la valeur de _structureIterative de ErreurArretIteratifBornee
     *
     * @type {StructureIterative}
     */
    set _structureIterative(value)
    {
        this._structureIterative = value;
    }
    /**
     * retourne la valeur de _structureIterative de ErreurArretIteratifBornee
     */
    get _structureIterative()
    {
        return this._structureIterative;
    }
    
    // METHODES
    /**
     * Cette méthode renvoi un message qui nous donne la condition de sortie qui est dans une boucle itérative bornée.
     *
     * @returns {string}
     */
    toString()
    {
        return "L'arrêt en surbrillance est dans une boucle itérative bornée.";
    }

    /**
     * La méthode detecterAnomalie cherche s'il y a une condition de sortie dans une boucle itérative bornée et renvoi false s'il est dans une boucle sinon false.
     *
     * @static
     * @param {ConditionSortie} unArret
     * @returns {boolean}
     */
    static detecterAnomalie(unArret) {
        let listeAntescedants = unArret.getAntescedants(StructureIterativeBornee);
            if(listeAntescedants.length > 0){
                return true;
            }
            return false;
    }
    
}