class ErreurBoucleBorneeSansFin extends ErreurConceptuelle
{
        // ATTRIBUTS  -- Non --


        // CONSTRUCTEUR
        constructor(elementEmetteur) 
        {
            super();
        }
            
        // ENCAPSULATION  -- Non --

        // METHODES
        toString()
        {
            return "La boucle en surbrillance est bornée mais n'a pas de fin.";
        }
}