class ThemeEditeur extends HTMLOptionElement {
    nom;
    bgColor;
    fgColor;
    fgColorSemiTransparent;
    fgColorTransparent;
    fgColorForward;
    goodColor;
    goodColorTransparent;
    errorColor;
    warningColor;
    titleColor;
    pathLogo;

    _logoAlgoForge = document.querySelector('#logoAlgoForge');

    constructor(nom, bgColor, fgColor, fgColorSemiTransparent, fgColorTransparent, fgColorForward, goodColor, goodColorTransparent, errorColor, warningColor, titleColor, pathLogo) {
        super();
        this.nom = nom;
        this.bgColor = bgColor;
        this.fgColor = fgColor;
        this.fgColorSemiTransparent = fgColorSemiTransparent;
        this.fgColorTransparent = fgColorTransparent;
        this.fgColorForward = fgColorForward;
        this.goodColor = goodColor;
        this.goodColorTransparent = goodColorTransparent;
        this.errorColor = errorColor;
        this.warningColor = warningColor;
        this.titleColor = titleColor;
        this.pathLogo = pathLogo;

        this.innerText = this.nom;
    }

    appliquer() {
        document.body.style.setProperty('--bgColor', this.bgColor);
        document.body.style.setProperty('--fgColor', this.fgColor);
        document.body.style.setProperty('--fgColorSemiTransparent', this.fgColorSemiTransparent);
        document.body.style.setProperty('--fgColorTransparent', this.fgColorTransparent);
        document.body.style.setProperty('--fgColorForward', this.fgColorForward);
        document.body.style.setProperty('--goodColor', this.goodColor);
        document.body.style.setProperty('--goodColorTransparent', this.goodColorTransparent);
        document.body.style.setProperty('--errorColor', this.errorColor);
        document.body.style.setProperty('--warningColor', this.warningColor);
        document.body.style.setProperty('--titleColor', this.titleColor);

        this._logoAlgoForge.src = this.pathLogo;
    }
} window.customElements.define('theme-editeur', ThemeEditeur, { extends: 'option' });