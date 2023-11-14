class Ligne extends HTMLElement {
    // ATTRIBUTS
    _abscisse1; // Float
    _ordonnee1; // Float
    _abscisse2; // Float
    _ordonnee2; // Float
    _abscisseMilieu; // Float
    _ordonneeMilieu; // Float

    // CONSTRUCTEUR
    constructor(abscisse1, ordonnee1, abscisse2, ordonnee2) {
        super();
        this._abscisse1 = parseFloat(abscisse1);
        this._ordonnee1 = parseFloat(ordonnee1);
        this._abscisse2 = parseFloat(abscisse2);
        this._ordonnee2 = parseFloat(ordonnee2);
        this.afficher();
    }

    // ENCAPSULATION
    get _abscisse1() {
        return this._abscisse1;
    }

    set _abscisse1(value) {
        this._abscisse1 = value;
    }

    get _ordonnee1() {
        return this._ordonnee1;
    }

    set _ordonnee1(value) {
        this._ordonnee1 = value;
    }

    get _abscisse2() {
        return this._abscisse2;
    }

    set _abscisse2(value) {
        this._abscisse2 = value;
    }

    get _ordonnee2() {
        return this._ordonnee2;
    }

    set _ordonnee2(value) {
        this._ordonnee2 = value;
    }

    // METHODES
    afficher() {
        if (this._abscisse1 < this._abscisse2) {
            this._abscisseMilieu = (this._abscisse1 + this._abscisse2) / 2;
            this._ordonneeMilieu = (this._ordonnee1 + this._ordonnee2) / 2;
            this.style.left = "calc(var(--sizeModifier) * " + (this._abscisseMilieu - (this._abscisse2 - this._abscisse1)/2) + "vw)";
            this.style.top = "calc(var(--sizeModifier) * " + (this._ordonneeMilieu - (this._ordonnee2 - this._ordonnee1)/2) + "vw)";
            this.style.width = "calc(var(--sizeModifier) * " + Math.sqrt((this._abscisse1 - this._abscisse2) * (this._abscisse1 - this._abscisse2) + (this._ordonnee1 - this._ordonnee2) * (this._ordonnee1 - this._ordonnee2)) + "vw)";
            this.style.transform = "rotate(" + Math.atan2(this._ordonnee2 - this._ordonnee1, this._abscisse2 - this._abscisse1) + "rad)";
        } else {
            this._abscisseMilieu = (this._abscisse1 + this._abscisse2) / 2;
            this._ordonneeMilieu = (this._ordonnee1 + this._ordonnee2) / 2;
            this.style.left = "calc(var(--sizeModifier) * " + (this._abscisseMilieu - (this._abscisse1 - this._abscisse2)/2) + "vw)";
            this.style.top = "calc(var(--sizeModifier) * " + (this._ordonneeMilieu - (this._ordonnee1 - this._ordonnee2)/2) + "vw)";
            this.style.width = "calc(var(--sizeModifier) * " + Math.sqrt((this._abscisse2 - this._abscisse1) * (this._abscisse2 - this._abscisse1) + (this._ordonnee2 - this._ordonnee1) * (this._ordonnee2 - this._ordonnee1)) + "vw)";
            this.style.transform = "rotate(" + Math.atan2(this._ordonnee1 - this._ordonnee2, this._abscisse1 - this._abscisse2) + "rad)";
        }
    }

    setDebut(abscisse, ordonnee) {
        this._abscisse1 = parseFloat(abscisse);
        this._ordonnee1 = parseFloat(ordonnee);
        this.afficher();
    }

    setFin(abscisse, ordonnee) {
        this._abscisse2 = parseFloat(abscisse);
        this._ordonnee2 = parseFloat(ordonnee);
        this.afficher();
    }
} window.customElements.define("ligne-element", Ligne);
