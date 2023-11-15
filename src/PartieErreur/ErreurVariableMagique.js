class ErreurVariableMagique extends ErreurConceptuelle
{
    // ATTRIBUTS
    _nomVariable; // String

    // CONSTRUCTEUR
    constructor() {
        super();
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
        
    // METHODES
    toString()
    {
    
    }
} 