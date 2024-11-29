/**
 * @class Selection
 * @classdesc La classe Selection est une classe représentant une sélection d'éléments graphiques.
 * @description Est utilisé pour instancier un objet de type Selection.
 * @extends {HTMLElement}
 */
class Selection extends HTMLElement {
  _listeElementsSelectionnes;
  _editeur = document.querySelector("editeur-interface"); // Editeur

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

  get nbElementsSelectionnes() {
    return this._listeElementsSelectionnes.length;
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

  selectionnerArbre(element) {
    this.selectionnerElement(element);
    if (element.peutEtreDecompose()) {
      for (let enfant of element.getEnfants()) {
        this.selectionnerArbre(enfant);
      }
    }
    if (element instanceof StructureAlternative) {
      for (let condition of element._listeConditions.children) {
        this.selectionnerArbre(condition);
      }
    }
  }

  deselectionnerElement(element) {
    if (element instanceof ElementGraphique) {
      for (var selection of this._listeElementsSelectionnes) {
        if (selection._element === element) {
          selection.supprimer();
          this._listeElementsSelectionnes.splice(
            this._listeElementsSelectionnes.indexOf(selection),
            1
          );
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
      let event = new EvenementSuppressionElement(selection._element);
      selection._element.supprimer();
      this._editeur.ajouterEvenement(event);
      selection.supprimer();
    }
    this._listeElementsSelectionnes = [];
    this.style.width = "0vw";
    this.style.height = "0vw";
    this.style.left = "0vw";
    this.style.top = "0vw";
  }

  coin(topOuBottom, leftOuRight) {
    let coordonnees = this.coordonneesMinEtMax();
    if (topOuBottom == "top") {
      if (leftOuRight == "left") {
        return {
          x: coordonnees.coordonneesMin.x,
          y: coordonnees.coordonneesMin.y,
        };
      } else if (leftOuRight == "right") {
        return {
          x: coordonnees.coordonneesMax.x,
          y: coordonnees.coordonneesMin.y,
        };
      }
    } else if (topOuBottom == "bottom") {
      if (leftOuRight == "left") {
        return {
          x: coordonnees.coordonneesMin.x,
          y: coordonnees.coordonneesMax.y,
        };
      } else if (leftOuRight == "right") {
        return {
          x: coordonnees.coordonneesMax.x,
          y: coordonnees.coordonneesMax.y,
        };
      }
    } else if (topOuBottom == "center") {
      return {
        x: (coordonnees.coordonneesMin.x + coordonnees.coordonneesMax.x) / 2,
        y: (coordonnees.coordonneesMin.y + coordonnees.coordonneesMax.y) / 2,
      };
    }
  }

  coordonneesMinEtMax() {
    if (this._listeElementsSelectionnes.length == 0) {
      return {
        coordonneesMin: { x: -100, y: -100 },
        coordonneesMax: { x: -100, y: -100 },
      };
    }
    var coordonneesMin = { x: Number.MAX_VALUE, y: Number.MAX_VALUE };
    var coordonneesMax = { x: Number.MIN_VALUE, y: Number.MIN_VALUE };
    for (var selection of this._listeElementsSelectionnes) {
      if (
        parseFloat(
          selection.style.left.substring("calc(var(--sizeModifier) * ".length)
        ) < coordonneesMin.x
      )
        coordonneesMin.x = parseFloat(
          selection.style.left.substring("calc(var(--sizeModifier) * ".length)
        );
      if (
        parseFloat(
          selection.style.top.substring("calc(var(--sizeModifier) * ".length)
        ) < coordonneesMin.y
      )
        coordonneesMin.y = parseFloat(
          selection.style.top.substring("calc(var(--sizeModifier) * ".length)
        );
      if (
        parseFloat(
          selection.style.left.substring("calc(var(--sizeModifier) * ".length)
        ) +
          parseFloat(
            selection.style.width.substring(
              "calc(var(--sizeModifier) * ".length
            )
          ) >
        coordonneesMax.x
      )
        coordonneesMax.x =
          parseFloat(
            selection.style.left.substring("calc(var(--sizeModifier) * ".length)
          ) +
          parseFloat(
            selection.style.width.substring(
              "calc(var(--sizeModifier) * ".length
            )
          );
      if (
        parseFloat(
          selection.style.top.substring("calc(var(--sizeModifier) * ".length)
        ) +
          parseFloat(
            selection.style.height.substring(
              "calc(var(--sizeModifier) * ".length
            )
          ) >
        coordonneesMax.y
      )
        coordonneesMax.y =
          parseFloat(
            selection.style.top.substring("calc(var(--sizeModifier) * ".length)
          ) +
          parseFloat(
            selection.style.height.substring(
              "calc(var(--sizeModifier) * ".length
            )
          );
    }
    return {
      coordonneesMin: coordonneesMin,
      coordonneesMax: coordonneesMax,
    };
  }

  update() {
    for (var selection of this._listeElementsSelectionnes) {
      selection.update();
    }
    let coordonnees = this.coordonneesMinEtMax();

    // this.style.left =
    //   "calc(var(--sizeModifier) * " + coordonnees.coordonneesMin.x + "vw)";
    // this.style.top =
    //   "calc(var(--sizeModifier) * " + coordonnees.coordonneesMin.y + "vw)";
    // this.style.width =
    //   "calc(var(--sizeModifier) * " +
    //   (coordonnees.coordonneesMax.x - coordonnees.coordonneesMin.x) +
    //   "vw)";
    // this.style.height =
    //   "calc(var(--sizeModifier) * " +
    //   (coordonnees.coordonneesMax.y - coordonnees.coordonneesMin.y) +
    //   "vw)";
  }

  moveAllSelectedElements(deplacementAbscisse, deplacementOrdonnee) {
    for (var selection of this._listeElementsSelectionnes) {
      selection._element._abscisse =
        parseFloat(selection._element._abscisse) + deplacementAbscisse + "vw";
      selection._element._ordonnee =
        parseFloat(selection._element._ordonnee) + deplacementOrdonnee + "vw";
      selection._element.setPosition();
      selection.update();
      if (
        selection._element instanceof Probleme ||
        selection._element instanceof Procedure ||
        selection._element instanceof StructureIterative
      ) {
        selection._element._elemParent.updateAll();
      } else if (selection._element instanceof StructureAlternative) {
        for (let condition of selection._element._listeConditions.children) {
          condition._elemParent.updateAll();
        }
      }
      if (selection._element._parent != null)
        selection._element._parent.updateAll();
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
}
window.customElements.define("selection-editeur", Selection);
