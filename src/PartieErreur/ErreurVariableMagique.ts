import { ErreurConceptuelle } from "./ErreurConceptuelle";

export class ErreurVariableMagique extends ErreurConceptuelle {
	// ATTRIBUTS
	__nomVariable: any; // String

	// CONSTRUCTEUR
	constructor(elementEmetteur: any) {
		super(elementEmetteur);
	}

	// ENCAPSULATION
	set _nomVariable(value: any) {
		this.__nomVariable = value;
	}

	get _nomVariable() {
		return this.__nomVariable;
	}
	// METHODES
	toString() {
		return "La variable ", this._nomVariable, " provient de nulle part.";
	}
}
