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
	_inputsValid = [];

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
		this._inputName;
		this._inputType;
		this._inputSignification;

		this._errorMsg = "";
		this._currentRow = "";
		this._inputsValid = [true, true, true];
		this._currentVariableName = "";
		this._lastRow = "";

		this._template = document.getElementById("dico-row");
		this.#createHtmlTable();
		this.#launchListeners();

		this._matchSignification = {};
		this._matchType = {};
	}

	/**
	 * Permet de créer dynamiquement la structure
	 * HTML du dictionnaire.
	 */
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
			<input id="inputs-name" type="text" name="" minlength="1" placeholder="Nom">
            <input id="inputs-type" type="search" list="primitives" name="" minlength="1" placeholder="Type">
            <input id="inputs-signification" type="text" name="" minlength="1" placeholder="Signification">
			<datalist id="primitives"></datalist>
            <button id="valid-inputs" title="Valider vos modifications"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></button>
			<button id="remove-inputs" title="Supprimer la variable"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
        </div>
		<p id="inputs-error"></p>`;
	}

	/**
	 * Permet de récupérer l'id de l'élément
	 * HTML sélectionné par l'utilisateur.
	 * L'élément représente une variable de l'algorithme.
	 * @param {HTMLElement} htmlTarget
	 */
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

	/**
	 * Permet de préremplir les inputs du dictionnaire
	 * avec les informations de la variable sélectionnée.
	 */
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
			console.log(Type.allTypes);

			Type.allTypes.push(type);
		}
	}

	/**
	 * Permet de mettre à jour le type de l'information.
	 * @param {String} type
	 * @param {Information} information
	 */
	#updateTypeInformation(type, information) {
		if (type !== "Non Défini") {
			information._type = type;
			this.#updateTypeList(information._type);
			// TODO: A voir avec Jokin
			delete this._matchType[this._currentVariableName];
			this._matchType[information._nom] = type;
		}
	}

	/**
	 * Permet de mettre à jour la signification de l'information.
	 * @param {String} signification
	 * @param {Information} information
	 */
	#updateSignificationInformation(signification, information) {
		if (signification !== "Non Défini") {
			information._signification = signification;
			// TODO: A voir avec Jokin
			delete this._matchSignification[this._currentVariableName];
			this._matchSignification[information._nom] = signification;
		}
	}

	/**
	 * Permet de mettre à jour la variable après modification
	 * dans l'algorithme.
	 */
	#updateVariableInAlgo() {
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
				this.#updateTypeInformation(allTds[1].textContent, element);
				this.#updateSignificationInformation(
					allTds[2].textContent,
					element,
				);
			}
		});

		this.fermer();
		this.ouvrir();
	}

	/**
	 * Permet de nettoyer les proprétées inutilisées
	 * du dictionnaire.
	 */
	#cleanDictionaryData() {
		delete this._matchType[this._currentVariableName];
		delete this._matchSignification[this._currentVariableName];
	}

	/**
	 * Permet de mettre à jour la variable séléectionnée
	 * avec les informations saisies par l'utilisateur.
	 */
	#updateSelectedRowValues() {
		let allTds = document.getElementById(this._currentRow).children;
		for (let i = 0; i < allTds.length; i++) {
			allTds[i].textContent =
				document.getElementById("dico-inputs").children[i].value;
		}
	}

	/**
	 * Permet de supprimer une variable, dans le dictionnaire
	 * mais aussi au niveau de l'algorithme.
	 */
	#removeVariable() {
		document
			.querySelector("plan-travail")
			.renameInformation(this._currentVariableName, this.VARIABLE_SUPPR);

		this.#cleanDictionaryData();
		console.log(this._currentVariableName);

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

	/**
	 * Permet de réinitialiser les inputs du dictionnaire
	 * en effaçant les données de chaque inputs.
	 */
	#resetInputsText() {
		for (
			let i = 0;
			i < document.getElementById("dico-inputs").children.length;
			i++
		) {
			document.getElementById("dico-inputs").children[i].value = "";
		}
	}

	/**
	 * Permet de déverrouiller le bouton de validation
	 */
	#enableValidBtn() {
		if (this._validInputs != undefined) {
			console.log("enable");

			this._validInputs.removeAttribute("disabled");
		}
	}

	/**
	 * Permet de verrouiller le bouton de validation
	 */
	#disableValidBtn() {
		if (this._validInputs != undefined) {
			this._validInputs.setAttribute("disabled", true);
		}
	}

	/**
	 * Permet de vérifier si tout les inputs du dictionnaire
	 * sont conforme au format que l'application attend.
	 * Format défini par des regex.
	 * Si conforme alors on déverrouille le bouton de validation,
	 * Sinon on le verrouille.
	 */
	#checkInputsAreValid() {
		if (this._inputsValid.includes(false)) {
			this.#disableValidBtn();
		} else {
			this.#enableValidBtn();
		}
	}

	/**
	 * Permet de mettre à jour la liste des types
	 * proposée à l'utilisateur dans le champ réservé
	 * à la définition du type de la variable.
	 */
	#populateTypeChoice() {
		this.querySelector("datalist").innerHTML = "";

		Type.allTypes.forEach((type) => {
			this.querySelector(
				"datalist",
			).innerHTML += `<option value="${type}"></option>`;
		});
	}

	/**
	 * Permet de lancer l'écouteur d'évenment sur l'input
	 * dédié à la modification du type de la variable.
	 */
	#launchInputTypeListener() {
		this._inputType.addEventListener("input", (e) => {
			let regex = /^[a-zA-Zéùàèïêç ]{2,70}$/g;
			if (regex.test(e.target.value)) {
				this._inputsValid[1] = true;
				document.getElementById("inputs-error").textContent = "";
			} else {
				this._inputsValid[1] = false;
				this._errorMsg =
					"Le type ne peut pas contenir de nombre et de caractères spéciaux";
				document.getElementById("inputs-error").textContent =
					this._errorMsg;
			}

			this.#checkInputsAreValid();
		});
	}

	/**
	 * Permet de lancer l'écouteur d'évenment sur l'input
	 * dédié à la modification de la signification de la variable.
	 */
	#launchInputSignificationListener() {
		this._inputSignification.addEventListener("input", (e) => {
			if (e.target.value.trim() != "") {
				this._inputsValid[2] = true;
				document.getElementById("inputs-error").textContent = "";
			} else {
				this._inputsValid[2] = false;
				this._errorMsg = "La signification ne peut pas être vide";
				document.getElementById("inputs-error").textContent =
					this._errorMsg;
			}

			this.#checkInputsAreValid();
		});
	}

	/**
	 * Permet de lancer l'écouteur d'évenment sur l'input
	 * dédié à la modification du nom de la variable.
	 */
	#launchInputNameListener() {
		this._inputName.addEventListener("input", (e) => {
			let regex = /^[a-zA-Z0-9\-\_]{2,60}$/g;
			if (regex.test(e.target.value)) {
				this._inputsValid[0] = true;
				document.getElementById("inputs-error").textContent = "";
			} else {
				this._inputsValid[0] = false;
				this._errorMsg =
					"Le nom ne peut pas contenir de lettres accentuées, d'espaces, et caractères spéciaux sauf - et _ ";
				document.getElementById("inputs-error").textContent =
					this._errorMsg;
			}

			this.#checkInputsAreValid();
		});
	}

	/**
	 * Permet de lancer l'écouteur d'évenment sur le
	 * bouton dédié à la validation de la modification
	 * d'une variable.
	 */
	#launchValidBtnListener() {
		this._validInputs.addEventListener("click", () => {
			this.#updateSelectedRowValues();
			this.#updateVariableInAlgo();
			this.#resetInputsText();

			// Suppression des bordures sur la ligne sélectionnée
			document.getElementById(this._currentRow).removeAttribute("class");
		});
	}

	/**
	 * Permet de déclencher tout les écouteurs d'évenements
	 * liés au différents éléments HTML du dictionnaire afin
	 * de mettre à jour dynamiquement ses données.
	 */
	#launchListeners() {
		setTimeout(() => {
			this._closeBtn = document.getElementById("dico-close");
			this._refreshBtn = document.getElementById("dico-refresh");
			this._tableBody = document.querySelector("#dico-table>tbody");
			this._validInputs = document.getElementById("valid-inputs");
			this._removeInputs = document.getElementById("remove-inputs");
			this._inputName = document.getElementById("inputs-name");
			this._inputType = document.getElementById("inputs-type");
			this._inputSignification = document.getElementById(
				"inputs-signification",
			);

			this._closeBtn.addEventListener("click", (e) => {
				e.stopPropagation();
				this.fermer();
			});

			this._refreshBtn.addEventListener("click", (e) => {
				e.stopPropagation();
				setTimeout(() => {
					this.fermer();
					this.ouvrir();
				}, 200);
			});

			this._tableBody.addEventListener("click", (e) => {
				this.#handleSelectedRow(e.target);
				this.#insertSelectedRowTextOnInputs(this._currentRow);
			});

			this.#launchValidBtnListener();
			// TODO: Voir avec jokin pour virer css min-width ligne 1578 (bug d'affichage)
			this._removeInputs.addEventListener("click", () => {
				if (
					window.confirm(
						"Voulez-vous vraiment supprimer cette variable?",
					)
				) {
					this.#removeVariable();
				}
			});

			this.#launchInputNameListener();
			this.#launchInputTypeListener();
			this.#launchInputSignificationListener();
		}, 500);
	}

	/**
	 * Permet d'ouvrir le dictionnaire de données,
	 * il sera alors construit et généré à la volée.
	 */
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

	/**
	 * Permet de fermer le dictionnaire.
	 */
	fermer() {
		this.style.transform = "scale(0)";
		document.getElementById("dico_wrapper").style.zIndex = -200;
		document.getElementById("biblio_btn").removeAttribute("disabled");
		this.classList.remove("ouvert");
		this._estOuvert = false;
	}

	/**
	 * Permet de générer le dictionnaire de données
	 * à partir des variables définies dans l'algorithme
	 * et stockées dans this._mesInformations.
	 */
	genererDictionnaire() {
		if (!this._matchType) this._matchType = {};
		if (!this._matchSignification) this._matchSignification = {};

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

		this.#populateTypeChoice();
	}

	/**
	 * Permet d'ajouter une nouvelle information, en
	 * s'assurant que son nom et son type sont correct.
	 * @param {Information} uneInformation
	 * @returns Boolean
	 */
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

	/**
	 * Permet de retirer les informations absentes pour
	 * nettoyer le tableau des informations qui ne sont plus
	 * utilisés
	 * @param {Array<Information>} listeInformations
	 */
	retirerInformationsAbsentes(listeInformations) {
		for (let info of this._mesInformations) {
			if (!listeInformations.includes(info)) {
				this.retirerUneInformation(info._nom);
			}
		}
	}

	/**
	 * Permet avec le nom d'une information de la retirer
	 * du tableau this._mesInformations.
	 * @param {String} nameVariable
	 * @returns Boolean
	 */
	retirerUneInformation(nameVariable) {
		this._mesInformations = this._mesInformations.filter(
			(element) => element._nom != nameVariable,
		);
		return true;
	}

	/**
	 * Permet de vérifier si les types passés en paramètres
	 * sont compatibles avec les types acceptés par l'application.
	 * @param {String} type1
	 * @param {String} type2
	 * @returns Boolean
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
	 *
	 * @param {Information} informationUne
	 * @param {Information} InformationDeux
	 * @returns
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
	 *
	 * @param {String} type1
	 * @param {String} type2
	 * @returns
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
	 *
	 * @param {String} nameInformation
	 * @returns Boolean
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
	 *
	 * @param {String} nameInformation
	 * @returns Information
	 */
	getInformation(nameInformation) {
		const foundElement = this._mesInformations.find(
			(element) => element._nom === nameInformation,
		);
		return foundElement;
	}

	/**
	 *
	 * @param {String} nameVariable
	 * @param {String} newName
	 * @returns Boolean
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
	 *
	 * @param {String} nameVariable
	 * @param {String} nouvelleSignification
	 * @returns Boolean
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
	 *
	 * @param {String} nameVariable
	 * @param {String} newType
	 * @returns
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
	 *
	 * @param {String} nameVariable
	 * @returns Boolean
	 */
	nomCorrecte(nameVariable) {
		let regex = /^[a-zA-Z0-9\-\_]{1,60}$/g;
		return regex.test(nameVariable.trim());
	}

	/**
	 *
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
	 *
	 */
	suppressionTout() {
		this._mesInformations = [];
	}

	/**
	 *
	 * @returns
	 */
	toJSON() {
		return {
			typeElement: "DictionnaireDonnee",
			types: this._matchType,
			signification: this._matchSignification,
		};
	}

	/**
	 * Permet d'exporter le dictionnaire de données
	 * au format souhaité. Le type de format souhaité
	 * est passé en paramètre sous forme de chaine de caractères
	 * @param {String} format
	 */
	exporter(format) {
		switch (format.toLowerCase()) {
			case "csv":
				// On crée le contenu du fichier
				var contenuTexte = "Nom;Type;Signification\n";
				this.ouvrir();
				this.fermer();

				this._mesInformations.forEach((info) => {
					contenuTexte += `${info._nom};${
						this._matchType[info._nom]
							? this._matchType[info._nom]
							: "Non défini"
					};${
						this._matchSignification[info._nom]
							? this._matchSignification[info._nom]
							: "Non défini"
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
					contenuTexte += `${info._nom};${
						this._matchType[info._nom]
							? this._matchType[info._nom]
							: "Non défini"
					};${
						this._matchSignification[info._nom]
							? this._matchSignification[info._nom]
							: "Non défini"
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
	 *
	 * @param {JSON} json
	 */
	chargerDepuisJSON(json) {
		this._matchType = json.types;
		this._matchSignification = json.signification;
	}

	/**
	 *
	 * @param {String} csvString
	 * @returns
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
