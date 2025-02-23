/**
 * Classe représentant un dictionnaire de données.
 * @extends HTMLElement
 */
class DictionnaireDonnee extends HTMLElement {
	// ATTRIBUTS
	_mesInformations; // Liste<Information> Liste de toutes les variables
	_dictionnaireDesConvertionTypes = {
		Char: "String",
		int: "double",
		"unsigned int": "int",
	};
	_estOuvert = false;

	_matchSignification = {};
	_matchType = {};

	VARIABLE_SUPPR = "*variable_supprimee*";

	// CONSTRUCTEUR
	/**
	 * Crée une instance de DictionnaireDonnee.
	 * @param {Array} listeVariable - Liste des variables initiales.
	 */
	constructor(listeVariable = []) {
		super();
		this._mesInformations = listeVariable;

		// Affichage
		let iconeDico = document.createElement("div");
		iconeDico.classList.add("img");
		this.appendChild(iconeDico);

		document.getElementById("dico_btn").addEventListener("click", () => {
			if (this._estOuvert) this.fermer();
			else this.ouvrir();
		});
	}

	// ENCAPSULATION

	// METHODES
	/**
	 * Ouvre le dictionnaire de données.
	 */
	ouvrir() {
		document.querySelector("bibliotheque-algorithmique").fermer();
		document.getElementById("dico_wrapper").style.zIndex = 200;
		document.getElementById("boutonDico").classList.add("elementIsOpen");

		document
			.querySelector("editeur-interface")
			._planActif.effectuerDictionnaireDesDonnee();
		if (this._estOuvert) return;
		// Supprimer tout le contenu
		this.innerHTML = "";

		this.classList.add("ouvert");

		this.genererDictionnaire();

		// Ajout de la flèche de fermeture
		let flecheFermeture = document.createElement("span");
		flecheFermeture.innerHTML = "x";
		flecheFermeture.classList.add("fermeture");
		flecheFermeture.addEventListener("click", (e) => {
			e.stopPropagation();
			this.fermer();
		});
		this.appendChild(flecheFermeture);
		this._estOuvert = true;

		// Ajout d'un bouton de raffraichissement
		let boutonRaffraichir = document.createElement("span");
		boutonRaffraichir.innerHTML = "⟳";
		boutonRaffraichir.classList.add("raffraichir");
		boutonRaffraichir.addEventListener("click", (e) => {
			e.stopPropagation();
			boutonRaffraichir.classList.add("rotation");
			setTimeout(() => {
				boutonRaffraichir.classList.remove("rotation");
				this.fermer();
				this.ouvrir();
			}, 200);
		});
		this.appendChild(boutonRaffraichir);
	}

	/**
	 * Ferme le dictionnaire de données.
	 */
	fermer() {
		document.getElementById("dico_wrapper").style.zIndex = -200;
		document.getElementById("biblio_btn").removeAttribute("disabled");
		document.getElementById("boutonDico").classList.remove("elementIsOpen");

		// Supprimer tout le contenu
		this.innerHTML = "";

		this.classList.remove("ouvert");

		// Affichage de l'icone
		let iconeDico = document.createElement("div");
		iconeDico.classList.add("img");
		this.appendChild(iconeDico);
		this._estOuvert = false;
	}

	/**
	 * Génère le contenu du dictionnaire de données.
	 */
	genererDictionnaire() {
		let table = document.createElement("table");
		table.id = "tableDictionnaireDonnee";
		this.appendChild(table);

		// Entête
		let thEntete = document.createElement("th");
		table.appendChild(thEntete);

		let tdNom = document.createElement("td");
		tdNom.textContent = "Nom";
		thEntete.appendChild(tdNom);

		let tdType = document.createElement("td");
		tdType.textContent = "Type";
		thEntete.appendChild(tdType);

		let tdSignification = document.createElement("td");
		tdSignification.textContent = "Signification";
		thEntete.appendChild(tdSignification);

		// Contenu
		for (let info of this._mesInformations) {
			let trContent = document.createElement("tr");
			table.appendChild(trContent);

			let tdNom = document.createElement("td");
			tdNom.textContent = info._nom;
			tdNom.setAttribute("contenteditable", "true");
			trContent.append(tdNom);
			tdNom.addEventListener("keydown", (event) => {
				// On vérifie si la touche appuyée est "Entrée" ou "Espace"
				if (event.key === "Enter" || event.key === " ") {
					// On l'empêche pour éviter le saut de ligne, qui casse le design
					event.preventDefault();
				}
				// Demander confirmation pour la suppression si il ne reste qu'un caractère
				if (event.key === "Backspace" && tdNom.innerText.length == 1) {
					if (
						!confirm(
							"Voulez-vous vraiment supprimer cette variable?",
						)
					) {
						event.preventDefault();
					} else {
						if (verbose) console.log(info);
						document
							.querySelector("plan-travail")
							.renameInformation(info._nom, this.VARIABLE_SUPPR);
						this._mesInformations.splice(
							this._mesInformations.indexOf(info),
							1,
						);
						this.fermer();
						this.ouvrir();
					}
				}
			});

			tdNom.addEventListener("input", () => {
				document
					.querySelector("editeur-interface")
					._planActif.renameInformation(info._nom, tdNom.innerText);
				this._matchSignification[tdNom.innerText] =
					this._matchSignification[info._nom];
				this._matchSignification[info._nom] = undefined;
				this._matchType[tdNom.innerText] = this._matchType[info._nom];
				this._matchType[info._nom] = undefined;
				info._nom = tdNom.innerText;
				// this._mesInformations.forEach((element) => {
				// 	if (element._nom == info._nom) {
				// 		document
				// 			.querySelector("editeur-interface")
				// 			._planActif.renameInformation(element._nom, tdNom.innerText);
				// 		this._matchSignification[tdNom.innerText] = this._matchSignification[element._nom];
				// 		this._matchSignification[element._nom] = undefined;
				// 		element._nom = tdNom.innerText;
				// 	}
				// });
			});

			let tdType = document.createElement("td");
			let selectType = document.createElement("select");
			selectType.classList.add("selectType");
			tdType.appendChild(selectType);

			let auto = document.createElement("option");
			auto.value = "automatique";
			auto.textContent = "automatique";
			selectType.appendChild(auto);

			auto.addEventListener("click", () => {
				this._matchType[info._nom] = undefined;
				// selectType.value = info._type; // Pour recharger automatiquement le type
			});

			for (let type of Type.allTypes) {
				let option = document.createElement("option");
				option.value = type;
				option.textContent = type;
				selectType.appendChild(option);
				option.addEventListener("click", () => {
					this._matchType[info._nom] = type;
				});
			}

			if (this._matchType) {
				if (this._matchType[info._nom] != undefined) {
					selectType.value = this._matchType[info._nom];
				} else {
					selectType.value = info._type;
					if (info._type == undefined) {
						selectType.value = "automatique";
					}
				}
			}
			trContent.append(tdType);

			let tdSignification = document.createElement("td");
			if (this._matchSignification) {
				tdSignification.textContent =
					this._matchSignification[info._nom];
			}
			tdSignification.setAttribute("contenteditable", "true");
			trContent.append(tdSignification);
			tdSignification.addEventListener("input", () => {
				this._matchSignification[info._nom] = tdSignification.innerText;
			});
		}
	}

	/**
	 * Ajoute une variable au dictionnaire.
	 * @param {Information} uneInformation - L'information à ajouter.
	 * @returns {boolean} - Retourne vrai si l'ajout a réussi, sinon faux.
	 */
	AjouterUneVariable(uneInformation) {
		if (uneInformation._nom == this.VARIABLE_SUPPR) {
			return false;
		}
		let reussis = false;
		const nameInformation = uneInformation._nom;
		if (uneInformation instanceof Information) {
			if (this.nomCorrecte(nameInformation)) {
				if (this.containInformation(nameInformation)) {
					const ancienType =
						this.getInformation(nameInformation)._type;
					const nouveauType = uneInformation._type;
					const resultType = this.convertionVariable(
						nouveauType,
						ancienType,
					);
					if (
						this.getInformation(nameInformation)._type != resultType
					) {
						this.changeType(uneInformation._nom, resultType);
					}
				} else {
					this._mesInformations.push(uneInformation);
					reussis = true;
				}
			}
		}
		return reussis;
	}

	/**
	 * Retire les informations absentes de la liste donnée.
	 * @param {Array} listeInformations - La liste des informations présentes.
	 */
	retirerInformationsAbsentes(listeInformations) {
		for (let info of this._mesInformations) {
			if (!listeInformations.includes(info)) {
				this.retirerUneInformation(info._nom);
			}
		}
	}

	/**
	 * Retire une information du dictionnaire.
	 * @param {string} nameVariable - Le nom de la variable à retirer.
	 * @returns {boolean} - Retourne vrai si la suppression a réussi.
	 */
	retirerUneInformation(nameVariable) {
		this._mesInformations = this._mesInformations.filter(
			(element) => element._nom != nameVariable,
		);
		return true;
	}

	/**
	 * Vérifie si deux types sont compatibles.
	 * @param {string} type1 - Le premier type.
	 * @param {string} type2 - Le deuxième type.
	 * @returns {boolean} - Retourne vrai si les types sont compatibles.
	 */
	TypeCompatible(type1, type2) {
		if (type1 == undefined || type2 == undefined) {
			return true;
		}
		let courant = type1;
		while (true) {
			if (!courant) {
				break;
			}
			if (type2 == courant) {
				return true;
			}
			courant = this._dictionnaireDesConvertionTypes[courant];
		}

		courant = type2;
		while (true) {
			if (!courant) {
				break;
			}
			if (type1 == courant) {
				return true;
			}
			courant = this._dictionnaireDesConvertionTypes[courant];
		}

		return false;
	}

	/**
	 * Convertit une variable d'un type à un autre.
	 * @param {string} informationUne - Le premier type.
	 * @param {string} InformationDeux - Le deuxième type.
	 * @returns {string} - Le type résultant de la conversion.
	 */
	convertionVariable(informationUne, InformationDeux) {
		// undefined
		// String
		// Char
		// unsigned double
		// double
		// boolean
		const type1 = informationUne;
		const type2 = InformationDeux;

		//Si Undefined
		if (type1 == undefined) {
			return type2;
		}
		if (type2 == undefined) {
			return type1;
		}

		// Si les deux types sont identiques non nécéssaire
		if (type1 === type2) {
			return type1;
		}

		// Si aucun des deux cas alors type1 est renvoyer
		return this.getTypeLePlusBasEnCommun(type1, type2);
	}

	/**
	 * Obtient le type le plus bas en commun entre deux types.
	 * @param {string} type1 - Le premier type.
	 * @param {string} type2 - Le deuxième type.
	 * @returns {string} - Le type le plus bas en commun.
	 */
	getTypeLePlusBasEnCommun(type1, type2) {
		let courant = type1;
		while (true) {
			if (!courant) {
				break;
			}
			if (type2 == courant) {
				return type2;
			}
			courant = this._dictionnaireDesConvertionTypes[courant];
		}
		courant = type2;
		while (true) {
			if (!courant) {
				break;
			}
			if (type1 == courant) {
				return type1;
			}
			courant = this._dictionnaireDesConvertionTypes[courant];
		}
		return type1;
	}

	/**
	 * Vérifie si le dictionnaire contient une information donnée.
	 * @param {string} nameInformation - Le nom de l'information.
	 * @returns {boolean} - Retourne vrai si l'information est présente.
	 */
	containInformation(nameInformation) {
		let trouver = false;
		this._mesInformations.forEach((element) => {
			if (element._nom == nameInformation) {
				trouver = true;
			}
		});
		return trouver;
	}

	/**
	 * Obtient une information par son nom.
	 * @param {string} nameInformation - Le nom de l'information.
	 * @returns {Information} - L'information trouvée.
	 */
	getInformation(nameInformation) {
		const foundElement = this._mesInformations.find(
			(element) => element._nom === nameInformation,
		);
		return foundElement;
	}

	/**
	 * Renomme une variable.
	 * @param {string} nameVariable - Le nom actuel de la variable.
	 * @param {string} newName - Le nouveau nom de la variable.
	 * @returns {boolean} - Retourne vrai si le renommage a réussi.
	 */
	renameInformation(nameVariable, newName) {
		let resultat = false;
		if (newName == "") {
			resultat = retirerUneInformation(nameVariable);
		} else if (!this.containInformation(newName)) {
			if (this.nomCorrecte(newName)) {
				this._mesInformations.forEach((element) => {
					if (element._nom == nameVariable) {
						element._nom = newName;
						resultat = true;
					}
				});
			}
		}
		return resultat;
	}

	/**
	 * Change la signification d'une variable.
	 * @param {string} nameVariable - Le nom de la variable.
	 * @param {string} nouvelleSignification - La nouvelle signification.
	 * @returns {boolean} - Retourne vrai si le changement a réussi.
	 */
	changeSignification(nameVariable, nouvelleSignification) {
		let resultat = false;
		this._mesInformations.forEach((element) => {
			if (element._nom == nameVariable) {
				element._signification = nouvelleSignification;
				resultat = true;
			}
		});
		return resultat;
	}

	/**
	 * Change le type d'une variable.
	 * @param {string} nameVariable - Le nom de la variable.
	 * @param {string} newType - Le nouveau type.
	 * @returns {boolean} - Retourne vrai si le changement a réussi.
	 */
	changeType(nameVariable, newType) {
		let resultat = false;
		this._mesInformations.forEach((element) => {
			if (element._nom == nameVariable) {
				element._type = newType;
				resultat = true;
			}
		});
		return resultat;
	}

	/**
	 * Vérifie si un nom de variable est correct.
	 * @param {string} nameVariable - Le nom de la variable.
	 * @returns {boolean} - Retourne vrai si le nom est correct.
	 */
	nomCorrecte(nameVariable) {
		let resultat = true;
		if (nameVariable.trim() == "") {
			resultat = false;
		}
		for (let char of nameVariable) {
			if (
				!(char >= "a" && char <= "z") &&
				!(char >= "A" && char <= "Z") &&
				char !== "_"
			) {
				resultat = false;
			}
		}
		return resultat;
	}

	/**
	 * Supprime les données inutilisées.
	 */
	suppressionDonneeInutiliser() {
		this._mesInformations = this._mesInformations.filter((element) => {
			return (
				element._type != undefined ||
				(element._signification != undefined &&
					element._signification != "")
			);
		});
	}

	/**
	 * Supprime toutes les informations du dictionnaire.
	 */
	suppressionTout() {
		this._mesInformations = [];
	}

	/**
	 * Convertit le dictionnaire en JSON.
	 * @returns {Object} - L'objet JSON représentant le dictionnaire.
	 */
	toJSON() {
		return {
			typeElement: "DictionnaireDonnee",
			types: this._matchType,
			signification: this._matchSignification,
		};
	}

	/**
	 * Exporte le dictionnaire dans un format donné.
	 * @param {string} format - Le format d'exportation (xls, csv, md).
	 */
	exporter(format) {
		switch (format.toLowerCase()) {
			case "xls":
				this.ouvrir();
				// Code snippet de la doc de SheetJS
				let aoa = [["Nom", "Type", "Signification"]];

				this._mesInformations.forEach((info) => {
					aoa.push([
						info._nom,
						`${
							this._matchType[info._nom]
								? this._matchType[info._nom]
								: info._type
						}`,
						this._matchSignification[info._nom]
							? this._matchSignification[info._nom]
							: "",
					]);
				});
				/* Create worksheet from Array of arrays */
				var ws = XLSX.utils.aoa_to_sheet(aoa);

				// Create a new workbook
				var wb = XLSX.utils.book_new();

				// Append the worksheet to the workbook
				XLSX.utils.book_append_sheet(wb, ws, "Dictionnaire"); // "Dictionnaire" is the worksheet name

				/* Export to file (start a download) */
				XLSX.writeFile(
					wb,
					`${
						document.querySelector("#titreAlgo").innerText
					}Dictionnaire.xls`,
				);
				this.fermer();
				break;
			case "csv":
				// On crée le contenu du fichier
				var contenuTexte = "Nom;Type;Signification\n";
				this.ouvrir();
				this.fermer();

				this._mesInformations.forEach((info) => {
					contenuTexte += `${info._nom};${info._type};${
						this._matchSignification[info._nom]
							? this._matchSignification[info._nom]
							: ""
					}\n`;
				});

				// On crée un Blob avec le contenu JSON
				var blob = new Blob([contenuTexte], {
					type: "application/json",
				});

				// On crée un URL pour le Blob
				var url = URL.createObjectURL(blob);

				// On crée un élément <a> pour télécharger le fichier
				var downloadLink = document.createElement("a");
				downloadLink.href = url;
				downloadLink.download = `${
					document.querySelector("#titreAlgo").innerText
				}Dictionnaire.csv`;

				// Pour des raisons de compatibilité, on simule un clic sur le lien et on le supprime après
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);

				// On supprime le Blob et l'URL pour libérer de la mémoire
				setTimeout(() => URL.revokeObjectURL(url), 100);
				break;
			case "md":
				// On crée le contenu du fichier
				var contenuTexte = "Nom;Type;Signification\n";
				this.ouvrir();
				this.fermer();

				this._mesInformations.forEach((info) => {
					contenuTexte += `${info._nom};${info._type};${
						this._matchSignification[info._nom]
							? this._matchSignification[info._nom]
							: ""
					}\n`;
				});

				// On convertit le CSV en Markdown
				contenuTexte = this.csvToMarkdown(contenuTexte);

				// On crée un Blob avec le contenu Markdown
				var blob = new Blob([contenuTexte], {
					type: "text/markdown",
				});

				// On crée un URL pour le Blob
				var url = URL.createObjectURL(blob);

				// On crée un élément <a> pour télécharger le fichier
				var downloadLink = document.createElement("a");
				downloadLink.href = url;
				downloadLink.download = `${
					document.querySelector("#titreAlgo").innerText
				}Dictionnaire.md`;

				// Pour des raisons de compatibilité, on simule un clic sur le lien et on le supprime après
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);

				// On supprime le Blob et l'URL pour libérer de la mémoire
				setTimeout(() => URL.revokeObjectURL(url), 100);
				break;
			default:
				break;
		}
	}

	/**
	 * Charge le dictionnaire depuis un objet JSON.
	 * @param {Object} json - L'objet JSON contenant les données.
	 */
	chargerDepuisJSON(json) {
		this._matchType = json.types;
		this._matchSignification = json.signification;
	}

	/**
	 * Convertit une chaîne CSV en Markdown.
	 * @param {string} csvString - La chaîne CSV.
	 * @returns {string} - La chaîne Markdown.
	 */
	csvToMarkdown(csvString) {
		const rows = csvString.split("\n").filter((row) => row); // On sépare les lignes et ne gardons pas les lignes vides
		let markdown = "";

		rows.forEach((row, index) => {
			const columns = row.split(";"); // On découpe les lignes par le délimiteur
			// On entoure chaque colonne par des pipes pour les transformer en cellules de tableau
			const markdownRow = `| ${columns.join(" | ")} |`;

			markdown += markdownRow + "\n";

			// On ajoute une ligne de séparation après la première ligne pour créer l'entête
			if (index === 0) {
				const separator = columns.map(() => "---").join(" | ");
				markdown += `| ${separator} |\n`;
			}
		});

		return markdown;
	}
}
window.customElements.define("dictionnaire-donnee", DictionnaireDonnee);
