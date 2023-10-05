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
    
    setPosition(abscisse, ordonnee) {
        this._abscisse = abscisse;
        this._ordonnee = ordonnee;
    }

    getPosition() {
        return {abscisse: this._abscisse, ordonnee: this._ordonnee};
    }
}

class Type {
    // ATTRIBUTS
    _nom; // String

    // CONSTRUCTEUR
    constructor(nom) {
        this._nom = nom;
    }

    // ENCAPSULATION
    get _nom() {
        return this._nom;
    }

    set _nom(value) {
        this._nom = value;
    }

    // METHODES
    estConforme(expression) {
        return true;
    }

    ajouterFonctionDeConformite(fonction) {
        this.estConforme = fonction;
    }
}

class Information {
    // ATTRIBUTS
    _nom; // String
    _type; // Type
    _signification; // String

    // CONSTRUCTEUR
    constructor(_nom, _type, _signification) {
        this._nom = _nom;
        this._type = _type;
        this._signification = _signification;
    }

    // ENCAPSULATION
    get _nom() {
        return this._nom;
    }

    set _nom(value) {
        this._nom = value;
    }

    get _type() {
        return this._type;
    }

    set _type(value) {
        this._type = value;
    }

    get _signification() {
        return this._signification;
    }

    set _signification(value) {
        this._signification = value;
    }
}

class ElementParent {
    // ATTRIBUTS
    _listeElementsEnfants; // Liste d'ElementGraphique
    _proprietaire; // ElementGraphique

    // CONSTRUCTEUR
    constructor(proprietaire, listeElementsEnfants = []) {
        this._proprietaire = proprietaire;
        this._listeElementsEnfants = listeElementsEnfants;
    }

    // ENCAPSULATION
    get _listeElementsEnfants() {
        return this._listeElementsEnfants;
    }

    set _listeElementsEnfants(value) {
        this._listeElementsEnfants = value;
    }

    get _proprietaire() {
        return this._proprietaire;
    }

    set _proprietaire(value) {
        this._proprietaire = value;
    }

    // METHODES
    lierEnfant(element) {
        this._listeElementsEnfants.push(element);
    }

    delierEnfant(element) {
        this._listeElementsEnfants.splice(this._listeElementsEnfants.indexOf(element), 1);
    }
}

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

                let textareaDonnees = document.createElement("textarea");
                textareaDonnees.className = "donnees";
                divDonnees.appendChild(textareaDonnees);

                let labelAccoladesDDonnes = document.createElement("label");
                labelAccoladesDDonnes.className = "accolades";
                labelAccoladesDDonnes.innerHTML = "}";
                divDonnees.appendChild(labelAccoladesDDonnes);

            let textareaNom = document.createElement("textarea");
            textareaNom.className = "nom";
            divContainerDPR.appendChild(textareaNom);

            let divResultat = document.createElement("div");
            divResultat.className = "resultat";
            divContainerDPR.appendChild(divResultat);

                let labelAccoladesGResultats = document.createElement("label");
                labelAccoladesGResultats.className = "accolades";
                labelAccoladesGResultats.innerHTML = "{";
                divResultat.appendChild(labelAccoladesGResultats);

                let textareaResultats = document.createElement("textarea");
                textareaResultats.className = "resultat";
                divResultat.appendChild(textareaResultats);

                let labelAccoladesDResultats = document.createElement("label");
                labelAccoladesDResultats.className = "accolades";
                labelAccoladesDResultats.innerHTML = "}";
                divResultat.appendChild(labelAccoladesDResultats);

        let divDecomposition = document.createElement("div");
        divDecomposition.className = "decomposition";
        this.appendChild(divDecomposition);
    }
} window.customElements.define("probleme-element", Probleme);

class Procedure extends Probleme {
    // ATTRIBUTS -non-
    // CONSTRUCTEUR
    constructor(abscisse, ordonnee, libelle, listeDonnes = [], listeResultats = []) {
        super(abscisse, ordonnee, libelle, listeDonnes, listeResultats);
    }

    // ENCAPSULATION -non-

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

                let textareaDonnees = document.createElement("textarea");
                textareaDonnees.className = "donnees";
                divDonnees.appendChild(textareaDonnees);

                let labelAccoladesDDonnes = document.createElement("label");
                labelAccoladesDDonnes.className = "accolades";
                labelAccoladesDDonnes.innerHTML = "}";
                divDonnees.appendChild(labelAccoladesDDonnes);

            let divContour = document.createElement("div");
            divContour.className = "contour";
            divContainerDPR.appendChild(divContour);

                let textareaNom = document.createElement("textarea");
                textareaNom.className = "nom";
                divContour.appendChild(textareaNom);

            let divResultat = document.createElement("div");
            divResultat.className = "resultat";
            divContainerDPR.appendChild(divResultat);

                let labelAccoladesGResultats = document.createElement("label");
                labelAccoladesGResultats.className = "accolades";
                labelAccoladesGResultats.innerHTML = "{";
                divResultat.appendChild(labelAccoladesGResultats);

                let textareaResultats = document.createElement("textarea");
                textareaResultats.className = "resultat";
                divResultat.appendChild(textareaResultats);

                let labelAccoladesDResultats = document.createElement("label");
                labelAccoladesDResultats.className = "accolades";
                labelAccoladesDResultats.innerHTML = "}";
                divResultat.appendChild(labelAccoladesDResultats);

        let divDecomposition = document.createElement("div");
        divDecomposition.className = "decomposition";
        this.appendChild(divDecomposition);
    }
} window.customElements.define("procedure-element", Procedure);

class Condition extends HTMLElement {
    // ATTRIBUTS
    _libelle; // String
    _elemParent; // ElementParent (liste des enfants)
    _structure; // StructureAlternative qui contient cette condition

    // CONSTRUCTEUR
    constructor(libelle = "", elemParent = new ElementParent(), structure = null) {
        super();
        this._libelle = libelle;
        this._elemParent = elemParent;
        this._structure = structure;
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

    // METHODES
    afficher() {
        console.log(`Libellé : ${this._libelle}`);
        console.log("Enfants :");
        this._elemParent._listeElementsEnfants.forEach((element) => {
            element.afficher();
        });
    }
} window.customElements.define("condition-element", Condition);

class StructureAlternative extends ElementGraphique {
    // ATTRIBUTS 
    _listeConditions; // HTML Collection de Condition•s

    // CONSTRUCTEUR
    constructor(abscisse, ordonnee, listeConditions = []) {
        super(abscisse, ordonnee);
        this._listeConditions = listeConditions;
        if (this._listeConditions.length == 0) {
            this._listeConditions.push(new Condition());
            this._listeConditions[0]._structure = this;
        }
    }

    // ENCAPSULATION
    get _listeConditions() {
        return this._listeConditions;
    }

    set _listeConditions(value) {
        this._listeConditions = value;
    }

    // METHODES
    afficher() {
        console.log(`Abscisse : ${this._abscisse} Ordonnée : ${this._ordonnee}`);
        console.log("Conditions :");
        this._listeConditions.forEach((condition) => {
            condition.afficher();
        });
    }

    ajouterCondition(condition) {
        this._listeConditions.appendChild(condition);
    }

    supprimerCondition(condition) {
        this._listeConditions.removeChild(condition);
    }
}

class StructureSi extends StructureAlternative {
    // ATTRIBUTS -non-

    // CONSTRUCTEUR
    constructor(abscisse, ordonnee, listeConditions = []) {
        super(abscisse, ordonnee, listeConditions);
    }

    // ENCAPSULATION -non-

    // METHODES
    afficher() {
        let divTriangleGauche = document.createElement("div");
        divTriangleGauche.className = "triangleGauche";
        this.appendChild(divTriangleGauche);

        let divConditionContainer = document.createElement("div");
        divConditionContainer.className = "conditionContainer";
        this.appendChild(divConditionContainer);

            for (let i = 0; i < this._listeConditions.length; i++) {
                divConditionContainer.appendChild(this._listeConditions[i]);
            }
        
        this._listeConditions = divConditionContainer

        let divTriangleDroit = document.createElement("div");
        divTriangleDroit.className = "triangleDroit";
        this.appendChild(divTriangleDroit);
    }
} window.customElements.define("structure-si-element", StructureSi);

class StructureSwitch extends StructureAlternative {
    // ATTRIBUTS
    _expressionATester; // String

    // CONSTRUCTEUR
    constructor(abscisse, ordonnee, listeConditions = [], expressionATester = "") {
        super(abscisse, ordonnee, listeConditions);
        this._expressionATester = expressionATester;
    }

    // ENCAPSULATION
    get _expressionATester() {
        return this._expressionATester;
    }

    set _expressionATester(value) {
        this._expressionATester = value;
    }

    // METHODES
    afficher() {
        let divTriangleGauche = document.createElement("div");
        divTriangleGauche.className = "triangleGauche";
        this.appendChild(divTriangleGauche);

        let textareaExpressionATester = document.createElement("textarea");
        textareaExpressionATester.className = "expressionATester";
        this.appendChild(textareaExpressionATester);

        let hrDiviseurGauche = document.createElement("hr");
        hrDiviseurGauche.className = "diviseurGauche";
        this.appendChild(hrDiviseurGauche);

        let divConditionContainer = document.createElement("div");
        divConditionContainer.className = "conditionContainer";
        this.appendChild(divConditionContainer);

            for (let i = 0; i < this._listeConditions.length; i++) {
                divConditionContainer.appendChild(this._listeConditions[i]);
            }
        
        this._listeConditions = divConditionContainer

        let divTriangleDroit = document.createElement("div");
        divTriangleDroit.className = "triangleDroit";
        this.appendChild(divTriangleDroit);

        let hrDiviseurDroit = document.createElement("hr");
        hrDiviseurDroit.className = "diviseurDroit";
        this.appendChild(hrDiviseurDroit);
    }
} window.customElements.define("structure-switch-element", StructureSwitch);

class StructureIterative extends ElementGraphique {
    // ATTRIBUTS
    _elemParent; // ElementParent (liste des enfants)

    // CONSTRUCTEUR
    constructor(abscisse, ordonnee, elemParent = new ElementParent()) {
        super(abscisse, ordonnee);
        this._elemParent = elemParent;
        if (this._elemParent != null) {
            elemParent._proprietaire = this;
        }
    }

    // ENCAPSULATION -non-

    // METHODES
    afficher() {
        super.afficher();
        console.log("Enfants :");
        this._elemParent._listeElementsEnfants.forEach((element) => {
            element.afficher();
        });
    }
}

class StructureIterativeNonBornee extends StructureIterative {
    // ATTRIBUTS -non-

    // CONSTRUCTEUR
    constructor(abscisse, ordonnee) {
        super(abscisse, ordonnee);
    }

    // ENCAPSULATION -non-

    // METHODES
    afficher() {
        super.afficher();
    }
} window.customElements.define("structure-iterative-non-bornee-element", StructureIterativeNonBornee);

class StructureIterativeBornee extends StructureIterative {
    // ATTRIBUTS
    _variableAIterer; // Information
    _borneInferieure; // String
    _borneSuperieure; // String
    _pas; // String

    // CONSTRUCTEUR
    constructor(abscisse, ordonnee, variableAIterer = null, borneInferieure = "", borneSuperieure = "", pas = "") {
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
        super.afficher();
        console.log(`Variable à itérer : ${this._variableAIterer._nom} Borne inférieure : ${this._borneInferieure} Borne supérieure : ${this._borneSuperieure} Pas : ${this._pas}`);
    }

} window.customElements.define("structure-iterative-bornee-element", StructureIterativeBornee);

class conditionSortie extends ElementGraphique {
    // ATTRIBUTS -non-

    // CONSTRUCTEUR
    constructor(abscisse, ordonnee) {
        super(abscisse, ordonnee);
    }

    // ENCAPSULATION -non-

    // METHODES
    afficher() {
        super.afficher();
    }
} window.customElements.define("condition-sortie-element", conditionSortie);