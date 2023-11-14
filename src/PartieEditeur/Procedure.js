class Procedure extends Probleme {
    // ATTRIBUTS -non-
    // CONSTRUCTEUR
    constructor(abscisse, ordonnee, libelle, listeDonnes = [], listeResultats = []) {
        super(abscisse, ordonnee, libelle, listeDonnes, listeResultats);
    }

    // ENCAPSULATION -non-

    // METHODES
    afficher() {
        super.afficher();
    }
} window.customElements.define("procedure-element", Procedure);