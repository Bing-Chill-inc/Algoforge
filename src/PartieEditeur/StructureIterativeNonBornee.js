class StructureIterativeNonBornee extends StructureIterative {
    // ATTRIBUTS -non-

    // CONSTRUCTEUR
    constructor(abscisse, ordonnee) {
        super(abscisse, ordonnee);
    }

    // ENCAPSULATION -non-

    // METHODES
    afficher() {
        super.afficher(); // Affichage de la boucle seule
    }

    rechercherAnomalies() {
        let listeAnomalies = [];
        // On vérifie que la boucle contient une sortie
        if(ErreurBoucleSansSortie.detecterAnomalie(this)) {
            listeAnomalies.push(new ErreurBoucleSansSortie(this));
        }
        // On vérifie que la boucle contient pas 7 sous-éléments ou plus
        let tropDeSousElements = AvertissementTropDeSousElements.detecterAnomalie(this);
        if(tropDeSousElements[0]) {
            listeAnomalies.push(new AvertissementTropDeSousElements(this, tropDeSousElements[1]));
        }
        return listeAnomalies;
    }

    toJSON() {
        return {
            typeElement: this.constructor.name,
            abscisse: this._abscisse,
            ordonnee: this._ordonnee,
            enfants: this._elemParent.toJSON()
        };
    }   
} window.customElements.define("structure-iterative-non-bornee-element", StructureIterativeNonBornee);
