class AvertissementInformationsInconsistantesSi extends AvertissementConceptuel
{
    // ATTRIBUTS
    _nomsVariablesConcernees ; // array<String>

    // CONSTRUCTEUR
    constructor(elementEmetteur, nomsVariablesConcernees = new Array())
    {
        super(elementEmetteur);
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
        return "La structure conditionelle en surbrillance contient les variables suvantes qui ne sont paas consistantes : "+this._nomsVariablesConcernees+" .";

    }
}