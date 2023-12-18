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

        static detecterAnomalie(unArret) {
            let listeAntescedants = unArret.getAntescedants(StructureIterativeNonBornee);
            if(listeAntescedants.length > 0){
                return false;
            }
            return true;
        }
}