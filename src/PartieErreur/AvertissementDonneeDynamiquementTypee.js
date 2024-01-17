/**
 * @class AvertissementDonneeDynamiquementTypee
 * @extends {AvertissementConceptuel}
 * @classdesc La Classe AvertissementDonneeDynamiquementTypee stocke les variables qui sont dynamiquement typées.
 * @description Crée une instance d'AvertissementDonneeDynamiquementTypee.
 */
class AvertissementDonneeDynamiquementTypee extends AvertissementConceptuel
{
    // ATTRIBUTS
    _nomsVariables; // array<String>

    // CONSTRUCTEUR
    /**
     * @constructor
     * @param {ElementGraphique} elementEmetteur - L'élément émetteur de l'avertissement.
     * @type {ElementGraphique}
     * @param {Array<String>} [nomsVariables=new Array()] - La liste des noms de variables (par défaut, une liste vide).
     */
    constructor(elementEmetteur, nomsVariables = new Array()) {
        super(elementEmetteur);
        this._nomsVariables = nomsVariables;
    }

    // ENCAPSULATION
    /**
     * @param {Array<String>} value - Nouvelle valeur pour _nomsVariables.
     * @description Définit la valeur de _nomsVariables de AvertissementDonneeDynamiquementTypee.
     */
    set _nomsVariables(value) {
        this._nomsVariables = value;
    }
    /**
     * @returns {Array<String>}
     * @description Renvoie la liste des noms de variables stockées dans l'avertissement.
     */
    get _nomsVariables() {
        return this._nomsVariables;
    }
    
    // METHODES
    /**
     * @static
     * @param {Probleme} unProbleme - Instance de la classe Probleme.
     * @type {Probleme}
     * @returns {Array} - Renvoi une liste dont le premier élément est true ou false si true le deuxième élément est une liste qui contient des information.
     * @description La méthode detecterAnomalie cherche si il y a une variable qui est dynamiquement type dans un Probleme.
     */
    static detecterAnomalie(unProbleme) {
        const lesInformations = unProbleme.extraireInformation();
        let lesInformationsPasTypeCorrectement = lesInformations;
        for(let information of lesInformations)
        {
            if(document.getElementById('espace1').leDictionnaireDesDonnees.containInformation(information._nom))
            {
                const informationDictionnaire = document.getElementById('espace1').leDictionnaireDesDonnees.getInformation(information._nom);
                const informationBienType = document.getElementById('espace1').leDictionnaireDesDonnees.TypeCompatible(informationDictionnaire._type, information._type)
                if(informationBienType)
                {
                    lesInformationsPasTypeCorrectement = lesInformationsPasTypeCorrectement.filter((uneinformation) => uneinformation._nom != information._nom);
                }
            }
        }
        if(lesInformationsPasTypeCorrectement.length != 0) {
            let pasTypeCorrectement = [];
            for(let information of lesInformationsPasTypeCorrectement)
            {
                pasTypeCorrectement.push(information._nom);
            }
            return [true, pasTypeCorrectement];
        }
        else {
            return [false];
        }
    }
    /**
     * @returns {string}
     * @description Cette méthode renvoie un message indiquant que des variables sont dynamiquement typées.
     */
    toString() {
        if(this._nomsVariables.length == 1)
        {
            return "La variable " + this._nomsVariables[0] + " est dynamiquement typée.";
        }
        else {
            let chaine = "Les variables ";
            for(let i = 0; i < this._nomsVariables.length; i++) {
                if(i == this._nomsVariables.length - 1) {
                    chaine += this._nomsVariables[i] + " ";
                }
                else {
                    chaine += this._nomsVariables[i] + ", ";
                }
            }
            chaine += "sont dynamiquement typées.";
            return chaine;
        }
    }
}