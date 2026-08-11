import { AnomalieConceptuelle } from "./AnomalieConceptuelle";

/**
 * @class AvertissementConceptuel
 * @extends {AnomalieConceptuelle}
 * @classdesc La classe AvertissementConceptuel est une sous-classe d'AnomalieConceptuelle, servant de base à tous les avertissements de l'éditeur d'algorithmes.
 * @description Crée une instance d'AvertissementConceptuel.
 */
export class AvertissementConceptuel extends AnomalieConceptuelle {
	// ATTRIBUTS -- Aucun --

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {ElementGraphique} elementEmetteur - L'élément graphique émetteur de l'avertissement.
	 * @type {ElementGraphique}
	 */
	constructor(elementEmetteur: any) {
		super(elementEmetteur);
	}

	// ENCAPSULATION -- Aucune --

	// METHODES -- Aucune --
}
