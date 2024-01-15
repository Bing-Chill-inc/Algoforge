/**
 * La Classe ErreurDonneeMagique stock s'il y a des données magiques dans l'algorithme
 *
 * @class ErreurDonneeMagique
 * @typedef {ErreurDonneeMagique}
 * @extends {ErreurConceptuelle}
 */
class ErreurDonneeMagique extends ErreurConceptuelle {
    // ATTRIBUTS
    _nomsDonnees; // Array<String>
    
    // CONSTRUCTEUR
    /**
     * Crée une instance d'ErreurDonneMagique
     * 
     * @param {ElementGraphique} elementEmetteur 
     * @param {Array<String>} nomsDonnees 
     */
    constructor(elementEmetteur, nomsDonnees = new Array) {
        super(elementEmetteur);
        this._nomsDonnees = nomsDonnees;
    }
    
    // ENCAPSULATION
    /**
     * Définit la valeur de _nomsDonnees d'AnomalieConceptuelle
     *
     * @type {String}
     */
    set _nomsDonnees(value) {
        this._nomsDonnees = value;
    }
    
    
    /**
     * Renvoie la valeur de _nomsDonnees d'AnomalieConceptuelle
     */
    get _nomsDonnees() {
        return this._nomsDonnees;
    }

    // METHODES
    
    /**
     * Cette méthode renvoi un message qui nous donne les données magiques présentes dans l'algorithme.
     *
     * @returns {string}
     */
    toString() {
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
        }
    }
    
    /**
     * La méthode detecterAnomalie cherche à ce qu'aucune donnée de l'algorithme ne soit une donnée magique.
     *
     * @static
     * @param {Probleme} unProbleme
     * @returns {{}}
     */
    static detecterAnomalie(unProbleme) {
        // Etapes 
        // 1 - Regarder si il la un parent sinon y'a pas d'erreur
        // 2 - Regarder si les antescedents contient pas en donnée val
        // 3 - Regarder si les éléments précédents du probleme courant ne contient pas val 
        
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
                    // A supprimer apres teste informationEnDonnee.splice(informationEnDonnee.indexOf(uneInfomationEnDonnee),1);
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
                        // A supprimer apres teste informationEnDonnee.splice(informationEnDonnee.indexOf(uneInfomationEnDonnee),1);
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
}