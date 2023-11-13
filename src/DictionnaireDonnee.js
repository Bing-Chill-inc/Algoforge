class DictionnaireDonnee
{    // ATTRIBUTS
    _mesVariables; // Liste de toutes les variables

    // CONSTRUCTEUR
    constructor(listeVariable = [])
    {
        this._mesVariables = listeVariable;
    }

    // ENCAPSULATION
    AjouterUneVariable(uneInformation)
    {
        let reussis = false;
        if(uneInformation instanceof Information)
        {
            if(!this.ContainVariable(uneInformation._nom))
            {
               this._mesVariables.push(uneInformation);
                reussis = true;
            }
        }
        return reussis;
    }
    RetirerUneVariable(nameVariable)
    {
        this._mesVariables = this._mesVariables.filter(element => element._nom != nameVariable);
        return true;
    }

    // METHODES 
    ContainVariable(nameVariable)
    {
        let trouver = false;
        this._mesVariables.forEach(element => {
            if(element._nom == nameVariable)
            {
                trouver = true;
            }
        });
        return trouver;
    }   
    getVariable(nameVariable)
    {
        this._mesVariables.forEach(element => {
            if(element._nom == nameVariable)
            {
                return element;
            }
        });
    }
    renameVariable(nameVariable, newName)
    {
        let resultat = false;
        if(!this.ContainVariable(newName))
        {
            this._mesVariables.forEach(element => {
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
        this._mesVariables.forEach(element => {
            if(element._nom == nameVariable)
            {
                element._type = newType;
                resultat = true;
            }
            }
        );
        return resultat;
    }
}