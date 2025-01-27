/**
 * @class Editeur
 * @classdesc La classe Editeur est l'interface de notre éditeur, elle permet de créer des éléments graphiques et de les manipuler.<br>
 * @description Est utilisé pour instancier l'Éditeur (il ne doit y en avoir qu'un).<br>
 * @extends {HTMLElement}
 */
class Editeur extends HTMLElement {
	// ATTRIBUTS
	_logoAlgoForge = null;
	_themeSelect = null;
	_indicateurZoom = new IndicateurZoom();
	_currentTool = -1;
	_listeTools = [];
	_typesElements = [];
	_boutonPointeur = null;
	_undoButton = null;
	_redoButton = null;
	_pointePrecedementLien = null;
	_menuDeroulantFichier = null;
	_menuDeroulantEdition = null;
	_menuDeroulantAide = null;
	_espacePrincipal = null;
	_planActif = null;
	_selection = new Selection();
	_selectionRectangle = new SelectionRectangle();
	_coordonneesSelection = { x: 0, y: 0 };
	_isSelecting = false;
	_isDragging = false;
	_isMoving = false;
	_offsetX = 0;
	_offsetY = 0;
	_lastPosX = 0;
	_lastPosY = 0;
	_ancienPlusProche = null;
	MAX_CHAR_TITRE = 64;
	_barreOutilHorizontale = null;

	_curMousePos = { x: 0, y: 0 };

	_toucheMeta;

	_dictionnaireDesDonnees = new DictionnaireDonnee();
	_bibliotheque = new Bibliotheque();
	_modaleRaccourcisClavier;
	_modaleAPropos;
	_modaleNoPaste;
	_modaleNonImp;

	_pileAnnuler = []; // Pile pour les annulations de type Array<EvenementEditeur>
	_pileRétablir = []; // Pile pour les rétablissements de type Array<EvenementEditeur>

	_transferForm = document.getElementById("transferForm");
	_transferInput = document.getElementById("corpAlgo");
	_transferNomFichier = document.getElementById("nomFichier");

	/**
	 * @constructor
	 * Initialise l'éditeur et configure les événements et les éléments de l'interface utilisateur.
	 */
	constructor() {
		super();

		// Détection de la touche "Meta" (Cmd sur Mac, Ctrl sur Windows, Linux)
		if (
			window.navigator.userAgent.match(/(Mac|Windows|Linux)/)[0] === "Mac"
		) {
			this._toucheMeta = "⌘";
		} else {
			this._toucheMeta = "Ctrl + ";
		}

		fetch("modales/shortcuts.html").then((response) => {
			response.text().then((text) => {
				// Formater le texte pour remplacer les instances de '{metakey}' par la touche Meta
				text = text.replaceAll("{metakey}", this._toucheMeta);
				this._modaleRaccourcisClavier = new FenetreModale(text);
				this.appendChild(this._modaleRaccourcisClavier);
			});
		});

		fetch("modales/about.html").then((response) => {
			response.text().then((text) => {
				this._modaleAPropos = new FenetreModale(text);
				this.appendChild(this._modaleAPropos);
			});
		});

		fetch("modales/nopaste.html").then((response) => {
			response.text().then((text) => {
				text = text.replaceAll("{metakey}", this._toucheMeta);
				this._modaleNoPaste = new FenetreModale(text);
				this.appendChild(this._modaleNoPaste);
			});
		});

		fetch("modales/notimplemented.html").then((response) => {
			response.text().then((text) => {
				this._modaleNonImp = new FenetreModale(text);
				this.appendChild(this._modaleNonImp);
			});
		});

		window.addEventListener("beforeunload", (e) => {
			if (
				(this._pileAnnuler.length > 0 ||
					this._pileRétablir.length > 0) &&
				!isElectron
			) {
				// Cancel the event
				e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
				// Chrome requires returnValue to be set
				e.returnValue = "Attention";
				return "Attention";
			}
		});

		// Référencement des types d'éléments que l'on peut créer
		this._typesElements.push(Lien);
		this._typesElements.push(Probleme);
		this._typesElements.push(Procedure);
		this._typesElements.push(StructureSi);
		this._typesElements.push(StructureSwitch);
		this._typesElements.push(StructureIterativeNonBornee);
		this._typesElements.push(StructureIterativeBornee);
		this._typesElements.push(ConditionSortie);

		// Référencement des éléments d'interface
		this._espacePrincipal = document.querySelector("#espacePrincipal");
		this._espacePrincipal.appendChild(this._selection);
		this._espacePrincipal.appendChild(this._selectionRectangle);
		this._selectionRectangle.placer(-10, 0, -10, 0);
		this._planActif = this._espacePrincipal;

		this._logoAlgoForge = document.querySelector("#logoAlgoForge");
		this._themeSelect = document.querySelector("select#theme");
		document
			.getElementById("biblio_wrapper")
			.appendChild(this._bibliotheque);
		document
			.getElementById("dico_wrapper")
			.appendChild(this._dictionnaireDesDonnees);
		this._barreOutilHorizontale = document.querySelector("#actionsControl");
		this._barreOutilHorizontale.appendChild(this._indicateurZoom);

		this._boutonPointeur = document.querySelector("#boutonPointeur");

		this._listeTools.push(document.querySelector("#boutonLien"));
		this._listeTools.push(document.querySelector("#boutonProbleme"));
		this._listeTools.push(document.querySelector("#boutonProcedure"));
		this._listeTools.push(document.querySelector("#boutonStructureSi"));
		this._listeTools.push(document.querySelector("#boutonStructureSwitch"));
		this._listeTools.push(
			document.querySelector("#boutonStructureIterative"),
		);
		this._listeTools.push(
			document.querySelector("#boutonStructureIterativeBornee"),
		);
		this._listeTools.push(document.querySelector("#boutonConditionSortie"));

		this._undoButton = document.querySelector("#boutonUndo");
		this._redoButton = document.querySelector("#boutonRedo");

		this._menuDeroulantFichier = document.querySelector(
			"#menuDeroulantFichier",
		);
		this._menuDeroulantEdition = document.querySelector(
			"#menuDeroulantEdition",
		);
		this._menuDeroulantAide = document.querySelector("#menuDeroulantAide");

		this.querySelector("#titreAlgo").addEventListener("input", (event) => {
			// Update le titre de l'onglet
			document.title = "Algoforge - " + event.target.innerText;
		});

		setTimeout(() => {
			document.title =
				"Algoforge - " + this.querySelector("#titreAlgo").innerText;
		}, 1000);

		this.querySelector("#titreAlgo").addEventListener(
			"keydown",
			(event) => {
				// On vérifie si la touche appuyée est "Entrée"
				if (event.key === "Enter") {
					// On l'empêche pour éviter le saut de ligne, qui casse le design
					event.preventDefault();

					// On enlève le focus de l'élément pour que le titre soit bien enregistré
					event.target.blur();

					// Petite animation sur le crayon
					event.target.nextElementSibling.classList.add("rotate");
					event.target.nextElementSibling.classList.add(
						"move-right-2",
					);
					setTimeout(() => {
						event.target.nextElementSibling.classList.remove(
							"rotate",
						);
						event.target.nextElementSibling.classList.remove(
							"move-right-2",
						);
					}, 500);
				}

				if (verbose)
					console.log(
						`Le titre contient ${event.target.innerText.length} caractères sur ${this.MAX_CHAR_TITRE} autorisés.`,
					);
				// On vérifie si il y a trop de caractères
				if (
					event.target.innerText.length >= this.MAX_CHAR_TITRE &&
					event.key !== "Backspace" &&
					event.key !== "Delete"
				) {
					if (verbose) console.log("Trop de caractères");
					// On empêche l'ajout de caractères
					event.preventDefault();
				}
			},
		);

		this.querySelector("#titreAlgo").nextElementSibling.addEventListener(
			"click",
			(event) => {
				// On met le focus sur le titre
				event.target.previousElementSibling.focus();
			},
		);

		// Ajouter les options de thème
		this._themeSelect.appendChild(
			new ThemeEditeur(
				"Thème Pacifique", // nom
				"#F2F5F8", // bgColor
				"#E5EAF0", // bgColorSecondary
				"#BECBDA", // borderColor
				"#0C3245", // fgColor
				"#BECBDA55", // fgColorSemiTransparent
				"#BECBDA11", // fgColorTransparent
				"#33475C", // fgColorForward
				"#8ABE5E", // goodColor
				"#8ABE5E99", // goodColorTransparent
				"#D85959", // errorColor
				"#FFAD5A", // warningColor
				"#1C719C", // titleColor
				"Roboto, sans-serif", // fontFamily
				"", // glowColor
				"#bdc6c9", // borderColor2
				"#F2F5F870", // bgColorTertiary
				"#134D67", // fgColorHover
				"#7E7D73", // fgColorDisabled
				211, // baseGlowColor
			),
		);

		this._themeSelect.appendChild(
			new ThemeEditeur(
				"Thème AlgoForge", // nom
				"#161e27", // bgColor
				"#0f141a", // bgColorSecondary
				"#838787", // borderColor
				"#F2FBFF", // fgColor
				"#83878755", // fgColorSemiTransparent
				"#83878711", // fgColorTransparent
				"#A6AAA9", // fgColorForward
				"#D4E7C5", // goodColor
				"#D4E7C599", // goodColorTransparent
				"#FFA8A8", // errorColor
				"#FFD6AD", // warningColor
				"#34A5DA", // titleColor
				"Roboto, sans-serif", // fontFamily
				"", // glowColor
				"#1f2b38", // borderColor2
				"rgba(28,39,51,0.35)", // bgColorTertiary
				"#bdc6c9", // fgColorHover
				"rgba(166, 170, 169, .6)", // fgColorDisabled
				225, // baseGlowColor
			),
		);

		this._themeSelect.appendChild(
			new ThemeEditeur(
				"Thème FlashBang", // nom
				"#FFFFFF", // bgColor
				"#FFFFFF", // bgColorSecondary
				"#000000", // borderColor
				"#000000", // fgColor
				"#00000055", // fgColorSemiTransparent
				"#00000011", // fgColorTransparent
				"#000000", // fgColorForward
				"#00FF00", // goodColor
				"#00FF0099", // goodColorTransparent
				"#FF0000", // errorColor
				"#FFA300", // warningColor
				"#000000", // titleColor
				"Roboto, sans-serif", // fontFamily
				"", // glowColor
				"#000000", // borderColor2
				"#FFFFFF", // bgColorTertiary
				"#888888", // fgColorHover
				"#666666", // fgColorDisabled
				0, // baseGlowColor
			),
		);

		// Gestion des événements de thème
		this._themeSelect.addEventListener("change", () => {
			let theme =
				this._themeSelect.options[this._themeSelect.selectedIndex];
			theme.appliquer();
		});

		let theme = this.getCookie("theme");
		if (theme) {
			this._themeSelect.value = theme;
		} else {
			this._themeSelect.selectedIndex = 0;
		}
		try {
			this._themeSelect.options[
				this._themeSelect.selectedIndex
			].appliquer();
		} catch (error) {
			console.error("Le thème n'a pas pu être appliqué.");
			this._themeSelect.options[0].appliquer();
		}

		// Ajout des éléments de menu
		// Fichier
		this._menuDeroulantFichier.ajouterElementMenu(
			new ElementMenu("Nouveau", () => {
				console.log("Nouveau");
				// On ouvre un nouvel onglet avec un éditeur vide
				window.open(window.location.href, "_blank");
			}),
		);
		this._menuDeroulantFichier.ajouterElementMenu(
			new ElementMenu("Ouvrir", () => {
				console.log("Ouvrir");
				// On importe
				// On crée un input de type file pour que l'utilisateur puisse choisir un fichier
				var fileInput = document.createElement("input");
				fileInput.type = "file";
				fileInput.accept = ".json";
				fileInput.style.display = "none";
				fileInput.addEventListener("change", () => {
					var reader = new FileReader();
					reader.onload = () => {
						try {
							let nomFichier = fileInput.files[0].name;
							if (verbose) console.log(fileInput.files[0].size);
							if (fileInput.files[0].size > 5000000) {
								alert(
									"Le fichier est trop volumineux (maximum 5 MégaOctets).",
								);
								return;
							}
							if (
								nomFichier.substring(nomFichier.length - 5) !==
								".json"
							) {
								alert("Le fichier doit être au format .json.");
								return;
							}
							// On retire l'extension
							nomFichier = nomFichier.substring(
								0,
								nomFichier.length - 5,
							);
							this._transferInput.value = JSON.stringify(
								reader.result,
							);
							this._transferNomFichier.value = nomFichier;
							this._transferForm.submit();
						} catch (error) {
							alert(
								"Le fichier n'a pas été chargé correctement.",
							);
							console.error(error);
						}
					};
					reader.readAsText(fileInput.files[0]);
				});
				fileInput.click();
			}),
		);
		this._menuDeroulantFichier.ajouterElementMenu(
			new ElementMenu("Créer une copie", () => {
				console.log("Créer une copie");
				// On post le contenu de l'éditeur actuel dans un nouvel onglet
				this._transferInput.value = JSON.stringify(
					this._espacePrincipal.exporterEnJSON(),
				);
				this._transferNomFichier.value =
					this.querySelector("#titreAlgo").innerText + " - copie";
				this._transferForm.submit();
			}),
		);
		this._menuDeroulantFichier.ajouterElementMenu(
			new ElementMenu(
				"Partager",
				() => {
					console.log("Partager");
					this._modaleNonImp.ouvrir();
				},
				false,
			),
		);
		this._menuDeroulantFichier.ajouterElementMenu(
			new ElementMenu("Renommer", () => {
				if (verbose) console.log("Renommer");
				let titre = this.querySelector("#titreAlgo");
				// On met le focus sur le titre
				titre.focus();

				// On referme le menu en persuadant le navigateur que l'utilisateur n'a plus la souris dessus
				this._menuDeroulantFichier.style.display = "none";
				setTimeout(() => {
					this._menuDeroulantFichier.style.display = "";
				}, 2);

				// Et on sélectionne tout le texte sans execCommand car il est déprécié
				let range = document.createRange();
				range.selectNodeContents(titre);
				let selection = window.getSelection();
				selection.removeAllRanges();

				selection.addRange(range);
			}),
		);
		let exporter = new ElementMenuCompose("Exporter", () => {
			console.log("Exporter");
		});
		this._menuDeroulantFichier.ajouterElementMenu(exporter);

		let sousTitreGénéral = document.createElement("h3");
		sousTitreGénéral.innerText = "Tout";
		exporter.ajouterElementMenu(sousTitreGénéral);

		exporter.ajouterElementMenu(
			new ElementMenu(".json", () => {
				console.log("Exporter en .json");
				this.exporterJSON(
					JSON.stringify(this._espacePrincipal.exporterEnJSON()),
				);
			}),
		);

		let sousTitreAlgorithme = document.createElement("h3");
		sousTitreAlgorithme.innerText = "Algorithme";
		exporter.ajouterElementMenu(sousTitreAlgorithme);

		exporter.ajouterElementMenu(
			new ElementMenu(
				".png",
				() => {
					console.log("Exporter en .png");
					const plansTravail = this.querySelectorAll("plan-travail");
					const sousPlansTravail =
						this.querySelectorAll("sous-plan-travail");

					const allPlansTravail = Array.from(plansTravail).concat(
						Array.from(sousPlansTravail),
					);

					allPlansTravail.forEach((planTravail, index) => {
						setTimeout(() => {
							this.exporterPNG(planTravail);
						}, index * 1500);
					});
				},
				true,
			),
		);

		exporter.ajouterElementMenu(
			new ElementMenu(
				".jpg",
				() => {
					console.log("Exporter en .jpg");
					const plansTravail = this.querySelectorAll("plan-travail");
					const sousPlansTravail =
						this.querySelectorAll("sous-plan-travail");

					const allPlansTravail = Array.from(plansTravail).concat(
						Array.from(sousPlansTravail),
					);

					allPlansTravail.forEach((planTravail, index) => {
						setTimeout(() => {
							this.exporterJPG(planTravail);
						}, index * 1500);
					});
				},
				true,
			),
		);

		exporter.ajouterElementMenu(
			new ElementMenu(".svg", () => {
				console.log("Exporter en .svg");
				this.exporterSVG(this._planActif);
			}),
		);

		exporter.ajouterElementMenu(
			new ElementMenu(".pdf", () => {
				window.print();
			}),
		);

		let sousTitreDictionnaire = document.createElement("h3");
		sousTitreDictionnaire.innerText = "Dictionnaire";
		exporter.ajouterElementMenu(sousTitreDictionnaire);

		exporter.ajouterElementMenu(
			new ElementMenu(".xls", () => {
				console.log("Exporter en .xls");
				this._dictionnaireDesDonnees.exporter("xls");
			}),
		);

		exporter.ajouterElementMenu(
			new ElementMenu(".csv", () => {
				console.log("Exporter en .csv");
				this._dictionnaireDesDonnees.exporter("csv");
			}),
		);

		exporter.ajouterElementMenu(
			new ElementMenu(".md", () => {
				console.log("Exporter en .md");
				this._dictionnaireDesDonnees.exporter("md");
			}),
		);

		this._menuDeroulantFichier.ajouterElementMenu(
			new ElementMenu(
				"Supprimer",
				() => {
					console.log("Supprimer");
					this._modaleNonImp.ouvrir();
				},
				false,
			),
		);

		// Edition
		this._menuDeroulantEdition.ajouterElementMenu(
			new ElementMenu("Importer", () => {
				console.log("Importer");
				this.importerJSON();
			}),
		);

		this._menuDeroulantEdition.ajouterElementMenu(
			new ElementMenuKeyboardTip(
				"Annuler",
				() => {
					console.log("Annuler");
					this.undo();
				},
				`${this._toucheMeta}Z`,
			),
		);

		this._menuDeroulantEdition.ajouterElementMenu(
			new ElementMenuKeyboardTip(
				"Rétablir",
				() => {
					console.log("Rétablir");
					this.redo();
				},
				`${this._toucheMeta}Y`,
			),
		);

		this._menuDeroulantEdition.ajouterElementMenu(
			new ElementMenuKeyboardTip(
				"Couper",
				() => {
					console.log("Couper");
					this.cut();
				},
				`${this._toucheMeta}X`,
			),
		);

		this._menuDeroulantEdition.ajouterElementMenu(
			new ElementMenuKeyboardTip(
				"Copier",
				() => {
					console.log("Copier");
					this.copy();
				},
				`${this._toucheMeta}C`,
			),
		);

		this._menuDeroulantEdition.ajouterElementMenu(
			new ElementMenuKeyboardTip(
				"Coller",
				() => {
					console.log("Coller");
					this._modaleNoPaste.ouvrir();
				},
				`${this._toucheMeta}V`,
			),
		);

		this._menuDeroulantEdition.ajouterElementMenu(
			new ElementMenuKeyboardTip(
				"Sélectionner tout",
				() => {
					console.log("Sélectionner tout");
					this.selectAll();
				},
				`${this._toucheMeta}A`,
			),
		);

		this._menuDeroulantEdition.ajouterElementMenu(
			new ElementMenuKeyboardTip(
				"Supprimer",
				() => {
					console.log("Supprimer");
					this.delete();
				},
				`Suppr / ${this._toucheMeta}⌫`,
			),
		);

		this._menuDeroulantEdition.ajouterElementMenu(
			new ElementMenuKeyboardTip(
				"Rechercher",
				() => {
					console.log("Rechercher");
					// this.search();
					this._modaleNonImp.ouvrir();
				},
				`${this._toucheMeta}F`,
				false,
			),
		);

		// Aide
		this._menuDeroulantAide.ajouterElementMenu(
			new ElementMenu(
				"Tutoriels",
				() => {
					console.log("Tutoriels");
					this._modaleNonImp.ouvrir();
				},
				false,
			),
		);

		this._menuDeroulantAide.ajouterElementMenu(
			new ElementMenu("Raccourcis clavier", () => {
				console.log("Raccourcis clavier");
				this._modaleRaccourcisClavier.ouvrir();
			}),
		);

		this._menuDeroulantAide.ajouterElementMenu(
			new ElementMenu("À propos", () => {
				console.log("À propos");
				this._modaleAPropos.ouvrir();
			}),
		);

		// Gestion des événements de l'interface
		this._listeTools.forEach((tool, index) => {
			tool.addEventListener("click", () => {
				this.selectTool(index);
			});
		});

		this._undoButton.addEventListener("click", () => {
			this.undo();
		});

		this._redoButton.addEventListener("click", () => {
			this.redo();
		});

		this._boutonPointeur.addEventListener("click", () => {
			this.selectTool(-1);
		});

		// Gestion des raccourcis clavier
		document.body.addEventListener("keydown", (e) => {
			if (verbose) console.log(e);
			if (e.key === "Delete") {
				// Suppr
				e.preventDefault();
				this.delete();
			}

			// Contrôle de la sélection avec les flèches
			// vérifier si le curseur de l'utilisateur est dans un champ de texte
			if (!document.activeElement.isContentEditable) {
				switch (e.key) {
					case "ArrowUp":
						this._selection.moveAllSelectedElements(0, -1);
						e.preventDefault();
						break;
					case "ArrowDown":
						this._selection.moveAllSelectedElements(0, 1);
						e.preventDefault();
						break;
					case "ArrowLeft":
						this._selection.moveAllSelectedElements(-1, 0);
						e.preventDefault();
						break;
					case "ArrowRight":
						this._selection.moveAllSelectedElements(1, 0);
						e.preventDefault();
						break;
				}
			}
			if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
				// Raccourcis clavier en Ctrl + ... pour les outils
				switch (e.key) {
					case "@":
					case "²":
						// Ctrl + @ / ²
						e.preventDefault();
						this.selectTool(-1);
						break;
					case "1":
						// Ctrl + 1
						e.preventDefault();
						this.selectTool(0);
						break;
					case "2":
						// Ctrl + 2
						e.preventDefault();
						this.selectTool(1);
						break;
					case "3":
						// Ctrl + 3
						e.preventDefault();
						this.selectTool(2);
						break;
					case "4":
						// Ctrl + 4
						e.preventDefault();
						this.selectTool(3);
						break;
					case "5":
						// Ctrl + 5
						e.preventDefault();
						console.warn("TEST5");
						this.selectTool(4);
						break;
					case "6":
					case "§":
						// Ctrl + 6 / §
						e.preventDefault();
						console.warn("TEST");
						this.selectTool(5);
						break;
					case "7":
						// Ctrl + 7
						e.preventDefault();
						this.selectTool(6);
						break;
					case "8":
						// Ctrl + 8
						e.preventDefault();
						this.selectTool(7);
						break;
					default:
						break;
				}

				// Raccourcis clavier en Ctrl + ... pour l'édition
				if (e.key.toLowerCase() === "z") {
					// Ctrl + Z
					e.preventDefault();
					this.undo();
				}
				if (e.key.toLowerCase() === "y") {
					// Ctrl + Y
					e.preventDefault();
					this.redo();
				}
				if (e.key.toLowerCase() === "x") {
					// Ctrl + X
					e.preventDefault();
					this.cut();
				}
				if (e.key.toLowerCase() === "c") {
					// Ctrl + C
					console.log("Ctrl + C", window.getSelection().toString());
					if (window.getSelection().toString().length == 0) {
						e.preventDefault();
						this.copy();
					}
				}
				if (e.key.toLowerCase() === "a") {
					// Ctrl + A
					if (document.activeElement.isContentEditable) return;
					e.preventDefault();
					this.selectAll();
				}
				if (e.key === "Backspace" || e.key === "Delete") {
					// Suppr
					e.preventDefault();
					this.delete();
				}
				if (e.key.toLowerCase() === "f") {
					// Ctrl + F
					e.preventDefault();
					this.search();
				}

				// Gestion du zoom
				if (e.key === "+" || e.key === "=") {
					// Ctrl + +
					e.preventDefault();
					this._indicateurZoom.zoomIn();
				}
				if (e.key === "-") {
					// Ctrl + -
					e.preventDefault();
					this._indicateurZoom.zoomOut();
				}
			}
		});

		document.body.addEventListener("wheel", (e) => {
			if (e.ctrlKey || e.metaKey) {
				e.preventDefault();
				if (e.deltaY < 0) {
					this._indicateurZoom.zoomIn(0.01, false);
				} else {
					this._indicateurZoom.zoomOut(0.01, false);
				}
			}
		});

		this.addEventListener("dragover", (event) => {
			event.stopPropagation();
			event.preventDefault();
		});

		this.addEventListener("drop", (event) => {
			event.stopPropagation();
			event.preventDefault();

			try {
				const data = event.dataTransfer.getData("application/json");
				if (verbose) console.log("Dropped:", data);

				var parsedData = JSON.parse(data);

				if (verbose)
					console.log(
						`parsedData: ${parsedData} et typeof parsedData: ${typeof parsedData}`,
					);

				this._curMousePos = {
					x:
						((event.clientX / window.innerWidth) * 100) /
						this._indicateurZoom._zoom,
					y:
						((event.clientY / window.innerWidth) * 100) /
						this._indicateurZoom._zoom,
				}; // En vw

				// Ajouter les coordonnées de la souris
				const offsetYPlanTravailVW = 6; // En vw
				const appliquerDecalage = (elem) => {
					if (verbose)
						console.log(
							`parseFloat(elem.abscisse) + this._curMousePos.x + "vw" = ${parseFloat(
								elem.abscisse,
							)} + ${this._curMousePos.x} + "vw"
                            = ${
								parseFloat(elem.abscisse) +
								this._curMousePos.x +
								"vw"
							}`,
						);
					if (verbose)
						console.log(
							`parseFloat(elem.ordonnee) + this._curMousePos.y + "vw" = ${parseFloat(
								elem.ordonnee,
							)} + ${this._curMousePos.y} + "vw"
                            = ${
								parseFloat(elem.ordonnee) +
								this._curMousePos.y +
								"vw"
							}`,
						);
					elem.abscisse =
						parseFloat(elem.abscisse) + this._curMousePos.x + "vw";
					elem.ordonnee =
						parseFloat(elem.ordonnee) +
						this._curMousePos.y -
						offsetYPlanTravailVW +
						"vw";
					if (elem.enfants) {
						elem.enfants.forEach((enfant) => {
							appliquerDecalage(enfant);
						});
					}

					if (
						elem.typeElement == "StructureSi" ||
						elem.typeElement == "StructureIterative"
					) {
						for (let condition of elem.conditions) {
							condition.enfants.forEach((enfant) => {
								appliquerDecalage(enfant);
							});
						}
					}
				};

				parsedData.forEach((elem) => {
					appliquerDecalage(elem);
				});

				this.chargerDepuisJSON(parsedData);
			} catch (error) {
				console.error("Le fichier n'a pas été chargé correctement.");
				console.error(error);
			}
		});

		this.addEventListener("paste", (e) => {
			e.stopPropagation();
			if (verbose) console.log(e);
			if (verbose) console.log(e.clipboardData.getData("text/plain"));
			try {
				var parsedData = JSON.parse(
					e.clipboardData.getData("text/plain"),
				);

				// Ajouter les coordonnées de la souris
				const offsetYPlanTravailVW = 6; // En vw
				const appliquerDecalage = (elem) => {
					if (verbose)
						console.log(
							`parseFloat(elem.abscisse) + this._curMousePos.x + "vw" = ${parseFloat(
								elem.abscisse,
							)} + ${this._curMousePos.x} + "vw"
                            = ${
								parseFloat(elem.abscisse) +
								this._curMousePos.x +
								"vw"
							}`,
						);
					if (verbose)
						console.log(
							`parseFloat(elem.ordonnee) + this._curMousePos.y + "vw" = ${parseFloat(
								elem.ordonnee,
							)} + ${this._curMousePos.y} + "vw"
                            = ${
								parseFloat(elem.ordonnee) +
								this._curMousePos.y +
								"vw"
							}`,
						);
					elem.abscisse =
						parseFloat(elem.abscisse) + this._curMousePos.x + "vw";
					elem.ordonnee =
						parseFloat(elem.ordonnee) +
						this._curMousePos.y -
						offsetYPlanTravailVW +
						"vw";
					if (elem.enfants) {
						elem.enfants.forEach((enfant) => {
							appliquerDecalage(enfant);
						});
					}

					if (
						elem.typeElement == "StructureSi" ||
						elem.typeElement == "StructureIterative"
					) {
						for (let condition of elem.conditions) {
							condition.enfants.forEach((enfant) => {
								appliquerDecalage(enfant);
							});
						}
					}
				};

				parsedData.forEach((elem) => {
					appliquerDecalage(elem);
				});

				this.chargerDepuisJSON(parsedData);
			} catch (error) {
				console.error("Le fichier n'a pas été chargé correctement.");
				console.error(error);
			}
		});

		// Gestion des clics sur l'éditeur
		this.addEventListener("click", (e) => {
			e.stopPropagation();

			// On supprime un éventuel menu contextuel
			let menuContextuel = document.querySelectorAll("menu-contextuel");
			for (let i = 0; i < menuContextuel.length; i++) {
				menuContextuel[i].remove();
			}

			if (this._currentTool == null) {
				return;
			}
			if (verbose) console.log(e);
			// Remonter le DOM depuis e.target pour obtenir un élément utilisable
			let maTarget = e.target;
			// if (e.target.id === "espacePrincipal_wrapper") {
			// 	maTarget = document.getElementById("espacePrincipal");
			// } else { maTarget = e.target; }

			// Gestion des clics  sur des éléments qui ne doivent pas être ciblés
			if (e.target.classList.contains("nonCiblable")) {
				return;
			}
			while (
				!(maTarget instanceof ElementGraphique) &&
				!(maTarget instanceof PlanTravail) &&
				!(maTarget instanceof Condition) &&
				maTarget !== null
			) {
				maTarget = maTarget.parentElement;
				if (maTarget === null) {
					return;
				}
				// Gestion des clics  sur des éléments qui ne doivent pas être ciblés
				if (verbose) console.log(maTarget);
				if (verbose) console.log(maTarget.classList);
				if (verbose)
					console.log(maTarget.classList.contains("nonCiblable"));
				if (maTarget.classList.contains("nonCiblable")) {
					return;
				}
			}
			if (verbose) console.log(maTarget);
			if (maTarget instanceof PlanTravail) {
				console.log("Clic sur le plan de travail");
				if (verbose)
					console.log(
						"currentTool = " +
							this._currentTool +
							" et typesElements.length = " +
							this._typesElements.length,
					);
				if (
					this._currentTool !== null &&
					this._currentTool < this._typesElements.length &&
					this._currentTool >= 0
				) {
					let element = this._typesElements[this._currentTool];
					if (verbose)
						console.log(
							"Création d'un élément de type " + element.name,
						);
					let elemPose = maTarget.ajouterElement(
						element,
						e.offsetX,
						e.offsetY,
						false,
					);
					if (elemPose instanceof StructureIterativeBornee) {
						elemPose.inviteBornes();
						this.querySelector(
							"invite-bornes-pour-si > input",
						).focus();
					}
				}
				if (this._currentTool === 0) {
					if (verbose)
						console.log(
							"Clic sur le plan de travail avec l'outil lien",
						);
					if (this._pointePrecedementLien !== null) {
						this._pointePrecedementLien.classList.remove(
							"pointePourLien",
						);
						this._pointePrecedementLien = null;
					}
				}
			} else if (
				maTarget instanceof ElementGraphique ||
				maTarget instanceof Condition
			) {
				//console.log("Clic sur un élément graphique");
				if (this._currentTool === 0) {
					if (this._pointePrecedementLien === null) {
						if (verbose)
							console.log(
								"Premier clic sur un élément, on le pointe sil peut être décomposé",
							);
						if (maTarget.peutEtreDecompose()) {
							this._pointePrecedementLien = maTarget;
							maTarget.classList.add("pointePourLien");
							if (verbose)
								console.log(
									"On pointe l'élément " +
										this._pointePrecedementLien.constructor
											.name,
								);
						}
					} else {
						if (this._pointePrecedementLien == maTarget) {
							// Les éléments sont les mêmes, on ne fait rien
							this._pointePrecedementLien.classList.remove(
								"pointePourLien",
							);
							this._pointePrecedementLien = null;
						} else {
							// Les éléments sont différents, la connexion peut être faite
							// Si l'élément pointé précédemment est au dessus de l'élément pointé actuellement, il sera père de la relation
							if (verbose)
								console.log(
									`this._pointePrecedementLien._ordonnee=${this._pointePrecedementLien._ordonnee} et maTarget._ordonnee=${maTarget._ordonnee}`,
								);
							let parentRelation, enfantRelation;
							if (
								parseFloat(
									this._pointePrecedementLien._ordonnee,
								) < parseFloat(maTarget._ordonnee)
							) {
								parentRelation = this._pointePrecedementLien;
								enfantRelation = maTarget;
							} else {
								parentRelation = maTarget;
								enfantRelation = this._pointePrecedementLien;
							}

							// On crée la relation
							// Si le fils est une condition, le lien doit se faire avec sa structure
							if (enfantRelation instanceof Condition) {
								enfantRelation = enfantRelation._structure;
							}

							// On crée le lien
							parentRelation._elemParent.lierEnfant(
								enfantRelation,
							);

							if (!e.shiftKey) {
								this._pointePrecedementLien.classList.remove(
									"pointePourLien",
								);
								this._pointePrecedementLien = null;
							}
						}
					}
				}
			}
		});

		this.addEventListener("mousedown", function (e) {
			e.stopPropagation();
			let maTarget = e.target;

			// if (e.target.id === "espacePrincipal_wrapper") {
			// 	maTarget = document.getElementById("espacePrincipal");
			// } else { maTarget = e.target; }

			// Sur un click molette, on active le déplacement
			if (e.button === 1) {
				e.preventDefault();
				this._isMoving = true;
				_lastPosX = e.clientX;
				_lastPosY = e.clientY;
				return;
			}

			while (
				!(maTarget instanceof ElementGraphique) &&
				!(maTarget instanceof PlanTravail) &&
				!(maTarget instanceof Condition) &&
				maTarget !== null
			) {
				maTarget = maTarget.parentElement;
				if (maTarget === null) {
					return;
				}
				// Gestion des clics sur des éléments qui ne doivent pas être ciblés
				if (verbose) console.log(maTarget);
				if (verbose) console.log(maTarget.classList);
				if (verbose)
					console.log(maTarget.classList.contains("nonCiblable"));
				if (maTarget.classList.contains("nonCiblable")) {
					return;
				}
			}

			if (maTarget instanceof Condition) {
				maTarget = maTarget._structure;
			}

			if (!e.shiftKey && !this._selection.estSelectionne(maTarget)) {
				if (verbose) console.log("Pas de shift, on désélectionne tout");
				this._selection.deselectionnerTout();
			}

			if (
				maTarget instanceof ElementGraphique &&
				!this._selection.estSelectionne(maTarget) &&
				this._currentTool != 0
			) {
				if (verbose) console.log("Sélection d'un élément graphique");
				this._selection.selectionnerElement(maTarget);
			} else if (e.shiftKey && this._selection.estSelectionne(maTarget)) {
				this._selection.deselectionnerElement(maTarget);
			}

			if (verbose)
				console.log(`this._currentTool = ${this._currentTool}`);

			if (maTarget instanceof PlanTravail && this._currentTool == -1) {
				console.log("event 1");

				this._isSelecting = true;
				this._coordonneesSelection.x =
					(this._curMousePos.x / 100) * window.innerWidth;
				this._coordonneesSelection.y =
					(this._curMousePos.y / 100) * window.innerWidth;
			} else {
				//console.log("event 2");
				this._isDragging = true;
				this._lastPosX = e.clientX;
				this._lastPosY = e.clientY;
				this._evenementDeplacement =
					new EvenementDeplacementElementMultiples();
				for (let element of this._selection.getElementsSelectionnes()) {
					this._evenementDeplacement.ajouterElementDeplace(
						new EvenementDeplacementElement(element),
					);
				}
			}
		});
		this.addEventListener("mouseup", function (e) {
			e.stopPropagation();
			if (this._evenementDeplacement != null) {
				if (
					this._evenementDeplacement.estDecale() &&
					this._isDragging
				) {
					this.ajouterEvenement(this._evenementDeplacement);
				}
			}
			this._isDragging = false;
			this._isSelecting = false;
			this._isMoving = false;
			let listeElemsASelec =
				this._selectionRectangle.listerElementsGraphiques();
			for (let elem of listeElemsASelec) {
				this._selection.selectionnerElement(elem);
			}
			this._selectionRectangle.placer(-10, 0, -10, 0);
		});
		this.addEventListener("mousemove", function (e) {
			e.stopPropagation();
			if (this._isMoving) {
				if (
					e.clientX - this._lastPosX > 100 ||
					e.clientX - this._lastPosX < -100
				) {
					this._lastPosX = e.clientX;
					this._lastPosY = e.clientY;
					return;
				}
				if (
					e.clientY - this._lastPosY > 100 ||
					e.clientY - this._lastPosY < -100
				) {
					this._lastPosX = e.clientX;
					this._lastPosY = e.clientY;
					return;
				}
				this._planActif.scrollLeft -= e.clientX - this._lastPosX;
				this._planActif.scrollTop -= e.clientY - this._lastPosY;
				this._lastPosX = e.clientX;
				this._lastPosY = e.clientY;
				return;
			}
			this._curMousePos = {
				x:
					(((e.clientX + this._planActif.scrollLeft) /
						window.innerWidth) *
						100) /
					this._indicateurZoom._zoom,
				y:
					(((e.clientY + this._planActif.scrollTop) /
						window.innerWidth) *
						100) /
					this._indicateurZoom._zoom,
			}; // En vw
			if (verbose) console.log(`mousemove avec ${this._isDragging}`);
			if (verbose) console.log(this._curMousePos);
			if (this._isDragging) {
				let abscisseEnPx = e.clientX;
				let ordonneeEnPx = e.clientY;
				let decalageXEnPx = abscisseEnPx - this._lastPosX;
				let decalageYEnPx = ordonneeEnPx - this._lastPosY;
				let decalageXEnVw =
					((decalageXEnPx / window.innerWidth) * 100) /
					parseFloat(
						document.body.style.getPropertyValue("--sizeModifier"),
					);
				let decalageYEnVw =
					((decalageYEnPx / window.innerWidth) * 100) /
					parseFloat(
						document.body.style.getPropertyValue("--sizeModifier"),
					);
				this._selection.moveAllSelectedElements(
					decalageXEnVw,
					decalageYEnVw,
				);
				if (verbose)
					console.log(
						`Déplacement de la sélection de ${decalageXEnVw}vw en abscisse et de ${decalageYEnVw}vw en ordonnée`,
					);
				this._lastPosX = e.clientX;
				this._lastPosY = e.clientY;
			} else {
				// L'élément graphique dont le centre est le plus proche de la souris doit être devant les autres
				let distanceMin = 1000000;
				let elemLePlusProche = null;

				// Adapter les coordonnees de la souris pour les comparer avec les coordonnees des éléments graphiques
				// Convertir en vw
				let coordSouris = {
					x: (e.clientX / window.innerWidth) * 100,
					y: (e.clientY / window.innerWidth) * 100,
				};

				// Prendre en compte le zoom
				coordSouris.x /= parseFloat(
					document.body.style.getPropertyValue("--sizeModifier"),
				);
				coordSouris.y /= parseFloat(
					document.body.style.getPropertyValue("--sizeModifier"),
				);

				// Prendre en compte le scroll du plan de travail
				coordSouris.x +=
					(this._planActif.scrollLeft / window.innerWidth) * 100;
				coordSouris.y +=
					(this._planActif.scrollTop / window.innerWidth) * 100;

				// Trouver l'élément le plus proche
				for (let elem of this._planActif.trouverToutLesElementsGraphiques()) {
					let coordCentreElem = elem.getCentre();

					let distance = Math.sqrt(
						(coordSouris.x - coordCentreElem.x) ** 2 +
							(coordSouris.y - coordCentreElem.y) ** 2,
					);
					if (distance < distanceMin) {
						distanceMin = distance;
						elemLePlusProche = elem;
					}
				}
				if (verbose) console.log(elemLePlusProche);
				if (
					elemLePlusProche != this._ancienPlusProche &&
					elemLePlusProche != null
				) {
					elemLePlusProche.parentNode.appendChild(elemLePlusProche);
					this._ancienPlusProche = elemLePlusProche;
				}
			}
			if (this._isSelecting) {
				let abscisseEnPx =
					(this._curMousePos.x / 100) * window.innerWidth -
					this._planActif.getBoundingClientRect().left /
						this._indicateurZoom._zoom;
				let ordonneeEnPx =
					(this._curMousePos.y / 100) * window.innerWidth -
					this._planActif.getBoundingClientRect().top /
						this._indicateurZoom._zoom;
				let abscisseEnVw = (abscisseEnPx / window.innerWidth) * 100;
				let ordonneeEnVw = (ordonneeEnPx / window.innerWidth) * 100;
				let lastXenVw =
					((this._coordonneesSelection.x -
						this._planActif.getBoundingClientRect().left /
							this._indicateurZoom._zoom) /
						window.innerWidth) *
					100;
				let lastYenVw =
					((this._coordonneesSelection.y -
						this._planActif.getBoundingClientRect().top /
							this._indicateurZoom._zoom) /
						window.innerWidth) *
					100;
				this._selectionRectangle.placer(
					abscisseEnVw,
					ordonneeEnVw,
					lastXenVw,
					lastYenVw,
				);
			}
		});

		this.addEventListener("contextmenu", function (e) {
			e.stopPropagation();
			e.preventDefault();

			// Calculer la position du menu contextuel
			let abscisse = e.clientX;
			let ordonnee = e.clientY;

			// Transformer les coordonnées en vw
			abscisse = (abscisse / window.innerWidth) * 100;
			ordonnee = (ordonnee / window.innerWidth) * 100;

			// Créer le menu contextuel
			this.appendChild(
				new MenuContextuel(
					abscisse,
					ordonnee,
					this._selection,
					e.target,
				),
			);
		});

		window.onbeforeprint = () => {
			// On met le zoom à 100% pour l'impression
			document.body.style.setProperty("--sizeModifier", 1.0);
		};

		window.onafterprint = () => {
			// On remet le zoom comme il était avant l'impression
			document.body.style.setProperty(
				"--sizeModifier",
				this._indicateurZoom._zoom,
			);
		};
	}

	/**
	 * Crée un cookie ou met à jour un cookie existant.
	 *
	 * @param {string} cname - Le nom du cookie.
	 * @param {string} cvalue - La valeur du cookie.
	 * @param {number} exdays - Le nombre de jours avant l'expiration du cookie.
	 */
	setCookie(cname, cvalue, exdays) {
		const d = new Date();
		d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
		let expires = "expires=" + d.toUTCString();
		document.cookie =
			cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Lax";
	}

	/**
	 * Récupère la valeur d'un cookie spécifié par son nom.
	 *
	 * @param {string} cname - Le nom du cookie à récupérer.
	 * @returns {string} La valeur du cookie si trouvé, sinon une chaîne vide.
	 */
	getCookie(cname) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(";");
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == " ") {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	/**
	 * Charge des éléments à partir d'un objet JSON et met à jour la sélection.
	 *
	 * @param {Object} json - L'objet JSON contenant les données des éléments à charger.
	 * @returns {void}
	 */
	chargerDepuisJSON(json) {
		let lesElements = this._planActif.chargerDepuisJSON(json);

		// Désélectionner tout
		this._selection.deselectionnerTout();

		// Sélectionner les éléments et leurs enfants
		for (let elem of lesElements) {
			this._selection.selectionnerArbre(elem);
		}

		// On ouvre une invite pour les éléments de type StructureIterativeBornee s'il y en a un seul
		if (
			lesElements.length == 1 &&
			lesElements[0] instanceof StructureIterativeBornee
		) {
			lesElements[0].inviteBornes();
		}
	}

	/**
	 * Sélectionne un outil et met à jour le curseur en fonction de l'outil sélectionné.
	 *
	 * @param {number} idTool - L'identifiant de l'outil à sélectionner. Si idTool est -1, le pointeur est sélectionné.
	 *
	 * @description
	 * Cette méthode met à jour l'outil actuellement sélectionné et modifie le curseur du plan principal et des sous-plans de travail
	 * en fonction de l'outil sélectionné. Si un outil autre que le lien est sélectionné, elle enlève la classe "pointePourLien" de l'élément
	 * précédemment pointé.
	 *
	 * @example
	 * // Sélectionne l'outil avec l'identifiant 3 (Structure si)
	 * selectTool(3);
	 */
	selectTool(idTool) {
		this._currentTool = idTool;
		this._listeTools.forEach((tool) => {
			tool.classList.remove("selected");
			this._boutonPointeur.classList.remove("selected");
		});
		const planPrincipal = document.querySelector("plan-travail");
		const sousPlanTravail = document.querySelectorAll("sous-plan-travail");
		if (idTool != -1) {
			this._listeTools[idTool].classList.add("selected");
			const cursor =
				this._listeTools[idTool].src.split(".svg")[0] + "Cursor.svg";
			const urlColor = this._listeTools[idTool].src.split(".svg")[1];
			let goodCursor;
			switch (idTool) {
				// Lien
				case 0:
					goodCursor = `url(${cursor + urlColor}) 20 6, auto`;
					break;
				//Probleme, Procedure
				case 1:
				case 2:
					goodCursor = `url(${cursor + urlColor}) 10 6, auto`;
					break;
				// Structure si, Structure switch
				case 3:
				case 4:
					goodCursor = `url(${cursor + urlColor}) 14 6, auto`;
					break;
				// Boucle itérative non bornée
				case 5:
					goodCursor = `url(${cursor + urlColor}) 16 6, auto`;
					break;
				// Boucle itérative bornée
				case 6:
					goodCursor = `url(${cursor + urlColor}) 13 6, auto`;
					break;
				// Condition de sortie
				case 7:
					goodCursor = `url(${cursor + urlColor}) 22 6, auto`;
					break;
				default:
					goodCursor = `url(${cursor + urlColor}), auto`;
					break;
			}
			planPrincipal.style.cursor = goodCursor;
			sousPlanTravail.forEach((sousPlan) => {
				sousPlan.style.cursor = goodCursor;
			});
		} else {
			// Pointeur
			this._boutonPointeur.classList.add("selected");
			planPrincipal.style.cursor = `url(${this._boutonPointeur.src}), auto`;
			sousPlanTravail.forEach((sousPlan) => {
				sousPlan.style.cursor = `url(${this._boutonPointeur.src}), auto`;
			});
		}

		if (idTool != 0 && this._pointePrecedementLien != null) {
			// Tout autre outil que le lien, on enlève la pointe de l'élément précédemment pointé
			this._pointePrecedementLien.classList.remove("pointePourLien");
			this._pointePrecedementLien = null;
		}
	}

	// Outils d'édition
	/**
	 * Annule la dernière action effectuée.
	 * Appelle la méthode `annuler` pour effectuer l'annulation.
	 */
	undo() {
		this.annuler();
	}

	/**
	 * Refaire l'action précédente annulée.
	 * Appelle la méthode `retablir` pour rétablir l'état précédent.
	 */
	redo() {
		this.retablir();
	}

	/**
	 * Coupe la sélection actuelle.
	 * Si le mode verbose est activé, affiche "cut" dans la console.
	 * Copie la sélection actuelle dans le presse-papiers et la supprime ensuite.
	 */
	cut() {
		if (verbose) console.log("cut");
		this.copy();
		this.delete();
	}

	/**
	 * Copie les éléments sélectionnés dans le presse-papiers ou retourne leur représentation JSON.
	 *
	 * @param {boolean} [toClipboard=true] - Indique si les éléments doivent être copiés dans le presse-papiers.
	 * @returns {string} La représentation JSON des éléments copiés.
	 */
	copy(toClipboard = true) {
		if (verbose) console.log("copy");
		let elementsACopier = [];
		let elementsSelectionnees = this._selection.getElementsSelectionnes(); // Liste des éléments sélectionnés
		for (let elementGraphique of elementsSelectionnees) {
			if (verbose) console.log(elementGraphique._parent);
			if (verbose && elementGraphique._parent)
				console.log(
					elementsSelectionnees.indexOf(
						elementGraphique._parent._proprietaire,
					),
				);
			if (
				elementGraphique._parent == null ||
				elementsSelectionnees.indexOf(
					elementGraphique._parent._proprietaire,
				) == -1
			) {
				if (verbose) console.log(elementGraphique);
				elementsACopier.push(
					elementGraphique.toJSONspecifier(elementsSelectionnees),
				);
			}
		}

		if (toClipboard) {
			// Trouver le coin supérieur gauche de la sélection
			let coinSupGauche = this._selection.coin("center");
			if (verbose) console.log(coinSupGauche);

			// On convertit le coin supérieur gauche en vw
			coinSupGauche.x = (coinSupGauche.x / window.innerWidth) * 100;
			coinSupGauche.y = (coinSupGauche.y / window.innerWidth) * 100;

			// Soustraire les coordonnées du coin supérieur gauche pour que les coordonnées soient relatives
			const appliquerDecalage = (elem) => {
				if (true)
					console.log(
						`parseFloat(elem.abscisse) - coinSupGauche.x + "vw" = ${parseFloat(
							elem.abscisse,
						)} - ${coinSupGauche.x} + "vw"
                        = ${
							parseFloat(elem.abscisse) - coinSupGauche.x + "vw"
						}`,
					);
				if (true)
					console.log(
						`parseFloat(elem.ordonnee) - coinSupGauche.y + "vw" = ${parseFloat(
							elem.ordonnee,
						)} - ${coinSupGauche.y} + "vw"
                        = ${
							parseFloat(elem.ordonnee) - coinSupGauche.y + "vw"
						}`,
					);
				elem.abscisse =
					parseFloat(elem.abscisse) - coinSupGauche.x + "vw";
				elem.ordonnee =
					parseFloat(elem.ordonnee) - coinSupGauche.y + "vw";
				if (elem.enfants) {
					elem.enfants.forEach((enfant) => {
						appliquerDecalage(enfant);
					});
				}

				if (
					elem.typeElement == "StructureSi" ||
					elem.typeElement == "StructureIterative"
				) {
					for (let condition of elem.conditions) {
						condition.enfants.forEach((enfant) => {
							appliquerDecalage(enfant);
						});
					}
				}
			};

			elementsACopier.forEach((elem) => {
				appliquerDecalage(elem);
			});
		}

		if (verbose) console.log(elementsACopier);
		if (toClipboard)
			navigator.clipboard.writeText(JSON.stringify(elementsACopier));
		return JSON.stringify(elementsACopier);
	}

	/**
	 * Colle les données du presse-papiers et applique un décalage basé sur la position actuelle de la souris.
	 *
	 * @function
	 * @name paste
	 * @memberof Editeur
	 * @throws {Error} Lance une erreur si les données du presse-papiers ne sont pas au format JSON.
	 *
	 * @description
	 * Cette fonction lit les données du presse-papiers, les parse en JSON, puis applique un décalage aux coordonnées
	 * de chaque élément basé sur la position actuelle de la souris. Si les éléments contiennent des enfants ou des conditions,
	 * le décalage est également appliqué récursivement à ces sous-éléments. Enfin, les données modifiées sont chargées dans l'éditeur.
	 *
	 * @example
	 * // Exemple d'utilisation
	 * editeur.paste();
	 */
	paste() {
		if (verbose) console.log("paste");
		try {
			var parsedData = JSON.parse(readFromClipboard());

			// Ajouter les coordonnées de la souris
			const appliquerDecalage = (elem) => {
				if (verbose)
					console.log(
						`parseFloat(elem.abscisse) + this._curMousePos.x + "vw" = ${parseFloat(
							elem.abscisse,
						)} + ${this._curMousePos.x} + "vw"
                        = ${
							parseFloat(elem.abscisse) +
							this._curMousePos.x +
							"vw"
						}`,
					);
				if (verbose)
					console.log(
						`parseFloat(elem.ordonnee) + this._curMousePos.y + "vw" = ${parseFloat(
							elem.ordonnee,
						)} + ${this._curMousePos.y} + "vw"
                        = ${
							parseFloat(elem.ordonnee) +
							this._curMousePos.y +
							"vw"
						}`,
					);
				elem.abscisse =
					parseFloat(elem.abscisse) + this._curMousePos.x + "vw";
				elem.ordonnee =
					parseFloat(elem.ordonnee) + this._curMousePos.y + "vw";
				if (elem.enfants) {
					elem.enfants.forEach((enfant) => {
						appliquerDecalage(enfant);
					});
				}

				if (
					elem.typeElement == "StructureSi" ||
					elem.typeElement == "StructureIterative"
				) {
					for (let condition of elem.conditions) {
						condition.enfants.forEach((enfant) => {
							appliquerDecalage(enfant);
						});
					}
				}
			};

			parsedData.forEach((elem) => {
				appliquerDecalage(elem);
			});

			this.chargerDepuisJSON(parsedData);
		} catch (error) {
			console.error("Le fichier n'est pas au format JSON.");
		}
	}

	/**
	 * Sélectionne tous les éléments graphiques trouvés dans le plan actif.
	 * Utilise la méthode `trouverToutLesElementsGraphiques` pour récupérer les éléments graphiques,
	 * puis les sélectionne en utilisant la méthode `selectionnerElement` de l'objet `_selection`.
	 *
	 * @memberof Editeur
	 * @method selectAll
	 */
	selectAll() {
		console.log("selectAll");
		for (let elem of this._planActif.trouverToutLesElementsGraphiques()) {
			if (elem instanceof ElementGraphique)
				this._selection.selectionnerElement(elem);
		}
	}

	/**
	 * Supprime les éléments sélectionnés.
	 */
	delete() {
		console.log("delete");
		this._selection.supprimerTout();
	}

	/**
	 * Recherche des éléments (fonctionnalité non implémentée).
	 */
	search() {
		console.log("search");
	}

	/**
	 * Exporte le contenu de l'éditeur au format JSON.
	 *
	 * @param {string} jsonString - La chaîne JSON à exporter.
	 */
	exporterJSON(jsonString) {
		// On crée un Blob avec le contenu JSON
		var blob = new Blob([jsonString], { type: "application/json" });

		// On crée un URL pour le Blob
		var url = URL.createObjectURL(blob);

		// On crée un élément <a> pour télécharger le fichier
		var downloadLink = document.createElement("a");
		downloadLink.href = url;
		downloadLink.download = `${
			this.querySelector("#titreAlgo").innerText
		}.json`;

		// Pour des raisons de compatibilité, on simule un clic sur le lien et on le supprime après
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);

		// On supprime le Blob et l'URL pour libérer de la mémoire
		setTimeout(() => URL.revokeObjectURL(url), 100);
	}

	// Gestion des événements
	/**
	 * Ajoute un événement à la pile d'annulation.
	 *
	 * @param {Object} evenement - L'événement à ajouter.
	 */
	ajouterEvenement(evenement) {
		this._pileAnnuler.push(evenement);
		this._pileRétablir = [];
	}

	/**
	 * Annule le dernier événement.
	 */
	annuler() {
		if (this._pileAnnuler.length > 0) {
			let evenement = this._pileAnnuler.pop();
			evenement.annuler();
			this._pileRétablir.push(evenement);
		}
	}

	/**
	 * Rétablit le dernier événement annulé.
	 */
	retablir() {
		if (this._pileRétablir.length > 0) {
			let evenement = this._pileRétablir.pop();
			evenement.retablir();
			this._pileAnnuler.push(evenement);
		}
	}

	// Imports
	/**
	 * Importe des données JSON dans l'éditeur.
	 */
	importerJSON() {
		// On crée un input de type file pour que l'utilisateur puisse choisir un fichier
		var fileInput = document.createElement("input");
		fileInput.type = "file";
		fileInput.accept = ".json";
		fileInput.style.display = "none";
		fileInput.addEventListener("change", () => {
			var reader = new FileReader();
			reader.onload = () => {
				try {
					var parsedData = JSON.parse(reader.result);
					this._espacePrincipal.chargerDepuisJSON(parsedData);
				} catch (error) {
					alert("Le fichier n'a pas été chargé correctement.");
					console.error(error);
				}
			};
			reader.readAsText(fileInput.files[0]);
		});
		fileInput.click();
	}

	// Exports
	/**
	 * Exporte le contenu de l'éditeur au format SVG.
	 *
	 * @param {Object} nodeToCopy - Le nœud à copier.
	 * @param {boolean} [download=true] - Indique si le fichier doit être téléchargé.
	 * @param {boolean} [isJSON=false] - Indique si le nœud est au format JSON.
	 * @returns {string} La chaîne SVG exportée.
	 */
	exporterSVG(nodeToCopy, download = true, isJSON = false) {
		console.log("exporterSVG() appelé");
		// On crée une balise style pour embarquer le style dans le fichier SVG
		var styleElement = document.createElement("style");
		var cssStyles = `
        selection-editeur {
            display: none
        }
        
        selection-simple {
            display: none
        }
        
        selection-rectangle {
            display: none;
        }
        
        plan-travail {
            width: 100vw;
            height: 100vh;
            border: 0.1vw solid #000000;
            position: relative;
            overflow: scroll;
            background-color: #FFFFFF;
            --sizeModifier: 1;
            font-family: 'Roboto', sans-serif;
            background-color: #FFFFFF;
            color: #222222;
        }
        
        probleme-element {
            display: flex;
            width: calc(var(--sizeModifier) * 30vw);
            height: fit-content;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: absolute;
            
            z-index: 2;
        }
        
            probleme-element > div.containerDPR {
                width: 100%;
                height: calc(var(--sizeModifier) * 4vw);
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                column-gap: calc(var(--sizeModifier) * 0.2vw);
                place-items: center;
            }
        
                probleme-element > div.containerDPR > div.donnees {
                    width: 100%;
                    height: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: right;
                    column-gap: calc(var(--sizeModifier) * 0.2vw);
                    place-items: center;
                    grid-column: 1;
                }
        
                    probleme-element > div.containerDPR > div.donnees > label.accolades {
                        font-size: calc(var(--sizeModifier) * 4vw);
                        transform: scaleX(0.75);
                    }
        
                    probleme-element > div.containerDPR > div.donnees > div.donneesEditable {
                        min-width: calc(var(--sizeModifier) * 1vw);
                        height: 100%;
                        grid-column: 2;
                        resize: none;
                        border: none;
                        background: none;
                        font-size: calc(var(--sizeModifier) * 0.75vw);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        word-wrap: break-word;
                        overflow: hidden;
                    }
        
                probleme-element > div.containerDPR > div.nom {
                    width: calc(var(--sizeModifier) * 10vw);
                    height: 100%;
                    grid-column: 2;
                    border: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                    text-align: center;
                    font-size: calc(var(--sizeModifier) * 0.75vw);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    word-wrap: break-word;
                    overflow: hidden;
                    background-color: #FFFFFF;
                }
        
                probleme-element > div.containerDPR > div.resultat {
                    width: 100%;
                    height: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: left;
                    column-gap: calc(var(--sizeModifier) * 0.2vw);
                    place-items: center;
                    grid-column: 3;
                }
        
                    probleme-element > div.containerDPR > div.resultat > label.accolades {
                        font-size: calc(var(--sizeModifier) * 4vw);
                        transform: scaleX(0.75);
                    }
        
                    probleme-element > div.containerDPR > div.resultat > div.resultatEditable {
                        min-width: calc(var(--sizeModifier) * 1vw);
                        height: 100%;
                        grid-column: 2;
                        resize: none;
                        border: none;
                        background: none;
                        font-size: calc(var(--sizeModifier) * 0.75vw);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        word-wrap: break-word;
                        overflow: hidden;
                    }
        
        procedure-element {
            display: flex;
            width: calc(var(--sizeModifier) * 30vw);
            height: fit-content;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: absolute;
            
            z-index: 2;
        }
            
            procedure-element > div.containerDPR {
                width: 100%;
                height: calc(var(--sizeModifier) * 4vw);
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                column-gap: calc(var(--sizeModifier) * 0.2vw);
                place-items: center;
            }
        
                procedure-element > div.containerDPR > div.donnees {
                    width: 100%;
                    height: 100%;
                    display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: right;
                    column-gap: calc(var(--sizeModifier) * 0.2vw);
                    place-items: center;
                    grid-column: 1;
                }
        
                    procedure-element > div.containerDPR > div.donnees > label.accolades {
                        font-size: calc(var(--sizeModifier) * 4vw);
                        transform: scaleX(0.75);
                    }
        
                    procedure-element > div.containerDPR > div.donnees > div.donneesEditable {
                        min-width: calc(var(--sizeModifier) * 1vw);
                        height: 100%;
                        grid-column: 2;
                        resize: none;
                        border: none;
                        background: none;
                        font-size: calc(var(--sizeModifier) * 0.75vw);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        word-wrap: break-word;
                        overflow: hidden;
                    }
        
                procedure-element > div.containerDPR > div.nom {
                    width: calc(var(--sizeModifier) * 8vw);
                    height: 100%;
                    grid-column: 2;
                    border: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                    text-align: center;
                    font-size: calc(var(--sizeModifier) * 0.75vw);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    word-wrap: break-word;
                    overflow: hidden;
                    background-color: #FFFFFF;
                }
        
                procedure-element > div.containerDPR > div.nom::before {
                    position: absolute;
                    content: "";
                    transform: translateX(calc(var(--sizeModifier) *-4.5vw));
                    width: calc(var(--sizeModifier) * 0.8vw);
                    height: calc(var(--sizeModifier) * 4vw);
                    border: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                    border-right: none;
                    background-color: #FFFFFF;
                }
        
                procedure-element > div.containerDPR > div.nom::after {
                    position: absolute;
                    content: "";
                    transform: translateX(calc(var(--sizeModifier) *4.5vw));
                    width: calc(var(--sizeModifier) * 0.8vw);
                    height: calc(var(--sizeModifier) * 4vw);
                    border: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                    border-left: none;
                    background-color: #FFFFFF;
                }
        
                procedure-element > div.containerDPR > div.resultat {
                    width: 100%;
                    height: 100%;
                    display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: right;
                    column-gap: calc(var(--sizeModifier) * 0.2vw);
                    place-items: center;
                    grid-column: 3;
                }
        
                    procedure-element > div.containerDPR > div.resultat > label.accolades {
                        font-size: calc(var(--sizeModifier) * 4vw);
                        transform: scaleX(0.75);
                    }
        
                    procedure-element > div.containerDPR > div.resultat > div.resultatEditable {
                        min-width: calc(var(--sizeModifier) * 1vw);
                        height: 100%;
                        grid-column: 2;
                        resize: none;
                        border: none;
                        background: none;
                        font-size: calc(var(--sizeModifier) * 0.75vw);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        word-wrap: break-word;
                        overflow: hidden;
                    }
        
        symbole-decomposition-element {
            position: absolute;
            
            width: calc(var(--sizeModifier) * 1vw);
            height: calc(var(--sizeModifier) * 1.5vw);
            border-left: calc(var(--sizeModifier) * 0.1vw) solid #000000;
            border-right: calc(var(--sizeModifier) * 0.1vw) solid #000000;
            border-bottom: calc(var(--sizeModifier) * 0.1vw) solid #000000;
        }
        
        structure-si-element {
            display: grid;
            grid-template-columns: 0px 1fr 0px;
            grid-template-rows: 1fr;
            width: fit-content;
            height: calc(var(--sizeModifier) * 4vw);
            position: absolute;
            place-content: center;
            place-items: center;
            
            z-index: 2;
        }
        
        structure-si-element > div.triangle {
            color: #0000;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            font-size: 3vw;
            user-select: none;
            cursor: pointer;
        }
        
            structure-si-element > div.triangleGauche {
                width: calc(var(--sizeModifier) * 2.8284271247vw); /* 4 / sqrt(2), théorème de pythagore */
                height: calc(var(--sizeModifier) * 2.8284271247vw);
                border-top: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                border-left: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                rotate: -45deg;
                grid-column: 1;
                background-color: #FFFFFF;
                transform: translate(-2%, 2%); /* Compenser l'imprecision du rotate */
            }
        
            structure-si-element > div.triangleGauche > span {
                rotate: 45deg;
                transform: translateX(-0.7vw);
            }
        
            structure-si-element > div.conditionContainer {
                display: flex;
                width: fit-content;
                height: 100%;   
                grid-column: 2;
                flex-direction: row;
            }
        
                structure-si-element > div.conditionContainer > condition-element {
                    width: calc(var(--sizeModifier) * 10vw);
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background-color: #FFFFFF;
                    border-right: calc(var(--sizeModifier) * 0.05vw) solid #000000;
                    border-top: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                    border-bottom: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                }
        
            structure-si-element > div.triangleDroit {
                width: calc(var(--sizeModifier) * 2.8284271247vw); /* 4 / sqrt(2), théorème de pythagore */
                height: calc(var(--sizeModifier) * 2.8284271247vw);
                border-top: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                border-right: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                rotate: 45deg;
                grid-column: 3;
                background-color: #FFFFFF;
                transform: translate(2%, 2%); /* Compenser l'imprecision du rotate */
            }
        
            structure-si-element > div.triangleDroit > span {
                rotate: -45deg;
                transform: translateX(0.7vw);
            }
        
        structure-switch-element {
            display: grid;
            grid-template-columns: 0px 1fr 0px;
            grid-template-rows: 1fr 1fr;
            width: fit-content;
            height: calc(var(--sizeModifier) * 4vw);
            position: absolute;
            place-content: center;
            place-items: center;
            
            background-color: #FFFFFF;
            z-index: 2;
        }
        
            structure-switch-element > div.triangle {
                color: #0000;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                font-size: 2vw;
                user-select: none;
                cursor: pointer;
            }
        
            structure-switch-element > div.triangleGauche {
                width: calc(var(--sizeModifier) * 2.8284271247vw); /* 4 / sqrt(2), théorème de pythagore */
                height: calc(var(--sizeModifier) * 2.8284271247vw);
                border-top: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                border-left: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                rotate: -45deg;
                grid-column: 1;
                grid-row: 1/3;
                background-color: #FFFFFF;
                transform: translate(-2%, 2%); /* Compenser l'imprecision du rotate */
            }
        
            structure-switch-element > div.triangleGauche > span {
                rotate: 45deg;
                transform: translate(-0.7vw, 30%);
            }
        
            structure-switch-element > hr.diviseurGauche {
                width: calc(var(--sizeModifier) * 4vw);
                height: calc(var(--sizeModifier) * 0.05vw);
                grid-column: 1;
                grid-row: 1/3;
                background-color: #000000;
                z-index: 1;
                transform: translateX(-50%);
                border: 0;
            }
        
            structure-switch-element > div.expressionATester {
                width: 100%;
                height: 100%;
                grid-column: 2;
                grid-row: 1;
                resize: none;
                border: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                border-left: 0;
                border-right: 0;
                text-align: center;
                font-size: calc(var(--sizeModifier) * 0.75vw);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                word-wrap: break-word;
                overflow: hidden;
                background-color: #FFFFFF;
                z-index: 10;
            }
        
            structure-switch-element > div.expressionATester:focus-visible {
                outline: none;
            }
        
            structure-switch-element > div.conditionContainer {
                display: flex;
                min-width: fit-content;
                width: 100%;
                height: calc(var(--sizeModifier) * 2vw);   
                grid-column: 2;
                grid-row: 2;
                flex-direction: row;
            }
        
                structure-switch-element > div.conditionContainer > condition-element {
                    min-width: calc(var(--sizeModifier) * 10vw);
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background-color: #FFFFFF;
                    border-right: calc(var(--sizeModifier) * 0.05vw) solid #000000;
                    border-top: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                    border-bottom: calc(var(--sizeModifier) * 0.1vw) solid #000000;
                }
        
            structure-switch-element > div.triangleDroit {
            width: calc(var(--sizeModifier) * 2.8284271247vw); /* 4 / sqrt(2), théorème de pythagore */
            height: calc(var(--sizeModifier) * 2.8284271247vw);
            border-top: calc(var(--sizeModifier) * 0.1vw) solid #000000;
            border-right: calc(var(--sizeModifier) * 0.1vw) solid #000000;
            rotate: 45deg;
            grid-column: 3;
            grid-row: 1/3;
            background-color: #FFFFFF;
            transform: translate(2%, 2%); /* Compenser l'imprecision du rotate */
            }
        
            structure-switch-element > div.triangleDroit > span {
                rotate: -45deg;
                transform: translate(0.7vw, 30%);
            }
        
            structure-switch-element > hr.diviseurDroit {
                width: calc(var(--sizeModifier) * 4vw);
                height: calc(var(--sizeModifier) * 0.05vw);
                grid-column: 3;
                grid-row: 1/3;
                background-color: #000000;
                z-index: 1;
                transform: translateX(-50%);
                border: 0;
            }
        
        condition-element {
            position: relative;
        }
        
        condition-element > div.libelle {
            width: calc(var(--sizeModifier) * 10vw);
            height: inherit;
            resize: none;
            border: none;
            background: none;
            text-align: center;
            font-size: calc(var(--sizeModifier) * 0.75vw);
            overflow: hidden;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            word-wrap: break-word;
            overflow: hidden;
            background-color: #FFFFFF;
        }
        
        condition-element > div.libelle:focus-visible {
            outline: none;
        }
        
        condition-element > button.supprimer {
            width: calc(var(--sizeModifier) * 2vw);
            height: calc(var(--sizeModifier) * 1vw);
            border: none;
            border-radius: 0 0 999em 999em;
            background-color: var(--warningColor);
            z-index: 3;
            
            font-size: calc(var(--sizeModifier) * 1vw);
            color: #FFFFFF;
            display: none;
            position: absolute;
            top: 0;
        }
        
        condition-element > div.arrowsWrapper {
            width: calc(var(--sizeModifier) * 6vw);
            height: calc(var(--sizeModifier) * 1vw);
            border: none;
            font-size: calc(var(--sizeModifier) * 1vw);
            text-align: center;
            position: absolute;
            bottom: -1.5vw;
            user-select: none;
            cursor: pointer;
            display: none;
            padding: 0 0.5vw 0.5vw 0.5vw;
        }
        
        condition-element > div.arrowsWrapper > span {
            padding: 0.5vw;
            border-radius: 0 0 999em 999em;
        }
        
        condition-element > div.ajouterAGauche {
            display: none;
        }
        
        condition-element > div.ajouterADroite {
            display: none;
        }
        
        invite-bornes-pour-si {
            display: none;
        }
        
        structure-iterative-non-bornee-element {
            display: flex;
            flex-direction: row;
            justify-content: center;
            place-items: center;
            width: fit-content;
            height: calc(var(--sizeModifier) * 4vw);
            position: absolute;
            
            z-index: 2;
        }
            structure-iterative-non-bornee-element > svg.boucleSVG {
                width: calc(var(--sizeModifier) * 4vw);
                height: calc(var(--sizeModifier) * 4vw);
            }

		structure-iterative-bornee-element {
			display: flex;
			flex-direction: row;
			justify-content: center;
			place-items: center;
			width: fit-content;
			height: calc(var(--sizeModifier) * 4vw);
			position: absolute;
			transition: all var(--transitionTime) ease;
			z-index: 2;
			gap: calc(var(--sizeModifier) * 0.5vw);
		}
        
        structure-iterative-bornee-element {
            display: flex;
            flex-direction: row;
            justify-content: center;
            place-items: center;
            width: fit-content;
            height: calc(var(--sizeModifier) * 4vw);
            position: absolute;
            
            z-index: 2;
        }

		structure-iterative-bornee-element > svg.boucleSVG {
			width: calc(var(--sizeModifier) * 4vw);
			height: calc(var(--sizeModifier) * 4vw);
		}
        
		structure-iterative-bornee-element > div.informationsBornes {
			width: calc(var(--sizeModifier) * 16vw);
			height: 100%;
			font-size: calc(var(--sizeModifier) * 1vw);
		}
        
        condition-sortie-element {
            position: absolute;
            background-image: url("assets/conditionSortie.svg");
            height: calc(var(--sizeModifier) * 4vw);
            width: calc(var(--sizeModifier) * 4vw);
            
            z-index: 2;
        }
        
        ligne-element {
            position: absolute;
            transform-origin: 0% 50%;
            margin: 0;
            padding: 0;
            border: calc(var(--sizeModifier) * 0.05vw) solid #000000;
            z-index: 0;
        }
        `;

		// On assigne le contenu de la balise style
		styleElement.textContent = cssStyles;

		let planExport = new PlanTravail();

		planExport.style.setProperty("--sizeModifier", 1);
		planExport.insertBefore(styleElement, planExport.firstChild);

		document.body.appendChild(planExport);
		if (isJSON) {
			planExport.chargerDepuisJSON(JSON.parse(nodeToCopy));
		} else {
			planExport.chargerDepuisJSON(
				nodeToCopy.exporterEnJSONSpecifier(
					Array.from(nodeToCopy.children),
				),
			);
		}
		document.body.removeChild(planExport);

		// Adapter la taille du plan pour que tout soit visible
		let tailles = planExport.getCoordMinEtMax();
		if (verbose) console.log(tailles);
		// À partir des tailles, on peut déterminer la taille de la prévisualisation, et ainsi calculer le zoom à appliquer
		let largeur = tailles.coordMax.x - tailles.coordMin.x;
		let hauteur = tailles.coordMax.y - tailles.coordMin.y;
		planExport.style.width = largeur + 5 + "vw";
		planExport.style.height = hauteur + 5 + "vw";

		// Tout déplacer pour que ce soit alligné avec le coin en haut à gauche
		planExport.toutDeplacer(
			-tailles.coordMin.x + 2.5,
			-tailles.coordMin.y + 2.5,
		);

		for (let imgBoucle of planExport.querySelectorAll("div.boucleSVG")) {
			if (verbose) console.log(imgBoucle);
			let element = imgBoucle.parentElement;
			let svgBoucle = document.createElement("svg");
			element.insertBefore(svgBoucle, imgBoucle);
			element.removeChild(imgBoucle);
			svgBoucle.outerHTML = `<svg class="boucleSVG" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 425.51 386.63">
                <defs>
                    <style>
                        .cls-1 {
                            fill: #ffffff00;
                            stroke: #838787;
                            stroke-miterlimit: 10;
                            stroke-width: 10px;
                        }
                        .cls-2 {
                            fill: #222222;
                            stroke: #838787;
                            stroke-miterlimit: 10;
                            stroke-width: 10px;
                        }
                    </style>
                </defs>
                <circle class="cls-1 " cx="193.31" cy="193.31" r="190.81"/>
                <polygon class="cls-2" points="377.88 154.61 334.58 229.61 421.18 229.61 377.88 154.61"/>
            </svg>
            `;
		}

		for (let conditionSortie of planExport.querySelectorAll(
			"condition-sortie-element",
		)) {
			if (verbose) console.log(conditionSortie);
			let svgConditionSortie = document.createElement("svg");
			conditionSortie.appendChild(svgConditionSortie);
			svgConditionSortie.outerHTML = `<?xml version="1.0" encoding="utf-8"?>
            <!-- Generator: Adobe Illustrator 24.3.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
            <svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 320.28 319.89" style="enable-background:new 0 0 320.28 319.89;" xml:space="preserve">
            <style type="text/css">
                .st0{fill:none;stroke:#838787;stroke-width:10;stroke-miterlimit:10;}
                .st1{fill:none;stroke:#838787;stroke-width:10;stroke-linecap:round;stroke-miterlimit:10;}
            </style>
            <path class="st0" d="M294.62,312.59H25.4c-9.88,0-17.89-8.01-17.89-17.89V25.48c0-9.88,8.01-17.89,17.89-17.89h269.22
                c9.88,0,17.89,8.01,17.89,17.89V294.7C312.51,304.58,304.5,312.59,294.62,312.59z"/>
            <line class="st1" x1="106.57" y1="204.62" x2="106.57" y2="7.62"/>
            <line class="st1" x1="212.57" y1="7.62" x2="212.57" y2="204.62"/>
            <path class="st1" d="M58.95,197.57"/>
            <path class="st1" d="M58.95,197.57c-4.7,0-6.49,6.14-2.53,8.66l101.49,64.73c1.54,0.98,3.51,0.98,5.05,0l101.49-64.73
                c3.96-2.53,2.17-8.66-2.53-8.66"/>
            </svg>
            `;
		}

		var serializer = new XMLSerializer();
		var svgString = serializer.serializeToString(planExport);
		let templateHeader = `<svg xmlns="http://www.w3.org/2000/svg">
		<foreignObject x="0" y="0" width="100%" height="100%">${svgString}</foreignObject></svg>`;

		var blob = new Blob([templateHeader], { type: "image/svg+xml" });
		var url = URL.createObjectURL(blob);
		if (download) {
			var downloadLink = document.createElement("a");
			downloadLink.href = url;
			downloadLink.download = `${
				this.querySelector("#titreAlgo").innerText
			}.svg`;
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);
		}
		return templateHeader;
	}

	/**
	 * Exporte le contenu de l'éditeur au format JPG.
	 *
	 * @param {Object} nodeToCopy - Le nœud à copier.
	 * @param {boolean} [download=true] - Indique si le fichier doit être téléchargé.
	 * @param {boolean} [isJSON=false] - Indique si le nœud est au format JSON.
	 */
	exporterJPG(nodeToCopy, download = true, isJSON = false) {
		this.createBitmapImageFromSvg(
			"jpeg",
			nodeToCopy,
			(download = true),
			(isJSON = false),
		);
	}

	isCreatingBitmapImageFromSvg = false;

	/**
	 * Crée une image bitmap à partir d'un SVG.
	 *
	 * @param {string} mimeType - Le type MIME de l'image.
	 * @param {Object} nodeToCopy - Le nœud à copier.
	 * @param {boolean} [download=true] - Indique si le fichier doit être téléchargé.
	 * @param {boolean} [isJSON=false] - Indique si le nœud est au format JSON.
	 */
	async createBitmapImageFromSvg(
		mimeType,
		nodeToCopy,
		download = true,
		isJSON = false,
	) {
		if (this.isCreatingBitmapImageFromSvg) {
			await new Promise((resolve) => {
				setInterval(() => {
					if (!this.isCreatingBitmapImageFromSvg) resolve();
				}, 16);
			});
		}
		this.isCreatingBitmapImageFromSvg = true;
		let canvasExport = document.getElementById("canvasExport");
		canvasExport.width =
			this._planActif.getBoundingClientRect().width *
			preferences.renderScale;
		canvasExport.height =
			this._planActif.getBoundingClientRect().height *
			preferences.renderScale;
		let ctxExport = canvasExport.getContext("2d");

		let svgString = this.exporterSVG(nodeToCopy, false, isJSON);

		let testSvg = `data:image/svg+xml;base64,${btoa(
			unescape(encodeURIComponent(svgString)),
		)}`;

		let img = new Image();
		img.width = canvasExport.width;
		img.height = canvasExport.height;
		img.src = testSvg;

		const titreAlgo = this.querySelector("#titreAlgo").innerText;
		img.onload = function () {
			ctxExport.clearRect(0, 0, canvasExport.width, canvasExport.height);

			if (mimeType == "jpeg" || mimeType == "jpg") {
				ctxExport.fillStyle = "#ffffff";
				ctxExport.strokeRect = "#ffffff";
				ctxExport.fillRect(
					0,
					0,
					canvasExport.width,
					canvasExport.height,
				);
			}

			ctxExport.drawImage(
				img,
				0,
				0,
				canvasExport.width,
				canvasExport.height,
			);
			let downloadLink = document.createElement("a");
			downloadLink.href = canvasExport.toDataURL(`image/${mimeType}`, 1);
			downloadLink.download = `${titreAlgo}.${mimeType}`;

			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);
			editeur.isCreatingBitmapImageFromSvg = false;
		};
	}

	/**
	 * Exporte le contenu de l'éditeur au format PNG.
	 *
	 * @param {Object} nodeToCopy - Le nœud à copier.
	 * @param {boolean} [download=true] - Indique si le fichier doit être téléchargé.
	 * @param {boolean} [isJSON=false] - Indique si le nœud est au format JSON.
	 */
	exporterPNG(nodeToCopy, download = true, isJSON = false) {
		this.createBitmapImageFromSvg("png", nodeToCopy, download, isJSON);
	}
}
window.customElements.define("editeur-interface", Editeur);
