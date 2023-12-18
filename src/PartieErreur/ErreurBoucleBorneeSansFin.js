class ErreurBoucleBorneeSansFin extends ErreurConceptuelle
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
            return "La boucle en surbrillance est bornée mais n'a pas de fin.";
        }
        
        // Vérifie si la boucle bornée est bien bornée
        static detecterAnomalie(uneBoucleBornee) {
            // On vérifie que la borne inférieure et supèrieur sont des nombres
            if (isNaN(uneBoucleBornee._borneInferieure) || isNaN(uneBoucleBornee._borneSuperieure)) {
                return false;
            }  
            else {
                // convertion des bornes en nombre
                borneInferieure = Number(uneBoucleBornee._borneInferieure);
                borneSuperieure = Number(uneBoucleBornee._borneSuperieure);
                pas = Number(uneBoucleBornee._pas);
                let courant = borneInferieure;
                while (courant <= borneSuperieure && pas != 0) {
                    if (courant >= borneSuperieure) {
                        return false;
                    }
                    courant += pas;
                }
            }
            return true;
        }
}