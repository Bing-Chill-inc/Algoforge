import StructureIterativeBornee from './StructureIterativeBornee.js';
import StructureIterativeNonBornee from './StructureIterativeNonBornee.js';

class StructureIterative extends ElementGraphique {
    // ATTRIBUTS
    _elemParent; // ElementParent (liste des enfants)

    // CONSTRUCTEUR
    constructor(abscisse, ordonnee, elemParent = new ElementParent()) {
        super(abscisse, ordonnee);
        this._elemParent = elemParent;
        if (this._elemParent != null) {
            elemParent._proprietaire = this;
        }
    }

    // ENCAPSULATION -non-

    // METHODES
    afficher() {
        let imgBoucleSVG = document.createElement("img");
        imgBoucleSVG.className = "boucleSVG";
        imgBoucleSVG.src = "assets/boucle.svg";
        this.appendChild(imgBoucleSVG);
    }
}

export default StructureIterative;