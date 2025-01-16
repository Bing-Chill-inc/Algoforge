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
	 * @param {HTMLElement} espaceTravail L'espace de travail
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

	/**
	 * @description Met à jour le lien graphique
	 */
	update() {
		let ancreParent = this._elemGraphiqueParent.getAncreDecomposition();
		let ancreEnfant = this._elemGraphiqueEnfant.getAncreComposition();
		if (this._elemGraphiqueParent._elemParent.nombreEnfants > 1) {
			this._symboleDecomposition.setPointAncrage(
				ancreParent.abscisse,
				ancreParent.ordonnee,
			);
			this._symboleDecomposition.style.display = "";
			this._ligneH.setDebut(
				ancreParent.abscisse,
				ancreParent.ordonnee + 1.5,
			);
			this._ligneH.setFin(
				ancreEnfant.abscisse,
				ancreParent.ordonnee + 1.5,
			);
			this._ligneV.setDebut(
				ancreEnfant.abscisse,
				ancreParent.ordonnee + 1.5,
			);
			this._ligneV.setFin(ancreEnfant.abscisse, ancreEnfant.ordonnee);
		} else {
			// Il n'y a qu'un seul enfant, si il est suffisament proche nous traçons deux lignes droites
			// Calculons la distance entre les deux points
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
				this._symboleDecomposition.setPointAncrage(
					ancreParent.abscisse,
					ancreParent.ordonnee,
				);
				this._symboleDecomposition.style.display = "";
				this._ligneH.setDebut(
					ancreParent.abscisse,
					ancreParent.ordonnee + 1.5,
				);
				this._ligneH.setFin(
					ancreEnfant.abscisse,
					ancreParent.ordonnee + 1.5,
				);
				this._ligneV.setDebut(
					ancreEnfant.abscisse,
					ancreParent.ordonnee + 1.5,
				);
				this._ligneV.setFin(ancreEnfant.abscisse, ancreEnfant.ordonnee);
			} else {
				// Sinon, on cache la double barre et on trace deux ligne droite
				this._symboleDecomposition.style.display = "none";
				this._ligneH.setDebut(
					ancreParent.abscisse - 0.5,
					ancreParent.ordonnee,
				);
				this._ligneH.setFin(
					ancreEnfant.abscisse - 0.5,
					ancreEnfant.ordonnee,
				);
				this._ligneV.setDebut(
					ancreParent.abscisse + 0.5,
					ancreParent.ordonnee,
				);
				this._ligneV.setFin(
					ancreEnfant.abscisse + 0.5,
					ancreEnfant.ordonnee,
				);
			}
		}
	}

	/**
	 * @description Supprime le lien graphique
	 */
	supprimer() {
		this._espaceTravail.removeChild(this._symboleDecomposition);
		this._espaceTravail.removeChild(this._ligneH);
		this._espaceTravail.removeChild(this._ligneV);
	}
}
