class AvertissementDonneDynamiquementTypee extends AvertissementConceptuel
{
    // ATTRIBUTS
    _nomVariable ; // String
    _typesUtilises ; // array<Type>

    // CONSTRUCTEUR
    constructor( nomVariable = new String(), typesUtilises = new Array())
    {
        super();
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

    }
}