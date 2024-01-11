class ErreurDonneeInutilisee extends ErreurConceptuelle {
    // ATTRIBUTS
    _nomsDonnees; // Array<String>

    // CONSTRUCTEUR
    constructor(elementEmetteur, nomsDonnees = new Array()) {
        super(elementEmetteur);
        this._nomsDonnees = nomsDonnees;
    }
        
    // ENCAPSULATION
    set _nomsDonnees(value) {
        this._nomsDonnees = value;
    }
        
    get _nomsDonnees() {
        return this._nomsDonnees;
    }
    
    static detecterAnomalie(unProbleme) {
        // A changer reperer juste si il y'a le texte
        const listeDentree = unProbleme.getInformationDonnee(); 
        let listeEntree = listeDentree;

        for(let InformationARegarder of listeDentree) {
            if(unProbleme.getTexte().includes(InformationARegarder._nom)) {
                listeEntree = listeEntree.filter((uneEntree) => uneEntree._nom != InformationARegarder._nom);
                continue;
            }
            for(let children of unProbleme.getDescendants()) {
                if(children.include(InformationARegarder._nom)) {
                    listeEntree = listeEntree.filter((uneEntree) => uneEntree._nom != InformationARegarder._nom);
                    continue;
                }
            }
        }
        if(listeEntree.length > 0) {
            let donneesInutilisees = [];
            for(let donnee of listeEntree) {
                donneesInutilisees.push(donnee._nom);
            }
            return [true, donneesInutilisees];
        }
        else {
            return [false];
        }
    }  

    // METHODES
    toString() {
        if(this._nomsDonnees.length == 1) {
            return "La donnée " + this._nomsDonnees[0] + " n'est pas utilisée.";
        }
        else {
            let chaine = "";
            for (let i = 0; i < this._nomsDonnees.length; i++) {
                if(i == this._nomsDonnees.length - 1) {
                    chaine += this._nomsDonnees[i];
                }
                else {
                    chaine += this._nomsDonnees[i] + ", ";
                }
            }
            return "Les donnée " + chaine + " ne sont pas utilisées.";
        }
    }
} 