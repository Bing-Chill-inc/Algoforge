/**
 * @class ErreurResultatInutilisee
 * @extends {ErreurConceptuelle}
 * @classdesc La Classe ErreurResultatInutilisee stocke si des résultats ne sont pas réutilisés dans la suite de l'algorithme.
 * @description Crée une instance de ErreurResultatInutilisee.
 */
class ErreurResultatInutilisee extends ErreurConceptuelle {
    // ATTRIBUTS
    _nomsResultats; // Array<String>

    // CONSTRUCTEUR
    /**
     * @constructor
     * @param {ElementGraphique} elementEmetteur - L'élément graphique émetteur de l'erreur.
     * @type {ElementGraphique}
     * @param {Array<String>} [nomsResultats=[]] - Liste des noms de résultats associés à l'erreur (par défaut, la liste est vide).
     */
    constructor(elementEmetteur, nomsResultats = new Array()) {
        super(elementEmetteur);
        this._nomsResultats = nomsResultats;
    }
            
    // ENCAPSULATION
    /**
     * @param {Array<String>} value - Nouvelle liste de noms de résultats associés à l'erreur.
     * @description Définit la valeur de _nomsResultats d'ErreurResultatInutilisee.
     */
    set _nomsResultats(value) {
        this._nomsResultats = value;
    }    
    /**
     * @returns {Array<String>} - Renvoi une liste de noms de résultat.
     * @description Renvoie la liste des noms de résultats associés à l'erreur.
     */
    get _nomsResultats() {
        return this._nomsResultats;
    }    

    // METHODES
    /**
     * @returns {string} - Renvoi une chaine de caractères contenant les résultats inutilisés.
     * @description Renvoie un message indiquant les résultats inutilisés dans l'algorithme.
     */
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
    /**
     * @static
     * @param {Probleme} unProbleme - Instance de la classe Probleme.
     * @type {Probleme}
     * @returns {Array} - Renvoi une liste dont le premier élément est true ou false si true le deuxième élément est une liste de données inutilisées.
     * @description La méthode detecterAnomalie cherche les résultats inutilisés dans l'algorithme et retourne une liste contenant les noms des résultats inutilisés trouvés.
     */
    static detecterAnomalie(unProbleme) {
        try {
        const parent = unProbleme.getParent();
        if(parent == null)
        {
            return [false];
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
    catch(e)
    {
        console.error(e);
        return [false];
    }
    }
} 