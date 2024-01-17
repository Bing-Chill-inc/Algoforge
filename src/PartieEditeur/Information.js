/**
 * @class Information
 * @classdesc Une classe qui gère les différentes informations contenu dans les ElementGraphique information = Variable
 * @description instanciable par d'autre classe
 */
class Information 
{
    // ATTRIBUTS
    _nom; // String
    _type; // Type
    _signification; // String

    // CONSTRUCTEUR
    /**
     * 
     * @param {string|number} _nom 
     * @type {Type}
     * @param {Type} _type 
     * @param {string} _signification 
     */
    constructor(_nom, _type, _signification) {
        this._nom = _nom;
        this._type = _type;
        this._signification = _signification;
    }

    // ENCAPSULATION
    /**
     * @description Renvoie le nom de la variable 
     * @returns {string} Le nom
     */
    get _nom() {
        return this._nom;
    }

    /**
     * @description Définit le nom de la variable
     * @param {string} value Le nouveau nom
     */
    set _nom(value) {
        this._nom = value;
    }
    /**
     * @description Renvoie le type de variable
     * @returns {Type} Le type de la variable
     */
    get _type() {
        return this._type;
    }

    /**
     * @description Définit le type de variable
     * @param {Type} value Le nouveau type de la variable
     */
    set _type(value) {
        this._type = value;

    }

    /**
     * @description Renvoie la description de la variable
     * @returns {string} La description
     */
    get _signification() {
        return this._signification;
    }

    /**
     * @description Définit la description de la variables
     * @param {string} value la nouvelle description
     */
    set _signification(value) {
        this._signification = value;
    }

    // METHODES

    /**
     * 
     * @returns {JSON} Le corp JSON de classe Information
     * @property {string} nom Le nom de l'information
     * @property {Type} type le type de la variable
     * @property {string} signification la description de la variable
     */
    toJSON() {
        return {
            nom: this._nom,
            type: this._type,
            signification: this._signification
        };
    }
    
}
