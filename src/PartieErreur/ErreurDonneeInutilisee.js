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
        // A changer reperer juste si il y'a le texte
        const listeDentree = unProbleme.getInformationDonnee(); 
        let listeEntree = listeDentree;

        for(let InformationARegarder of listeDentree)
        {
            if(unProbleme.getTexte().includes(InformationARegarder._nom))
            {
                listeEntree.splice(listeEntree.indexOf(InformationARegarder),1);
                continue;
            }
            for(let children of unProbleme.getDescendants())
            {
                console.log(children.include + InformationARegarder._nom+ "->"+ children.include(InformationARegarder._nom));
                if(children.include(InformationARegarder._nom))
                {
                    listeEntree.splice(listeEntree.indexOf(InformationARegarder),1);
                    continue;
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