class ErreurSyntaxeAssignation extends ErreurConceptuelle
{
    // Pas un égal pour l’assignation mais une flèche   
    // ATTRIBUTS  -- Non --


    // CONSTRUCTEUR
    constructor(elementEmetteur) 
    {
        super(elementEmetteur);
    }
        
    // ENCAPSULATION  -- Non --

    // METHODES
    static DetecterAnomalie(unProbleme)
    {
        //console.log(unProbleme);
        return unProbleme.getTexte().includes('=');
    }
    toString()
    {
        return "L'assignation en surbrillance n'est pas syntaxiquement correcte.";
    }
} 