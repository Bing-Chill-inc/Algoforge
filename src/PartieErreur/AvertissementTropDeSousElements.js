class AvertissementTropDeSousElements extends AvertissementConceptuel
{
    // ATTRIBUTS
    _listeElementsConcernes ; // array<ElementGraphique>

    // CONSTRUCTEUR
    constructor( listeElementsConcernes = new Array())
    {
        super();
        this._listeElementsConcernes = listeElementsConcernes;
    }

    // ENCAPSULATION
    set _listeElementsConcernes(value)
    {
        this._listeElementsConcernes = value;
    }

    get _listeElementsConcernes()
    {
        return this._listeElementsConcernes;
    }
    // METHODES
       toString(){
        return "L'élément en surbrillance a trop de sous-éléments.";
    }
}