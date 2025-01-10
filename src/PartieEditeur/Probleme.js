/**
 * @classdesc Classe Probleme l'élément de base d'un algorithme
 * @description Crée une instance de Probleme.
 * @class Probleme
 * @extends {ElementGraphique}
 */
class Probleme extends ElementGraphique {
	// ATTRIBUTS
	_libelle; // String
	_listeDonnes; // Liste d'Information
	_listeResultats; // Liste d'Information
	_elemParent; // ElementParent (liste des enfants)
	_editeur = document.querySelector("editeur-interface"); // Editeur
	_sousPlan = null; // SousPlanTravail

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @type {Information}
	 * @type {ElementParent}
	 * @param {number} [abscisse=0] l'abscisse
	 * @param {number} [ordonnee=0] l'ordonnée
	 * @param {string} [libelle=""] le libéllé du Problem
	 * @param {Array<Information>} [listeDonnes=[]] Pas Utilisé
	 * @param {Array<Information>} [listeResultats=[]] Pas Utilisé
	 * @param {ElementParent} [elemParent=new ElementParent()] L'ElementParent du Probleme
	 */
	constructor(
		abscisse = 0,
		ordonnee = 0,
		libelle = "",
		listeDonnes = [],
		listeResultats = [],
		elemParent = new ElementParent(),
	) {
		super(abscisse, ordonnee);
		this._libelle = libelle;
		this._listeDonnes = listeDonnes;
		this._listeResultats = listeResultats;
		this._elemParent = elemParent;
		if (this._elemParent != null) {
			elemParent._proprietaire = this;
		}

		this.addEventListener("mousemove", function (e) {
			// update les liens vers les enfants
			this._elemParent._listeElementsEnfants.forEach((lien) => {
				lien.ligne.update();
			});
		});
	}

	// ENCAPSULATION
	/**
	 * @description Renvoie la valeur de la variable _libelle
	 *
	 * @type {string}
	 */
	get libelle() {
		return this.divNom.textContent;
	}

	/**
	 * @description Définie la valeur de la variable _libelle par la valeur donné
	 */
	set libelle(value) {
		this.divNom.innerText = value;
	}

	/**
	 * @description Renvoie la valeur de la variable _listeDonnes
	 *
	 *
	 */
	get listeDonnes() {
		return this.divDonneesEditable.innerText.split(",");
	}

	/**
	 * @description Définie la valeur de la variable _listeDonnes par la valeur donné
	 *
	 * @deprecated
	 */
	set listeDonnes(value) {
		this.divDonneesEditable.innerText = value;
	}

	/**
	 * @description Renvoie la valeur de la variable _listeResultats
	 *
	 *
	 */
	get listeResultats() {
		return this.divResultatsEditable.innerText.split(",");
	}

	/**
	 * @description Définie la valeur de la variable _listeResultats par la valeur donné
	 *
	 * @deprecated
	 */
	set listeResultats(value) {
		this.divResultatsEditable.innerText = value;
	}

	/**
	 * Renvoie la valeur de la variable _elemParent
	 *
	 * @type {*}
	 */
	get _elemParent() {
		return this._elemParent;
	}

	/**
	 * @description Définie la valeur de la variable _libelle par la valeur donné
	 */
	set _elemParent(value) {
		this._elemParent = value;
	}

	/**
	 * @description Retourne le contenu du probleme Texte Principale
	 *
	 * @returns {string} Les information de la boîte
	 */

	getTexte() {
		return this.querySelector(".nom").textContent;
	}

	replaceTexte(chaineAChercher, chaineARemplacer) {
		this.querySelector(".nom").textContent = this.querySelector(
			".nom",
		).textContent.replace(
			new RegExp("\\b" + chaineAChercher + "\\b", "g"),
			chaineARemplacer,
		);
	}

	/**
	 * @description Retourne les données du Probleme
	 *
	 * @returns {string} Les informations des données
	 */
	getDonnee() {
		return this.querySelector(".donneesEditable").textContent;
	}
	setDonnee(value) {
		this.querySelector(".donneesEditable").textContent = value;
	}
	replaceTexteDonnee(chaineAChercher, chaineARemplacer) {
		this.querySelector(".donneesEditable").textContent = this.querySelector(
			".donneesEditable",
		).textContent.replace(
			new RegExp("\\b" + chaineAChercher + "\\b", "g"),
			chaineARemplacer,
		);
	}
	/**
	 * @description Retourne les résultats du Probleme
	 *
	 * @returns {string} Les informations des résultats
	 */
	getResultat() {
		return this.querySelector(".resultatEditable").textContent;
	}
	setResultat(value) {
		this.querySelector(".resultatEditable").textContent = value;
	}
	replaceTexteResultat(chaineAChercher, chaineARemplacer) {
		this.querySelector(".resultatEditable").textContent =
			this.querySelector(".resultatEditable").textContent.replace(
				new RegExp("\\b" + chaineAChercher + "\\b", "g"),
				chaineARemplacer,
			);
	}

	updateAccolades() {
		if (this.divDonneesEditable.textContent == "") {
			for (let accolade of this.getElementsByClassName(
				"donnees",
			)[0].getElementsByClassName("accolades")) {
				accolade.style.display = "none";
				if (verbose) console.log("cacher les accolades");
			}
		} else {
			for (let accolade of this.getElementsByClassName(
				"donnees",
			)[0].getElementsByClassName("accolades")) {
				accolade.style.display = "";
				if (verbose) console.log("afficher les accolades");
			}
		}

		if (this.divResultatsEditable.textContent == "") {
			for (let accolade of this.getElementsByClassName(
				"resultat",
			)[0].getElementsByClassName("accolades")) {
				accolade.style.display = "none";
				if (verbose) console.log("cacher les accolades");
			}
		} else {
			for (let accolade of this.getElementsByClassName(
				"resultat",
			)[0].getElementsByClassName("accolades")) {
				accolade.style.display = "";
				if (verbose) console.log("afficher les accolades");
			}
		}
	}

	// METHODES

	/**
	 * @description Affiche le Problème à l'écran
	 */
	afficher() {
		let divContainerDPR = document.createElement("div");
		divContainerDPR.className = "containerDPR";
		this.appendChild(divContainerDPR);

		let divDonnees = document.createElement("div");
		divDonnees.className = "donnees";
		divContainerDPR.appendChild(divDonnees);

		let labelAccoladesGDonnes = document.createElement("label");
		labelAccoladesGDonnes.className = "accolades";
		labelAccoladesGDonnes.innerHTML = "{";
		labelAccoladesGDonnes.style.display = "none";
		divDonnees.appendChild(labelAccoladesGDonnes);

		this.divDonneesEditable = document.createElement("div");
		this.divDonneesEditable.className = "donneesEditable";
		this.divDonneesEditable.contentEditable = "true";
		let donneesAAjouter = "";
		this._listeDonnes.forEach((donnee) => {
			if (!donneesAAjouter == "") {
				donneesAAjouter += ",";
			}
			donneesAAjouter += donnee._nom;
		});
		this.divDonneesEditable.innerHTML = donneesAAjouter;
		this._listeDonnes = this.divDonneesEditable.innerHTML;
		divDonnees.appendChild(this.divDonneesEditable);

		let labelAccoladesDDonnes = document.createElement("label");
		labelAccoladesDDonnes.className = "accolades";
		labelAccoladesDDonnes.innerHTML = "}";
		labelAccoladesDDonnes.style.display = "none";
		divDonnees.appendChild(labelAccoladesDDonnes);

		this.divDonneesEditable.addEventListener("input", (e) => {
			if (verbose) console.log(e);
			if (this.divDonneesEditable.textContent == "") {
				for (let accolade of this.getElementsByClassName(
					"donnees",
				)[0].getElementsByClassName("accolades")) {
					accolade.style.display = "none";
					if (verbose) console.log("cacher les accolades");
				}
			} else {
				for (let accolade of this.getElementsByClassName(
					"donnees",
				)[0].getElementsByClassName("accolades")) {
					accolade.style.display = "";
					if (verbose) console.log("afficher les accolades");
				}
			}
		});
		this.divDonneesEditable.addEventListener("focusout", (e) => {
			if (this._listeDonnes == this.listeDonnes) return;
			this._editeur.ajouterEvenement(
				new EvenementEditionDonneesProbleme(
					this,
					this._listeDonnes,
					this.listeDonnes,
				),
			);
			this._listeDonnes = this.listeDonnes;
		});
		if (this.divDonneesEditable.textContent == "") {
			for (let accolade of this.getElementsByClassName(
				"donnees",
			)[0].getElementsByClassName("accolades")) {
				accolade.style.display = "none";
				if (verbose) console.log("cacher les accolades");
			}
		} else {
			for (let accolade of this.getElementsByClassName(
				"donnees",
			)[0].getElementsByClassName("accolades")) {
				accolade.style.display = "";
				if (verbose) console.log("afficher les accolades");
			}
		}

		this.divNom = document.createElement("div");
		this.divNom.className = "nom";
		this.divNom.contentEditable = "true";
		this.divNom.innerHTML = this._libelle;
		divContainerDPR.appendChild(this.divNom);

		this.divNom.addEventListener("focusout", (e) => {
			if (this._libelle == this.libelle) return;
			// Chercher dans le texte si il y a '<-' et si oui, le remplacer par '←'
			this.libelle = this.libelle.replace("<-", "←");
			if (verbose) console.log("Changement de libellé");
			// chercher dans le texte s'il y'a un a+= v par un a <- a + v
			let reg = /(\w+)\s*\+=\s*(\w+)/g;
			let match = reg.exec(this.libelle);
			if (match != null) {
				this.libelle = this.libelle.replace(
					match[0],
					match[1] + " ← " + match[1] + " + " + match[2],
				);
			}
			// chercher dans le texte s'il y'a un a-= v par un a <- a - v
			reg = /(\w+)\s*-=\s*(\w+)/g;
			match = reg.exec(this.libelle);
			if (match != null) {
				this.libelle = this.libelle.replace(
					match[0],
					match[1] + " ← " + match[1] + " - " + match[2],
				);
			}
			// chercher dans le texte s'il y'a un a*= v par un a <- a * v
			reg = /(\w+)\s*\*=\s*(\w+)/g;
			match = reg.exec(this.libelle);
			if (match != null) {
				this.libelle = this.libelle.replace(
					match[0],
					match[1] + " ← " + match[1] + " * " + match[2],
				);
			}
			// chercher dans le texte s'il y'a un a/= v par un a <- a / v*
			reg = /(\w+)\/=\s*(\w+)/g;
			match = reg.exec(this.libelle);
			if (match != null) {
				this.libelle = this.libelle.replace(
					match[0],
					match[1] + " ← " + match[1] + " / " + match[2],
				);
			}
			// chercher dans le texte s'il y'a un a++ en a <- a + 1
			reg = /(\w+)\+\+/g;
			match = reg.exec(this.libelle);
			if (match != null) {
				this.libelle = this.libelle.replace(
					match[0],
					match[1] + " ← " + match[1] + " + 1",
				);
			}
			// chercher dans le texte s'il y'a un a-- en a <- a - 1
			reg = /(\w+)--/g;
			match = reg.exec(this.libelle);
			if (match != null) {
				this.libelle = this.libelle.replace(
					match[0],
					match[1] + " ← " + match[1] + " - 1",
				);
			}
			this._editeur.ajouterEvenement(
				new EvenementEditionLibelleProbleme(
					this,
					this._libelle,
					this.libelle,
				),
			);
			this._libelle = this.libelle;
		});

		let divResultat = document.createElement("div");
		divResultat.className = "resultat";
		divContainerDPR.appendChild(divResultat);

		let labelAccoladesGResultats = document.createElement("label");
		labelAccoladesGResultats.className = "accolades";
		labelAccoladesGResultats.innerHTML = "{";
		labelAccoladesGResultats.style.display = "none";
		divResultat.appendChild(labelAccoladesGResultats);

		this.divResultatsEditable = document.createElement("div");
		this.divResultatsEditable.className = "resultatEditable";
		this.divResultatsEditable.contentEditable = "true";
		let resultatsAAjouter = "";
		this._listeResultats.forEach((resultat) => {
			if (!resultatsAAjouter == "") {
				resultatsAAjouter += ",";
			}
			resultatsAAjouter += resultat._nom;
		});
		this.divResultatsEditable.innerHTML = resultatsAAjouter;
		this._listeResultats = this.divResultatsEditable.innerHTML;
		divResultat.appendChild(this.divResultatsEditable);

		let labelAccoladesDResultats = document.createElement("label");
		labelAccoladesDResultats.className = "accolades";
		labelAccoladesDResultats.innerHTML = "}";
		labelAccoladesDResultats.style.display = "none";
		divResultat.appendChild(labelAccoladesDResultats);

		this.divResultatsEditable.addEventListener("input", (e) => {
			if (verbose) console.log(e);
			if (this.divResultatsEditable.textContent == "") {
				for (let accolade of this.getElementsByClassName(
					"resultat",
				)[0].getElementsByClassName("accolades")) {
					accolade.style.display = "none";
					if (verbose) console.log("cacher les accolades");
				}
			} else {
				for (let accolade of this.getElementsByClassName(
					"resultat",
				)[0].getElementsByClassName("accolades")) {
					accolade.style.display = "";
					if (verbose) console.log("afficher les accolades");
				}
			}
		});
		this.divResultatsEditable.addEventListener("focusout", (e) => {
			if (this._listeResultats == this.listeResultats) return;
			this._editeur.ajouterEvenement(
				new EvenementEditionResultatsProbleme(
					this,
					this._listeResultats,
					this.listeResultats,
				),
			);
			this._listeResultats = this.listeResultats;
		});
		if (this.divResultatsEditable.textContent == "") {
			for (let accolade of this.getElementsByClassName(
				"resultat",
			)[0].getElementsByClassName("accolades")) {
				accolade.style.display = "none";
				if (verbose) console.log("cacher les accolades");
			}
		} else {
			for (let accolade of this.getElementsByClassName(
				"resultat",
			)[0].getElementsByClassName("accolades")) {
				accolade.style.display = "";
				if (verbose) console.log("afficher les accolades");
			}
		}
	}

	/**
	 * @description Renvoie les informations de l'instance du Probleme sous forme JSON
	 *
	 * @type {ElementGraphique}
	 * @returns {JSON}
	 * @property {*} typeElement le type de l'ElementGraphique
	 * @property {number|string} abscisse l'abscisse
	 * @property {number|string} ordonee l'ordonnée
	 * @property {string} libelle Le libellée du Probleme
	 * @property {Array} listeDonnee obselète
	 * @property {Array} listeResultats obselète
	 * @property {ElementGraphique} enfants la liste des enfants directes
	 */
	toJSON() {
		if (this._sousPlan != null) {
			if (this._sousPlan.getProblemeLePlusHaut() != null) {
				if (
					this._sousPlan.getProblemeLePlusHaut().toJSON instanceof
					Function
				) {
					return {
						typeElement: this.constructor.name,
						abscisse: this._abscisse,
						ordonnee: this._ordonnee,
						libelle: this.libelle,
						listeDonnes: this.listeDonnes,
						listeResultats: this.listeResultats,
						enfants: this._sousPlan.getRelativeChildrenToTop(
							this._abscisse,
							this._ordonnee,
						),
						estDecomposeAilleurs: true,
					};
				}
			}
		}
		return {
			typeElement: this.constructor.name,
			abscisse: this._abscisse,
			ordonnee: this._ordonnee,
			libelle: this.libelle,
			listeDonnes: this.listeDonnes,
			listeResultats: this.listeResultats,
			enfants: this._elemParent.toJSON(),
		};
	}

	toJSONspecifier(listeElemEnfantsAConcerver) {
		return {
			typeElement: this.constructor.name,
			abscisse: this._abscisse,
			ordonnee: this._ordonnee,
			libelle: this.libelle,
			listeDonnes: this.listeDonnes,
			listeResultats: this.listeResultats,
			enfants: this._elemParent.toJSONspecifier(
				listeElemEnfantsAConcerver,
			),
		};
	}

	/**
	 * @description Renvoie l'arbres des enfants du Probleme par ordre
	 *
	 * @type {ElementGraphique}
	 * @param {ElementGraphique} [typeRechercher=ElementGraphique] Le type d'ElementGraphique recherché
	 * @returns {Array<typeRechercher>} La liste des enfants du type rechercher
	 */
	getEnfants(typeRechercher = ElementGraphique) {
		let listeDesEnfants = [];
		for (let enfant of this._elemParent._listeElementsEnfants) {
			listeDesEnfants.push(enfant.element);
		}
		listeDesEnfants = PlanTravail.FiltrerElementsGraphique(
			listeDesEnfants,
			typeRechercher,
		);
		return listeDesEnfants.sort((a, b) => a._abscisse - b._abscisse);
	}

	/**
	 * @description Méthodes principales qui recherchent les erreurs dans l'instance de Problème<br>
	 * Liste des Erreurs :<br>
	 * 1 : Sous-problème avec données magique<br>
	 * 2 : Données uniquement sur les problèmes<br>
	 * 3 : Résultat non utilisé dans la suite de l’algorithme<br>
	 * 9 : Pas un égal pour l’assignation mais une flèche<br>
	 * 12 : Plus de sept actions à la suite<br>
	 * 18 : Variable dynamique<br>
	 * @param {Array<AnomalieConceptuelle>} listeAnomaliesPrecedent la liste des anomalies présent dans les ElementGraphique précédant
	 * @returns {Array<AnomalieConceptuelle>} La liste précédante en rajoutant ce du Probleme actuelle
	 */
	rechercherAnomalies() {
		let mesAnomalies = [];
		// 1
		let donneesMagiques = ErreurDonneeMagique.detecterAnomalie(this);
		if (donneesMagiques[0]) {
			mesAnomalies.push(
				new ErreurDonneeMagique(this, donneesMagiques[1]),
			);
		}

		// 2
		let donneesInutilisees = ErreurDonneeInutilisee.detecterAnomalie(this);
		if (donneesInutilisees[0]) {
			mesAnomalies.push(
				new ErreurDonneeInutilisee(this, donneesInutilisees[1]),
			);
		}

		// 3
		let resultatsInutilisees =
			ErreurResultatInutilisee.detecterAnomalie(this);
		if (resultatsInutilisees[0]) {
			mesAnomalies.push(
				new ErreurResultatInutilisee(this, resultatsInutilisees[1]),
			);
		}

		// 9
		if (ErreurSyntaxeAssignation.detecterAnomalie(this)) {
			mesAnomalies.push(new ErreurSyntaxeAssignation(this));
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

		// 18
		let donneesDynamiqumentTypee =
			AvertissementDonneeDynamiquementTypee.detecterAnomalie(this);
		if (donneesDynamiqumentTypee[0]) {
			mesAnomalies.push(
				new AvertissementDonneeDynamiquementTypee(
					this,
					donneesDynamiqumentTypee[1],
				),
			);
		}

		return super.rechercherAnomalies(mesAnomalies);
	}

	/**
	 * @description Retourne les Donnees sous Formes d'informations
	 *
	 * @type {Information}
	 * @returns {Array<Information>} La liste des données du problèmes du type Information
	 */
	getInformationDonnee() {
		let listeDonnee = this.getDonnee().trim().split(",");
		let listeDonneeInformation = [];
		for (let Donnee of listeDonnee) {
			if (Donnee == "") {
				continue;
			}
			let i = new Information();
			i._nom = Donnee.trim();
			listeDonneeInformation.push(i);
		}
		return listeDonneeInformation;
	}

	/**
	 * @description Retourne les Resultat sous Formes d'informations
	 *
	 * @type {Information}
	 * @returns {Array<Information>} La liste des résultats du problème du type Information
	 */
	getInformationResultat() {
		let listeDonnee = this.getResultat().trim().split(",");
		let listeDonneeInformation = [];
		for (let Donnee of listeDonnee) {
			if (Donnee == "") {
				continue;
			}
			let i = new Information();
			i._nom = Donnee;
			listeDonneeInformation.push(i);
		}
		return listeDonneeInformation;
	}

	/**
	 * @description Retourne les variables du textes sous forme de string
	 *
	 * @returns {string}
	 */
	extraireInformationTextes() {
		let i = new Information();
		i._nom = "";
		const contenue = this.getTexte(); //' aa -> " a a " ';
		if (contenue == "") {
			return null;
		}
		if (contenue.includes("<-")) {
			let nomDeVariable = contenue.split("<-")[0].trim();
			let contenueVariable = contenue.split("<-")[1].trim();
			i._nom = nomDeVariable;
			i._type = Type.DetecterLeType(contenueVariable);
		}
		if (contenue.includes("←")) {
			let nomDeVariable = contenue.split("←")[0].trim();
			let contenueVariable = contenue.split("←")[1].trim();
			i._nom = nomDeVariable;
			i._type = Type.DetecterLeType(contenueVariable);
		}
		return i;
	}

	colorierElement() {
		this.querySelector(".donnees").style.color = this._couleurPrimaire;
		this.querySelector(".resultat").style.color = this._couleurPrimaire;
		this.querySelector(".nom").style.borderColor = this._couleurPrimaire;
	}

	// Retourne les variables
	/**
	 * @description Retourne les variables sous forme de liste
	 *
	 * @returns {Array} liste des variables
	 */
	getTailleAbscisse() {
		return 30;
	}
	getTailleOrdonnee() {
		return 4.75;
	}
	extraireInformation() {
		let listeInformation = [];
		if (this.extraireInformationTextes()) {
			listeInformation.push(this.extraireInformationTextes());
		}
		listeInformation = [
			...listeInformation,
			...this.getInformationDonnee(),
		];
		listeInformation = [
			...listeInformation,
			...this.getInformationResultat(),
		];
		return listeInformation;
	}
	/**
	 * @description Regarde si la chaine donnée est dans le problème
	 *
	 * @param {string} nameInformation La chaine de caractère à chercher
	 * @returns {boolean} true si trouvé faux sinon
	 */
	include(nameInformation) {
		return (
			this.getTexte().includes(nameInformation) ||
			this.getDonnee().includes(nameInformation) ||
			this.getResultat().includes(nameInformation)
		);
	}
	renameInformation(ancienNom, nouveauNom) {
		this.replaceTexte(ancienNom, nouveauNom);
		this.replaceTexteDonnee(ancienNom, nouveauNom);
		this.replaceTexteResultat(ancienNom, nouveauNom);
	}

	peutEtreDecompose() {
		return this._sousPlan == null;
	}

	supprimer() {
		this._elemParent.delierTousLesEnfants();
		if (this._parent != null) this._parent.delierEnfant(this);
		if (this._sousPlan != null) this._sousPlan.remove(); // On supprime le sous-plan s'il existe
		this.remove();
	}

	decomposerAutrePlan() {
		if (verbose) console.log("Décomposer sur un autre plan");
		if (this._sousPlan != null) {
			this._sousPlan.ouvrir();
		} else {
			let buttonOuvrir = document.createElement("span");
			buttonOuvrir.innerText = "+";
			buttonOuvrir.classList.add("ouvrir");
			buttonOuvrir.addEventListener("click", (e) => {
				e.stopPropagation();
				this._sousPlan.ouvrir();
				this._editeur.selectTool(this._editeur._currentTool);
			});
			this.appendChild(buttonOuvrir);
			this._sousPlan = new SousPlanTravail(this);
			editeur.appendChild(this._sousPlan);

			let json = [this.toJSON()];

			const appliquerDecalage = (elem) => {
				elem.abscisse =
					parseFloat(elem.abscisse) -
					parseFloat(this._abscisse) +
					"vw";
				elem.ordonnee =
					parseFloat(elem.ordonnee) -
					parseFloat(this._ordonnee) +
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

			for (let elem of json) {
				appliquerDecalage(elem);
			}

			this._sousPlan.chargerDepuisJSON(json, false);

			this._sousPlan.toutDeplacer(35, 2);

			// On retire le sous-arbre du plan de travail
			let listeElemEnfantsARetirer = this.getDescendants();
			for (let elem of listeElemEnfantsARetirer) {
				if (elem != this && elem instanceof ElementGraphique) {
					elem._parent.delierEnfant(elem);
					elem.remove();
				}
			}
		}
	}

	genererOptionsContextuelles(editeur) {
		let listeOptions = super.genererOptionsContextuelles(editeur);

		if (this._sousPlan == null) {
			let decomposerAutrePlan = new ElementMenu(
				"Décomposer ailleurs",
				() => {
					this.decomposerAutrePlan();
				},
			);
			listeOptions.push(decomposerAutrePlan);
		} else {
			let decomposerIci = new ElementMenu("Décomposer ici", () => {
				if (verbose) console.log("Décomposer sur le même plan");
				if (this._sousPlan == null) {
					return;
				} else {
					this.querySelector("span.ouvrir").remove();

					let json = this._sousPlan.exporterEnJSON();
					this._sousPlan.remove();
					this._sousPlan = null;
					let probleme = json[0];

					const appliquerDecalage = (elem) => {
						elem.abscisse =
							parseFloat(elem.abscisse) +
							parseFloat(this._abscisse) -
							parseFloat(probleme.abscisse) +
							"vw";
						elem.ordonnee =
							parseFloat(elem.ordonnee) +
							parseFloat(this._ordonnee) -
							parseFloat(probleme.ordonnee) +
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

					for (let elem of probleme.enfants) {
						appliquerDecalage(elem);
					}

					for (let enfant of this.parentNode.chargerDepuisJSON(
						probleme.enfants,
						false,
					)) {
						this._elemParent.lierEnfant(enfant);
					}
				}
			});
			listeOptions.push(decomposerIci);
		}

		let exporter = new ElementMenuCompose("Exporter le sous-arbre", () => {
			console.log("Exporter le sous-arbre");
		});
		listeOptions.push(exporter);

		let sousTitreGénéral = document.createElement("h3");
		sousTitreGénéral.innerText = "Tout";
		exporter.ajouterElementMenu(sousTitreGénéral);

		exporter.ajouterElementMenu(
			new ElementMenu(".json", () => {
				console.log("Exporter en .json");
				this._editeur.exporterJSON(JSON.stringify([this.toJSON()]));
			}),
		);

		let sousTitreAlgorithme = document.createElement("h3");
		sousTitreAlgorithme.innerText = "Algorithme";
		exporter.ajouterElementMenu(sousTitreAlgorithme);

		exporter.ajouterElementMenu(
			new ElementMenu(".png", () => {
				console.log("Exporter en .png");
				this._editeur.exporterPNG(
					JSON.stringify([this.toJSON()]),
					true,
					true,
				);
			}),
		);

		exporter.ajouterElementMenu(
			new ElementMenu(".jpg", () => {
				console.log("Exporter en .jpg");
				this._editeur.exporterJPG(
					JSON.stringify([this.toJSON()]),
					true,
					true,
				);
			}),
		);

		exporter.ajouterElementMenu(
			new ElementMenu(".svg", () => {
				console.log("Exporter en .svg");
				this._editeur.exporterSVG(
					JSON.stringify([this.toJSON()]),
					true,
					true,
				);
			}),
		);

		let sousTitreDictionnaire = document.createElement("h3");
		sousTitreDictionnaire.innerText = "Dictionnaire";
		exporter.ajouterElementMenu(sousTitreDictionnaire);

		exporter.ajouterElementMenu(
			new ElementMenu(".csv", () => {
				console.log("Exporter en .csv");
				// On retire du plan de travail tout ce qui n'est pas dans le sous-arbre
				let listeElemEnfantsAConcerver = this.getDescendants();

				// On garde une trace des éléments à rerajouter
				let listeElemSup = [];

				// On retire du plan de travail tout ce qui n'est pas dans le sous-arbre
				for (let elem of this.parentNode.children) {
					if (
						!listeElemEnfantsAConcerver.includes(elem) &&
						elem != this &&
						elem instanceof ElementGraphique
					) {
						listeElemSup.push(elem);
						elem.remove();
					}
				}

				// On effectue le dictionnaire
				this.parentNode.effectuerDictionnaireDesDonnee();

				// On exporte le dictionnaire
				this.parentNode.leDictionnaireDesDonnees.exporter("csv");

				// On remet les éléments retirés
				setTimeout(() => {
					for (let elem of listeElemSup) {
						this.parentNode.appendChild(elem);
					}
				}, 1000);
			}),
		);

		exporter.ajouterElementMenu(
			new ElementMenu(".xlsx", () => {
				console.log("Exporter en .xlsx");
				// On retire du plan de travail tout ce qui n'est pas dans le sous-arbre
				let listeElemEnfantsAConcerver = this.getDescendants();

				// On garde une trace des éléments à rerajouter
				let listeElemSup = [];

				// On retire du plan de travail tout ce qui n'est pas dans le sous-arbre
				for (let elem of this.parentNode.children) {
					if (
						!listeElemEnfantsAConcerver.includes(elem) &&
						elem != this &&
						elem instanceof ElementGraphique
					) {
						listeElemSup.push(elem);
						elem.remove();
					}
				}

				// On effectue le dictionnaire
				this.parentNode.effectuerDictionnaireDesDonnee();

				// On exporte le dictionnaire
				this.parentNode.leDictionnaireDesDonnees.exporter("xls");

				// On remet les éléments retirés
				setTimeout(() => {
					for (let elem of listeElemSup) {
						this.parentNode.appendChild(elem);
					}
				}, 1000);
			}),
		);

		exporter.ajouterElementMenu(
			new ElementMenu(".md", () => {
				console.log("Exporter en .md");
				// On retire du plan de travail tout ce qui n'est pas dans le sous-arbre
				let listeElemEnfantsAConcerver = this.getDescendants();

				// On garde une trace des éléments à rerajouter
				let listeElemSup = [];

				// On retire du plan de travail tout ce qui n'est pas dans le sous-arbre
				for (let elem of this.parentNode.children) {
					if (
						!listeElemEnfantsAConcerver.includes(elem) &&
						elem != this &&
						elem instanceof ElementGraphique
					) {
						listeElemSup.push(elem);
						elem.remove();
					}
				}

				// On effectue le dictionnaire
				this.parentNode.effectuerDictionnaireDesDonnee();

				// On exporte le dictionnaire
				this.parentNode.leDictionnaireDesDonnees.exporter("md");

				// On remet les éléments retirés
				setTimeout(() => {
					for (let elem of listeElemSup) {
						this.parentNode.appendChild(elem);
					}
				}, 1000);
			}),
		);

		return listeOptions;
	}
}
window.customElements.define("probleme-element", Probleme);
