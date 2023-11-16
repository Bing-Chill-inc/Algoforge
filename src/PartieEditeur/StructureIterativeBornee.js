class StructureIterativeBornee extends StructureIterative {
    // ATTRIBUTS
    _variableAIterer; // Information
    _borneInferieure; // String
    _borneSuperieure; // String
    _pas; // String

    // CONSTRUCTEUR
    constructor(abscisse, ordonnee, variableAIterer = new Information(), borneInferieure = "BORNE_INF", borneSuperieure = "BORNE_SUP", pas = "1") {
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

    set _variableAIterer(value) {
        this._variableAIterer = value;
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
        divInformationsBornes.innerHTML = `Pour ${this._variableAIterer._nom} allant de ${this._borneInferieure} à ${this._borneSuperieure} par pas de ${this._pas}`
        this.appendChild(divInformationsBornes);
    }

    rechercherAnomalies() {
        let listeAnomalies = [];
        // On vérifie que la boucle n'est pas infinie
        if(this.peutAtteindre() == false) {
            listeAnomalies.push(new ErreurBoucleBorneeSansFin());
        }
        // On vérifie que la boucle contient pas 7 sous-éléments ou plus
        if(this.getEnfants().length >= 7) {
            listeAnomalies.push(new AvertissementTropDeSousElements(this.getEnfants()));
        }
        return listeAnomalies;
    }

    peutAtteindre() {
        // On vérifie que la borne inférieure et supèrieur sont des nombres
        if (isNaN(this._borneInferieure) || isNaN(this._borneSuperieure)) {
            return true;
        }  
        else {
            // convertion des bornes en nombre
            borneInferieure = Number(this._borneInferieure);
            borneSuperieure = Number(this._borneSuperieure);
            pas = Number(this._pas);
            let courant = borneInferieure;
            while (courant <= borneSuperieure && pas != 0) {
                if (courant >= borneSuperieure) {
                    return true;
                }
                courant += pas;
            }
        }
        return false;
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
} window.customElements.define("structure-iterative-bornee-element", StructureIterativeBornee);