class ErreurDonneeMagique extends ErreurConceptuelle 
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

    static DetecterAnomalie(unProbleme)
    {
        console.log(unProbleme.extraireVariables());
        return true;
    }  
    // METHODES
    toString()
    {
        return "La donnée ", this._nomDonnee," ne provient de nulle part.";
    }
}