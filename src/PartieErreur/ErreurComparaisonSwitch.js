class ErreurComparaisonSwitch extends ErreurConceptuelle
{
    // ATTRIBUTS
    _nomDonnee; // String

    // CONSTRUCTEUR
    constructor(elementEmetteur, nomDonnee = new String()) {
        super(elementEmetteur);
        this._nomDonnee = nomDonnee;
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
    static detecterAnomalie(StructureSwitch){
        for (let condition of StructureSwitch._listeConditions.children) {
            if (condition.querySelector('.libelle').textContent.includes("=")) {
                return [true, StructureSwitch._expressionATester];
            }
        }
        return [false];
    }
} 