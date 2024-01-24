/**
 * @class LienCompositionProbleme
 * @classdesc La classe LienCompositionProbleme fait la liaison graphique décomposant un problème en sous-problèmes
 * @description Crée une instance de LienCompositionProbleme
 * @extends {Lien}
 */

class LienCompositionProbleme extends Lien {
    // ATTRIBUTS
    _symboleDecomposition; // Symbole de décomposition du lien (doubles barres)
    _ligneH; // Ligne horizontale du lien
    _ligneV; // Ligne verticale du lien

    // CONSTRUCTEUR
    /**
     * @constructor
     * @param {ElementGraphique} elemGraphiqueParent L'élément graphique parent de la relation
     * @param {ElementGraphique} elemGraphiqueEnfant L'élément graphique enfant de la relation
     */
    constructor(elemGraphiqueParent, elemGraphiqueEnfant, espaceTravail) {
        super(elemGraphiqueParent, elemGraphiqueEnfant, espaceTravail);
        this._symboleDecomposition = new SymboleDecomposition();
        this._ligneH = new Ligne();
        this._ligneV = new Ligne();
        this.update();
        this._espaceTravail.appendChild(this._symboleDecomposition);
        this._espaceTravail.appendChild(this._ligneH);
        this._espaceTravail.appendChild(this._ligneV);
    }

    update() {
        let ancreParent = this._elemGraphiqueParent.getAncreDecomposition();
        let ancreEnfant = this._elemGraphiqueEnfant.getAncreComposition();
        this._symboleDecomposition.setPointAncrage(ancreParent.abscisse, ancreParent.ordonnee);
        this._ligneH.setDebut(ancreParent.abscisse, ancreParent.ordonnee + 1.5);
        this._ligneH.setFin(ancreEnfant.abscisse, ancreParent.ordonnee + 1.5);
        this._ligneV.setDebut(ancreEnfant.abscisse, ancreParent.ordonnee + 1.5);
        this._ligneV.setFin(ancreEnfant.abscisse, ancreEnfant.ordonnee);
    }

    supprimer() {
        this._espaceTravail.removeChild(this._symboleDecomposition);
        this._espaceTravail.removeChild(this._ligneH);
        this._espaceTravail.removeChild(this._ligneV);
    }
}