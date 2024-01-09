class ErreurDonneeMagique extends ErreurConceptuelle 
{
    // ATTRIBUTS
    _nomDonnee; // String

    // CONSTRUCTEUR
    constructor(elementEmetteur, nomDonnee = new String()) {
        super(elementEmetteur);
        this._nomDonnee = nomDonnee;
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

    // METHODES
    toString()
    {
        return "La donnée ", this._nomDonnee," ne provient de nulle part.";
    }

    static detecterAnomalie(unProbleme)
    {
        // Etapes 
        // 1 - Regarder si il la un parent sinon y'a pas d'erreur
        // 2 - Regarder si les antescedents contient pas en donnée val
        // 3 - Regarder si les éléments précédents du probleme courant ne contient pas val 
        
        // Etape 1:
        if(!unProbleme.getParent())
        {
            return false;
        }

        // Etape 2:
        let antescedents = unProbleme.getAntescedants();
        let informationEnDonnee = unProbleme.getInformationDonnee();
        let informationDesAntescedants = [];
        for(let parents of antescedents)
        {
            informationDesAntescedants = [...informationDesAntescedants, ...parents.getInformationDonnee()];
        }
        for(let uneInfomationEnDonnee of informationEnDonnee)
        {
            for(let informationAntescedants of informationDesAntescedants)
            {
                if(informationAntescedants._nom == uneInfomationEnDonnee._nom)
                {
                    informationEnDonnee.splice(informationEnDonnee.indexOf(uneInfomationEnDonnee),1);
                }
            }
        }

        // Etape 3
        for(let enfants of unProbleme.getParent().getEnfants())
        {
            if(enfants == unProbleme)
            {
                break;
            
            }
            for(let uneInfomationEnDonnee of informationEnDonnee)
            {
                for(let informationEnfant of enfants.getInformationResultat())
                {  
                    if(informationEnfant._nom == uneInfomationEnDonnee._nom)
                    {
                        informationEnDonnee.splice(informationEnDonnee.indexOf(uneInfomationEnDonnee),1);
                    }
                }
            }
        }
        if(informationEnDonnee.length != 0) {
            return [true, informationEnDonnee._nom];
        }
        else {
            return false;
        }
        
    }
}