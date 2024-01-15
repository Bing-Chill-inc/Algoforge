class AvertissementSProblemeJamaisExecute extends AvertissementConceptuel {
    // ATTRIBUTS
    _listeElementsConcernes ; // array<ElementGraphique>

    // CONSTRUCTEUR
    constructor(elementEmetteur, listeElementsConcernes = new Array()) {
        super(elementEmetteur);
        this._listeElementsConcernes = listeElementsConcernes;
    }

    // ENCAPSULATION
    set _listeElementsConcernes(value) {
        this._listeElementsConcernes = value;
    }

    get _elementEmetteur() {
        return this._listeElementsConcernes;
    }
    // METHODES
       toString() {
        return "Les éléments en surbrillances ne sont jamais exécutés.";

    }

    static detecterAnomalie(unArret) {
        const parent = unArret.getParent();
        if (parent == null) {
            return [false];
        }
        const listeEnfantsDuParent = parent.getEnfants();
        let tailleListe = listeEnfantsDuParent.length;
        if (listeEnfantsDuParent[tailleListe - 1] != unArret) {
            let courant = tailleListe - 1;
            let elementsConcernes = [];
            while (listeEnfantsDuParent[courant] != unArret){
                elementsConcernes.push(listeEnfantsDuParent[courant]);
                courant--;
            }
            return [true, elementsConcernes];
        }
        return [false];
    }
} 