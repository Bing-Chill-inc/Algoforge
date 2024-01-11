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
    static detecterAnomalie(unProbleme) 
    {
        const lesInformations = unProbleme.extraireInformation();
        let lesInformationsPasTypeCorrectement = lesInformations;
        for(let information of lesInformations)
        {
            if(document.getElementById('espace1').leDictionnaireDesDonnees.containInformation(information._nom))
            {
                const informationDictionnaire = document.getElementById('espace1').leDictionnaireDesDonnees.getInformation(information._nom);
                const informationBienType = document.getElementById('espace1').leDictionnaireDesDonnees.TypeCompatible(informationDictionnaire._type, information._type)
                if(informationBienType)
                {
                    lesInformationsPasTypeCorrectement = lesInformationsPasTypeCorrectement.filter((uneinformation) => uneinformation._nom != information._nom);
                }
            }
        }
        return lesInformationsPasTypeCorrectement.length != 0;
    }
    toString() {
        return "La variable "+this._nomVariable+" est utilisée avec les types suivants : "+this._typesUtilises;
    }
}