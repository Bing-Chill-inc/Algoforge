/**
 * @class AvertissementInformationsInconsistantesSi
 * @extends {AvertissementConceptuel}
 * @classdesc La Classe AvertissementInformationsInconsistantesSi stocke les StructureSi qui utilisent des variables qui ne sont pas consistantes.
 * @description Crée une instance de AvertissementInformationsInconsistantesSi
 */
class AvertissementInformationsInconsistantesSi extends AvertissementConceptuel
{
    // ATTRIBUTS
    _nomsVariablesConcernees ; // array<String>

    // CONSTRUCTEUR
    /**
     * @constructor
     * @param {StructureSi} elementEmetteur - L'élément émetteur de l'avertissement.
     * @type {StructureSi}
     * @param {Array<String>} [nomsVariablesConcernees=new Array()] - La liste des noms de variables concernées par l'avertissement (par défaut, une liste vide).
     */
    constructor(elementEmetteur, nomsVariablesConcernees = new Array())
    {
        super(elementEmetteur);
        this._nomsVariablesConcernees = nomsVariablesConcernees;
    }

    // ENCAPSULATION
    
    /**
     * @param {Array<String>} value - Nouvelle valeur pour _nomsVariablesConcernees.
     * @description Définit la valeur de _nomsVariablesConcernees de AvertissementInformationsInconsistantesSi.
     */
    set _nomsVariablesConcernees(value)
    {
        this._nomsVariablesConcernees = value;
    }
    /**
     * @returns {Array<String>} - Renvoi une liste de chaine de caractères.
     * @description Renvoie la liste des noms de variables concernées par l'avertissement.
     */
    get _nomsVariablesConcernees()
    {
        return this._nomsVariablesConcernees;
    }
    // METHODES
    /**
     * @returns {string} - Renvoie une chaine de caractères.
     * @description Renvoie un message indiquant la variable qui est inconsitante.
     */
    toString(){
        return "La structure conditionelle en surbrillance contient les variables suvantes qui ne sont pas consistantes : "+this._nomsVariablesConcernees+" .";

    }
    /**
     * @static
     * @param {StructureSi} StructureAlternative
     * @type {StructureSi}
     * @returns {Array} - Renvoi une liste dont le premier élément est true ou false si true le deuxième élément est la variable inconsistant.
     * @description La méthode detecterAnomalie cherche si dans une StructureSi il y a des variables qui n'ont aucun lien entre eux.
     */
    static detecterAnomalie(StructureAlternative){
        const conditions = StructureAlternative._listeConditions.children;
        let variables = [];

        const regex = /^(.*?)\s*([=!<>]=?)\s*(.*?)$/;
        const premierLibelle = conditions[0].querySelector('.libelle').textContent;
        const caracteresAvantEgal = premierLibelle.match(regex);
        variables.push(caracteresAvantEgal[1]);
    
        let nbCondition = 0;
        for (let condition of StructureAlternative._listeConditions.children) {
            let libelle = condition.querySelector('.libelle').textContent;
            const match = libelle.match(regex);
            if(!match[1].includes(variables)){
                variables.push(match[1]);
            }
            if(libelle =="sinon"){
                if(nbCondition == StructureAlternative._listeConditions.children.length - 1){
                    return [false];
                }
                else{
                    return [true];
                }
            }
        
            if (!match[1].trim().startsWith(caracteresAvantEgal[1])) {
                return [true, variables]; 
            }
            nbCondition=nbCondition+1;
        }
    
        return [false];
        
    }
}