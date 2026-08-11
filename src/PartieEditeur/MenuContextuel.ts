import { classes } from "../runtime/classRegistry";
import { editeur, verbose } from "../runtime/runtime";

/**
 * @classdesc Le menu contextuel qui apparait lors d'un clic droit dans l'éditeur.
 * @description Crée une instance de MenuContextuel.
 * @class MenuContextuel
 * @extends {HTMLElement}
 */
export class MenuContextuel extends HTMLElement {
	// ATTRIBUTS
	_x; // Position x
	_y; // Position y
	_selection; // Selection
	_editeur = editeur; // Editeur
	_target;

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {number} x - La position x du menu.
	 * @param {number} y - La position y du menu.
	 * @param {Selection} selection - La sélection actuelle.
	 * @param {HTMLElement} target - L'élément cible du clic droit.
	 */
	constructor(x: number, y: number, selection: any, target: any) {
		super();
		// Supprimer tout menu contextuel déjà ouvert
		let menuContextuel = document.querySelectorAll("menu-contextuel");
		for (let i = 0; i < menuContextuel.length; i++) {
			menuContextuel[i].remove();
		}

		// Prendre en compte le zoom
		x = x / this._editeur._indicateurZoom._zoom;
		y = y / this._editeur._indicateurZoom._zoom;

		this._x = x;
		this._y = y;

		if (x > 90 / this._editeur._indicateurZoom._zoom) {
			x = 90 / this._editeur._indicateurZoom._zoom; // Empêcher le menu de déborder à droite
		}
		this.style.left = `calc(var(--sizeModifier) * ${x}vw)`;
		this.style.top = `calc(var(--sizeModifier) * ${y}vw)`;
		this.style.opacity = 0;
		this._selection = selection;
		this._target = target;
		this.genererOptions();

		setTimeout(() => {
			const rect = this.getBoundingClientRect();
			if (verbose) console.log(rect);
			if (rect.top + rect.height > window.innerHeight) {
				this.style.top = `calc(var(--sizeModifier) * ${y}vw - ${rect.height}px)`;
			}
			this.style.opacity = 1;
		});
	}

	/**
	 * @description Génère les options du menu contextuel en fonction de la cible et de la sélection.
	 */
	genererOptions() {
		if (
			this._target instanceof HTMLDivElement &&
			this._target.classList.contains("algorithmeBibliotheque")
		) {
			if (this._target.estCustom) {
				this.appendChild(
					new classes.ElementMenu("Supprimer de la bibliothèque", () => {
						if (verbose)
							console.log("Supprimer de la bibliothèque");
						this._target.supprimer();
						this.remove();
					}),
				);
				return;
			}
			this.appendChild(
				new classes.ElementMenu("Aucune action disponible.", () => {}),
			);
			return;
		}
		// Les options toujours disponibles
		this.appendChild(
			new classes.ElementMenuKeyboardTip(
				"Annuler",
				() => {
					if (verbose) console.log("Annuler");
					this._editeur.undo();
				},
				`${this._editeur._toucheMeta}Z`,
			),
		);

		this.appendChild(
			new classes.ElementMenuKeyboardTip(
				"Rétablir",
				() => {
					if (verbose) console.log("Rétablir");
					this._editeur.redo();
				},
				`${this._editeur._toucheMeta}Y`,
			),
		);

		if (this._selection.nbElementsSelectionnes >= 1) {
			this.appendChild(
				new classes.ElementMenuKeyboardTip(
					"Supprimer",
					() => {
						if (verbose) console.log("Supprimer l'élément");
						this._selection.supprimerTout();
						this.remove();
					},
					`Suppr`,
				),
			);

			this.appendChild(
				new classes.ElementMenuKeyboardTip(
					"Couper",
					() => {
						if (verbose) console.log("Couper");
						this._editeur.cut();
					},
					`${this._editeur._toucheMeta}X`,
				),
			);

			this.appendChild(
				new classes.ElementMenuKeyboardTip(
					"Copier",
					() => {
						if (verbose) console.log("Copier");
						this._editeur.copy();
					},
					`${this._editeur._toucheMeta}C`,
				),
			);
		}

		this.appendChild(
			new classes.ElementMenuKeyboardTip(
				"Coller",
				() => {
					if (verbose) console.log("Coller");
					this._editeur._modaleNoPaste.ouvrir();
				},
				`${this._editeur._toucheMeta}V`,
			),
		);

		/*
            Il y a 3 cas de figures:
            - Aucun élément n'est sélectionné, on affiche un menu pour ajouter un élément à l'espace de travail.
            - Un seul élément est sélectionné, on affiche un menu avec des options pour cet élément spécifique.
            - Plusieurs éléments sont sélectionnés, on affiche un menu avec des options pour ces éléments (donc des options communes).
        */
		if (this._selection.nbElementsSelectionnes == 0) {
			let ajouterElem = new classes.ElementMenuCompose(
				"Ajouter un élément",
				() => {
					if (verbose) console.log("Ajouter un élément");
				},
			);
			this.appendChild(ajouterElem);

			ajouterElem.ajouterElementMenu(
				new classes.ElementMenu("Problème", () => {
					if (verbose) console.log("Ajouter un Problème");
					this._editeur._planActif!.ajouterElement(
						classes.Probleme,
						this._x,
						this._y,
						true,
					);
					this.remove();
				}),
			);

			ajouterElem.ajouterElementMenu(
				new classes.ElementMenu("Procédure", () => {
					if (verbose) console.log("Ajouter une Procédure");
					this._editeur._planActif!.ajouterElement(
						classes.Procedure,
						this._x,
						this._y,
						true,
					);
					this.remove();
				}),
			);

			ajouterElem.ajouterElementMenu(
				new classes.ElementMenu("Structure 'SI'", () => {
					if (verbose) console.log("Ajouter une Structure 'SI'");
					this._editeur._planActif!.ajouterElement(
						classes.StructureSi,
						this._x,
						this._y,
						true,
					);
					this.remove();
				}),
			);

			ajouterElem.ajouterElementMenu(
				new classes.ElementMenu("Structure 'SWITCH'", () => {
					if (verbose) console.log("Ajouter une Structure 'SWITCH'");
					this._editeur._planActif!.ajouterElement(
						classes.StructureSwitch,
						this._x,
						this._y,
						true,
					);
					this.remove();
				}),
			);

			ajouterElem.ajouterElementMenu(
				new classes.ElementMenu("Structure itérative non bornée", () => {
					if (verbose)
						console.log(
							"Ajouter une Structure itérative non bornée",
						);
					this._editeur._planActif!.ajouterElement(
						classes.StructureIterativeNonBornee,
						this._x,
						this._y,
						true,
					);
					this.remove();
				}),
			);

			ajouterElem.ajouterElementMenu(
				new classes.ElementMenu("Structure itérative bornée", () => {
					if (verbose)
						console.log("Ajouter une Structure itérative bornée");
					let struc = this._editeur._planActif!.ajouterElement(
						classes.StructureIterativeBornee,
						this._x,
						this._y,
						true,
					);
					struc.inviteBornes();
					this._editeur
						.querySelector("invite-bornes-pour-si > input")!
						.focus();
					this.remove();
				}),
			);

			ajouterElem.ajouterElementMenu(
				new classes.ElementMenu("Instruction d'arrêt", () => {
					if (verbose) console.log("Ajouter une Condition de sortie");
					this._editeur._planActif!.ajouterElement(
						classes.ConditionSortie,
						this._x,
						this._y,
						true,
					);
					this.remove();
				}),
			);
		} else if (this._selection.nbElementsSelectionnes == 1) {
			let elem = this._selection._listeElementsSelectionnes[0]._element;
			if (verbose) console.log(elem);
			for (let optionContextuelle of elem.genererOptionsContextuelles(
				this._editeur,
			)) {
				this.appendChild(optionContextuelle);
			}
		}

		if (this._selection.nbElementsSelectionnes >= 1) {
			let exporter = new classes.ElementMenuCompose(
				"Exporter la sélection",
				() => {
					if (verbose) console.log("Exporter la sélection");
				},
			);
			this.appendChild(exporter);

			let sousTitreGénéral = document.createElement("h3");
			sousTitreGénéral.innerText = "Tout";
			exporter.ajouterElementMenu(sousTitreGénéral);

			exporter.ajouterElementMenu(
				new classes.ElementMenu(".json", () => {
					if (verbose) console.log("Exporter en .json");
					this._editeur.exporterJSON(this._editeur.copy(false));
				}),
			);

			let sousTitreAlgorithme = document.createElement("h3");
			sousTitreAlgorithme.innerText = "Algorithme";
			exporter.ajouterElementMenu(sousTitreAlgorithme);

			exporter.ajouterElementMenu(
				new classes.ElementMenu(".jpg", () => {
					if (verbose) console.log("Exporter en .jpg");
					this._editeur.exporterJPG(
						this._editeur.copy(false),
						true,
						true,
					);
				}),
			);

			exporter.ajouterElementMenu(
				new classes.ElementMenu(".png", () => {
					if (verbose) console.log("Exporter en .png");
					this._editeur.exporterPNG(
						this._editeur.copy(false),
						true,
						true,
					);
				}),
			);

			exporter.ajouterElementMenu(
				new classes.ElementMenu(".svg", () => {
					if (verbose) console.log("Exporter en .svg");
					this._editeur.exporterSVG(
						this._editeur.copy(false),
						true,
						true,
					);
				}),
			);

			let sousTitreDictionnaire = document.createElement("h3");
			sousTitreDictionnaire.innerText = "Dictionnaire";
			exporter.ajouterElementMenu(sousTitreDictionnaire);

			exporter.ajouterElementMenu(
				new classes.ElementMenu(".csv", () => {
					if (verbose) console.log("Exporter en .csv");
					// On retire du plan de travail tout ce qui n'est pas dans la sélection
					// On garde une trace des éléments à rerajouter
					let listeElemSup = [];

					for (let elem of this._editeur._planActif!.children) {
						if (
							!this._selection.estSelectionne(elem) &&
							elem != this &&
							elem instanceof classes.ElementGraphique
						) {
							listeElemSup.push(elem);
							elem.remove();
						}
					}

					// On effectue le dictionnaire
					this._editeur._planActif!.effectuerDictionnaireDesDonnee();

					// On exporte le dictionnaire
					this._editeur._planActif!.leDictionnaireDesDonnees.exporter(
						"csv",
					);

					// On remet les éléments retirés
					setTimeout(() => {
						for (let elem of listeElemSup) {
							this._editeur._planActif!.appendChild(elem);
						}
					}, 1000);
				}),
			);

			exporter.ajouterElementMenu(
				new classes.ElementMenu(".xls", () => {
					if (verbose) console.log("Exporter en .xls");
					// On retire du plan de travail tout ce qui n'est pas dans la sélection
					// On garde une trace des éléments à rerajouter
					let listeElemSup = [];

					for (let elem of this._editeur._planActif!.children) {
						if (
							!this._selection.estSelectionne(elem) &&
							elem != this &&
							elem instanceof classes.ElementGraphique
						) {
							listeElemSup.push(elem);
							elem.remove();
						}
					}

					// On effectue le dictionnaire
					this._editeur._planActif!.effectuerDictionnaireDesDonnee();

					// On exporte le dictionnaire
					this._editeur._planActif!.leDictionnaireDesDonnees.exporter(
						"xls",
					);

					// On remet les éléments retirés
					setTimeout(() => {
						for (let elem of listeElemSup) {
							this._editeur._planActif!.appendChild(elem);
						}
					}, 1000);
				}),
			);

			exporter.ajouterElementMenu(
				new classes.ElementMenu(".md", () => {
					if (verbose) console.log("Exporter en .md");
					// On retire du plan de travail tout ce qui n'est pas dans la sélection
					// On garde une trace des éléments à rerajouter
					let listeElemSup = [];

					for (let elem of this._editeur._planActif!.children) {
						if (
							!this._selection.estSelectionne(elem) &&
							elem != this &&
							elem instanceof classes.ElementGraphique
						) {
							listeElemSup.push(elem);
							elem.remove();
						}
					}

					// On effectue le dictionnaire
					this._editeur._planActif!.effectuerDictionnaireDesDonnee();

					// On exporte le dictionnaire
					this._editeur._planActif!.leDictionnaireDesDonnees.exporter(
						"md",
					);

					// On remet les éléments retirés
					setTimeout(() => {
						for (let elem of listeElemSup) {
							this._editeur._planActif!.appendChild(elem);
						}
					}, 1000);
				}),
			);

			this.appendChild(
				new classes.ElementMenu("Ajouter à la bibliothèque", () => {
					if (verbose)
						console.log("Ajouter à la bibliothèque custom");
					// On récupère le JSON des éléments sélectionnés
					let json = this._editeur.copy(false);

					// On crée une InviteNouvelleBibliotheque
					let invite = new classes.InviteNouvelleBibliotheque(json);

					// On l'ajoute à l'éditeur
					this._editeur.appendChild(invite);
				}),
			);

			this.appendChild(
				new classes.ElementMenu("Aligner la sélection ici", () => {
					if (verbose) {
						console.log("Aligner la sélection ici");
						console.log("target", this._target);
					}
					// On aligne le y de tous les éléments sélectionnés sur les coordonnées de la target

					// On trouve à quel ElementGraphique correspond la target
					// La première node parente de la target qui est un ElementGraphique est l'ElementGraphique correspondant
					let target = this._target;
					while (!(target instanceof classes.ElementGraphique)) {
						if (target.parentNode == null) {
							break;
						}
						target = target.parentNode;
					}

					const eventDeplacementMultiples =
						new classes.EvenementDeplacementElementMultiples();

					// On récupère les éléments sélectionnés
					const selections =
						this._selection._listeElementsSelectionnes;

					selections.forEach((selection: { _element: { _ordonnee: any; setPosition: () => void; }; update: () => void; }) => {
						const evenementDeplacement =
							new classes.EvenementDeplacementElement(selection._element);

						selection._element._ordonnee = target._ordonnee;
						selection._element.setPosition();
						selection.update();

						evenementDeplacement.ajouterNouvellePos();
						eventDeplacementMultiples.ajouterElementDeplace(
							evenementDeplacement,
						);
					});

					this._editeur.ajouterEvenement(eventDeplacementMultiples);

					this._selection.update();
				}),
			);
		}
	}
}
