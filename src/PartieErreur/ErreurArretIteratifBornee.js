class ErreurArretIteratifBornee extends ErreurConceptuelle
{
    // ATTRIBUTS
    _structureIterative; // Structure Iterative 

    // CONSTRUCTEUR
    constructor(elementEmetteur) {
        super(elementEmetteur);        
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
        return "L'arrêt en surbrillance est dans une boucle itérative bornée.";
    }
    
}