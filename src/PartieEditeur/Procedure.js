/**
 * @class Procedure
 * @classdesc La classe procédure qui hérite de Probleme
 * @extends {Probleme}
 * @description Crée une instance de Procedure
 */
class Procedure extends Probleme {
    // ATTRIBUTS -non-
    // CONSTRUCTEUR
    /**
     * @constructor
     * @param {number|string} abscisse L'abscisse
     * @param {number|string} ordonnee L'ordonnée
     * @param {string} libelle Le libellé de la Procedure
     * @param {Array} listeDonnes Obselète
     * @param {Array} listeResultats Obselète
     */
    constructor(abscisse, ordonnee, libelle, listeDonnes = [], listeResultats = []) {
        super(abscisse, ordonnee, libelle, listeDonnes, listeResultats);
    }

    // ENCAPSULATION -non-

    // METHODES
    /**
     * @description Affiche la procedure utilise la méthode de Probleme
     */
    afficher() {
        super.afficher();
    }
} window.customElements.define("procedure-element", Procedure);