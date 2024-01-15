/**
 * La classe AnomalieConceptuelle est la base de tous les classes d'anomalie de l'éditeur d'algorithmes
 *
 * @class AnomalieConceptuelle
 * @typedef {AnomalieConceptuelle}
 */
class AnomalieConceptuelle 
{
    // ATTRIBUTS
    _elementEmetteur; // Element Graphique

    // CONSTRUCTEUR
    /**
     * Crée une instance d'AnomalieConceptuelle.
     *
     * @constructor
     * @param {ElementGraphique} elementEmetteur
     */
    constructor(elementEmetteur) {
        this._elementEmetteur = elementEmetteur;
    }

    // ENCAPSULATION
    /**
     * Définit la valeur de _elementEmetteur d'AnomalieConceptuelle
     *
     * @type {ElementGraphique}
     */
    set _elementEmetteur(value)
    {
        this._elementEmetteur = value;
    }
    /**
     * Renvoie la valeur de _elementEmetteur d'AnomalieConceptuelle
     */
    get _elementEmetteur()
    {
        return this._elementEmetteur;
    }

    // METHODES
    /**
     * Méthode abstraite définit dans les sous-classes
     */
    toString()
    {

    }
} 