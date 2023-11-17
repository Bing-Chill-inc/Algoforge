class ErreurDonneeInutilisee extends ErreurConceptuelle
{
    // ATTRIBUTS
    _nomDonnee; // String

    // CONSTRUCTEUR
    constructor(elementEmetteur) {
        super(elementEmetteur);
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
        return "La donnée ", this._nomDonnee," n'est pas utilisée.";
    }
} 