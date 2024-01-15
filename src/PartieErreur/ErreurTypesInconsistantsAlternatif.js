class ErreurTypesInconsistantsAlternatif extends ErreurConceptuelle
{
    // ATTRIBUTS
    _nomVariable; // String
    _typePris; // Array<Type>

    // CONSTRUCTEUR
    constructor(elementEmetteur, nomVariable = new String(), typePris = new Array()) {
        super(elementEmetteur);
        this._nomVariable = nomVariable;
        this._typePris = typePris;
    }
        
    // ENCAPSULATION
    set _nomVariable(value)
    {
        this._nomVariable = value;
    }
        
    get _nomVariable()
    {
        return this._nomVariable;
    }

    set _typePris(value)
    {
        this._typePris = value;
    }
        
    get _typePris()
    {
        return this._typePris;
    }
        
    // METHODES
    toString()
    {
        return "La variable ", this._nomVariable," est inconsistante";
    }

    static detecterAnomalie(uneStructureAlternative){
        let types = [];
        let variable = null;
        if(uneStructureAlternative instanceof StructureSi) {
            const regex = /^(.*?)\s*([=!<>]=?)\s*(.*?)$/;
            const premierLibelle = uneStructureAlternative._listeConditions.children[0]._libelle;
            variable = premierLibelle.match(regex)[1];
            let typePremier = ErreurTypesInconsistantsAlternatif.determinerType(ErreurTypesInconsistantsAlternatif.extraireValeurComparaison(uneStructureAlternative._listeConditions.children[0]._libelle));
            types.push(typePremier);
            for (let condition of uneStructureAlternative._listeConditions.children) { 
                let type = ErreurTypesInconsistantsAlternatif.determinerType(ErreurTypesInconsistantsAlternatif.extraireValeurComparaison(condition._libelle));
                types.push(type);
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

    static extraireValeurComparaison(comparaison) {
        const regex = /[=<>!]=*\s*([\w.-]+)/; // Expression régulière pour extraire la partie droite de la comparaison
        
        const resultat = regex.exec(comparaison); // Utilisation de la regex pour récupérer les correspondances
        if (resultat && resultat[1]) {
                return resultat[1]; // Renvoie la deuxième partie de la comparaison
        } else {
            return null; // Si aucune correspondance trouvée ou si la correspondance est invalide
        }
    }

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