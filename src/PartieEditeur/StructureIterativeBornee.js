class StructureIterativeBornee extends StructureIterative {
    // ATTRIBUTS
    _variableAIterer; // Information
    _borneInferieure; // String
    _borneSuperieure; // String
    _pas; // String

    // CONSTRUCTEUR
    constructor(abscisse, ordonnee, variableAIterer = "", borneInferieure = "BORNE_INF", borneSuperieure = "BORNE_SUP", pas = "1") {
        super(abscisse, ordonnee);
        this._variableAIterer = variableAIterer;
        this._borneInferieure = borneInferieure;
        this._borneSuperieure = borneSuperieure;
        this._pas = pas;
    }

    // ENCAPSULATION
    get _variableAIterer() {
        return this._variableAIterer;
    }

    setVariableAIterer(value)
    {
        this._variableAIterer = value;
        this.querySelector(".informationsBornes").innerHTML = `Pour ${this._variableAIterer} allant de ${this._borneInferieure} à ${this._borneSuperieure} par pas de ${this._pas}`;
    }

    get _borneInferieure() {
        return this._borneInferieure;
    }

    set _borneInferieure(value) {
        this._borneInferieure = value;
    }

    get _borneSuperieure() {
        return this._borneSuperieure;
    }

    set _borneSuperieure(value) {
        this._borneSuperieure = value;
    }

    get _pas() {
        return this._pas;
    }

    set _pas(value) {
        this._pas = value;
    }

    // METHODES
    afficher() {
        super.afficher(); // Affichage de la boucle
        // Et des informations sur notre boucle bornée.
        let divInformationsBornes = document.createElement("div");
        divInformationsBornes.className = "informationsBornes";
        divInformationsBornes.innerHTML = `Pour ${this._variableAIterer} allant de ${this._borneInferieure} à ${this._borneSuperieure} par pas de ${this._pas}`
        this.appendChild(divInformationsBornes);
    }



    rechercherAnomalies() {
        let mesAnomalies = [];
        // On vérifie que la boucle n'est pas infinie
        if(ErreurBoucleBorneeSansFin.detecterAnomalie(this)) {
            mesAnomalies.push(new ErreurBoucleBorneeSansFin(this));
        }
        // On vérifie que la boucle contient pas 7 sous-éléments ou plus
        let tropDeSousElements = AvertissementTropDeSousElements.detecterAnomalie(this);
        if(tropDeSousElements[0]) {
            mesAnomalies.push(new AvertissementTropDeSousElements(this, tropDeSousElements[1]));
        }
        return super.rechercherAnomalies(mesAnomalies);
    }

    toJSON() {
        return {
            typeElement: this.constructor.name,
            abscisse: this._abscisse,
            ordonnee: this._ordonnee,
            variableAIterer: this._variableAIterer,
            borneInferieure: this._borneInferieure,
            borneSuperieure: this._borneSuperieure,
            pas: this._pas,
            enfants: this._elemParent.toJSON()
        };
    }

    extraireInformation()
    {
        let i = new Information();
        i._nom = this._variableAIterer;
        i._type = "int";
        if(i._nom == "")
        {
            return [];
        }
        return [i];
    }
    getInformationDonnee() 
    {
        return this.extraireInformation();
    }
    getInformationResultat() 
    {
        return [];
    }
    include(nameInformation)
    {
        return this._variableAIterer.includes(nameInformation) || this._pas.includes(nameInformation) || this._borneInferieure.includes(nameInformation) || this._borneSuperieure.includes(nameInformation);
    }
    renameInformation(ancienNom, nouveauNom)
    {
        if(this._variableAIterer == ancienNom)
        {
            this.setVariableAIterer(nouveauNom);
        }
    }
} window.customElements.define("structure-iterative-bornee-element", StructureIterativeBornee);