class AvertissementStructureInoptimale extends AvertissementConceptuel
{
    // ATTRIBUTS
    _nomVariable ; // String
    _valeurs ; // array<String>

    // CONSTRUCTEUR
    constructor( nomVariable = new String(), valeurs = new Array())
    {
        super();
        this._nomVariable = nomVariable;
        this._valeurs = valeurs;
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

    set _valeurs(value)
    {
        this._valeurs = value;
    }

    get _valeurs()
    {
        return this._valeurs;
    }
    
    // METHODES
       toString(){
        return "La structure conditionnel en surbrillance est mal utilisée.";
    }
}