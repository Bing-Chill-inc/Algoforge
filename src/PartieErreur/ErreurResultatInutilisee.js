class ErreurResultatInutilisee extends ErreurConceptuelle {
    // ATTRIBUTS
    _nomsResultats; // Array<String>

    // CONSTRUCTEUR
    constructor(elementEmetteur, nomsResultats = new Array()) {
        super(elementEmetteur);
        this._nomsResultats = nomsResultats;
    }
            
    // ENCAPSULATION
    set _nomsResultats(value) {
        this._nomsResultats = value;
    }
            
    get _nomsResultats() {
        return this._nomsResultats;
    }
            
    // METHODES
    toString() {
        if(this._nomsResultats.length == 1) {
            return "Le résultat "+this._nomsResultats[0]+" n'est pas utilisé";
        }
        else {
            let chaine = "";
            for (let i = 0; i < this._nomsResultats.length; i++) {
                if(i == this._nomsResultats.length - 1) {
                    chaine += this._nomsResultats[i];
                }
                else {
                    chaine += this._nomsResultats[i] + ", ";
                }
            }
            return "Les résultats "+chaine+" ne sont pas utilisés";
        }
    }

    static detecterAnomalie(unProbleme) {
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
        for(let enfant of parent.getDescendants())
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
        
        if(resultatProbleme.length != 0) {
            let resultatsInutilisees = [];
            for(let resultat of resultatProbleme) {
                resultatsInutilisees.push(resultat._nom);
            }
            return [true, resultatsInutilisees];
        }
        else {
            return [false];
        }
    }
} 