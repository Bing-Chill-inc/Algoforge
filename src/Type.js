class Type {
    // ATTRIBUTS
    _nom; // String

    // CONSTRUCTEUR
    constructor(nom) {
        this._nom = nom;
    }

    // ENCAPSULATION
    get _nom() {
        return this._nom;
    }

    set _nom(value) {
        this._nom = value;
    }

    // METHODES
    estConforme(expression) {
        return true;
    }

    ajouterFonctionDeConformite(fonction) {
        this.estConforme = fonction;
    }
}
export default Type;