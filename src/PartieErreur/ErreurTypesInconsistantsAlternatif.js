class ErreurTypesInconsistantsAlternatif extends ErreurConceptuelle
{
    // ATTRIBUTS
    _nomVariable; // String
    _typePris; // Array<Type>

    // CONSTRUCTEUR
    constructor(elementEmetteur) {
        super(elementEmetteur);
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
        if(uneStructureAlternative instanceof StructureSi) {
            let typePremier = ErreurTypesInconsistantsAlternatif.determinerType(ErreurTypesInconsistantsAlternatif.extraireValeurComparaison(uneStructureAlternative._listeConditions.children[0]._libelle));
            for (let condition of uneStructureAlternative._listeConditions.children) {

                if ((ErreurTypesInconsistantsAlternatif.determinerType(ErreurTypesInconsistantsAlternatif.extraireValeurComparaison(condition._libelle))) != typePremier) {
                    return true;
                }
            }
        }
        else {
            let typePremier = ErreurTypesInconsistantsAlternatif.determinerType(uneStructureAlternative._listeConditions.children[0]._libelle);
            for (let condition of uneStructureAlternative._listeConditions.children) {
                if (ErreurTypesInconsistantsAlternatif.determinerType(condition._libelle) != typePremier) {
                    return true;
                }
            }
        }
        return false;
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