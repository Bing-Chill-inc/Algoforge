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

    toJSON() {
        return {
            typeElement: this.constructor.name,
            abscisse: this._abscisse,
            ordonnee: this._ordonnee,
            enfants: this._elemParent.toJSON()
        };
    }   
} window.customElements.define("structure-iterative-non-bornee-element", StructureIterativeNonBornee);
