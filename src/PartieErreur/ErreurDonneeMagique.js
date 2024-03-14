/**
 * @class ErreurDonneeMagique
 * @extends {ErreurConceptuelle}
 * @classdesc La classe ErreurDonneeMagique représente une anomalie signalant la présence de données magiques dans l'algorithme.
 * @description Crée une instance d'ErreurDonneMagique
 */
class ErreurDonneeMagique extends ErreurConceptuelle {
    // ATTRIBUTS
    _nomsDonnees; // Array<String>
    
    // CONSTRUCTEUR
    /** 
     * @constructor
     * @param {ElementGraphique} elementEmetteur - L'élément graphique émetteur de l'erreur.
     * @type {ElementGraphique} 
     * @param {Array<String>} [nomsDonnees=[]] - Liste des noms de données associées à l'erreur (par défaut, la liste est vide).
     */
    constructor(elementEmetteur, nomsDonnees = new Array) {
        super(elementEmetteur);
        this._nomsDonnees = nomsDonnees;
    }
    
    // ENCAPSULATION
    /**
     * @param {Array<String>} value - Nouvelle liste de noms de données associées à l'erreur.
     * @description Définit la valeur de _nomsDonnees d'ErreurDonneeMagique.
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
     * @description Renvoie un message indiquant les données magiques présentes dans l'algorithme.
     */
    toString() {
        /*
        if(this._nomsDonnees.length == 1) {
            return "La donnée " + this._nomsDonnees[0] + " ne provient de nulle part.";
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
            return "Les donnée " + chaine + " ne provient de nulle part.";
        }*/
        return 'Dans "' + this._elementEmetteur._libelle + '" ' + this._nomsDonnees + " est une donnée qui n'a pas été précédemment saisie / calculée / prédéfinie.";
    }
    
    /**
     * @static
     * @param {Probleme} unProbleme - Instance de la classe Probleme.
     * @type {Probleme}
     * @returns {Array} - Renvoi une liste dont le premier élément est true ou false si true le deuxième élément est une liste de données magiques.
     * @description La méthode detecterAnomalie cherche les données magiques dans l'algorithme et retourne une liste contenant les noms des données magiques trouvées.
     */
    static detecterAnomalie(unProbleme) {
        // Etapes 
        // 1 - Regarder si il la un parent sinon y'a pas d'erreur
        // 2 - Regarder si les antescedents contient pas en donnée val
        // 3 - Regarder si les éléments précédents du probleme courant ne contient pas val 
        try {
        // Etape 1:
        if(!unProbleme.getParent()) {
            return [false];
        }

        // Etape 2:
        let antescedents = unProbleme.getAntescedants();
        let informationEnDonnee = unProbleme.getInformationDonnee();
        let informationDesAntescedants = [];
        for(let parents of antescedents) {
            informationDesAntescedants = [...informationDesAntescedants, ...parents.getInformationDonnee()];
        }
        for(let uneInfomationEnDonnee of informationEnDonnee) {
            for(let informationAntescedants of informationDesAntescedants)
            {
                if(informationAntescedants._nom == uneInfomationEnDonnee._nom)
                {
                    informationEnDonnee = informationEnDonnee.filter((uneInfo) => uneInfo._nom != informationAntescedants._nom);
                }
            }
        }

        // Etape 3
        for(let enfants of unProbleme.getParent().getEnfants()) {
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
                        informationEnDonnee = informationEnDonnee.filter((uneInfo) => uneInfo._nom != informationEnfant._nom);
                    }
                }
            }
        }
        if(informationEnDonnee.length != 0) {
            let donneesMagiques = [];
            for(let information of informationEnDonnee)
            {
                donneesMagiques.push(information._nom);
            }
            return [true, donneesMagiques];
        }
        else {
            return [false];
        }
    }
    catch(e) {
        console.error(e);
        return [false];
    }
        
    }
}