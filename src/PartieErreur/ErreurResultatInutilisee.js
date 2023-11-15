class ErreurResultatInutilisee extends ErreurConceptuelle
{
    // ATTRIBUTS


    // CONSTRUCTEUR
    constructor() {
        super();
    }
            
    // ENCAPSULATION
    set _nomResultat(value)
    {
        this._nomResultat = value;
    }
            
    get _nomResultat()
    {
        return this._nomResultat;
    }
            
    // METHODES
    toString()
    {
        return "Le résultat ", this._nomResultat," n'est pas utilisé.";
    }
} 