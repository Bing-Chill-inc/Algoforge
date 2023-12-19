class AvertissementInformationsInconsistantesSi extends AvertissementConceptuel
{
    // ATTRIBUTS
    _nomsVariablesConcernees ; // array<String>

    // CONSTRUCTEUR
    constructor(elementEmetteur, nomsVariablesConcernees = new Array())
    {
        super(elementEmetteur);
        this._nomsVariablesConcernees = nomsVariablesConcernees;
    }

    // ENCAPSULATION
    set _nomsVariablesConcernees(value)
    {
        this._nomsVariablesConcernees = value;
    }

    get _nomsVariablesConcernees()
    {
        return this._nomsVariablesConcernees;
    }
    // METHODES
       toString(){
        return "La structure conditionelle en surbrillance contient les variables suvantes qui ne sont pas consistantes : "+this._nomsVariablesConcernees+" .";

    }
    static detecterAnomalie(StructureAlternative){
        const conditions = StructureAlternative._listeConditions.children;

        const regex = /^(.*?)\s*([=!<>]=?)\s*(.*?)$/;
        const premierLibelle = conditions[0].querySelector('.libelle').textContent;
        const caracteresAvantEgal = premierLibelle.match(regex);
    
        // Vérifier si ces caractères sont présents dans tous les autres libellés
        for (let condition of StructureAlternative._listeConditions.children) {
            let libelle = condition.querySelector('.libelle').textContent;
            const match = libelle.match(regex);
            if(libelle =="sinon"){
                return;
            }
            if (!match[1].trim().startsWith(caracteresAvantEgal[1])) {
                return true; // Les caractères ne sont pas présents dans tous les autres libellés
            }
        }
    
        return;
        
    }
}

