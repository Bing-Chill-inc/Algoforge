class AvertissementSProblemeJamaisExecute extends AvertissementConceptuel
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

    get _elementEmetteur()
    {
        return this._listeElementsConcernes;
    }
    // METHODES
       toString(){
        return "Les éléments en surbrillances ne sont jamais exécutés.";

    }
} 