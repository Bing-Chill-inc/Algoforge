/**
 * @class AvertissementPlanTropGrand
 * @extends {AvertissementConceptuel}
 * @classdesc La Classe AvertissementPlanTropGrand stocke les PlanTravail qui sont trop grands.
 * @description Crée une instance de AvertissementPlanTropGrand
 */
class AvertissementPlanTropGrand extends AvertissementConceptuel {
	// ATTRIBUTS -- Non --

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {PlanTravail} elementEmetteur - La StructureIterativebornee émettrice de l'avertissement.
	 * @type {PlanTravail}
	 */
	constructor(elementEmetteur) {
		super(elementEmetteur);
	}

	// ENCAPSULATION -- Non --

	// METHODES
	/**
	 * @returns {string} - Renvoie une chaine de caractères.
	 * @description Renvoie un message indiquant qu'il y a trop de sous-éléments.
	 */
	toString() {
		return "Le plan est trop grand pour être affiché correctement.";
	}
	/**
	 * @static
	 * @param {PlanTravail} unElementGraphique - Instance de la classe ConditionSortie.
	 * @type {PlanTravail}
	 * @returns {boolean} - Renvoi true si le plan est trop grand sinon false.
	 * @description La méthode detecterAnomalie cherche si la taille d'un PlanTravail n'est pas plus grande que la distance maximale définie.
	 */
	static detecterAnomalie(unPlan) {
		try {
			let distanceMax = 10;
			let listeElementGraphique = unPlan.children;
			let elementHautGauche = listeElementGraphique[0];
			let elementBasDroite = listeElementGraphique[0];
			for (let element of listeElementGraphique) {
				if (
					parseFloat(element._abscisse) +
						parseFloat(element._ordonnee) <
					parseFloat(elementHautGauche._abscisse) +
						parseFloat(elementHautGauche._ordonnee)
				) {
					elementHautGauche = element;
				}
				if (
					parseFloat(element._abscisse) +
						parseFloat(element._ordonnee) >
					parseFloat(elementBasDroite._abscisse) +
						parseFloat(elementBasDroite._ordonnee)
				) {
					elementBasDroite = element;
				}
			}
			let distance = AvertissementPlanTropGrand.calculerDistance(
				parseFloat(elementHautGauche._abscisse),
				parseFloat(elementHautGauche._ordonnee),
				parseFloat(elementBasDroite._abscisse),
				parseFloat(elementBasDroite._ordonnee),
			);
			console.log(distance);
			if (distance > distanceMax) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return true;
		}
	}
	/**
	 * @static
	 * @param {number} x1
	 * @param {number} y1
	 * @param {number} x2
	 * @param {number} y2
	 * @returns {number} - Renvoi la distance entre deux points.
	 * @description La méthode calculerDistance calcule la distance entre deux points dont les coordonner sont données en paramètre.
	 */
	static calculerDistance(x1, y1, x2, y2) {
		const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
		return distance;
	}
}
