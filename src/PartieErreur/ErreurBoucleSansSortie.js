class ErreurBoucleSansSortie extends ErreurConceptuelle
{
        // ATTRIBUTS
        _boucleSansSortie; // StructureIterativeBornee

        // CONSTRUCTEUR
        constructor(elementEmetteur, boucleSansSortie = new String()) 
        {
            super(elementEmetteur);
            this._boucleSansSortie = boucleSansSortie;
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
                if (descendant.getAntescedants(StructureIterativeNonBornee)[0] == uneBoucleNonBornee ) {
                    return [false];
                }
            }
            return [true, uneBoucleNonBornee];
        }

} 