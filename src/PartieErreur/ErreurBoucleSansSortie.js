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
        
        // Vérifie si la boucle non bornée a une sortie
        static detecterAnomalie(uneBoucleNonBornee) {
            let listeDescandants = uneBoucleNonBornee.getDescendants(ConditionSortie)
            for (let descendant of listeDescandants) {
                if (descendant.getAntescendant(StructureIterativeNonBornee)[0] == uneBoucleNonBornee ) {
                    return false;
                }
            }
            return true;
        }
} 