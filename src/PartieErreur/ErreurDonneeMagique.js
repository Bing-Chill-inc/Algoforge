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

    // METHODES
    toString()
    {
        return "La donnée ", this._nomDonnee," ne provient de nulle part.";
    }

    static detecterAnomalie(unProbleme) {
        let donnees = unProbleme.getInformationDonnee();
        if(donnees.length == 0) {
            return false;
        }
        let i = 0;
        let parent = unProbleme.getParent();
        if (parent == null) {
            return false;
        }
        let listeEnfantsParent = parent._listeElementsEnfants;
        while(unProbleme != listeEnfantsParent[i].element) {
            if(listeEnfantsParent[i] instanceof Probleme || listeEnfantsParent[i] instanceof Procedure){
                for(let donnee of donnees){
                    if(listeEnfantsParent[i].getInformationDonnee().includes(donnee)){
                        return false;
                    }
                    else if(listeEnfantsParent[i].getInformationResultat().includes(donnee)){
                        return false;
                    }
                }
            }
            i++;
        }
        for(let probleme of unProbleme.getAntescedants()) {
            if(probleme instanceof Probleme || probleme instanceof Procedure) {
                for(let donnee of donnees){
                    if(probleme.getInformationDonnee().includes(donnee)) {
                        return false;   
                    }
                    else if(probleme.getInformationResultat().includes(donnee)) {
                        return false;
                    }
                }             
            }
            
        }
        return true;
    }
}