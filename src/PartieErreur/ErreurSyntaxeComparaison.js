class ErreurSyntaxeComparaison extends ErreurConceptuelle
{
    // ATTRIBUTS  -- Non --


    // CONSTRUCTEUR
    constructor(elementEmetteur) 
    {
        super(elementEmetteur);
    }
            
    // ENCAPSULATION  -- Non --

    // METHODES
    toString()
    {
        return "La comparaison en surbrillance n'est pas syntaxiquement correcte.";
    }

    static detecterAnomalie(StructureAlternative){
        for (let condition of StructureAlternative._listeConditions.children) {
            if (condition.querySelector('.libelle').textContent.includes("==")) {
                return true;
            }
        }
    }
} 