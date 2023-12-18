class AvertissementDonneDynamiquementTypee extends AvertissementConceptuel
{
    // ATTRIBUTS
    _nomVariable ; // String
    _typesUtilises ; // array<Type>

    // CONSTRUCTEUR
    constructor(elementEmetteur, nomVariable = new String(), typesUtilises = new Array())
    {
        super(elementEmetteur);
        this._nomVariable = nomVariable;
        this._typesUtilises = typesUtilises;
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

    set _typesUtilises(value)
    {
        this._typesUtilises = value;
    }

    get _typesUtilises()
    {
        return this._typesUtilises;
    }
    
    // METHODES
       toString(){
        return "La variable "+this._nomVariable+" est utilisée avec les types suivants : "+this._typesUtilises;
    }
}