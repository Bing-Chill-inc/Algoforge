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
        if(elementAAjouter instanceof ElementGraphique) {
            // Si l'élément à ajouter est déjà un enfant, on l'enlève de son parent
            for (var lien of this._listeElementsEnfants) {
                if (lien.element === elementAAjouter) {
                    if (verbose) console.log('L\'élément à ajouter est déjà un enfant, on l\'enlève de son parent');
                    this.delierEnfant(elementAAjouter);
                    elementAAjouter._parent = null;
                    return false;
                }
            }
            elementAAjouter._parent = this;
            let ligneEntreLesElements = this.creerLienAdequat(this._proprietaire, elementAAjouter, this._proprietaire.espaceTravail);
            this._listeElementsEnfants.push({element : elementAAjouter, ligne : ligneEntreLesElements});
            return true;
        }
        return false;
    }

    delierEnfant(elementASupprimer) {
        var lien
        for (lien of this._listeElementsEnfants) {
            if (lien.element === elementASupprimer) {
                lien.ligne.supprimer();
                this._listeElementsEnfants.splice(this._listeElementsEnfants.indexOf(lien), 1);
                lien.element._parent = null;
                break;
            }
        }
    }

    delierTousLesEnfants() {
        while (this._listeElementsEnfants.length > 0) {
            this.delierEnfant(this._listeElementsEnfants[0].element);
        }
    }

    toJSON() {
        let listeEnfants = [];
        this._listeElementsEnfants.forEach((lien) => {
            listeEnfants.push(lien.element.toJSON());
        });
        return listeEnfants;
    }

    creerLienAdequat(elemGraphiqueParent, elemGraphiqueEnfant, espaceTravail) {
        let nouveauLien;
        switch (elemGraphiqueParent.constructor.name) {
            case Probleme.name:
            case Procedure.name:
                nouveauLien = new LienCompositionProbleme(elemGraphiqueParent, elemGraphiqueEnfant, espaceTravail);
                break;
            case StructureIterativeBornee.name:
            case StructureIterativeNonBornee.name:
                nouveauLien = new LienTriple(elemGraphiqueParent, elemGraphiqueEnfant, espaceTravail);
                break;
            case Condition.name:
                // Si la condition n'a qu'un seul enfant (0 au moment de l'exécution de cette fonction), alors on crée un lien droit (LienDroit)
                // Sinon, on crée un lien triple (LienTriple)
                if (elemGraphiqueParent._elemParent._listeElementsEnfants.length == 0) {
                    nouveauLien = new LienDroit(elemGraphiqueParent, elemGraphiqueEnfant, espaceTravail);
                } else {
                    nouveauLien = new LienTriple(elemGraphiqueParent, elemGraphiqueEnfant, espaceTravail);
                    // Pour tous les autres enfants de la condition, on change le LienDroit en LienTriple
                    elemGraphiqueParent._elemParent._listeElementsEnfants.forEach((lien) => {
                        if (lien.ligne.constructor.name == LienDroit.name) {
                            lien.ligne.supprimer();
                            lien.ligne = new LienTriple(elemGraphiqueParent, lien.element, espaceTravail);
                        }
                    });
                }
                break;
            default:
                nouveauLien = new Lien(elemGraphiqueParent, elemGraphiqueEnfant, espaceTravail);
                break;
        }
        return nouveauLien;
    }

    updateAll() {
        for (let lien of this._listeElementsEnfants) {
            lien.ligne.update();
        }
    }
}
