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
        if(this.rechercherSortie() == false) {
            listeAnomalies.push(new ErreurBoucleSansSortie());
        }
        // On vérifie que la boucle contient pas 7 sous-éléments ou plus
        if(this.getEnfants().length >= 7) {
            listeAnomalies.push(new AvertissementTropDeSousElements(this.getEnfants()));
        }
        return listeAnomalies;
    }
    
    rechercherSortie() {
        let listeDescandants = this.getDescendants(ConditionSortie)
        for (let descendant of listeDescandants) {
            if (descendant.getAntescendant(StructureIterativeNonBornee)[0] == this ) {
                return true;
            }
        }
        return false;
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
