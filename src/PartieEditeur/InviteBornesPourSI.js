class InviteBornesPourSI extends HTMLElement {
    _structureIterative;
    _structureIterativeBornee;
    _structureIterativeNonBornee;
    _editeur = document.querySelector("editeur-interface"); // Editeur

    constructor(uneStructureIterative, oldIndice = "", oldBorneInf = "", oldBorneSup = "", oldPas = "") {
        super();
        if (verbose) console.log(`Une invite pour les bornes a été créée pour la structure itérative : ${uneStructureIterative}`);
        this._structureIterative = uneStructureIterative;

        if (uneStructureIterative instanceof StructureIterativeBornee) {
            this._structureIterativeBornee = uneStructureIterative;
            this._structureIterativeNonBornee = new StructureIterativeNonBornee();
            if (verbose) console.log(`this._structureIterativeNonBornee._inviteBornes : ${this._structureIterativeNonBornee._inviteBornes}`); // null normalement
            this._structureIterativeNonBornee._inviteBornes = this;
            if (verbose) console.log(`this._structureIterativeNonBornee._inviteBornes : ${this._structureIterativeNonBornee._inviteBornes}`); // this normalement
            this._structureIterativeNonBornee.afficher();
        } else if (uneStructureIterative instanceof StructureIterativeNonBornee) {
            this._structureIterativeNonBornee = uneStructureIterative;
            this._structureIterativeBornee = new StructureIterativeBornee();
            if (verbose) console.log(`this._structureIterativeBornee._inviteBornes : ${this._structureIterativeBornee._inviteBornes}`); // null normalement
            this._structureIterativeBornee._inviteBornes = this;
            if (verbose) console.log(`this._structureIterativeBornee._inviteBornes : ${this._structureIterativeBornee._inviteBornes}`); // this normalement
            this._structureIterativeBornee.afficher();
        }

        setInterval(() => {
        this.style.left = parseFloat(this._structureIterative._abscisse) + this._structureIterative.getTailleAbscisse() + 1 + "vw";
        this.style.top = parseFloat(this._structureIterative._ordonnee) + "vw";
        }, 1000 / 48); // 48 images par seconde

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

    valider(estAnnulation = false) {
        // Vérifions que la structure active est bien celle qui est placée sur un plan de travail
        if (this._structureIterative.parentNode == null) {
            if (this._structureIterativeBornee.parentNode != null) {
                this._structureIterative = this._structureIterativeBornee;
            }
            else if (this._structureIterativeNonBornee.parentNode != null) {
                this._structureIterative = this._structureIterativeNonBornee;
            }
        }

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

        if (!estAnnulation) {
            this._editeur.ajouterEvenement(new EvenementEditionStructureIterative(this._structureIterative, ancienneStructure, nouvelleStructure));
        }

        if (estAnnulation && verbose) {
            console.log("---");
            console.log(`this._structureIterative instanceof StructureIterativeBornee : ${this._structureIterative instanceof StructureIterativeBornee}`);
            console.log(`this._structureIterative instanceof StructureIterativeNonBornee : ${this._structureIterative instanceof StructureIterativeNonBornee}`);
            console.log(`this._structureIterative.parentNode : ${this._structureIterative.parentNode}`);
            console.log(`this._structureIterativeBornee.parentNode : ${this._structureIterativeBornee.parentNode}`);
            console.log(`this._structureIterativeNonBornee.parentNode : ${this._structureIterativeNonBornee.parentNode}`);
            console.log(this._structureIterativeBornee);
            console.log(this._structureIterativeNonBornee);
        }

        if (this._structureIterative instanceof StructureIterativeBornee) {
            this._structureIterative._borneInferieure = this.borneInf.value;
            this._structureIterative._borneSuperieure = this.borneSup.value;
            this._structureIterative._pas = this.pas.value;
            this._structureIterative.setVariableAIterer(this.indice.value);
        } else if (this._structureIterative instanceof StructureIterativeNonBornee) {
            let plan = this._structureIterative.parentNode;
            // let nouvelleStructure = new StructureIterativeBornee(this._structureIterative._abscisse, this._structureIterative._ordonnee, this.indice.value, this.borneInf.value, this.borneSup.value, this.pas.value);
            this._structureIterativeBornee._abscisse = this._structureIterative._abscisse;
            this._structureIterativeBornee._ordonnee = this._structureIterative._ordonnee;
            this._structureIterativeBornee.setPosition();
            this._structureIterativeBornee.setVariableAIterer(this.indice.value);
            this._structureIterativeBornee._borneInferieure = this.borneInf.value;
            this._structureIterativeBornee._borneSuperieure = this.borneSup.value;
            this._structureIterativeBornee._pas = this.pas.value;

            // nouvelleStructure.afficher();
            plan.removeChild(this._structureIterative);
            plan.appendChild(this._structureIterativeBornee);

            if (this._structureIterative._parent != null) {
                this._structureIterative._parent.lierEnfant(this._structureIterativeBornee);
                this._structureIterative._parent.delierEnfant(this._structureIterative);
            }
            this._structureIterative._elemParent._listeElementsEnfants.forEach((lien) => {
                this._structureIterative._elemParent.delierEnfant(lien.element);
                this._structureIterativeBornee._elemParent.lierEnfant(lien.element);
            });
            this._structureIterative = this._structureIterativeBornee;
        }
        if (this.parentNode)
        this.parentNode.removeChild(this);
    }

    nonBorne(estAnnulation = false) {
        let ancienneStructure = {}
        ancienneStructure.estBornee = this._structureIterative instanceof StructureIterativeBornee;
        ancienneStructure.indice = this._structureIterative._indice;
        ancienneStructure.borneInf = this._structureIterative._borneInferieure;
        ancienneStructure.borneSup = this._structureIterative._borneSuperieure;
        ancienneStructure.pas = this._structureIterative._pas;

        let nouvelleStructureEvent = {};
        nouvelleStructureEvent.estBornee = false;

        if (!estAnnulation) {
            this._editeur.ajouterEvenement(new EvenementEditionStructureIterative(this._structureIterative, ancienneStructure, nouvelleStructureEvent));
        }

        let plan = this._structureIterativeNonBornee.parentNode || this._structureIterativeBornee.parentNode;
        // let nouvelleStructure = new StructureIterativeNonBornee(this._structureIterative._abscisse, this._structureIterative._ordonnee);
        this._structureIterativeNonBornee._abscisse = this._structureIterative._abscisse;
        this._structureIterativeNonBornee._ordonnee = this._structureIterative._ordonnee;
        this._structureIterativeNonBornee.setPosition();
        // nouvelleStructure.afficher();
        plan.removeChild(this._structureIterative);
        plan.appendChild(this._structureIterativeNonBornee);

        if (this._structureIterative._parent != null) {
            this._structureIterative._parent.lierEnfant(this._structureIterativeNonBornee);
            this._structureIterative._parent.delierEnfant(this._structureIterative);
        }
        this._structureIterative._elemParent._listeElementsEnfants.forEach((lien) => {
            this._structureIterative._elemParent.delierEnfant(lien.element);
            this._structureIterativeNonBornee._elemParent.lierEnfant(lien.element);
        });
        this._structureIterative = this._structureIterativeNonBornee;
        if (this.parentNode)
        this.parentNode.removeChild(this);
    }
} window.customElements.define('invite-bornes-pour-si', InviteBornesPourSI);