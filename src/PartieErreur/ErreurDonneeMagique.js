class ErreurDonneeMagique extends ErreurConceptuelle 
{
    // ATTRIBUTS
    _nomDonnee; // String

    // CONSTRUCTEUR
    constructor() {
        super();
    }
    
    // ENCAPSULATION
    set _nomDonnee(value)
    {
        this._nomDonnee = value;
    }
    
    get _nomDonnee()
    {
        return this._nomDonnee;
    }

    // METHODES
    toString()
    {
        return "La donnée ", this._nomDonnee," ne provient de nulle part.";
    }
}