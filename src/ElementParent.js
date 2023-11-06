class ElementParent {
    // ATTRIBUTS
    _listeElementsEnfants; // Liste de dictionnaires ElementGraphique, Ligne
    _proprietaire; // ElementGraphique

    // CONSTRUCTEUR
    constructor(proprietaire, listeElementsEnfants = []) {
        this._proprietaire = proprietaire;
        this._listeElementsEnfants = listeElementsEnfants;
    }

    // ENCAPSULATION
    get _listeElementsEnfants() {
        return this._listeElementsEnfants;
    }

    set _listeElementsEnfants(value) {
        this._listeElementsEnfants = value;
    }

    get _proprietaire() {
        return this._proprietaire;
    }

    set _proprietaire(value) {
        this._proprietaire = value;
    }

    // METHODES
    lierEnfant(elementAAjouter) {
        elementAAjouter._parent = this;
        this._listeElementsEnfants.push({element : elementAAjouter, ligne : new Ligne()});
    }

    delierEnfant(elementASupprimer) {
        var lien
        for (lien of this._listeElementsEnfants) {
            if (lien.element === elementASupprimer) {
                this._listeElementsEnfants.splice(this._listeElementsEnfants.indexOf(lien), 1);
                lien.element._parent = null;
                break;
            }
        }
    }

    toJSON() {
        let listeEnfants = [];
        this._listeElementsEnfants.forEach((lien) => {
            listeEnfants.push(lien.element.toJSON());
        });
        return listeEnfants;
    }
}

export default ElementParent;