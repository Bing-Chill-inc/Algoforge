class AnomalieConceptuelle 
{
    // ATTRIBUTS
    _elementEmetteur; // Element Graphique

    // CONSTRUCTEUR
    constructor(elementEmetteur) {
        this._elementEmetteur = elementEmetteur;
    }

    // ENCAPSULATION
    set _elementEmetteur(value)
    {
        this._elementEmetteur = value;
    }

    get _elementEmetteur()
    {
        return this._elementEmetteur;
    }
    // METHODES
    toString()
    {

    }
} 