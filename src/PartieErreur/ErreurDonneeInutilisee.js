
/**
 * La Classe ErreurDonneeMagique stock s'il y a des données qui sont déclarées mais qui ne sont pas utilisées.
 *
 * @class ErreurDonneeInutilisee
 * @typedef {ErreurDonneeInutilisee}
 * @extends {ErreurConceptuelle}
 */
class ErreurDonneeInutilisee extends ErreurConceptuelle {
    // ATTRIBUTS
    _nomsDonnees; // Array<String>

    // CONSTRUCTEUR
    /**
     * Crée une instance de ErreurDonneeInutilisee.
     * 
     * Par défaut la liste des données à la création de l'instance est vide.
     *
     * @constructor
     * @param {ElementGraphique} elementEmetteur
     * @param {Array<String>} [nomsDonnees=new Array()]
     */
    constructor(elementEmetteur, nomsDonnees = new Array()) {
        super(elementEmetteur);
        this._nomsDonnees = nomsDonnees;
    }
        
    // ENCAPSULATION
    /**
     * Définit la valeur de _nomsDonnees d'ErreurDonneInutilisee
     *
     * @type {String}
     */
    set _nomsDonnees(value) {
        this._nomsDonnees = value;
    }
    /**
     * Définit la valeur de _nomsDonnees d'ErreurDonneInutilisee
     */
    get _nomsDonnees() {
        return this._nomsDonnees;
    }
    // METHODES
    /**
     * La méthode detecterAnomalie cherche à ce qu'aucune donnée de l'algorithme ne soit une donnée inutilisée et retourne une liste qui contient les données inutilisées trouver.
     *
     * @returns {string}
     */
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

    /**
     * La méthode detecterAnomalie cherche à ce qu'aucune donnée de l'algorithme ne soit une donnée inutilisée.
     *
     * @static
     * @param {Probleme} unProbleme
     * @returns {{}}
     */
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
} 