/**
 * La class ErreurSyntaxeAssignation vérifie que la syntaxe d'assignation d'un problème ne contient pas d'erreur.
 *
 * @class ErreurSyntaxeAssignation
 * @typedef {ErreurSyntaxeAssignation}
 * @extends {ErreurConceptuelle}
 */
class ErreurSyntaxeAssignation extends ErreurConceptuelle {
    // Pas un égal pour l’assignation mais une flèche   
    // ATTRIBUTS  -- Non --


    // CONSTRUCTEUR
    /**
     * Crée une instance de ErreurSyntaxeAssignation.
     *
     * @constructor
     * @param {Probleme} elementEmetteur
     */
    constructor(elementEmetteur) {
        super(elementEmetteur);
    }
        
    // ENCAPSULATION  -- Non --

    // METHODES
    /**
     * Cette méthode vérifie que l'assignation dans un problème est correctement écrite.
     *
     * @static
     * @param {*} unProbleme
     * @returns {*}
     */
    static detecterAnomalie(unProbleme) {
        return unProbleme.getTexte().includes('=') || unProbleme.getTexte().includes('->');
    }
    
    /**
     * Cette méthode renvoi un message qui nous dit qu'une assignation a une erreur de syntaxe.
     *
     * @returns {string}
     */
    toString() {
        return "L'assignation en surbrillance n'est pas syntaxiquement correcte.";
    }
} 