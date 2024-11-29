/**
 * @class LienTriple
 * @classdesc La classe LienTriple fait la liaison graphique décomposant un élément en sous-éléments, ce en trois lignes
 * @description Crée une instance de LienTriple
 * @extends {Lien}
 */

class LienTriple extends Lien {
	// ATTRIBUTS
	_ligneDecomp; // Ligne de décomposition du lien (barre simple)
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
		if (this._elemGraphiqueParent._elemParent.nombreEnfants > 1) {
			let ancreParent = this._elemGraphiqueParent.getAncreDecomposition();
			let ancreEnfant = this._elemGraphiqueEnfant.getAncreComposition();
			this._ligneDecomp.setDebut(
				ancreParent.abscisse,
				ancreParent.ordonnee,
			);
			this._ligneDecomp.setFin(
				ancreParent.abscisse,
				ancreParent.ordonnee + 0.6,
			);
			this._ligneH.setDebut(
				ancreParent.abscisse,
				ancreParent.ordonnee + 0.6,
			);
			this._ligneH.setFin(
				ancreEnfant.abscisse,
				ancreParent.ordonnee + 0.6,
			);
			this._ligneV.setDebut(
				ancreEnfant.abscisse,
				ancreParent.ordonnee + 0.6,
			);
			this._ligneV.setFin(ancreEnfant.abscisse, ancreEnfant.ordonnee);
		} else {
			// Il n'y a qu'un seul enfant, si il est suffisament proche nous traçons une seule ligne droite
			// Calculons la distance entre les deux points
			let ancreParent = this._elemGraphiqueParent.getAncreDecomposition();
			let ancreEnfant = this._elemGraphiqueEnfant.getAncreComposition();
			let distance = Math.sqrt(
				Math.pow(ancreEnfant.abscisse - ancreParent.abscisse, 2) +
					Math.pow(ancreEnfant.ordonnee - ancreParent.ordonnee, 2),
			);

			// Calculons l'angle entre les deux points
			let angle = Math.atan2(
				ancreEnfant.ordonnee - ancreParent.ordonnee,
				ancreEnfant.abscisse - ancreParent.abscisse,
			);

			// Si la distance est supérieure à 15 ou l'angle est supérieur à 45°, on trace la ligne en forme de L normale
			if (
				distance > 15 ||
				!(angle > Math.PI / 4 && angle < (3 * Math.PI) / 4)
			) {
				let ancreParent =
					this._elemGraphiqueParent.getAncreDecomposition();
				let ancreEnfant =
					this._elemGraphiqueEnfant.getAncreComposition();
				this._ligneDecomp.setDebut(
					ancreParent.abscisse,
					ancreParent.ordonnee,
				);
				this._ligneDecomp.setFin(
					ancreParent.abscisse,
					ancreParent.ordonnee + 0.6,
				);
				this._ligneH.setDebut(
					ancreParent.abscisse,
					ancreParent.ordonnee + 0.6,
				);
				this._ligneH.setFin(
					ancreEnfant.abscisse,
					ancreParent.ordonnee + 0.6,
				);
				this._ligneV.setDebut(
					ancreEnfant.abscisse,
					ancreParent.ordonnee + 0.6,
				);
				this._ligneV.setFin(ancreEnfant.abscisse, ancreEnfant.ordonnee);
			} else {
				// Sinon on trace une ligne droite
				this._ligneDecomp.setDebut(
					ancreParent.abscisse,
					ancreParent.ordonnee,
				);
				this._ligneDecomp.setFin(
					ancreEnfant.abscisse,
					ancreEnfant.ordonnee,
				);
				this._ligneH.setDebut(
					ancreParent.abscisse,
					ancreParent.ordonnee,
				);
				this._ligneH.setFin(ancreEnfant.abscisse, ancreEnfant.ordonnee);
				this._ligneV.setDebut(
					ancreEnfant.abscisse,
					ancreEnfant.ordonnee,
				);
				this._ligneV.setFin(ancreParent.abscisse, ancreParent.ordonnee);
			}
		}
	}

	supprimer() {
		this._espaceTravail.removeChild(this._ligneDecomp);
		this._espaceTravail.removeChild(this._ligneH);
		this._espaceTravail.removeChild(this._ligneV);
	}
}
