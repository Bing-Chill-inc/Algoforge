class ErreurComparaisonSwitch extends ErreurConceptuelle
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
        return "La structure conditionnelle 'switch' en surbrillance contient des comparaisons.";
    }
} 