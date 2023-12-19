class DictionnaireDonnee
{    // ATTRIBUTS
    _mesInformations; // Liste<Information> Liste de toutes les variables
    _dictionnaireDesConvertionTypes = {"Char":"String", "int":"double", "unsigned int":"int"} 
    // CONSTRUCTEUR
    constructor(listeVariable = [])
    {
        this._mesInformations = listeVariable;
    }

    // ENCAPSULATION
    AjouterUneVariable(uneInformation)
    {
        let reussis = false;
        const nameInformation = uneInformation._nom;
        if(uneInformation instanceof Information)
        {
            if(this.containInformation(nameInformation))
            {
                const ancienType = this.getInformation(nameInformation)._type;
                const nouveauType = uneInformation._type;
                const resultType = this.convertionVariable(nouveauType, ancienType);
                if(this.getInformation(nameInformation)._type != resultType)
                {
                    this.changeType(uneInformation._nom, resultType);
                }
            }
            else{
                this._mesInformations.push(uneInformation);
                reussis = true;
            }
        }
        return reussis;
    }
    retirerUneInformation(nameVariable)
    {
        this._mesInformations = this._mesInformations.filter(element => element._nom != nameVariable);
        return true;
    }

    convertionVariable(informationUne, InformationDeux)
    {
        // undefined
        // String
        // Char
        // unsigned double
        // double
        const type1 = informationUne;
        const type2 = InformationDeux;

        //Si Undefined
        if(type1== undefined)
        {
            return type2;
        }
        if(type2 == undefined)
        {
            return type1;
        }

        // Si les deux types sont identiques non nécéssaire
        if (type1 === type2) {
            return type1;
        }

        // Si aucun des deux cas alors type1 est renvoyer
        return this.getTypeLePlusBasEnCommun(type1, type2);
    }

    getTypeLePlusBasEnCommun(type1, type2)
    {
        let courant = type1;
        while(true)
        {
            if(!courant)
            {
                break;
            }
            if(type2 == courant)
            {
                return type2;
            }
            courant = this._dictionnaireDesConvertionTypes[courant];
        }
        courant = type2;
        while(true)
        {
            if(!courant)
            {
                break;
            }
            if(type1 == courant)
            {
                return type1;
            }
            courant = this._dictionnaireDesConvertionTypes[courant];
        }
        return type1;
    }

    // METHODES 
    containInformation(nameInformation)
    {
        let trouver = false;
        this._mesInformations.forEach(element => {
            if(element._nom == nameInformation)
            {
                trouver = true;
            }
        });
        return trouver;
    }   
    getInformation(nameInformation)
    {
        const foundElement = this._mesInformations.find(element => element._nom === nameInformation);
        return foundElement;
    }
    renameInformation(nameVariable, newName)
    {
        let resultat = false;
        if(!this.containInformation(newName))
        {
            this._mesInformations.forEach(element => {
                if(element._nom == nameVariable)
                {
                    element._nom = newName;
                    resultat = true;
                }
            });
        }
        return false;
    }
    changeType(nameVariable, newType)
    {
        let resultat = false;
        this._mesInformations.forEach(element => {
            if(element._nom == nameVariable)
            {
                element._type = newType;
                resultat = true;
            }
            }
        );
        return resultat;
    }

    suppressionDonneeInutiliser()
    {
        this._mesInformations = this._mesInformations.filter(element => {
            return element._type != undefined || (element._signification != undefined && element._signification != "");
        });
    }
}