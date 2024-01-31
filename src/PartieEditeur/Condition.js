class Condition extends HTMLElement {
    // ATTRIBUTS
    _elemParent; // ElementParent (liste des enfants)
    _structure; // StructureAlternative qui contient cette condition

    // CONSTRUCTEUR
    constructor(libelle = "", elemParent = new ElementParent(), structure = null) {
        super();
        this._elemParent = elemParent;
        this._structure = structure;
        this.afficher();
        this._libelle = libelle;
        if (this._elemParent != null) {
            elemParent._proprietaire = this;
        }
    }

    // ENCAPSULATION
    get _libelle() {
        return this.divLibelle.innerText;
    }

    set _libelle(value) {
        this.divLibelle.innerText = value;
    }

    get _elemParent() {
        return this._elemParent;
    }

    set _elemParent(value) {
        this._elemParent = value;
    }

    get _structure() {
        return this._structure;
    }

    set _structure(value) {
        this._structure = value;
    }

    get _ordonnee() {
        // Pour le traitement des liens dans l'interface
        return this._structure._ordonnee;
    }

    get espaceTravail() {
        return this._structure.parentNode;
    }

    // METHODES
    afficher() {
        let buttonSupprimer = document.createElement("button");
        buttonSupprimer.className = "supprimer";
        buttonSupprimer.innerHTML = "-"
        buttonSupprimer.addEventListener('click', (e) => {
            this._structure.supprimerCondition(this);
        });
        this.appendChild(buttonSupprimer);

        this.divLibelle = document.createElement("div");
        this.divLibelle.className = "libelle";
        this.divLibelle.innerText = this._libelle;
        this.divLibelle.contentEditable = "true";
        this.appendChild(this.divLibelle);

        let divArrowsWrapper = document.createElement("div");
        divArrowsWrapper.className = "arrowsWrapper"; // TODO: changer le nom de la classe
        this.flecheGauche = document.createElement("span");
        this.flecheGauche.innerHTML = "← ";
        this.flecheGauche.addEventListener('click', (e) => {
            this._structure.decalerCondition(this, -1);
        });

        this.flecheDroite = document.createElement("span");
        this.flecheDroite.innerHTML = " →";
        this.flecheDroite.addEventListener('click', (e) => {
            this._structure.decalerCondition(this, 1);
        });

        divArrowsWrapper.appendChild(this.flecheGauche);
        divArrowsWrapper.appendChild(this.flecheDroite);
        this.appendChild(divArrowsWrapper);

        this.divAjouterAGauche = document.createElement("div");
        this.divAjouterAGauche.className = "ajouterAGauche";
        this.divAjouterAGauche.innerHTML = "+";
        this.divAjouterAGauche.addEventListener('click', (e) => {
            this._structure.ajouterConditionParRapportA(this, -1);
        });
        this.appendChild(this.divAjouterAGauche);

        this.divAjouterADroite = document.createElement("div");
        this.divAjouterADroite.className = "ajouterADroite";
        this.divAjouterADroite.innerHTML = "+";
        this.divAjouterADroite.addEventListener('click', (e) => {
            this._structure.ajouterConditionParRapportA(this, 1);
        });
        this.appendChild(this.divAjouterADroite);

        this.style.animation = 'fall 0.2s ease-in';
        setTimeout(() => {
            this.style.animation = '';
        }, 200);
    }

    supprimer() {
        this._structure.supprimerCondition(this);
        delete this;
    }

    toJSON() {
        return {
            typeElement: this.constructor.name,
            libelle: this._libelle,
            enfants: this._elemParent.toJSON()
        };
    }
    
    getTailleAbscisse() {
        let rect = this.getBoundingClientRect();

        // Calculez la largeur en unité vw
        let largeurEnVw = ((rect.right - rect.left) / window.innerWidth * 100);
        return largeurEnVw;
    }

    getAncreDecomposition() {
        let abscisse = parseFloat(this._structure._abscisse);
        for (let condition of this._structure._listeConditions.children) {
            if (condition === this) {
                break;
            }
            abscisse += condition.getTailleAbscisse();
        }
        abscisse += this.getTailleAbscisse() / 2;
        let ordonnee = parseFloat(this._structure._ordonnee) + 5;
        return {abscisse: abscisse, ordonnee: ordonnee - 0.7};
    }

    peutEtreDecompose() {
        return true;
    }
} window.customElements.define("condition-element", Condition);