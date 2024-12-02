class ErreurVariableMagique extends ErreurConceptuelle {
	// ATTRIBUTS
	_nomVariable; // String

	// CONSTRUCTEUR
	constructor(elementEmetteur) {
		super(elementEmetteur);
	}

	// ENCAPSULATION
	set _nomVariable(value) {
		this._nomVariable = value;
	}

	get _nomVariable() {
		return this._nomVariable;
	}
	// METHODES
	toString() {
		return "La variable ", this._nomVariable, " provient de nulle part.";
	}
}
