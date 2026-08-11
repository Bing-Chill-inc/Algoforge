import { ElementGraphique } from "./ElementGraphique";
import { classes } from "../runtime/classRegistry";

/**
 * @class ConditionSortie
 * @classdesc Représente une condition de sortie dans une structure itérative
 * @extends {ElementGraphique}
 * @description Crée une instance de ConditionSortie
 */
export class ConditionSortie extends ElementGraphique {
	static readonly typeElement = "ConditionSortie";
	// ATTRIBUTS -non-

	// CONSTRUCTEUR
	constructor(abscisse = 0, ordonnee = 0) {
		super(abscisse, ordonnee);
	}

	// ENCAPSULATION -non-

	// METHODES
	afficher() {
		// Inutile car géré par le CSS, mais présent pour la cohérence
		return null;
	}

	rechercherAnomalies() {
		let mesAnomalies = [];

		//5
		if (classes.ErreurArretHorsIteratif.detecterAnomalie(this)) {
			mesAnomalies.push(new classes.ErreurArretHorsIteratif(this));
		} else {
			if (classes.ErreurArretIteratifBornee.detecterAnomalie(this)) {
				mesAnomalies.push(new classes.ErreurArretIteratifBornee(this));
			}
		}
		let problemeJamaisExecute =
			classes.AvertissementSProblemeJamaisExecute.detecterAnomalie(this);
		if (problemeJamaisExecute[0]) {
			mesAnomalies.push(
				new classes.AvertissementSProblemeJamaisExecute(
					this,
					problemeJamaisExecute[1],
				),
			);
		}
		return super.rechercherAnomalies(mesAnomalies);
	}

	extraireInformation() {
		return [];
	}

	toJSON() {
		return {
			typeElement: this.constructor.typeElement,
			abscisse: this._abscisse,
			ordonnee: this._ordonnee,
		};
	}

	toJSONspecifier(listeElemEnfantsAConcerver: any) {
		return this.toJSON();
	}

	getAncreComposition() {
		let abscisse = parseFloat(this._abscisse) + 2;
		let ordonnee = parseFloat(this._ordonnee);
		return { abscisse: abscisse, ordonnee: ordonnee };
	}
}
