class ErreurTypesInconsistantsAlternatif extends ErreurConceptuelle
{
    // ATTRIBUTS
    _nomVariable; // String
    _typePris; // Array<Type>

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

    set _typePris(value)
    {
        this._typePris = value;
    }
        
    get _typePris()
    {
        return this._typePris;
    }
        
    // METHODES
    toString()
    {
        return "La variable ", this._nomVariable," est inconsistante";
    }
} 