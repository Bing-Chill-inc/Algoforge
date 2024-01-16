/**
 * @class ErreurSyntaxeComparaison
 * @extends {ErreurConceptuelle}
 * @classdesc La classe ErreurSyntaxeComparaison vérifie que la syntaxe lors d'une comparaison est correcte.
 * @description Crée une instance de ErreurSyntaxeComparaison. 
*/
class ErreurSyntaxeComparaison extends ErreurConceptuelle
{
    // ATTRIBUTS  -- Non --


    // CONSTRUCTEUR
    /**
     * @constructor
     * @param {StructureAlternative} elementEmetteur - La structure alternative émettrice de l'erreur.
     * @type {StructureAlternative}
     */
    constructor(elementEmetteur) 
    {
        super(elementEmetteur);
    }
            
    // ENCAPSULATION  -- Non --

    // METHODES
    /**
     * @returns {string} - Renvoie une chaine de caractères.
     * @description Renvoie un message indiquant qu'une comparaison en surbrillance n'est pas syntaxiquement correcte.
     */
    toString()
    {
        return "La comparaison en surbrillance n'est pas syntaxiquement correcte.";
    }

    /**
     * @static
     * @param {StructureAlternative} structureAlternative - Instance de la classe StructureAlternative.
     * @type {StructureAlternative}
     * @returns {boolean} - Renvoi true ou false.
     * @description Cette méthode vérifie que chaque condition d'une StructureAlternative ne possède pas de double égal. Si une condition possède un double égal, elle renvoie true.
     */
    static detecterAnomalie(StructureAlternative){
        for (let condition of StructureAlternative._listeConditions.children) {
            if (condition.querySelector('.libelle').textContent.includes("==")) {
                return true;
            }
        }
    }
} 