/**
 * @class Lien
 * @classdesc La classe Lien fait la liaison graphique entre des éléments graphiques, et a pour but d'être héritée
 * @description Crée une instance de lien
 * @extends {}
 */

class Lien {
    // ATTRIBUTS
    _elemGraphiqueParent; // L'élément graphique parent de la relation
    _elemGraphiqueEnfant; // L'élément graphique enfant de la relation
    _espaceTravail; // EspaceTravail

    // CONSTRUCTEUR -non instanciable-
    constructor(elemGraphiqueParent, elemGraphiqueEnfant, espaceTravail) {
        this._elemGraphiqueParent = elemGraphiqueParent;
        this._elemGraphiqueEnfant = elemGraphiqueEnfant;
        this._espaceTravail = espaceTravail;
    }

    // ENCAPSULATION
    get _elemGraphiqueParent() {
        return this._elemGraphiqueParent;
    }

    set _elemGraphiqueParent(value) {
        this._elemGraphiqueParent = value;
    }

    get _elemGraphiqueEnfant() {
        return this._elemGraphiqueEnfant;
    }

    set _elemGraphiqueEnfant(value) {
        this._elemGraphiqueEnfant = value;
    }

    // METHODES
    /**
     * @description Dessine le lien
     */
    update() {
        // Défini dans les classes filles
    }

    supprimer() {
        // Défini dans les classes filles
    }
}