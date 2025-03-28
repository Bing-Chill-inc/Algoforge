/**
 * @class AvertissementSProblemeJamaisExecute
 * @extends {AvertissementConceptuel}
 * @classdesc La Classe AvertissementSProblemeJamaisExecute stocke les éléments graphiques qui sont après une condition de sortie et qui ne sont donc pas exécutés.
 * @description Crée une instance de AvertissementSProblemeJamaisExecute.
 */
class AvertissementSProblemeJamaisExecute extends AvertissementConceptuel {
	// ATTRIBUTS
	_listeElementsConcernes; // array<ElementGraphique>

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {ConditionSortie} elementEmetteur - La condition de sortie émettrice de l'avertissement.
	 * @type {ConditionSortie}
	 * @param {Array<ElementGraphique>} [listeElementsConcernes=[]] - Liste des éléments qui ne sont pas exécutés (par défaut, la liste est vide).
	 */
	constructor(elementEmetteur, listeElementsConcernes = new Array()) {
		super(elementEmetteur);
		this._listeElementsConcernes = listeElementsConcernes;
	}

	// ENCAPSULATION
	/**
	 * @param {Array<ElementGraphique>} value - Nouvelle liste des éléments concernés par l'avertissement.
	 * @type {Array<ElementGraphique>}
	 * @description Définit la valeur de _listeElementsConcernes de AvertissementSProblemeJamaisExecute.
	 */
	set _listeElementsConcernes(value) {
		this._listeElementsConcernes = value;
	}
	/**
	 * @returns {Array<ElementGraphique>} - Renvoie une liste d'ElementGraphique.
	 * @description Renvoie la liste des éléments concernés par l'avertissement.
	 */
	get _elementEmetteur() {
		return this._listeElementsConcernes;
	}

	// METHODES
	/**
	 * @returns {string} - Renvoie une chaine de caractères.
	 * @description Renvoie un message indiquant que les éléments en surbrillance ne sont jamais exécutés.
	 */
	toString() {
		return "Les éléments en surbrillance ne sont jamais exécutés.";
	}
	/**
	 * @static
	 * @param {ConditionSortie} unArret - Instance de la classe ConditionSortie.
	 * @type {ConditionSortie}
	 * @returns {Array} - Renvoie une liste dont le premier élément est true ou false si true le deuxième élément est une liste d'ElementGraphique.
	 * @description La méthode detecterAnomalie cherche si le parent de la condition d'arrêt a des enfants qui sont après la condition d'arrêt. Si oui, la méthode renvoie un tableau avec le premier élément à exécuter après la condition d'arrêt, sinon renvoie un tableau vide.
	 */
	static detecterAnomalie(unArret) {
		try {
			const listeParent = unArret.getAntescedants(StructureAlternative);
			if (listeParent.length == 0) {
				return [false];
			}
			const parent = listeParent[0];
			const listeEnfantsDuParent = parent.getEnfantsParCondition();
			for (let lesEnfantsDeUneCondition of listeEnfantsDuParent) {
				for (let unElementGraphique of lesEnfantsDeUneCondition) {
					if (unElementGraphique == unArret) {
						if (
							lesEnfantsDeUneCondition[
								lesEnfantsDeUneCondition.length - 1
							] != unArret
						) {
							return [true, lesEnfantsDeUneCondition];
						}
					}
				}
			}
			return [false];
			/*let tailleListe = listeEnfantsDuParent.length;
            if (listeEnfantsDuParent[tailleListe - 1] != unArret) {
                let courant = tailleListe - 1;
                let elementsConcernes = [];
                while (listeEnfantsDuParent[courant] != unArret){
                    elementsConcernes.push(listeEnfantsDuParent[courant]);
                    courant--;
                }
                return [true, elementsConcernes];
            }
            return [false];*/
		} catch (e) {
			console.error(e);
			return [false];
		}
	}
}
