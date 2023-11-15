class AvertissementInformationsInconsistantesSi extends AvertissementConceptuel
{
    // ATTRIBUTS
    _nomsVariablesConcernees ; // array<String>

    // CONSTRUCTEUR
    constructor( nomsVariablesConcernees = new Array())
    {
        super();
        this._nomsVariablesConcernees = nomsVariablesConcernees;
    }

    // ENCAPSULATION
    set _nomsVariablesConcernees(value)
    {
        this._nomsVariablesConcernees = value;
    }

    get _nomsVariablesConcernees()
    {
        return this._nomsVariablesConcernees;
    }
    // METHODES
       toString(){


    }
}