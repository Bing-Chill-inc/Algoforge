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
                    let borneInferieure = Number(uneBoucleBornee._borneInferieure);
                    let borneSuperieure = Number(uneBoucleBornee._borneSuperieure);
                    let pas = Number(uneBoucleBornee._pas);
                    let courant = borneInferieure;
                    if(borneInferieure && borneSuperieure && pas)
                    {
                    if(borneSuperieure - borneInferieure > 0)
                    {
                        // Le pas doit etre positif
                        return pas > 0;
                    }
                    else
                    {
                        // Le pas doit etre négatig
                        return pas < 0;
                    }
                }
            }
            return true;
        }
}