class InviteBornesPourSI extends HTMLElement {
    _structureIterative;
    _editeur = document.querySelector("editeur-interface"); // Editeur

    constructor(uneStructureIterative, oldIndice = "", oldBorneInf = "", oldBorneSup = "", oldPas = "") {
        super();
        this._structureIterative = uneStructureIterative;

        this.style.left = parseFloat(this._structureIterative._abscisse) + this._structureIterative.getTailleAbscisse() + 1 + "vw";
        this.style.top = parseFloat(this._structureIterative._ordonnee) + "vw";

        let labelPour = document.createElement('label');
        labelPour.innerText = "Pour";
        labelPour.style.gridColumn = "1";
        labelPour.style.gridRow = "1";
        this.appendChild(labelPour);

        this.indice = document.createElement('input');
        this.indice.placeholder = "Indice à itérer";
        this.indice.style.gridColumn = "2 / span 3";
        this.indice.style.gridRow = "1";
        this.indice.style.width = "100%";
        this.indice.value = oldIndice;
        this.appendChild(this.indice);

        let labelDe = document.createElement('label');
        labelDe.innerText = "allant De";
        labelDe.style.gridColumn = "1";
        labelDe.style.gridRow = "2";
        this.appendChild(labelDe);

        this.borneInf = document.createElement('input');
        this.borneInf.placeholder = "Borne inférieure";
        this.borneInf.style.gridColumn = "2";
        this.borneInf.style.gridRow = "2";
        this.borneInf.value = oldBorneInf;
        this.appendChild(this.borneInf);

        let labelA = document.createElement('label');
        labelA.innerText = "à";
        labelA.style.gridColumn = "3";
        labelA.style.gridRow = "2";
        this.appendChild(labelA);

        this.borneSup = document.createElement('input');
        this.borneSup.placeholder = "Borne supérieure";
        this.borneSup.style.gridColumn = "4";
        this.borneSup.style.gridRow = "2";
        this.borneSup.value = oldBorneSup;
        this.appendChild(this.borneSup);

        let labelPas = document.createElement('label');
        labelPas.innerText = "avec un pas de";
        labelPas.style.gridColumn = "1 / span 2";
        labelPas.style.gridRow = "3";
        this.appendChild(labelPas);

        this.pas = document.createElement('input');
        this.pas.placeholder = "Pas";
        this.pas.style.gridColumn = "2 / span 2";
        this.pas.style.gridRow = "3";
        this.pas.value = oldPas;
        this.appendChild(this.pas);

        this.button = document.createElement('button');
        this.button.innerText = "Valider";
        this.button.classList.add('valider');
        this.button.style.gridColumn = "3 / span 2";
        this.button.style.gridRow = "4";
        this.button.addEventListener('click', (e) => {
            this.valider();
        });
        this.appendChild(this.button);

        this.nBorne = document.createElement('button');
        this.nBorne.innerText = "Non borné";
        this.nBorne.classList.add('non-borne');
        this.nBorne.style.gridColumn = "1 / span 2";
        this.nBorne.style.gridRow = "4";
        this.nBorne.addEventListener('click', (e) => {
            this.nonBorne();
        });
        this.appendChild(this.nBorne);

        this.classList.add('nonCiblable');
    }

    valider() {
        let ancienneStructure = {}
        ancienneStructure.estBornee = this._structureIterative instanceof StructureIterativeBornee;
        ancienneStructure.indice = this._structureIterative._indice;
        ancienneStructure.borneInf = this._structureIterative._borneInferieure;
        ancienneStructure.borneSup = this._structureIterative._borneSuperieure;
        ancienneStructure.pas = this._structureIterative._pas;

        let nouvelleStructure = {};
        nouvelleStructure.estBornee = true;
        nouvelleStructure.indice = this.indice.value;
        nouvelleStructure.borneInf = this.borneInf.value;
        nouvelleStructure.borneSup = this.borneSup.value;
        nouvelleStructure.pas = this.pas.value;

        // this._editeur.ajouterEvenement(new EvenementEditionStructureIterative(this._structureIterative, ancienneStructure, nouvelleStructure));


        if (this._structureIterative instanceof StructureIterativeBornee) {
            this._structureIterative._borneInferieure = this.borneInf.value;
            this._structureIterative._borneSuperieure = this.borneSup.value;
            this._structureIterative._pas = this.pas.value;
            this._structureIterative.setVariableAIterer(this.indice.value);
        } else if (this._structureIterative instanceof StructureIterativeNonBornee) {
            let plan = this._structureIterative.parentNode;
            let nouvelleStructure = new StructureIterativeBornee(this._structureIterative._abscisse, this._structureIterative._ordonnee, this.indice.value, this.borneInf.value, this.borneSup.value, this.pas.value);
            nouvelleStructure.afficher();
            plan.removeChild(this._structureIterative);
            plan.appendChild(nouvelleStructure);

            if (this._structureIterative._parent != null) {
                this._structureIterative._parent.lierEnfant(nouvelleStructure);
                this._structureIterative._parent.delierEnfant(this._structureIterative);
            }
            this._structureIterative._elemParent._listeElementsEnfants.forEach((lien) => {
                this._structureIterative._elemParent.delierEnfant(lien.element);
                nouvelleStructure._elemParent.lierEnfant(lien.element);
            });
        }
        this.parentNode.removeChild(this);
        delete this;
    }

    nonBorne() {
        let ancienneStructure = {}
        ancienneStructure.estBornee = this._structureIterative instanceof StructureIterativeBornee;
        ancienneStructure.indice = this._structureIterative._indice;
        ancienneStructure.borneInf = this._structureIterative._borneInferieure;
        ancienneStructure.borneSup = this._structureIterative._borneSuperieure;
        ancienneStructure.pas = this._structureIterative._pas;

        let nouvelleStructureEvent = {};
        nouvelleStructureEvent.estBornee = false;

        // this._editeur.ajouterEvenement(new EvenementEditionStructureIterative(this._structureIterative, ancienneStructure, nouvelleStructureEvent));

        let plan = this._structureIterative.parentNode;
        let nouvelleStructure = new StructureIterativeNonBornee(this._structureIterative._abscisse, this._structureIterative._ordonnee);
        nouvelleStructure.afficher();
        plan.removeChild(this._structureIterative);
        plan.appendChild(nouvelleStructure);

        if (this._structureIterative._parent != null) {
            this._structureIterative._parent.lierEnfant(nouvelleStructure);
            this._structureIterative._parent.delierEnfant(this._structureIterative);
        }
        this._structureIterative._elemParent._listeElementsEnfants.forEach((lien) => {
            this._structureIterative._elemParent.delierEnfant(lien.element);
            nouvelleStructure._elemParent.lierEnfant(lien.element);
        });
        this.parentNode.removeChild(this);
        delete this;
    }
} window.customElements.define('invite-bornes-pour-si', InviteBornesPourSI);