/**
 * @class StructureIterativeNonBornee
 * @classdesc Structure itérative non bornée qui boucle tant qu'une condition n'est pas remplie
 * @description Crée une instance de StructureIterativeNonBornee
 * @extends {StructureIterative}
 */
class StructureIterativeNonBornee extends StructureIterative {
	// ATTRIBUTS -non-

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {string|number} abscisse - L'abscisse de la structure
	 * @param {string|number} ordonnee - L'ordonnée de la structure
	 */
	constructor(abscisse, ordonnee) {
		super(abscisse, ordonnee);
	}

	// ENCAPSULATION -non-

	// METHODES
	/**
	 * @description Affiche sur le plan de travail la StructureIterativeNonBornee
	 */
	afficher() {
		super.afficher(); // Affichage de la boucle seule
	}

	/**
	 * @description Recherche et renvoie la liste des anomalies de la boucle itérative non bornée
	 * @returns {Array<AnomalieConceptuelle>} La liste des anomalies précédentes + celles trouvées par la structure
	 */
	rechercherAnomalies() {
		let mesAnomalies = [];
		// 10
		if (ErreurBoucleSansSortie.detecterAnomalie(this)) {
			mesAnomalies.push(new ErreurBoucleSansSortie(this));
		}
		// 12
		let tropDeSousElements =
			AvertissementTropDeSousElements.detecterAnomalie(this);
		if (tropDeSousElements[0]) {
			mesAnomalies.push(
				new AvertissementTropDeSousElements(
					this,
					tropDeSousElements[1],
				),
			);
		}
		return super.rechercherAnomalies(mesAnomalies);
	}

	/**
	 * @description Renvoie le corps JSON de l'instance de la StructureIterativeNonBornee
	 * @returns {JSON} Le corps JSON de la StructureIterativeNonBornee
	 */
	toJSON() {
		return {
			typeElement: this.constructor.name,
			abscisse: this._abscisse,
			ordonnee: this._ordonnee,
			enfants: this._elemParent.toJSON(),
		};
	}

	/**
	 * @description Renvoie le corps JSON des informations contenues dans la StructureIterativeNonBornee en spécifiant les éléments enfants à conserver
	 * @param {Array<ElementGraphique>} listeElemEnfantsAConcerver - La liste des éléments enfants à conserver
	 * @returns {JSON} Le corps JSON de la StructureIterativeNonBornee
	 */
	toJSONspecifier(listeElemEnfantsAConcerver) {
		return {
			typeElement: this.constructor.name,
			abscisse: this._abscisse,
			ordonnee: this._ordonnee,
			enfants: this._elemParent.toJSONspecifier(
				listeElemEnfantsAConcerver,
			),
		};
	}

	/**
	 * @description Génère les options contextuelles pour la StructureIterativeNonBornee
	 * @param {Editeur} editeur - L'éditeur d'algorithmes
	 * @returns {Array<ElementMenu>} La liste des options contextuelles
	 */
	genererOptionsContextuelles(editeur) {
		let listeOptions = super.genererOptionsContextuelles(editeur);

		// Option d'ajout d'une condition d'arrêt
		listeOptions.push(
			new ElementMenu("Ajouter une condition d'arrêt", () => {
				if (verbose) console.log("Ajouter une condition d'arrêt");
				let nouveauIf = new StructureSi(
					parseFloat(this._abscisse) - 3 + "vw",
					parseFloat(this._ordonnee) + 10 + "vw",
				);
				nouveauIf.setPosition();
				nouveauIf.afficher();
				this.parentNode.appendChild(nouveauIf);

				let sortie = new ConditionSortie(
					parseFloat(this._abscisse) + "vw",
					parseFloat(this._ordonnee) + 15 + "vw",
				);
				sortie.setPosition();
				sortie.afficher();
				this.parentNode.appendChild(sortie);

				this._elemParent.lierEnfant(nouveauIf);
				nouveauIf.getCondition(0)._elemParent.lierEnfant(sortie);
			}),
		);
		return listeOptions;
	}
}
window.customElements.define(
	"structure-iterative-non-bornee-element",
	StructureIterativeNonBornee,
);
