class Information {
	// ATTRIBUTS
	_nom; // String
	_type; // Type
	_signification; // String

	// CONSTRUCTEUR
	constructor(_nom, _type, _signification) {
		this._nom = _nom;
		this._type = _type;
		this._signification = _signification;
	}

	// ENCAPSULATION
	get _nom() {
		return this._nom;
	}

	set _nom(value) {
		this._nom = value;
	}

	get _type() {
		return this._type;
	}

	set _type(value) {
		this._type = value;
	}

	get _signification() {
		return this._signification;
	}

	set _signification(value) {
		this._signification = value;
	}

	// METHODES

	toJSON() {
		return {
			nom: this._nom,
			type: this._type,
			signification: this._signification,
		};
	}
}
