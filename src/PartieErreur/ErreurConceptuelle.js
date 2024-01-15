
/**
 * La classe ErreurConceptuelle est la base de tous les classes Erreur de l'éditeur d'algorithmes
 *
 * @class ErreurConceptuelle
 * @typedef {ErreurConceptuelle}
 * @extends {AnomalieConceptuelle}
 */
class ErreurConceptuelle extends AnomalieConceptuelle 
{
        // ATTRIBUTS  -- Non --

        // CONSTRUCTEUR
        
        /**
         * Crée une instance d'ErreurConceptuelle.
         *
         * @constructor
         * @param {ElementGraphique} elementEmetteur
         */
        constructor(elementEmetteur) {
            super(elementEmetteur);
        }
        
        // ENCAPSULATION  -- Non --

        
        // METHODES  -- Non --
}