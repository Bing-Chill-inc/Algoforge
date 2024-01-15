/**
 * La Classe ErreurResultatInutilisee stock s'il y a des résultats qui ne sont pas réutilisés dans la suite de l'algorithme.
 *
 * @class ErreurResultatInutilisee
 * @typedef {ErreurResultatInutilisee}
 * @extends {ErreurConceptuelle}
 */
class ErreurResultatInutilisee extends ErreurConceptuelle {
    // ATTRIBUTS
    _nomsResultats; // Array<String>

    // CONSTRUCTEUR
    /**
     * Crée une instance de ErreurResultatInutilisee.
     * 
     * Par défaut la liste des résultats à la création de l'instance est vide.
     *
     * @constructor
     * @param {ElementGraphique} elementEmetteur
     * @param {Array<String>} [nomsResultats=new Array()]
     */
    constructor(elementEmetteur, nomsResultats = new Array()) {
        super(elementEmetteur);
        this._nomsResultats = nomsResultats;
    }
            
    // ENCAPSULATION
    /**
     * Définit la valeur de _nomsResultats d'ErreurResultatInutilisee
     *
     * @type {String}
     */
    set _nomsResultats(value) {
        this._nomsResultats = value;
    }
            
    /**
     * return la valeur de _nomsResultats d'ErreurResultatInutilisee
     */
    get _nomsResultats() {
        return this._nomsResultats;
    }     
    // METHODES
    /**
     * Cette méthode renvoi un message qui nous donne les résultats inutilisés présents dans l'algorithme.
     *
     * @returns {string}
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
     * La méthode detecterAnomalie cherche à ce qu'aucun résultat de l'algorithme ne soit un résultat inutilisé et retourne une liste de résultat inutiliser trouver.
     *
     * @static
     * @param {Probleme} unProbleme
     * @returns {{}}
     */
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
} 