/**
 * @class LienDroit
 * @classdesc La classe LienDroit fait la liaison graphique entre des éléments graphiques ne nécessitant qu'une ligne
 * @description Crée une instance de lien droit
 * @extends {Lien}
 */

class LienDroit extends Lien {
	// ATTRIBUTS
	_ligne; // Ligne unique du lien

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {ElementGraphique} elemGraphiqueParent L'élément graphique parent de la relation
	 * @param {ElementGraphique} elemGraphiqueEnfant L'élément graphique enfant de la relation
	 */
	constructor(elemGraphiqueParent, elemGraphiqueEnfant, espaceTravail) {
		super(elemGraphiqueParent, elemGraphiqueEnfant, espaceTravail);
		this._ligne = new Ligne();
		this.update();
		this._espaceTravail.appendChild(this._ligne);
	}

	update() {
		let ancreParent = this._elemGraphiqueParent.getAncreDecomposition();
		let ancreEnfant = this._elemGraphiqueEnfant.getAncreComposition();
		this._ligne.setDebut(ancreParent.abscisse, ancreParent.ordonnee);
		this._ligne.setFin(ancreEnfant.abscisse, ancreEnfant.ordonnee);
	}

	supprimer() {
		this._espaceTravail.removeChild(this._ligne);
	}
}
