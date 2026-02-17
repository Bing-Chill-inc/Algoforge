/**
 * @class EvenementDispositionAutomatique
 * @classdesc Événement de réorganisation automatique des positions d'éléments.
 * @extends EvenementEdition
 */
class EvenementDispositionAutomatique extends EvenementEdition {
	_deplacements = []; // [{ element: ElementGraphique, anciennePos: [String, String], nouvellePos: [String, String] }]

	/**
	 * @constructor
	 * @param {Array<Object>} deplacements Liste des positions avant/après.
	 */
	constructor(deplacements = []) {
		super(null);
		this._deplacements = deplacements.filter(
			(deplacement) => deplacement?.element instanceof ElementGraphique,
		);
	}

	/**
	 * @description Vérifie si au moins un élément a effectivement changé de position.
	 * @returns {boolean}
	 */
	estDecale() {
		return this._deplacements.some(
			(deplacement) =>
				deplacement.anciennePos?.[0] !== deplacement.nouvellePos?.[0] ||
				deplacement.anciennePos?.[1] !== deplacement.nouvellePos?.[1],
		);
	}

	/**
	 * @description Applique un état de position ("anciennePos" ou "nouvellePos") à tous les éléments.
	 * @param {string} proprietePosition
	 */
	appliquerPositions(proprietePosition) {
		const plansAActualiser = new Set();
		for (const deplacement of this._deplacements) {
			const position = deplacement[proprietePosition];
			if (!Array.isArray(position) || position.length < 2) continue;
			deplacement.element._abscisse = position[0];
			deplacement.element._ordonnee = position[1];
			deplacement.element.setPosition();
			if (
				deplacement.element.espaceTravail &&
				typeof deplacement.element.espaceTravail.updateAllLines === "function"
			) {
				plansAActualiser.add(deplacement.element.espaceTravail);
			}
		}

		for (const planTravail of plansAActualiser) {
			planTravail.updateAllLines();
		}
	}

	/**
	 * @description Annule la réorganisation automatique.
	 */
	annuler() {
		if (verbose)
			console.log("Annulation de l'événement de disposition automatique");
		this.appliquerPositions("anciennePos");
	}

	/**
	 * @description Rétablit la réorganisation automatique.
	 */
	retablir() {
		if (verbose)
			console.log("Rétablissement de l'événement de disposition automatique");
		this.appliquerPositions("nouvellePos");
	}
}
