/**
 * @class AvertissementStructureInoptimale
 * @extends {AvertissementConceptuel}
 * @classdesc La Classe AvertissementStructureInoptimale stocke les StructureSi qui sont mal utilisée.
 * @description Crée une instance de AvertissementConceptuel
 */
class AvertissementStructureInoptimale extends AvertissementConceptuel
{
    // ATTRIBUTS
    _nomVariable ; // String
    _valeurs ; // array<String>

    // CONSTRUCTEUR
    
    /**
     * @constructor
     * @param {StructureSi} elementEmetteur - La structure conditionnelle émettrice de l'avertissement.
     * @type {StructureSi}
     * @param {String} [nomVariable=new String()] - Le nom de la variable concernée (par défaut, une chaîne vide).
     * @param {Array<String>} [valeurs=new Array()] - Les valeurs associées à la variable (par défaut, une liste vide).
     */
    constructor(elementEmetteur, nomVariable = new String(), valeurs = new Array())
    {
        super(elementEmetteur);
        this._nomVariable = nomVariable;
        this._valeurs = valeurs;
    }

    // ENCAPSULATION
    /**
     * @param {string} value - Nouvelle valeur pour _nomVariable.
     * @description Définit la valeur de _nomVariable de AvertissementStructureInoptimale.
     */
    set _nomVariable(value)
    {
        this._nomVariable = value;
    }
    /**
     * @returns {string} - Renvoi une chaine de caractères.
     * @description Renvoie le nom de la variable concernés par l'avertissement.
     */
    get _nomVariable()
    {
        return this._nomVariable;
    }
    /**
     * @param {Array<string>} value - Nouvelle valeur pour _valeurs.
     * @description Définit la valeur de _valeurs de AvertissementStructureInoptimale.
     */
    set _valeurs(value)
    {
        this._valeurs = value;
    }
    /**
     * @returns {Array<string>} - Renvoi une liste de chaine de caractères.
     * @description Renvoie les valeurs associées à la variable dans l'avertissement.
     */
    get _valeurs()
    {
        return this._valeurs;
    }
    
    // METHODES
    /**
     * @returns {string} - Renvoi une chaine de caractères.
     * @description Cette méthode renvoie un message indiquant qu'une structure conditionnelle en surbrillance est mal utilisée.
     */
    toString(){
        return "La structure conditionnel en surbrillance est mal utilisée.";
    }
    /**
     * @static
     * @param {StructureSi} StructureSi - Instance de la classe StructureSi.
     * @type {StructureSi}
     * @returns {Array} - Renvoi une liste dont le premier élément est true ou false si true le deuxième élément est la variable concernée par l'élément et le troisième élément est la valeur.
     * @description La méthode detecterAnomalie cherche s'il y a une StructureSi mal utilisée.
     */
    static detecterAnomalie(StructureAlternative){
        const conditions = StructureAlternative._listeConditions.children;

        // Récupérer les caractères avant "=" dans la première condition
        let  libelle = conditions[0].querySelector('.libelle').textContent;
        const premierCaracteresAvantEgal = libelle.split('=')[0].trim();
        let variable = premierCaracteresAvantEgal;
        let valeurs = [libelle.split('=')[1].trim()];
    
        // Vérifier si ces caractères sont présents dans tous les autres libellés
        for (let condition of StructureAlternative._listeConditions.children) {
            libelle = condition.querySelector('.libelle').textContent;
            let caracteresAvantEgal = libelle.split('=')[0].trim();
            if (premierCaracteresAvantEgal !== caracteresAvantEgal) {
                return [false]; // Les caractères ne sont pas présents dans tous les autres libellés
            }
            valeurs.push(libelle.split('=')[1].trim());
        }
    
        return [true, variable, valeurs];
    }
}