/**
 * @class ErreurDonneeInutilisee
 * @extends {ErreurConceptuelle}
 * @classdesc La Classe ErreurDonneeInutilisee stocke si des données sont déclarées mais ne sont pas utilisées.
 * @description Crée une instance de ErreurDonneeInutilisee.
 */
class ErreurDonneeInutilisee extends ErreurConceptuelle {
    // ATTRIBUTS
    _nomsDonnees; // Array<String>

    // CONSTRUCTEUR
    /**
     * @constructor
     * @param {ElementGraphique} elementEmetteur - L'élément graphique émetteur de l'erreur.
     * @type {ElementGraphique}
     * @param {Array<String>} [nomsDonnees=[]] - Liste des noms de données associées à l'erreur (par défaut, la liste est vide).
     */
    constructor(elementEmetteur, nomsDonnees = new Array()) {
        super(elementEmetteur);
        this._nomsDonnees = nomsDonnees;
    }
        
    // ENCAPSULATION
    /**
     * @param {Array<String>} value - Nouvelle liste de noms de données associées à l'erreur.
     * @description Définit la valeur de _nomsDonnees d'ErreurDonneInutilisee.
     */
    set _nomsDonnees(value) {
        this._nomsDonnees = value;
    }
    /**
     * @returns {Array<String>} - Renvoi une liste de noms de données.
     * @description Renvoie la liste des noms de données associées à l'erreur.
     */
    get _nomsDonnees() {
        return this._nomsDonnees;
    }

    // METHODES
    /**
     * @returns {string} - Renvoi une chaine de caractères contenant les données inutilisées.
     * @description Renvoie un message indiquant les données inutilisées dans l'algorithme.
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
     * @static
     * @param {Probleme} unProbleme - Instance de la classe Probleme.
     * @type {Probleme}
     * @returns {Array} - Renvoi une liste dont le premier élément est true ou false si true le deuxième élément est une liste de données inutilisées.
     * @description La méthode detecterAnomalie cherche les données inutilisées dans l'algorithme et retourne une liste contenant les noms des données inutilisées trouvées.
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