class ErreurDonneeInutilisee extends ErreurConceptuelle
{
    // ATTRIBUTS
    _nomDonnee; // String

    // CONSTRUCTEUR
    constructor(elementEmetteur) {
        super(elementEmetteur);
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
    
    static detecterAnomalie(unProbleme)
    {
        const listeDentree = unProbleme.getVariableDonnee();
        let listeEntree = listeDentree;
        let listeVariableUtiliser = [];
        if(unProbleme.extraireVariablesTextes())
        {
            listeVariableUtiliser.push(unProbleme.extraireVariablesTextes());
        }
        let childrens = unProbleme.getDescendants();
        for(let children of childrens)
        {
            listeVariableUtiliser = [...listeVariableUtiliser ,...children.extraireVariables()];
        }
        
        for(let information of listeVariableUtiliser)
        {
            for(let InformationARegarder of listeDentree)
            {
                if(information._nom == InformationARegarder._nom)
                {
                    listeEntree.splice(listeEntree.indexOf(InformationARegarder),1);
                }
            }
        }

        return listeEntree.length > 0 ;
    }  

    // METHODES
    toString()
    {
        return "La donnée ", this._nomDonnee," n'est pas utilisée.";
    }
} 