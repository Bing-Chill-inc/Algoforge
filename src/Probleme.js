class Probleme extends ElementGraphique {
    // ATTRIBUTS
    _libelle; // String
    _listeDonnes; // Liste d'Information
    _listeResultats; // Liste d'Information
    _elemParent; // ElementParent (liste des enfants)

    // CONSTRUCTEUR
    constructor(abscisse = 0, ordonnee = 0, libelle = "", listeDonnes = [], listeResultats = [], elemParent = new ElementParent()) {
        super(abscisse, ordonnee);
        this._libelle = libelle;
        this._listeDonnes = listeDonnes;
        this._listeResultats = listeResultats;
        this._elemParent = elemParent;
        if (this._elemParent != null) {
            elemParent._proprietaire = this;
        }
    }

    // ENCAPSULATION
    get _libelle() {
        return this._libelle;
    }

    set _libelle(value) {
        this._libelle = value;
    }

    get _listeDonnes() {
        return this._listeDonnes;
    }

    set _listeDonnes(value) {
        this._listeDonnes = value;
    }

    get _listeResultats() {
        return this._listeResultats;
    }

    set _listeResultats(value) {
        this._listeResultats = value;
    }

    get _elemParent() {
        return this._elemParent;
    }

    set _elemParent(value) {
        this._elemParent = value;
    }

    // METHODES
    afficher() {
        let divContainerDPR = document.createElement("div");
        divContainerDPR.className = "containerDPR";
        this.appendChild(divContainerDPR);

            let divDonnees = document.createElement("div");
            divDonnees.className = "donnees";
            divContainerDPR.appendChild(divDonnees);

                let labelAccoladesGDonnes = document.createElement("label");
                labelAccoladesGDonnes.className = "accolades";
                labelAccoladesGDonnes.innerHTML = "{";
                divDonnees.appendChild(labelAccoladesGDonnes);

                let divDonneesEditable = document.createElement("div");
                divDonneesEditable.className = "donneesEditable";
                divDonneesEditable.contentEditable = "true";
                let donneesAAjouter = "";
                this._listeDonnes.forEach((donnee) => {
                    donneesAAjouter += donnee._nom + "<br>";
                });
                divDonneesEditable.innerHTML = donneesAAjouter;
                divDonnees.appendChild(divDonneesEditable);

                let labelAccoladesDDonnes = document.createElement("label");
                labelAccoladesDDonnes.className = "accolades";
                labelAccoladesDDonnes.innerHTML = "}";
                divDonnees.appendChild(labelAccoladesDDonnes);

            let divNom = document.createElement("div");
            divNom.className = "nom";
            divNom.contentEditable = "true";
            divNom.innerHTML = this._libelle;
            divContainerDPR.appendChild(divNom);

            let divResultat = document.createElement("div");
            divResultat.className = "resultat";
            divContainerDPR.appendChild(divResultat);

                let labelAccoladesGResultats = document.createElement("label");
                labelAccoladesGResultats.className = "accolades";
                labelAccoladesGResultats.innerHTML = "{";
                divResultat.appendChild(labelAccoladesGResultats);

                let divResultatsEditable = document.createElement("div");
                divResultatsEditable.className = "resultatEditable";
                divResultatsEditable.contentEditable = "true";
                let resultatsAAjouter = "";
                this._listeResultats.forEach((resultat) => {
                    resultatsAAjouter += resultat._nom + "<br>";
                });
                divResultatsEditable.innerHTML = resultatsAAjouter;
                divResultat.appendChild(divResultatsEditable);

                let labelAccoladesDResultats = document.createElement("label");
                labelAccoladesDResultats.className = "accolades";
                labelAccoladesDResultats.innerHTML = "}";
                divResultat.appendChild(labelAccoladesDResultats);

        let divDecomposition = document.createElement("div");
        divDecomposition.className = "decomposition";
        this.appendChild(divDecomposition);
    }

    toJSON() {
        let lstDonnees = [];
        this._listeDonnes.forEach((donnee) => {
            lstDonnees.push(donnee.toJSON());
        });

        let lstResultats = [];
        this._listeResultats.forEach((resultat) => {
            lstResultats.push(resultat.toJSON());
        });
        return {
            typeElement: this.constructor.name,
            abscisse: this._abscisse,
            ordonnee: this._ordonnee,
            libelle: this._libelle,
            listeDonnes: lstDonnees,
            listeResultats: lstResultats,
            enfants: this._elemParent.toJSON()
        };
    }

    ExtraireVariables()
    {
        let i = new Information();
        i._nom = "";
        const contenue = this.querySelector(".nom").textContent; //' aa -> " a a " ';
        if(contenue.includes("->"))
        {
            let nomDeVariable = contenue.split("->")[0].trim();
            let contenueVariable = contenue.split("->")[1].trim();
            i._nom = nomDeVariable;
            i._type = i.DetecteterLeType(contenueVariable);
        }
        return i;
    }
} window.customElements.define("probleme-element", Probleme);