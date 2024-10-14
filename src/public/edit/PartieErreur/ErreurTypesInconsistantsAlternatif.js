/**
 * @class ErreurTypesInconsistantsAlternatif
 * @extends {ErreurConceptuelle}
 * @classdesc La Classe ErreurTypesInconsistantsAlternatif stocke les StructureAlternative qui ont des variables avec des type de données inconsistants.
 * @description Crée une instance de ErreurTypesInconsistantsAlternatif
 */
class ErreurTypesInconsistantsAlternatif extends ErreurConceptuelle
{
    // ATTRIBUTS
    _nomVariable; // String
    _typePris; // Array<Type>

    // CONSTRUCTEUR
    
    /**
     * @constructor
     * @param {StructureAlternative} elementEmetteur - La structure alternative émettrice de l'erreur.
     * @type {StructureAlternative}
     * @param {String} [nomVariable=new String()] - Le nom de la variable concernée (par défaut, une chaîne vide).
     * @param {Array<Type>} [typePris=new Array()] - Les types associés à la variable (par défaut, une liste vide).
     */
    constructor(elementEmetteur, nomVariable = new String(), typePris = new Array()) {
        super(elementEmetteur);
        this._nomVariable = nomVariable;
        this._typePris = typePris;
    }
        
    // ENCAPSULATION
    
    /**
     * @param {string} value - Nouvelle valeur pour _nomVariable.
     * @description Définit la valeur de _nomVariable de ErreurTypesInconsistantsAlternatif
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
     * @param {type} value - Nouvelle valeur pour _typePris.
     * @description Définit la valeur de _typePris de ErreurTypesInconsistantsAlternatif.
     */
    set _typePris(value)
    {
        this._typePris = value;
    }
    /**
     * @returns {type} - Renvoi un type de variable.
     * @description Renvoie le type de la variable concernés par l'avertissement.
     */
    get _typePris()
    {
        return this._typePris;
    }
        
    // METHODES
    /**
     * @returns {string} - Renvoie une chaine de caractères.
     * @description Renvoie un message indiquant la variable qui est inconsitante.
     */
    toString()
    {
        return "La variable ", this._nomVariable," est inconsistante";
    }
    
    /**
     * @static
     * @param {StructureAlternative} uneStructureAlternative - Instance de la classe StructureAlternative.
     * @type {StructureAlternative}
     * @returns {Array} - Renvoi une liste dont le premier élément est true ou false si true le deuxième élément est la variable inconsistant et le troisème élement est une liste des types que la variable prend.
     * @description La méthode detecterAnomalie cherche si dans une StructureAlternative une variable a un tipé inconsistant.
     */
    static detecterAnomalie(uneStructureAlternative){
        try {
        let types = [];
        let variable = null;
        if(uneStructureAlternative instanceof StructureSi) {
            const regex = /^(.*?)\s*([=!<>]=?)\s*(.*?)$/;
            const premierLibelle = uneStructureAlternative._listeConditions.children[0]._libelle;
            let resultat = premierLibelle.match(regex);
            if(resultat)
            {
                variable = resultat[1];
                let typePremier = ErreurTypesInconsistantsAlternatif.determinerType(ErreurTypesInconsistantsAlternatif.extraireValeurComparaison(uneStructureAlternative._listeConditions.children[0]._libelle));
                types.push(typePremier);
                for (let condition of uneStructureAlternative._listeConditions.children) { 
                    let type = ErreurTypesInconsistantsAlternatif.determinerType(ErreurTypesInconsistantsAlternatif.extraireValeurComparaison(condition._libelle));
                    types.push(type);
                }
            }

        }
        else {
            variable = uneStructureAlternative._expressionATester;
            for (let condition of uneStructureAlternative._listeConditions.children) {
                let type = ErreurTypesInconsistantsAlternatif.determinerType(condition._libelle);
                types.push(type);
            }
        }
        if (types.length > 1) {
            for (let i = 0; i < types.length - 1; i++) {
                if (types[i] != types[i + 1]) {
                    return [true, variable, types];
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
     * @static
     * @param {string} comparaison - Chaîne de caractères représentant la comparaison.
     * @returns {null|string} renvoi rien ou renvoi une chaine de caractère.
     * @description Cette méthode permet d'extraire la partie de droite de la comparaison.
     */
    static extraireValeurComparaison(comparaison) {
        const regex = /[=<>!]=*\s*([\w.-]+)/; // Expression régulière pour extraire la partie droite de la comparaison
        
        const resultat = regex.exec(comparaison); // Utilisation de la regex pour récupérer les correspondances
        if (resultat && resultat[1]) {
                return resultat[1]; // Renvoie la deuxième partie de la comparaison
        } else {
            return null; // Si aucune correspondance trouvée ou si la correspondance est invalide
        }
    }
    /**
     * @static
     * @param {string} texte - Chaîne de caractères à évaluer.
     * @returns {type} - Renvoie un type
     * @description Cette méthode permet de savoir a quelle type de variable la chaine de caractère donnée en paramètre correspond.
     */
    static determinerType(texte) {
        if(!isNaN(texte)) {
            return Number;
        }
        else if(texte.toLowerCase() == "true" || texte.toLowerCase() == "false") {
            return Boolean;
        }
        else {
            // !!! À MODIFIER !!! (variables)
            return String;
        }
    }
} 