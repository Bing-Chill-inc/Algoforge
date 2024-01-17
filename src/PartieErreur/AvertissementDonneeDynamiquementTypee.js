class AvertissementDonneeDynamiquementTypee extends AvertissementConceptuel
{
    // ATTRIBUTS
    _nomsVariables; // array<String>

    // CONSTRUCTEUR
    constructor(elementEmetteur, nomsVariables = new Array()) {
        super(elementEmetteur);
        this._nomsVariables = nomsVariables;
    }

    // ENCAPSULATION
    set _nomsVariables(value) {
        this._nomsVariables = value;
    }

    get _nomsVariables() {
        return this._nomsVariables;
    }
    
    // METHODES
    static detecterAnomalie(unProbleme) {
        const lesInformations = unProbleme.extraireInformation();
        console.log(unProbleme.extraireInformation());
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
            else
            {
                lesInformationsPasTypeCorrectement = lesInformationsPasTypeCorrectement.filter((uneinformation) => uneinformation._nom != information._nom);
            }
        }
        if(lesInformationsPasTypeCorrectement.length != 0) {
            let pasTypeCorrectement = [];
            for(let information of lesInformationsPasTypeCorrectement)
            {
                pasTypeCorrectement.push(information._nom);
            }
            return [true, pasTypeCorrectement];
        }
        else {
            return [false];
        }
    }

    toString() {
        if(this._nomsVariables.length == 1)
        {
            return "La variable " + this._nomsVariables[0] + " est dynamiquement typée.";
        }
        else {
            let chaine = "Les variables ";
            for(let i = 0; i < this._nomsVariables.length; i++) {
                if(i == this._nomsVariables.length - 1) {
                    chaine += this._nomsVariables[i] + " ";
                }
                else {
                    chaine += this._nomsVariables[i] + ", ";
                }
            }
            chaine += "sont dynamiquement typées.";
            return chaine;
        }
    }
}