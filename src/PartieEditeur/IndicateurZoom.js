class IndicateurZoom extends HTMLElement {
    // ATTRIBUTS
    _zoom = 1; // Number

    // CONSTRUCTEUR
    constructor() {
        super();
        this.buttonZoomOut = document.createElement("button");
        this.buttonZoomOut.className = "zoomOut";
        this.buttonZoomOut.innerHTML = "-";
        this.buttonZoomOut.addEventListener('click', (e) => {
            this.zoomOut();
        });
        this.appendChild(this.buttonZoomOut);

        this.display = document.createElement("div");
        this.display.className = "zoomDisplay";
        this.display.innerText = `${Math.trunc(this._zoom * 100)}%`;
        this.display.contentEditable = "true";
        this.display.addEventListener('input', (e) => {
            this._zoom = parseFloat(this.display.innerText) / 100;
            document.body.style.setProperty('--sizeModifier', this._zoom);
        });
        this.display.addEventListener('focusout', (e) => {
            if (this._zoom < 0.1) this._zoom = 0.1;
            if (this._zoom > 5) this._zoom = 5;
            document.body.style.setProperty('--sizeModifier', this._zoom);
            this.display.innerText = `${Math.trunc(this._zoom * 100)}%`;
        });
        this.appendChild(this.display);

        this.buttonZoomIn = document.createElement("button");
        this.buttonZoomIn.className = "zoomIn";
        this.buttonZoomIn.innerHTML = "+";
        this.buttonZoomIn.addEventListener('click', (e) => {
            this.zoomIn();
        });
        this.appendChild(this.buttonZoomIn);
    }

    // ENCAPSULATION
    get _zoom() {
        return this._zoom;
    }

    set _zoom(value) {
        this._zoom = value;
    }

    zoomIn() {
        this._zoom += 0.1;
        if (this._zoom > 5) this._zoom = 5;
        document.body.style.setProperty('--sizeModifier', this._zoom);
        this.display.innerText = `${Math.trunc(this._zoom * 100)}%`;
    }

    zoomOut() {
        this._zoom -= 0.1;
        if (this._zoom < 0.1) this._zoom = 0.1;
        document.body.style.setProperty('--sizeModifier', this._zoom);
        this.display.innerText = `${Math.trunc(this._zoom * 100)}%`;
    }
} customElements.define("indicateur-zoom", IndicateurZoom);