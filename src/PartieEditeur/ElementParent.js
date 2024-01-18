class ElementParent {
    // ATTRIBUTS
    _listeElementsEnfants; // Liste contient les ElementGraphiques et les Lignes
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
        if(elementAAjouter instanceof ElementGraphique)
        {
            elementAAjouter._parent = this;
            let abscisse1 = parseFloat(this._proprietaire._abscisse) + (this._proprietaire.getTailleAbscisse() / 2);
            let ordonnee1 = parseFloat(this._proprietaire._ordonnee) + (this._proprietaire.getTailleOrdonnee());
            let abscisse2 = parseFloat(elementAAjouter._abscisse) + (elementAAjouter.getTailleAbscisse()) / 2;
            let ordonnee2 = parseFloat(elementAAjouter._ordonnee);
            abscisse1 = abscisse1.toString() + "vw";
            abscisse2 = abscisse2.toString() + "vw"
            ordonnee1 = ordonnee1.toString() + "vh";
            ordonnee2 = ordonnee2.toString() + "vh";
            let uneLigne = new Ligne(abscisse1, ordonnee1, abscisse2, ordonnee2);
            this._listeElementsEnfants.push({element : elementAAjouter, ligne : uneLigne});
            document.getElementById('espace1').appendChild(uneLigne);

            return true;
        }
        return false;
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
