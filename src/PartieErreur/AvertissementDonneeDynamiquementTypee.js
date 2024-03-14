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
        try
        {
            let dictionnaireDonnee = document.querySelector("dictionnaire-donnee"); 
            const uneInformation = unProbleme.extraireInformationTextes()
            if (uneInformation != null) {
                if(dictionnaireDonnee.containInformation(uneInformation._nom))
                {
                    const informationDictionnaire = dictionnaireDonnee.getInformation(uneInformation._nom);
                    console.log(informationDictionnaire._type);
                    console.log(uneInformation._type);
                    const informationBienType = dictionnaireDonnee.TypeCompatible(informationDictionnaire._type, uneInformation._type)
                    if(!informationBienType)
                    {
                        return [true, uneInformation];
                    }
                }
            }
            return [false];

        }
        catch(e)
        {
            console.error(e);
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