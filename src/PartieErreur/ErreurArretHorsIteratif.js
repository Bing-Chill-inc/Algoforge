class ErreurArretHorsIteratif extends ErreurConceptuelle
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
            return "L'arrêt en surbrillance est hors d'une boucle itérative.";
        }
}