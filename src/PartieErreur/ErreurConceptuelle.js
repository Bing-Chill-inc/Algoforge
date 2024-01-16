/**
 * @class ErreurConceptuelle
 * @extends {AnomalieConceptuelle}
 * @classdesc La classe ErreurConceptuelle est une sous-classe d'AnomalieConceptuelle, servant de base à toutes les erreurs de l'éditeur d'algorithmes.
 * @description Crée une instance d'ErreurConceptuelle. 
*/
class ErreurConceptuelle extends AnomalieConceptuelle 
{
    // ATTRIBUTS  -- Aucun --

    // CONSTRUCTEUR
    /**
     * @constructor
     * @param {ElementGraphique} elementEmetteur - L'élément graphique émetteur de l'erreur.
     * @type {ElementGraphique} 
     */
    constructor(elementEmetteur) {
        super(elementEmetteur);
    }
    
    // ENCAPSULATION  -- Aucune --

    // METHODES  -- Aucune --
}