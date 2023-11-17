class ErreurSyntaxeAssignation extends ErreurConceptuelle
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
            return "L'assignation en surbrillance n'est pas syntaxiquement correcte.";
        }
} 