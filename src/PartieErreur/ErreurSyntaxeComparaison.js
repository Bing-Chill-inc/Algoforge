/**
 * La class ErreurSyntaxeComparaison vérifie que la syntaxe lors d'une comparaison soit correcte
 *
 * @class ErreurSyntaxeComparaison
 * @typedef {ErreurSyntaxeComparaison}
 * @extends {ErreurConceptuelle}
 */
class ErreurSyntaxeComparaison extends ErreurConceptuelle
{
    // ATTRIBUTS  -- Non --


    // CONSTRUCTEUR
    /**
     * Crée une instance de ErreurSyntaxeComparaison.
     *
     * @constructor
     * @param {StructureAlternative} elementEmetteur
     */
    constructor(elementEmetteur) 
    {
        super(elementEmetteur);
    }
            
    // ENCAPSULATION  -- Non --

    // METHODES
    /**
     * Cette méthode renvoi un message qui nous dit qu'une comparaison a une erreur de syntaxe.
     *
     * @returns {string}
     */
    toString()
    {
        return "La comparaison en surbrillance n'est pas syntaxiquement correcte.";
    }

    /**
     * Cette méthode vérifie que chaque condition d'une StructureAlternative ne possède pas de double égale si une condition possède un double égale il renvoie true.
     *
     * @static
     * @param {StructureAlternative} StructureAlternative
     * @returns {boolean}
     */
    static detecterAnomalie(StructureAlternative){
        for (let condition of StructureAlternative._listeConditions.children) {
            if (condition.querySelector('.libelle').textContent.includes("==")) {
                return true;
            }
        }
    }
} 