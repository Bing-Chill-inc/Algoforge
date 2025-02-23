/**
 * @class EvenementEditionStructureIterative
 * @classdesc Classe représentant un événement de modification de structure itérative.
 * @extends EvenementEdition
 */
class EvenementEditionStructureIterative extends EvenementEdition {
	// ATTRIBUTS
	// _elementConcerne; // StructureIterative. Déclaré dans la classe parente.
	_ancienneStructure; // Dictionnaire des anciennes valeurs
	_nouvelleStructure; // Dictionnaire des nouvelles valeurs

	// CONSTRUCTEUR
	/**
	 * @constructor
	 * @param {StructureIterative} elementConcerne La structure itérative concernée par l'événement
	 * @param {Object} ancienneStructure Dictionnaire des anciennes valeurs
	 * @param {Object} nouvelleStructure Dictionnaire des nouvelles valeurs
	 */
	constructor(elementConcerne, ancienneStructure, nouvelleStructure) {
		super(elementConcerne);
		this._ancienneStructure = ancienneStructure;
		this._nouvelleStructure = nouvelleStructure;
	}

	// METHODES
	/**
	 * @description Annule l'événement
	 */
	annuler() {
		if (verbose)
			console.log(
				"Annulation de l'événement de modification de structure itérative",
			);
		let invite = this._elementConcerne._inviteBornes;
		invite.indice.value = this._ancienneStructure.indice || "";
		invite.borneInf.value = this._ancienneStructure.borneInf || "";
		invite.borneSup.value = this._ancienneStructure.borneSup || "";
		invite.pas.value = this._ancienneStructure.pas || "";

		if (verbose)
			console.log("Ancienne structure : ", this._ancienneStructure);
		if (verbose)
			console.log("Nouvelle structure : ", this._nouvelleStructure);
		if (this._ancienneStructure.estBornee) {
			invite.valider(true);
			if (verbose) console.log("Ancienne structure bornée, on valide");
		} else {
			invite.nonBorne(true);
			if (verbose)
				console.log("Ancienne structure non bornée, on annule");
		}
		// OLD /
		// if (this._ancienneStructure.estBornee) {
		//     if (this._elementConcerne instanceof StructureIterativeBornee) {
		//         this._elementConcerne._borneInferieure = this._ancienneStructure.borneInf;
		//         this._elementConcerne._borneSuperieure = this._ancienneStructure.borneSup;
		//         this._elementConcerne._pas = this._ancienneStructure.pas;
		//         this._elementConcerne.setVariableAIterer(this._ancienneStructure.indice);
		//     } else if (this._elementConcerne instanceof StructureIterativeNonBornee) {
		//         let plan = this._elementConcerne.parentNode;
		//         let nouvelleStructure = new StructureIterativeBornee(this._elementConcerne._abscisse,
		//                                                              this._elementConcerne._ordonnee,
		//                                                              this._ancienneStructure.indice,
		//                                                              this._ancienneStructure.borneInf,
		//                                                              this._ancienneStructure.borneSup,
		//                                                              this._ancienneStructure.pas);
		//         nouvelleStructure.afficher();
		//         plan.removeChild(this._elementConcerne);
		//         plan.appendChild(nouvelleStructure);

		//         if (this._elementConcerne._parent != null) {
		//             this._elementConcerne._parent.lierEnfant(nouvelleStructure);
		//             this._elementConcerne._parent.delierEnfant(this._elementConcerne);
		//         }
		//         this._elementConcerne._elemParent._listeElementsEnfants.forEach((lien) => {
		//             this._elementConcerne._elemParent.delierEnfant(lien.element);
		//             nouvelleStructure._elemParent.lierEnfant(lien.element);
		//         });
		//     }
		// } else {
		//     if (this._elementConcerne instanceof StructureIterativeNonBornee) {
		//         // N'arrive jamais, on ne peut pas passer d'une structure non bornée à une structure non bornée
		//     } else {
		//         let plan = this._elementConcerne.parentNode;
		//         let nouvelleStructure = new StructureIterativeNonBornee(this._elementConcerne._abscisse,
		//                                                                 this._elementConcerne._ordonnee);
		//         nouvelleStructure.afficher();
		//         plan.removeChild(this._elementConcerne);
		//         plan.appendChild(nouvelleStructure);

		//         if (this._elementConcerne._parent != null) {
		//             this._elementConcerne._parent.lierEnfant(nouvelleStructure);
		//             this._elementConcerne._parent.delierEnfant(this._elementConcerne);
		//         }
		//         this._elementConcerne._elemParent._listeElementsEnfants.forEach((lien) => {
		//             this._elementConcerne._elemParent.delierEnfant(lien.element);
		//             nouvelleStructure._elemParent.lierEnfant(lien.element);
		//         });
		//     }
		// }
	}

	/**
	 * @description Rétablit l'événement
	 */
	retablir() {
		if (verbose)
			console.log(
				"Rétablissement de l'événement de modification de structure itérative",
			);
		let invite = this._elementConcerne._inviteBornes;
		invite.indice.value = this._nouvelleStructure.indice || "";
		invite.borneInf.value = this._nouvelleStructure.borneInf || "";
		invite.borneSup.value = this._nouvelleStructure.borneSup || "";
		invite.pas.value = this._nouvelleStructure.pas || "";

		if (this._nouvelleStructure.estBornee) {
			invite.valider(true);
		} else {
			invite.nonBorne(true);
		}
	}
}
