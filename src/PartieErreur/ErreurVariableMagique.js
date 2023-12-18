class ErreurVariableMagique extends ErreurConceptuelle
{
    // ATTRIBUTS
    _nomVariable; // String

    // CONSTRUCTEUR
    constructor(elementEmetteur) {
        super(elementEmetteur);
    }
        
    // ENCAPSULATION
    set _nomVariable(value)
    {
        this._nomVariable = value;
    }
        
    get _nomVariable()
    {
        return this._nomVariable;
    }
    static DetecterAnomalie(unProbleme)
    {
        console.log(unProbleme);
        return true;
    }   
    // METHODES
    toString()
    {
        return "La variable ", this._nomVariable," provient de nulle part.";
    }
} 