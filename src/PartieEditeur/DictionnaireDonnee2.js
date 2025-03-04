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
	constructor(listeVariable = []) {
		super();
		this._mesInformations = listeVariable;

		// Affichage
		let iconeDico = document.createElement("div");
		iconeDico.classList.add("img");
		this.appendChild(iconeDico);

		document.getElementById("dico_btn").addEventListener("click", () => {
			this.ouvrir();
		});

		this._closeBtn;
		this._refreshBtn;
		this._tableBody;
		this._validInputs;
		this._removeInputs;
		this._currentRow = "";
		this._currentVariableName = "";
		this._lastRow = "";
		this._template = document.getElementById("dico-row");
		this.#createHtmlTable();
		this.#launchListeners();
	}

	#createHtmlTable() {
		this.innerHTML = `
		<div id="dico-ctrl">
			<button id="dico-refresh"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/></svg></button>
			<button id="dico-close"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
		</div>
		<table id="dico-table">
			<thead>
				<tr><td>Nom</td><td>Type</td><td>Signification</td></tr>
			</thead>
			<tbody></tbody>
		</table>
		<div id="dico-inputs">
			<input type="text" name="" minlength="1" id="" placeholder="Nom">
            <input type="search" list="primitives" name="" minlength="1" id="" placeholder="Type">
            <input type="text" name="" minlength="1" id="" placeholder="Signification">
			<datalist id="primitives"></datalist>
            <button id="valid-inputs" title="Valider vos modifications"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></button>
			<button id="remove-inputs" title="Supprimer la variable"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
        </div>`;
	}

	#handleSelectedRow(htmlTarget) {
		if (this._lastRow != "") {
			document.getElementById(this._lastRow).removeAttribute("class");
		}

		if (htmlTarget.localName == "td") {
			this._currentRow = htmlTarget.parentNode.id;
		} else if (htmlTarget.localName == "tr") {
			this._currentRow = htmlTarget.id;
		}

		this._currentVariableName = document.getElementById(
			this._currentRow,
		).children[0].textContent;

		document
			.getElementById(this._currentRow)
			.setAttribute("class", "row-selected");

		this._lastRow = this._currentRow;
	}

	#insertSelectedRowTextOnInputs(rowId) {
		let allTds = document.getElementById(rowId).children;
		for (let i = 0; i < allTds.length; i++) {
			document.getElementById("dico-inputs").children[i].value =
				allTds[i].textContent;
		}
	}

	/**
	 * Permet de mettre à jour la liste des
	 * types de l'objet Type, si le type ajouté n'est
	 * pas déjà présent.
	 * @param {String} type
	 */
	#updateTypeList(type) {
		if (!Type.allTypes.includes(type)) {
			Type.allTypes.push(type);
		}
	}

	#updateVariableNameInAlgo() {
		let allTds = document.getElementById(this._currentRow).children;
		document
			.querySelector("editeur-interface")
			._planActif.renameInformation(
				this._currentRow,
				allTds[0].textContent,
			);

		this._mesInformations.forEach((element) => {
			if (element._nom == this._currentVariableName) {
				document
					.querySelector("editeur-interface")
					._planActif.renameInformation(
						element._nom,
						allTds[0].textContent,
					);

				element._nom = allTds[0].textContent;

				if (allTds[1].textContent !== "Non Défini") {
					element._type = allTds[1].textContent;
					this.#updateTypeList(element._type);

					// TODO: A voir avec Jokin
					delete this._matchType[this._currentVariableName];
					//this._matchType[this._currentVariableName] = undefined;
					this._matchType[element._nom] = allTds[1].textContent;
				}

				if (allTds[2].textContent !== "Non Défini") {
					element._signification = allTds[2].textContent;
					// TODO: A voir avec Jokin
					delete this._matchSignification[this._currentVariableName];
					/*this._matchSignification[this._currentVariableName] =
						undefined;*/
					this._matchSignification[element._nom] =
						allTds[2].textContent;
				}
			}
		});

		this.fermer();
		this.ouvrir();
	}

	#updateSelectedRowValues() {
		let allTds = document.getElementById(this._currentRow).children;
		for (let i = 0; i < allTds.length; i++) {
			allTds[i].textContent =
				document.getElementById("dico-inputs").children[i].value;
		}
	}

	#removeVariable() {
		document
			.querySelector("plan-travail")
			.renameInformation(this._currentVariableName, this.VARIABLE_SUPPR);

		// Nettoyage du dictionnaire
		delete this._matchType[this._currentVariableName];
		delete this._matchSignification[this._currentVariableName];

		this._mesInformations.splice(
			this._mesInformations.findIndex(
				(info) => info._nom === this._currentVariableName,
			),
			1,
		);

		this.#resetInputsText();
		this.fermer();
		this.ouvrir();
	}

	#resetInputsText() {
		for (
			let i = 0;
			i < document.getElementById("dico-inputs").children.length;
			i++
		) {
			document.getElementById("dico-inputs").children[i].value = "";
		}
	}

	#launchListeners() {
		setTimeout(() => {
			this._closeBtn = document.getElementById("dico-close");
			this._closeBtn.addEventListener("click", (e) => {
				e.stopPropagation();
				this.fermer();
			});

			this._refreshBtn = document.getElementById("dico-refresh");
			this._refreshBtn.addEventListener("click", (e) => {
				e.stopPropagation();
				setTimeout(() => {
					this.fermer();
					this.ouvrir();
				}, 200);
			});

			this._tableBody = document.querySelector("#dico-table>tbody");
			this._tableBody.addEventListener("click", (e) => {
				this.#handleSelectedRow(e.target);
				this.#insertSelectedRowTextOnInputs(this._currentRow);
			});

			this._validInputs = document.getElementById("valid-inputs");
			this._validInputs.addEventListener("click", () => {
				this.#updateSelectedRowValues();
				this.#updateVariableNameInAlgo();
				this.#resetInputsText();

				// Suppression des bordures sur la ligne sélectionnée
				document
					.getElementById(this._currentRow)
					.removeAttribute("class");
			});

			this._removeInputs = document.getElementById("remove-inputs");
			// TODO: Voir avec jokin pour virer css min-width ligne 1578 (bug d'affichage)
			this._removeInputs.addEventListener("click", () => {
				this.#removeVariable();
			});
		}, 500);
	}

	// METHODES
	ouvrir() {
		if (this._estOuvert) {
			this.fermer();
		} else {
			this.style.transform = "scale(1)";
			document.querySelector("bibliotheque-algorithmique").fermer();
			document.getElementById("dico_wrapper").style.zIndex = 200;
			document
				.querySelector("editeur-interface")
				._planActif.effectuerDictionnaireDesDonnee();

			this.classList.add("ouvert");
			this._tableBody.innerHTML = "";
			this.genererDictionnaire();
			this._estOuvert = true;
		}
	}

	fermer() {
		this.style.transform = "scale(0)";
		document.getElementById("dico_wrapper").style.zIndex = -200;
		document.getElementById("biblio_btn").removeAttribute("disabled");
		this.classList.remove("ouvert");
		this._estOuvert = false;
	}

	genererDictionnaire() {
		let index = 0;
		for (let info of this._mesInformations) {
			const clone = this._template.content.cloneNode(true);

			let tr = clone.querySelector("tr");
			tr.setAttribute("id", `var_${index}`);
			let td = clone.querySelectorAll("td");

			td[0].textContent = `${info._nom}`;
			if (this._matchType[info._nom] != undefined) {
				td[1].textContent = this._matchType[info._nom];
			} else {
				td[1].textContent = "Non défini";
			}

			if (this._matchSignification[info._nom] != undefined) {
				td[2].textContent = this._matchSignification[info._nom];
			} else {
				td[2].textContent = "Non défini";
			}

			this._tableBody.appendChild(clone);
			index++;
		}

		Type.allTypes.forEach((type) => {
			this.querySelector(
				"datalist",
			).innerHTML += `<option value="${type}"></option>`;
		});
	}

	AjouterUneVariable(uneInformation) {
		if (uneInformation._nom == this.VARIABLE_SUPPR) {
			return false;
		}
		let reussis = false;
		const nameInformation = uneInformation._nom.trim();
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

	retirerInformationsAbsentes(listeInformations) {
		for (let info of this._mesInformations) {
			if (!listeInformations.includes(info)) {
				this.retirerUneInformation(info._nom);
			}
		}
	}

	retirerUneInformation(nameVariable) {
		this._mesInformations = this._mesInformations.filter(
			(element) => element._nom != nameVariable,
		);
		return true;
	}

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
	containInformation(nameInformation) {
		let trouver = false;
		this._mesInformations.forEach((element) => {
			if (element._nom == nameInformation) {
				trouver = true;
			}
		});
		return trouver;
	}
	getInformation(nameInformation) {
		const foundElement = this._mesInformations.find(
			(element) => element._nom === nameInformation,
		);
		return foundElement;
	}
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

	nomCorrecte(nameVariable) {
		let regex = /^[a-zA-Z0-9\-\_]{1,60}$/g;
		return regex.test(nameVariable.trim());
	}

	suppressionDonneeInutiliser() {
		this._mesInformations = this._mesInformations.filter((element) => {
			return (
				element._type != undefined ||
				(element._signification != undefined &&
					element._signification != "")
			);
		});
	}

	suppressionTout() {
		this._mesInformations = [];
	}

	toJSON() {
		return {
			typeElement: "DictionnaireDonnee",
			types: this._matchType,
			signification: this._matchSignification,
		};
	}

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

	chargerDepuisJSON(json) {
		this._matchType = json.types;
		this._matchSignification = json.signification;
	}

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
