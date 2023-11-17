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
       toString(){
        return "Le plan est trop grand pour être affiché correctement.";

    }
}