class AvertissementPlanTropGrand extends AvertissementConceptuel
{
    // ATTRIBUTS -- Non --

    // CONSTRUCTEUR
    constructor(elementEmetteur)
    {
        super(elementEmetteur);
    }

    // ENCAPSULATION -- Non --
 
    // METHODES
    toString() 
    {
        return "Le plan est trop grand pour être affiché correctement.";

    }

    static detecterAnomalie(unPlan) {
        let distanceMax = 1000;
        let listeElementGraphique = unPlan.children;
        let elementHautGauche = listeElementGraphique[0];
        let elementBasDroite = listeElementGraphique[0];
        for(let element of listeElementGraphique) {
            if(parseFloat(element._abscisse) + parseFloat(element._ordonnee) < parseFloat(elementHautGauche._abscisse) + parseFloat(elementHautGauche._ordonnee)) {
                elementHautGauche = element;
            }
            if(parseFloat(element._abscisse) + parseFloat(element._ordonnee) > parseFloat(elementBasDroite._abscisse) + parseFloat(elementBasDroite._ordonnee)) {
                elementBasDroite = element;
            }
        }
        let distance = AvertissementPlanTropGrand.calculerDistance(parseFloat(elementHautGauche._abscisse), parseFloat(elementHautGauche._ordonnee), parseFloat(elementBasDroite._abscisse), parseFloat(elementBasDroite._ordonnee));
        if(distance > distanceMax) {
            return true;
        }
        return false;
    }
   
    static calculerDistance(x1, y1, x2, y2) {
        const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        return distance;
    }
}