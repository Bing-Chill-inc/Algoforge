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

    rechercherAnomalies(listeAnomaliesPrecedent = []) { 
        let mesAnomalies = listeAnomaliesPrecedent;
        // On vérifie que la boucle contient une sortie
        let boucleSansSortie = ErreurBoucleSansSortie.detecterAnomalie(this);
        if(boucleSansSortie[0]) {
            mesAnomalies.push(new ErreurBoucleSansSortie(this, boucleSansSortie[1]));
        }
        // On vérifie que la boucle contient pas 7 sous-éléments ou plus
        let tropDeSousElements = AvertissementTropDeSousElements.detecterAnomalie(this);
        if(tropDeSousElements[0]) {
            mesAnomalies.push(new AvertissementTropDeSousElements(this, tropDeSousElements[1]));
        }
        return super.rechercherAnomalies(mesAnomalies);
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
