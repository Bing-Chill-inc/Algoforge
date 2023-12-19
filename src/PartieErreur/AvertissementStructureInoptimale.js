class AvertissementStructureInoptimale extends AvertissementConceptuel
{
    // ATTRIBUTS
    _nomVariable ; // String
    _valeurs ; // array<String>

    // CONSTRUCTEUR
    constructor(elementEmetteur, nomVariable = new String(), valeurs = new Array())
    {
        super(elementEmetteur);
        this._nomVariable = nomVariable;
        this._valeurs = valeurs;
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

    set _valeurs(value)
    {
        this._valeurs = value;
    }

    get _valeurs()
    {
        return this._valeurs;
    }
    
    // METHODES
       toString(){
        return "La structure conditionnel en surbrillance est mal utilisée.";
    }
    
    static detecterAnomalie(StructureAlternative){
        const conditions = StructureAlternative._listeConditions.children;

        // Récupérer les caractères avant "=" dans la première condition
        const premierLibelle = conditions[0].querySelector('.libelle').textContent;
        const caracteresAvantEgal = premierLibelle.split('=')[0].trim();
    
        // Vérifier si ces caractères sont présents dans tous les autres libellés
        for (let condition of StructureAlternative._listeConditions.children) {
            let libelle = condition.querySelector('.libelle').textContent;
            if (!libelle.startsWith(caracteresAvantEgal)) {
                return; // Les caractères ne sont pas présents dans tous les autres libellés
            }
        }
    
        return true;
    }
}