class PlanTravail extends HTMLElement {
    // ATTRIBUTS -non-

    // CONSTRUCTEUR
    constructor() {
        super();
        this.addEventListener("paste", (event) => {
            event.preventDefault();
            let texte = event.clipboardData.getData("text/plain");
            this.chargerFichier(texte);
        });
    }

    // ENCAPSULATION -non-

    // METHODES
    exporterEnJSON() {
        let listeElementsSansParents = [];
        for (let element of this.children) {
            if (element._parent == null) {
                listeElementsSansParents.push(element);
            }
        }

        let corpsJSON = [];
        listeElementsSansParents.forEach((element) => {
            corpsJSON.push(element.toJSON());
        });
        return corpsJSON;
    }

    chargerFichier(fichier) {
        try {
            var parsedData = JSON.parse(fichier)
            this.chargerDepuisJSON(parsedData);
        } catch (error) {
            console.error("Le fichier n'est pas au format JSON.");
        }
    }

    chargerDepuisJSON(corpsJSON) {
        if (corpsJSON == undefined) {
            return [];
        }
        let listeElems = [];
        for (let element of corpsJSON) {
            switch (element.typeElement) {
                case "Probleme":
                    let probleme = new Probleme(element.abscisse, element.ordonnee, element.libelle);
                    for (let donnee of element.listeDonnes) {
                        probleme._listeDonnes.push(new Information(donnee.nom, donnee.type, donnee.signification));
                    }
                    for (let resultat of element.listeResultats) {
                        probleme._listeResultats.push(new Information(resultat.nom, resultat.type, resultat.signification));
                    }
                    for (let enfant of this.chargerDepuisJSON(element.enfants)) {
                        probleme._elemParent.lierEnfant(enfant);
                    }
                    this.appendChild(probleme);
                    probleme.afficher();
                    probleme.setPosition();
                    listeElems.push(probleme);
                    break;
                case "Procedure":
                    let procedure = new Procedure(element.abscisse, element.ordonnee, element.libelle);
                    for (let donnee of element.listeDonnes) {
                        procedure._listeDonnes.push(new Information(donnee.nom, donnee.type, donnee.signification));
                    }
                    for (let resultat of element.listeResultats) {
                        procedure._listeResultats.push(new Information(resultat.nom, resultat.type, resultat.signification));
                    }
                    for (let enfant of this.chargerDepuisJSON(element.enfants)) {
                        procedure._elemParent.lierEnfant(enfant);
                    }
                    this.appendChild(procedure);
                    procedure.afficher();
                    procedure.setPosition();
                    listeElems.push(procedure);
                    break;
                case "StructureSi":
                    let listeConditionsSi = [];
                    for (let condition of this.chargerDepuisJSON(element.conditions)) {
                        listeConditionsSi.push(condition);
                    }
                    let structureSi = new StructureSi(element.abscisse, element.ordonnee, listeConditionsSi);
                    structureSi.afficher();
                    structureSi.setPosition();
                    this.appendChild(structureSi);
                    listeElems.push(structureSi);
                    break;
                case "StructureSwitch":
                    let listeConditionsSwitch = [];
                    for (let condition of this.chargerDepuisJSON(element.conditions)) {
                        listeConditionsSwitch.push(condition);
                    }
                    let structureSwitch = new StructureSwitch(element.abscisse, element.ordonnee, listeConditionsSwitch ,element.expressionATester);
                    structureSwitch.afficher();
                    structureSwitch.setPosition();
                    for (let condition of this.chargerDepuisJSON(element.conditions)) {
                        structureSwitch.ajouterCondition(condition);
                    }
                    this.appendChild(structureSwitch);
                    listeElems.push(structureSwitch);
                    break;
                case "Condition":
                    let condition = new Condition(element.libelle);
                    for (let enfant of this.chargerDepuisJSON(element.enfants)) {
                        condition._elemParent.lierEnfant(enfant);
                    }
                    condition.afficher();
                    listeElems.push(condition);
                    break;
                case "StructureIterativeNonBornee":
                    let structureIterativeNonBornee = new StructureIterativeNonBornee(element.abscisse, element.ordonnee);
                    for (let enfant of this.chargerDepuisJSON(element.enfants)) {
                        structureIterativeNonBornee._elemParent.lierEnfant(enfant);
                    }
                    this.appendChild(structureIterativeNonBornee);
                    structureIterativeNonBornee.afficher();
                    structureIterativeNonBornee.setPosition();
                    listeElems.push(structureIterativeNonBornee);
                    break;
                case "StructureIterativeBornee":
                    let structureIterativeBornee = new StructureIterativeBornee(element.abscisse, element.ordonnee, element.variableAIterer, element.borneInferieure, element.borneSuperieure, element.pas);
                    for (let enfant of this.chargerDepuisJSON(element.enfants)) {
                        structureIterativeBornee._elemParent.lierEnfant(enfant);
                    }
                    this.appendChild(structureIterativeBornee);
                    structureIterativeBornee.afficher();
                    structureIterativeBornee.setPosition();
                    listeElems.push(structureIterativeBornee);
                    break;
                case "ConditionSortie":
                    let conditionSortie = new ConditionSortie(element.abscisse, element.ordonnee);
                    this.appendChild(conditionSortie);
                    conditionSortie.afficher();
                    conditionSortie.setPosition();
                    listeElems.push(conditionSortie);
                    break;
                default:
                    break;
            }
        }
        return listeElems;
    }
} window.customElements.define("plan-travail", PlanTravail);

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
        this.setPosition(abscisse, ordonnee);
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
    
    setPosition(abscisse = -1, ordonnee = -1) {
        if (abscisse == -1 && ordonnee == -1) {
            this.style.left = "calc(var(--sizeModifier) * " + this._abscisse + ")";
            this.style.top = "calc(var(--sizeModifier) * " + this._ordonnee + ")";
        } else {
            this.style.left = "calc(var(--sizeModifier) * " + abscisse + ")";
            this.style.top = "calc(var(--sizeModifier) * " + ordonnee + ")";
        }
    }

    getPosition() {
        return {abscisse: this.style.left, ordonnee: this.style.top};
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
    constructor(_nom = "i", _type, _signification) {
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

    // METHODES
    toJSON() {
        return {
            nom: this._nom,
            type: this._type,
            signification: this._signification
        };
    }
}

class ElementParent {
    // ATTRIBUTS
    _listeElementsEnfants; // Liste de dictionnaires ElementGraphique, Ligne
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
    lierEnfant(elementAAjouter) {
        elementAAjouter._parent = this;
        this._listeElementsEnfants.push({element : elementAAjouter, ligne : new Ligne()});
    }

    delierEnfant(elementASupprimer) {
        var lien
        for (lien of this._listeElementsEnfants) {
            if (lien.element === elementASupprimer) {
                this._listeElementsEnfants.splice(this._listeElementsEnfants.indexOf(lien), 1);
                lien.element._parent = null;
                break;
            }
        }
    }

    toJSON() {
        let listeEnfants = [];
        this._listeElementsEnfants.forEach((lien) => {
            listeEnfants.push(lien.element.toJSON());
        });
        return listeEnfants;
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
        super.afficher();
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
        this.afficher();
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
        let buttonSupprimer = document.createElement("button");
        buttonSupprimer.className = "supprimer";
        buttonSupprimer.innerHTML = "-"
        buttonSupprimer.style.display = "none";
        this.appendChild(buttonSupprimer);

        let divLibelle = document.createElement("div");
        divLibelle.className = "libelle";
        divLibelle.innerHTML = this._libelle;
        divLibelle.contentEditable = "true";
        this.appendChild(divLibelle);

        let divDragHandle = document.createElement("div");
        divDragHandle.className = "dragHandle";
        divDragHandle.innerHTML = "• • •<br>• • •"
        this.appendChild(divDragHandle);
    }

    afficherBoutonSupp() {
        this.querySelector("button.supprimer").style.display = "block";
    }

    cacherBoutonSupp() {
        this.querySelector("button.supprimer").style.display = "none";
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

    ajouterCondition(condition = new Condition()) {
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

    toJSON() {
        let conditions = [];
        for (let condition of this._listeConditions.children) {
            conditions.push(condition.toJSON());
        }
        return {
            typeElement: this.constructor.name,
            abscisse: this._abscisse,
            ordonnee: this._ordonnee,
            conditions: conditions
        };
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

        let divExpressionATester = document.createElement("div");
        divExpressionATester.className = "expressionATester";
        divExpressionATester.contentEditable = "true";
        this.appendChild(divExpressionATester);

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

    toJSON() {
        let conditions = [];
        this._listeConditions.forEach((condition) => {
            conditions.push(condition.toJSON());
        });
        return {
            typeElement: this.constructor.name,
            abscisse: this._abscisse,
            ordonnee: this._ordonnee,
            expressionATester: this._expressionATester,
            conditions: conditions
        };
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
        let imgBoucleSVG = document.createElement("img");
        imgBoucleSVG.className = "boucleSVG";
        imgBoucleSVG.src = "assets/boucle.svg";
        this.appendChild(imgBoucleSVG);
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
        super.afficher(); // Affichage de la boucle seule
    }

    toJSON() {
        return {
            typeElement: this.constructor.name,
            abscisse: this._abscisse,
            ordonnee: this._ordonnee,
            enfants: this._elemParent.toJSON()
        };
    }   
} window.customElements.define("structure-iterative-non-bornee-element", StructureIterativeNonBornee);

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

class ConditionSortie extends ElementGraphique {
    // ATTRIBUTS -non-

    // CONSTRUCTEUR
    constructor(abscisse = 0, ordonnee = 0) {
        super(abscisse, ordonnee);
    }

    // ENCAPSULATION -non-

    // METHODES
    afficher() {
        // Inutile car géré par le CSS, mais présent pour la cohérence
        return null;
    }

    toJSON() {
        return {
            typeElement: this.constructor.name,
            abscisse: this._abscisse,
            ordonnee: this._ordonnee
        };
    }
} window.customElements.define("condition-sortie-element", ConditionSortie);

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