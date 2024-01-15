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