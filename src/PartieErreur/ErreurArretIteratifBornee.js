class ErreurArretIteratifBornee extends ErreurConceptuelle
{
    // ATTRIBUTS
    _structureIterative; // Structure Iterative 

    // CONSTRUCTEUR
    constructor() {
        super();        
    }
    
    // ENCAPSULATION
    set _structureIterative(value)
    {
        this._structureIterative = value;
    }
    
    get _structureIterative()
    {
        return this._structureIterative;
    }
    
    // METHODES
    toString()
    {

    }
    
}