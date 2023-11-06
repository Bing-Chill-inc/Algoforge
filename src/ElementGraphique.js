import Probleme from './Probleme.js';
import StructureAlternative from './StructureAlternative.js';
import StructureIterative from './StructureIterative.js';
import ConditionSortie from './ConditionSortie.js';
import ElementParent from './ElementParent.js';

class ElementGraphique extends HTMLElement {
    // ATTRIBUTS
    _abscisse; // Entier
    _ordonnee; // Entier
    _parent; // ElementParent

    // CONSTRUCTEUR
    constructor(abscisse = 0, ordonnee = 0, parent = null) {
        super();
        this._abscisse = abscisse;
        this._ordonnee = ordonnee;
        this._parent = parent;
        this.setPosition(abscisse, ordonnee);
    }

    // ENCAPSULATION
    get _abscisse() {
        return this._abscisse;
    }

    set _abscisse(value) {
        this._abscisse = value;
    }

    get _ordonnee() {
        return this._ordonnee;
    }

    set _ordonnee(value) {
        this._ordonnee = value;
    }

    get _parent() {
        return this._parent;
    }

    set _parent(value) {
        this._parent = value;
    }

    // METHODES
    afficher() {
        console.log(`Abscisse : ${this._abscisse} Ordonnée : ${this._ordonnee}`);
    }
    
    setPosition(abscisse = -1, ordonnee = -1) {
        if (abscisse == -1 && ordonnee == -1) {
            this.style.left = "calc(var(--sizeModifier) * " + this._abscisse + ")";
            this.style.top = "calc(var(--sizeModifier) * " + this._ordonnee + ")";
        } else {
            this.style.left = "calc(var(--sizeModifier) * " + abscisse + ")";
            this.style.top = "calc(var(--sizeModifier) * " + ordonnee + ")";
        }
    }

    getPosition() {
        return {abscisse: this.style.left, ordonnee: this.style.top};
    }
}

export default ElementGraphique;