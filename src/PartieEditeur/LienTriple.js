/**
 * @class LienTriple
 * @classdesc La classe LienTriple fait la liaison graphique décomposant un élément en sous-éléments, ce en trois lignes
 * @description Crée une instance de LienTriple
 * @extends {Lien}
 */

class LienTriple extends Lien {
    // ATTRIBUTS
    _ligneDecomp // Ligne de décomposition du lien (barre simple)
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
        this._ligneDecomp = new Ligne();
        this._ligneH = new Ligne();
        this._ligneV = new Ligne();
        this.update();
        this._espaceTravail.appendChild(this._ligneDecomp);
        this._espaceTravail.appendChild(this._ligneH);
        this._espaceTravail.appendChild(this._ligneV);
    }

    update() {
        let ancreParent = this._elemGraphiqueParent.getAncreDecomposition();
        let ancreEnfant = this._elemGraphiqueEnfant.getAncreComposition();
        this._ligneDecomp.setDebut(ancreParent.abscisse, ancreParent.ordonnee);
        this._ligneDecomp.setFin(ancreParent.abscisse, ancreParent.ordonnee + 0.6);
        this._ligneH.setDebut(ancreParent.abscisse, ancreParent.ordonnee + 0.6);
        this._ligneH.setFin(ancreEnfant.abscisse, ancreParent.ordonnee + 0.6);
        this._ligneV.setDebut(ancreEnfant.abscisse, ancreParent.ordonnee + 0.6);
        this._ligneV.setFin(ancreEnfant.abscisse, ancreEnfant.ordonnee);
    }

    supprimer() {
        this._espaceTravail.removeChild(this._ligneDecomp);
        this._espaceTravail.removeChild(this._ligneH);
        this._espaceTravail.removeChild(this._ligneV);
    }
}