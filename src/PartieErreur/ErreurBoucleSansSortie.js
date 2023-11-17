class ErreurBoucleSansSortie extends ErreurConceptuelle
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
            return "La boucle en surbrillance n'a pas de sortie.";
        }
} 