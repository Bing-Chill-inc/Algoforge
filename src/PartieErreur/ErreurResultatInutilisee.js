class ErreurResultatInutilisee extends ErreurConceptuelle
{
    // ATTRIBUTS


    // CONSTRUCTEUR
    constructor(elementEmetteur) {
        super(elementEmetteur);
    }
            
    // ENCAPSULATION
    set _nomResultat(value)
    {
        this._nomResultat = value;
    }
            
    get _nomResultat()
    {
        return this._nomResultat;
    }
            
    // METHODES
    toString()
    {
        return "Le résultat ", this._nomResultat," n'est pas utilisé.";
    }
    static detecterAnomalie(unProbleme)
    {
        const parent = unProbleme.getParent();
        if(parent == null)
        {
            return false;
        }
        let resultatProbleme = unProbleme.getInformationResultat();
        // Regarder si le resultat est utiliser dans les resultats des antescdédants
        for(let antescedant of unProbleme.getAntescedants())
        {
            for(let resultat of antescedant.getInformationResultat())
            {
                resultatProbleme = resultatProbleme.filter((unresultat) => unresultat._nom != resultat._nom)
            }
        }
        // Regarder si le resultat est utiliser dans les enfants apres le probleme dans les données 
        let precedeProbleme = true;
        for(let enfant of parent.getEnfants())
        {
            if(enfant == unProbleme)
            {
                precedeProbleme = false;
                continue;
            }
            if(precedeProbleme)
            {
                continue;
            }
            for(let donnee of enfant.getInformationDonnee())
            {
                resultatProbleme = resultatProbleme.filter((unresultat) => unresultat._nom != donnee._nom)
            }
        }
        
        return resultatProbleme.length != 0;
    }
} 