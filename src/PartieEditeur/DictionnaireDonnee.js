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

		this._errorNameMsg = "";
		this._lastErrorMsg = "";
		this._errorTypeMsg = "";
		this._errorSignificationMsg = "";
		this._currentRow = "";
		this._inputsValid = [true, true, true];
		this._currentVariableName = "";
		this._lastRow = "";

		this._template = document.getElementById("dico-row");
		this.#createHtmlTable();
		this.#launchListeners();
	}

	/**
	 * Permet de créer dynamiquement la structure
	 * HTML du dictionnaire.
	 */
	#createHtmlTable() {
		this.innerHTML = `
		<div id="dico-main">
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
		</div>
		<div id="dico-inputs">
			<div id="dico-wrapper">
				<div id="dico-first-inputs">
					<label>
						Nom
						<input id="inputs-name" type="text" name="" minlength="1" placeholder="Nom">
					</label>
					<label>
						Type
						<input id="inputs-type" type="search" list="primitives" name="" minlength="1" placeholder="Type">
					</label>
				</div>
				<label>
					Signification
					<input id="inputs-signification" type="text" name="" minlength="1" placeholder="Signification">
				</label>
				<datalist id="primitives"></datalist>
			</div>
			<p id="inputs-error" class="error-msg"></p>
            <div id="dico-buttons">
				<button id="valid-inputs" disabled class="secondaryButton" title="Valider vos modifications">Modifier</button>
				<button id="remove-inputs" class="secondaryButton" title="Supprimer la variable">Supprimer</button>
				<button id="cancel-remove" style="display: none" title="Annuler la suppression">Annuler</button>
				<button id="valid-remove" style="display: none" title="Valider la suppression">Ok</button>
			</div>
        </div>`;
	}

	/**
	 * Permet de récupérer l'id de l'élément
	 * HTML sélectionné par l'utilisateur.
	 * L'élément représente une variable de l'algorithme.
	 * @param {HTMLElement} htmlTarget
	 */
	#handleSelectedRow(htmlTarget) {
		if (this._lastRow != "") {
			document
				.getElementById(this._lastRow)
				.classList.remove("row-selected");
		}

		if (htmlTarget.localName == "td") {
			this._currentRow = htmlTarget.parentNode.id;
		} else if (htmlTarget.localName == "tr") {
			this._currentRow = htmlTarget.id;
		}

		this._currentVariableName = document.getElementById(
			this._currentRow,
		).children[0].textContent;

		document.getElementById(this._currentRow).classList.add("row-selected");

		this._lastRow = this._currentRow;
		this._lastErrorMsg = "";
		document.getElementById("inputs-error").textContent =
			this._lastErrorMsg;
	}

	/**
	 * Permet de préremplir les inputs du dictionnaire
	 * avec les informations de la variable sélectionnée.
	 */
	#insertSelectedRowTextOnInputs(rowId) {
		let allTds = document.getElementById(rowId).children;
		let allInputs = document.querySelectorAll("div#dico-wrapper input");

		for (let i = 0; i < allTds.length; i++) {
			allInputs[i].value = allTds[i].textContent;
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

	/**
	 * Permet de mettre à jour le type de l'information.
	 * @param {String} type
	 * @param {Information} information
	 */
	#updateTypeInformation(type, information) {
		if (type !== "Non Défini") {
			information._type = type;
			this.#updateTypeList(information._type);
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
		// document
		// 	.querySelector("editeur-interface")
		// 	._planActif.renameInformation(
		// 		this._currentRow,
		// 		allTds[0].textContent,
		// 	);

		// console.log(allTds[0].textContent);

		this._mesInformations.forEach((element) => {
			console.log(element._nom == this._currentVariableName);

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
		let allInputs = document.querySelectorAll("div#dico-wrapper input");
		for (let i = 0; i < allTds.length; i++) {
			allTds[i].textContent = allInputs[i].value;
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
		let allInputs = document.querySelectorAll("div#dico-wrapper input");
		for (let i = 0; i < allInputs.length; i++) {
			allInputs[i].value = "";
		}
	}

	/**
	 * Permet de déverrouiller le bouton de validation
	 */
	#enableValidBtn() {
		if (this._validInputs != undefined) {
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
	 *
	 * @param {String} value
	 */
	#checkNameInput(value) {
		let regex = /^[a-zA-Z][a-zA-Z0-9\_]{2,60}$/g;
		if (regex.test(value)) {
			this._inputsValid[0] = true;
			this._errorNameMsg = "";
		} else {
			this._inputsValid[0] = false;
			this._errorNameMsg =
				"Le nom doit comporté entre 2 et 60 caractères, ne peut contenir de lettres accentuées, d'espaces, et caractères spéciaux sauf _ ";
		}
	}

	/**
	 *
	 * @param {String} value
	 */
	#checkTypeInput(value) {
		let regex = /^[a-zA-Zéùàèïêç ]{2,70}$/g;
		if (regex.test(value)) {
			this._inputsValid[1] = true;
			this._errorTypeMsg = "";
		} else {
			this._inputsValid[1] = false;
			this._errorTypeMsg =
				"Le type ne peut pas contenir de nombre et de caractères spéciaux";
		}
	}

	/**
	 *
	 * @param {String} value
	 */
	#checkSignificationInput(value) {
		if (value.trim() != "") {
			this._inputsValid[2] = true;
			this._errorSignificationMsg = "";
		} else {
			this._inputsValid[2] = false;
			this._errorSignificationMsg =
				"La signification ne peut pas être vide";
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
			this.#checkTypeInput(e.target.value);
			document.getElementById("inputs-error").textContent =
				this._errorTypeMsg;
			this._lastErrorMsg = this._errorTypeMsg;
			this.#checkInputsAreValid();
		});

		this._inputType.addEventListener("focus", (e) => {
			this.#checkTypeInput(e.target.value);
			document.getElementById("inputs-error").textContent =
				this._errorTypeMsg;
			this._lastErrorMsg = this._errorTypeMsg;
			this.#checkInputsAreValid();
		});
	}

	/**
	 * Permet de lancer l'écouteur d'évenment sur l'input
	 * dédié à la modification de la signification de la variable.
	 */
	#launchInputSignificationListener() {
		this._inputSignification.addEventListener("input", (e) => {
			this.#checkSignificationInput(e.target.value);
			document.getElementById("inputs-error").textContent =
				this._errorSignificationMsg;
			this._lastErrorMsg = this._errorSignificationMsg;
			this.#checkInputsAreValid();
		});

		this._inputSignification.addEventListener("focus", (e) => {
			this.#checkSignificationInput(e.target.value);
			document.getElementById("inputs-error").textContent =
				this._errorSignificationMsg;
			this._lastErrorMsg = this._errorSignificationMsg;
			this.#checkInputsAreValid();
		});
	}

	/**
	 * Permet de lancer l'écouteur d'évenment sur l'input
	 * dédié à la modification du nom de la variable.
	 */
	#launchInputNameListener() {
		this._inputName.addEventListener("input", (e) => {
			this.#checkNameInput(e.target.value);
			document.getElementById("inputs-error").textContent =
				this._errorNameMsg;
			this._lastErrorMsg = this._errorNameMsg;
			this.#checkInputsAreValid();
		});

		this._inputName.addEventListener("focus", (e) => {
			this.#checkNameInput(e.target.value);
			document.getElementById("inputs-error").textContent =
				this._errorNameMsg;
			this._lastErrorMsg = this._errorNameMsg;
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
			document
				.getElementById(this._currentRow)
				.classList.remove("row-selected");
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
			this._validRemove = document.getElementById("valid-remove");
			this._cancelRemove = document.getElementById("cancel-remove");
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
				this.#checkNameInput(this._inputName.value);
				this.#checkInputsAreValid();
			});

			this.#launchValidBtnListener();
			this._removeInputs.addEventListener("click", () => {
				document
					.getElementById("inputs-error")
					.removeAttribute("class");
				document.getElementById("inputs-error").textContent =
					"Voulez-vous vraiment supprimer cette variable ?";
				this._validInputs.style.display = "none";
				this._removeInputs.style.display = "none";
				this._validRemove.style.display = "flex";
				this._cancelRemove.style.display = "flex";
			});

			this._validRemove.addEventListener("click", () => {
				this.#removeVariable();
				this._validInputs.style.display = "flex";
				this._removeInputs.style.display = "flex";
				this._validRemove.style.display = "none";
				this._cancelRemove.style.display = "none";
				document.getElementById("inputs-error").textContent =
					this._lastErrorMsg;
				document
					.getElementById("inputs-error")
					.setAttribute("class", "error-msg");
			});

			this._cancelRemove.addEventListener("click", () => {
				this._validInputs.style.display = "flex";
				this._removeInputs.style.display = "flex";
				this._validRemove.style.display = "none";
				this._cancelRemove.style.display = "none";
				document.getElementById("inputs-error").textContent =
					this._lastErrorMsg;
				document
					.getElementById("inputs-error")
					.setAttribute("class", "error-msg");
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
		this.#resetInputsText();
		this._lastErrorMsg = "";
		document.getElementById("inputs-error").textContent =
			this._lastErrorMsg;
	}

	/**
	 * Permet de générer le dictionnaire de données
	 * à partir des variables définies dans l'algorithme
	 * et stockées dans this._mesInformations.
	 */
	genererDictionnaire() {
		let index = 0;
		this._mesInformations.sort((a, b) => a._nom.localeCompare(b._nom));

		console.log(this._matchType);

		for (let info of this._mesInformations) {
			const clone = this._template.content.cloneNode(true);

			let tr = clone.querySelector("tr");
			tr.setAttribute("id", `var_${index}`);
			tr.setAttribute("class", "good-name");
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

			if (!this.nomCorrecte(info._nom)) {
				tr.classList.remove("good-name");
				tr.classList.add("wrong-name");
				tr.classList.add("input-tooltip");
				tr.setAttribute(
					"data-title",
					"Le nom doit comporté entre 2 et 60 caractères, ne peut contenir de lettres accentuées, d'espaces, et caractères spéciaux sauf _ ",
				);
			}

			this._tableBody.appendChild(clone);
			index++;
		}

		for (const [key, value] of Object.entries(this._matchType)) {
			if (
				this._mesInformations.find((elm) => elm._nom == key) ==
				undefined
			) {
				delete this._matchType[key];
				delete this._matchSignification[key];
			}
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
			if (this.containInformation(nameInformation)) {
				const ancienType = this.getInformation(nameInformation)._type;
				const nouveauType = uneInformation._type;
				const resultType = this.convertionVariable(
					nouveauType,
					ancienType,
				);
				if (this.getInformation(nameInformation)._type != resultType) {
					this.changeType(uneInformation._nom, resultType);
				}
			} else {
				this._mesInformations.push(uneInformation);
				reussis = true;
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
		let regex = /^[a-zA-Z][a-zA-Z0-9\-\_]{2,60}$/g;
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
