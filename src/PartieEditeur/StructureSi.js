/**
 * @class StructureSi
 * @classdesc La StructureSi qui permet de vérifier une ou plusieurs conditions donnée
 * @description Crée une instance de StructureSi
 * @extends {StructureAlternative}
 */
class StructureSi extends StructureAlternative {
	// ATTRIBUTS -non-

	// CONSTRUCTEUR
	/**
	 *
	 * @constructor
	 * @param {string|number} abscisse
	 * @param {string|number} ordonnee
	 * @param {Array<Condition>} listeConditions
	 */
	constructor(abscisse, ordonnee, listeConditions = []) {
		super(abscisse, ordonnee, listeConditions);
	}

	// ENCAPSULATION -non-

	// METHODES
	/**
	 * @description Affiche la StructureSi sur le plan de travail
	 */
	afficher() {
		let divTriangleGauche = document.createElement("div");
		divTriangleGauche.className = "triangleGauche";
		divTriangleGauche.classList.add("triangle");
		divTriangleGauche.innerHTML = "<span>-<span>";
		divTriangleGauche.addEventListener("click", (e) => {
			this.supprimerCondition();
		});
		this.appendChild(divTriangleGauche);

		let divConditionContainer = document.createElement("div");
		divConditionContainer.className = "conditionContainer";
		this.appendChild(divConditionContainer);

		for (let i = 0; i < this._listeConditions.length; i++) {
			this._listeConditions[i]._structure = this;
			divConditionContainer.appendChild(this._listeConditions[i]);
		}

		this._listeConditions = divConditionContainer;

		let divTriangleDroit = document.createElement("div");
		divTriangleDroit.className = "triangleDroit";
		divTriangleDroit.classList.add("triangle");
		divTriangleDroit.innerHTML = "<span>+<span>";
		divTriangleDroit.addEventListener("click", (e) => {
			this.ajouterCondition();
		});
		this.appendChild(divTriangleDroit);
	}

	/**
	 * @description Renvoie le corp JSON des information contenu dans la StructureSi
	 *
	 * @returns {JSON} le corps json de la StructureSi
	 * @property {ElementGraphique} typeElement Le type de la StructureSi (qui est StructureSwitch)
	 * @property {string|number} abscisse l'abscisse
	 * @property {string|number} ordonee l'ordonnée
	 * @property {Array<Condition>} conditions la liste des conditions actuelle dans la StructureSi
	 */
	toJSON() {
		let conditions = [];
		for (let condition of this._listeConditions.children) {
			conditions.push(condition.toJSON());
		}
		return {
			typeElement: this.constructor.name,
			abscisse: this._abscisse,
			ordonnee: this._ordonnee,
			conditions: conditions,
		};
	}

	toJSONspecifier(listeElemEnfantsAConcerver) {
		let conditions = [];
		for (let condition of this._listeConditions.children) {
			conditions.push(
				condition.toJSONspecifier(listeElemEnfantsAConcerver),
			);
		}
		return {
			typeElement: this.constructor.name,
			abscisse: this._abscisse,
			ordonnee: this._ordonnee,
			conditions: conditions,
		};
	}
	/**
	 * @deprecated
	 * @returns {}
	 */
	extraireInformation() {
		// A faire condition doit pouvoir dire la variable ou le type
		return [];
	}

	genererOptionsContextuelles(editeur) {
		let listeOptions = super.genererOptionsContextuelles(editeur);

		// Si la transformation en switch est possible (et pertinente)
		const potentielTransformationSwitch =
			this.detecterPotentielTransformationSwitch();
		if (potentielTransformationSwitch.result) {
			listeOptions.push(
				new ElementMenu("Transformer en Switch", () => {
					console.log("Transformer en Switch");
					// On crée la nouvelle structure Switch
					const newSwitch = this.parentNode.ajouterElement(
						StructureSwitch,
						this._abscisse,
						this._ordonnee,
						true,
					);

					potentielTransformationSwitch.valeurs.forEach((cond) => {
						cond._libelle = cond._libelle.split("=")[1].trim();
						newSwitch.ajouterCondition(cond);
					});

					Array.from(
						newSwitch.querySelectorAll("condition-element"),
					).forEach((cond) => {
						if (cond._libelle.length == 0) {
							newSwitch.supprimerCondition(cond);
						}
					});

					newSwitch.expressionATester =
						potentielTransformationSwitch.variable;

					// On lie le parent de la structure Si à la structure Switch
					this._parent.lierEnfant(newSwitch);
					this._parent.delierEnfant(this);

					this.supprimer();
				}),
			);
		}
		return listeOptions;
	}

	detecterPotentielTransformationSwitch() {
		/* 
        Si a = 0 | a = 1 | a = 2 | Sinon Structure Switch plus adapter 
        */
		try {
			const conditions = this._listeConditions.children;
			if (conditions.length < 3) {
				return { result: false };
			}
			let libelle = conditions[0].querySelector(".libelle").textContent;
			let caracteresAvantEgal;
			let valeurs = [];

			if (libelle.includes("=")) {
				caracteresAvantEgal = libelle.split("=")[0].trim();
			}
			// Vérifier si tout les conditions contient un = et que la variable traiter est constante
			for (let condition of conditions) {
				console.log(condition);
				libelle = condition.querySelector(".libelle").textContent;
				if (libelle.toLowerCase().includes("sinon")) {
					// default statement structure switch
					continue;
				}
				if (
					!libelle.includes("=") ||
					libelle.toLowerCase().includes("ou") ||
					libelle.toLowerCase().includes("et")
				) {
					return { result: false };
				}
				if (caracteresAvantEgal != libelle.split("=")[0].trim()) {
					return { result: false };
				}
				valeurs.push(condition);
			}

			return { result: true, variable: caracteresAvantEgal, valeurs };
		} catch (e) {
			console.error(e);
			return { result: false };
		}
	}

	/**
	 * @description Récupère la liste actuelles des anomalies detecté et ajoute ces propres anomalies détecté à celle ci<br>
	 * Liste des Erreurs :<br>
	 * 8 : Pas double égal dans une condition mais un égal <br>
	 * 12 : Plus de sept actions à la suite <br>
	 * 15 : Informations dans une condition non consistante avec les autres conditions de la structure<br>
	 * 17 : Utilisation à mauvais escient d’une structure conditionnel
	 *
	 * @returns {Array<AnomalieConceptuelle>} La liste des anomalies déjà présentes + celle ajouté par la StructureSi
	 */
	rechercherAnomalies() {
		let mesAnomalies = [];
		//8
		if (ErreurSyntaxeComparaison.detecterAnomalie(this)) {
			mesAnomalies.push(new ErreurSyntaxeComparaison(this));
		}
		//12
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
		//15
		let informationsInconsistantesSi =
			AvertissementInformationsInconsistantesSi.detecterAnomalie(this);
		if (informationsInconsistantesSi[0]) {
			mesAnomalies.push(
				new AvertissementInformationsInconsistantesSi(
					this,
					informationsInconsistantesSi[1],
				),
			);
		}
		//17
		let structureInoptimale =
			AvertissementStructureInoptimale.detecterAnomalie(this);
		if (structureInoptimale[0]) {
			mesAnomalies.push(
				new AvertissementStructureInoptimale(
					this,
					structureInoptimale[1],
					structureInoptimale[2],
				),
			);
		}
		if (!informationsInconsistantesSi[0]) {
			let typesInconsistantsAlternatif =
				ErreurTypesInconsistantsAlternatif.detecterAnomalie(this);
			if (typesInconsistantsAlternatif[0]) {
				mesAnomalies.push(
					new ErreurTypesInconsistantsAlternatif(
						this,
						typesInconsistantsAlternatif[1],
						typesInconsistantsAlternatif[2],
					),
				);
			}
		}
		return super.rechercherAnomalies(mesAnomalies);
	}
}
window.customElements.define("structure-si-element", StructureSi);
