class ErreurDonneeMagique extends ErreurConceptuelle 
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

    static DetecterAnomalie(unProbleme)
    {
        const listeDentree = unProbleme.getVariableDonnee();
        let listeEntree = listeDentree;
        let listeVariableUtiliser = [unProbleme.extraireVariablesTexte()];
        let childrens = unProbleme.getEnfants();
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
                    listeEntree.pop();
                }
            }
        }
        console.log(listeEntree);
        console.log(unProbleme.extraireVariables()); 

        return true;
    }  
    // METHODES
    toString()
    {
        return "La donnée ", this._nomDonnee," ne provient de nulle part.";
    }
}