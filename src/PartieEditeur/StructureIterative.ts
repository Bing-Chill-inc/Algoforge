import { ElementGraphique } from "./ElementGraphique";
import { classes } from "../runtime/classRegistry";
import { verbose } from "../runtime/runtime";
import type { InviteBornesPourSI } from "./InviteBornesPourSI";

/**
 * @class StructureIterative
 * @classdesc Représente les différentes structures itératives
 * @description Est utilisé par les différentes structures itératives pour les instancier
 * @extends {ElementGraphique}
 */
export class StructureIterative extends ElementGraphique {
	// ATTRIBUTS
	_elemParent; // ElementParent (liste des enfants)
	_inviteBornes!: InviteBornesPourSI|null; // InviteBornesPourSI (invite pour les bornes)

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {number|string} abscisse - L'abscisse de la structure
	 * @param {number|string} ordonnee - L'ordonnée de la structure
	 * @param {ElementParent} elemParent - L'élément parent de la structure itérative
	 */
	constructor(abscisse: number|undefined, ordonnee: number|undefined, elemParent = new classes.ElementParent()) {
		super(abscisse, ordonnee);
		this._elemParent = elemParent;
		if (this._elemParent != null) {
			elemParent._proprietaire = this;
		}

		this.addEventListener("mousemove", function (e) {
			// update les liens vers les enfants
			this._elemParent._listeElementsEnfants.forEach((lien: { ligne: { update: () => void; }; }) => {
				lien.ligne.update();
			});
		});

		this.addEventListener("dblclick", (e) => {
			this.inviteBornes();
		});
	}

	// ENCAPSULATION -non-

	// METHODES
	/**
	 * @description Affiche la StructureIterative sur le plan de travail
	 */
	afficher() {
		let imgBoucleSVG = document.createElement("div");
		imgBoucleSVG.className = "boucleSVG";
		imgBoucleSVG.setAttribute("draggable", false);
		this.appendChild(imgBoucleSVG);
	}

	/**
	 * @description Renvoie une liste des enfants de la StructureIterative du type donné
	 * @param {ElementGraphique} typeRechercher - Le type d'ElementGraphique recherché
	 * @returns {Array<ElementGraphique>} La liste des enfants du type donné
	 */
	getEnfants(typeRechercher = classes.ElementGraphique) {
		let listeDesEnfants = [];
		for (let enfant of this._elemParent._listeElementsEnfants) {
			listeDesEnfants.push(enfant.element);
		}
		listeDesEnfants = classes.PlanTravail.FiltrerElementsGraphique(
			listeDesEnfants,
			typeRechercher,
		);
		return classes.PlanTravail.trierElementsGraphique(listeDesEnfants);
	}

	/**
	 * @description Renvoie l'ancre de décomposition de la StructureIterative
	 * @returns {Object} L'ancre de décomposition avec les coordonnées abscisse et ordonnee
	 */
	getAncreDecomposition() {
		let abscisse = parseFloat(this._abscisse) + 2;
		let ordonnee = parseFloat(this._ordonnee) + 4;
		return { abscisse: abscisse, ordonnee: ordonnee };
	}

	/**
	 * @description Renvoie l'ancre de composition de la StructureIterative
	 * @returns {Object} L'ancre de composition avec les coordonnées abscisse et ordonnee
	 */
	getAncreComposition() {
		let abscisse = parseFloat(this._abscisse) + 2;
		let ordonnee = parseFloat(this._ordonnee);
		return { abscisse: abscisse, ordonnee: ordonnee };
	}

	/**
	 * @description Vérifie si la StructureIterative peut être décomposée
	 * @returns {boolean} true si elle peut être décomposée, false sinon
	 */
	peutEtreDecompose() {
		return true;
	}

	/**
	 * @description Affiche une invite pour demander les bornes de la structure
	 */
	inviteBornes() {
		if (verbose) console.log(`this._inviteBornes : ${this._inviteBornes}`);
		if (this._inviteBornes == null) {
			this._inviteBornes = new classes.InviteBornesPourSI(this);
		}

		// Supprimer une éventuelle autre invite
		let invite = document.querySelector("invite-bornes-pour-si");
		if (invite != null) {
			invite.parentNode!.removeChild(invite);
		}

		// Crée une petite fenêtre pour demander les bornes
		this.parentNode!.appendChild(this._inviteBornes);
	}

	/**
	 * @description Supprime la StructureIterative
	 */
	supprimer() {
		this._elemParent.delierTousLesEnfants();
		if (this._parent != null) this._parent.delierEnfant(this);
		if (this._inviteBornes != null)
			if (this._inviteBornes.parentNode != null)
				this._inviteBornes.parentNode.removeChild(this._inviteBornes);
		this.remove();
	}
}
