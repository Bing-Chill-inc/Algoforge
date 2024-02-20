/**
 * @class Selection
 * @classdesc La classe Selection est une classe représentant une sélection d'éléments graphiques.
 * @description Est utilisé pour instancier un objet de type Selection.
 * @extends {HTMLElement}
 */
class Selection extends HTMLElement {
    _dicoElementsSelectionnes; // Dictionnaire ayant pour clés les éléments graphiques sélectionnés et pour valeur la représentation graphique de la sélection.
    _editeur = document.querySelector('editeur-interface'); // Editeur

    /**
     * @constructor
     */
    constructor() {
        super();
        this._listeElementsSelectionnes = [];

        setInterval(() => {
            this.update();
        }, 1000 / 24); // 24 fps
    }

    selectionnerElement(element) {
        if (element instanceof ElementGraphique && !this.estSelectionne(element)) {
            let rep = new RepresentationSelectionSimple(element, this);
            this.parentNode.appendChild(rep);
            this._listeElementsSelectionnes.push(rep);
            this.update();
            return true;
        }
        return false;
    }

    deselectionnerElement(element) {
        if (element instanceof ElementGraphique) {
            for (var selection of this._listeElementsSelectionnes) {
                if (selection._element === element) {
                    selection.supprimer();
                    this._listeElementsSelectionnes.splice(this._listeElementsSelectionnes.indexOf(selection), 1);
                    break;
                }
            }
        }
        this.update();
        return false;
    }

    deselectionnerTout() {
        for (var selection of this._listeElementsSelectionnes) {
            selection.supprimer();
        }
        this._listeElementsSelectionnes = [];
        this.style.width = "0vw";
        this.style.height = "0vw";
        this.style.left = "0vw";
        this.style.top = "0vw";
    }

    supprimerTout() {
        for (var selection of this._listeElementsSelectionnes) {
            this._editeur.ajouterEvenement(new EvenementSuppressionElement(selection._element));
            selection._element.supprimer();
            selection.supprimer();
        }
        this._listeElementsSelectionnes = [];
        this.style.width = "0vw";
        this.style.height = "0vw";
        this.style.left = "0vw";
        this.style.top = "0vw";
    }

    coordonneesMinEtMax() {
        var coordonneesMin = {x: Number.MAX_VALUE, y: Number.MAX_VALUE};
        var coordonneesMax = {x: Number.MIN_VALUE, y: Number.MIN_VALUE};
        for (var selection of this._listeElementsSelectionnes) {;
            if (parseFloat(selection.style.left.substring("calc(var(--sizeModifier) * ".length)) < coordonneesMin.x) coordonneesMin.x = parseFloat(selection.style.left.substring("calc(var(--sizeModifier) * ".length));
            if (parseFloat(selection.style.top.substring("calc(var(--sizeModifier) * ".length)) < coordonneesMin.y) coordonneesMin.y = parseFloat(selection.style.top.substring("calc(var(--sizeModifier) * ".length));
            if (parseFloat(selection.style.left.substring("calc(var(--sizeModifier) * ".length)) + parseFloat(selection.style.width.substring("calc(var(--sizeModifier) * ".length)) > coordonneesMax.x) coordonneesMax.x = parseFloat(selection.style.left.substring("calc(var(--sizeModifier) * ".length)) + parseFloat(selection.style.width.substring("calc(var(--sizeModifier) * ".length));
            if (parseFloat(selection.style.top.substring("calc(var(--sizeModifier) * ".length)) + parseFloat(selection.style.height.substring("calc(var(--sizeModifier) * ".length)) > coordonneesMax.y) coordonneesMax.y = parseFloat(selection.style.top.substring("calc(var(--sizeModifier) * ".length)) + parseFloat(selection.style.height.substring("calc(var(--sizeModifier) * ".length));
        }
        return {coordonneesMin: coordonneesMin, coordonneesMax: coordonneesMax};
    }

    update() {
        for (var selection of this._listeElementsSelectionnes) {
            selection.update();
        }
        let coordonnees = this.coordonneesMinEtMax();
        this.style.left = "calc(var(--sizeModifier) * " + coordonnees.coordonneesMin.x + 'vw)';
        this.style.top = "calc(var(--sizeModifier) * " + coordonnees.coordonneesMin.y + 'vw)';
        this.style.width = "calc(var(--sizeModifier) * " + (coordonnees.coordonneesMax.x - coordonnees.coordonneesMin.x) + 'vw)';
        this.style.height = "calc(var(--sizeModifier) * " + (coordonnees.coordonneesMax.y - coordonnees.coordonneesMin.y) + 'vw)';
    }

    moveAllSelectedElements(deplacementAbscisse, deplacementOrdonnee) {
        for (var selection of this._listeElementsSelectionnes) {
            selection._element._abscisse = parseFloat(selection._element._abscisse) + deplacementAbscisse + 'vw';
            selection._element._ordonnee = parseFloat(selection._element._ordonnee) + deplacementOrdonnee + 'vw';
            selection._element.setPosition();
            selection.update();
            if (selection._element instanceof Probleme ||
                selection._element instanceof Procedure ||
                selection._element instanceof StructureIterative) {
                selection._element._elemParent.updateAll();
            } else if (selection._element instanceof StructureAlternative) {
                for (let condition of selection._element._listeConditions.children) {
                    condition._elemParent.updateAll();
                }
            }
            if (selection._element._parent != null) selection._element._parent.updateAll();
        }
        this.update();
    }

    estSelectionne(element) {
        for (var selection of this._listeElementsSelectionnes) {
            if (selection._element === element) return true;
        }
        return false;
    }

    getElementsSelectionnes() {
        let listeElements = [];
        for (var selection of this._listeElementsSelectionnes) {
            listeElements.push(selection._element);
        }
        return listeElements;
    }
} window.customElements.define('selection-editeur', Selection);