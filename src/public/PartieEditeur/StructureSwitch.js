/**
 * @class StructureSwitch
 * @classdesc La Structure Switch
 * @description Crée une instance de StructureSwitch
 * @extends {StructureAlternative}
 */
class StructureSwitch extends StructureAlternative {
    // ATTRIBUTS
    _expressionATester; // String

    // CONSTRUCTEUR
    /**
     * @constructor
     * @param {string|number} abscisse l'abscisse
     * @param {string|number} ordonnee l'ordonnée
     * @param {Array<Condition>} listeConditions La liste des conditions
     * @param {string} expressionATester l'expression utilisé dans le switch
     */
    constructor(abscisse, ordonnee, listeConditions = [], expressionATester = "") {
        super(abscisse, ordonnee, listeConditions);
        this._expressionATester = expressionATester;
    }

    // ENCAPSULATION
    /**
     * @description Renvoie l'expression à tester de la StructureSwitch
     * @returns {string} l'expression de la StructureSwitch
     */
    get _expressionATester() {
        return this._expressionATester;
    }

    /**
     * @description Définie l'expression à tester pour la StructureSwitch
     * @param {string} value La nouvelle expression à tester
     */
    set _expressionATester(value) {
        this._expressionATester = value;
    }

    // METHODES
    /**
     * @description afficher la StructureSwitch sur le plan de travail
     */
    afficher() {
        let divTriangleGauche = document.createElement("div");
        divTriangleGauche.className = "triangleGauche";
        this.appendChild(divTriangleGauche);

        let divExpressionATester = document.createElement("div");
        divExpressionATester.className = "expressionATester";
        divExpressionATester.contentEditable = "true";
        divExpressionATester.innerText = this._expressionATester;
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

    /**
     * @description Enregistre les valeurs de la StructureSwitch dans une variables
     */
    ExtraireVariables()
    {
        let nameVariable = this.querySelector(".expressionATester").textContent;
        let premiereCondition = this.querySelector(".conditionContainer");

        return [];
    }

    /**
     * @description Renvoie le corp JSON des information contenu dans la StructureSwitch
     * 
     * @returns {JSON} le corps json de la StructureSwitch
     * @property {ElementGraphique} typeElement Le type de la StructureSwitch (qui est StructureSwitch)
     * @property {string|number} abscisse l'abscisse
     * @property {string|number} ordonee l'ordonnée
     * @property {string} expressionATester l'expression actuellement tester par la StructureSwitch
     * @property {Array<Condition>} conditions la liste des conditions actuelle dans la StructureSwitch
     */
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

    /**
     * @description Récupère la liste actuelles des anomalies detecté et ajoute ces propres anomalies détecté à celle ci<br>
     * Liste des Erreurs :<br>
     * 8 : Pas double égal dans une condition mais un égal <br>
     * 12 : Plus de sept actions à la suite <br>
     * 16 : Comparaison dans un switch  
     * 
     * @returns {Array<AnomalieConceptuelle>} La liste précédantes + les anomalies détecté par la StructureSwitch
     */
    rechercherAnomalies() {
        let mesAnomalies = [];
        //8
        if(ErreurSyntaxeComparaison.detecterAnomalie(this)) {
            mesAnomalies.push(new ErreurSyntaxeComparaison(this));
        }
        //12
        let tropDeSousElements = AvertissementTropDeSousElements.detecterAnomalie(this);
        if(tropDeSousElements[0]) {
            mesAnomalies.push(new AvertissementTropDeSousElements(this, tropDeSousElements[1]));
        }
        //16
        let comparaisonSwitch = ErreurComparaisonSwitch.detecterAnomalie(this);
        if(comparaisonSwitch[0]) {
            mesAnomalies.push(new ErreurComparaisonSwitch(this, comparaisonSwitch[1]));
        }
        if(!comparaisonSwitch[0]) {
            let typesInconsistantsAlternatif = ErreurTypesInconsistantsAlternatif.detecterAnomalie(this);
            if(typesInconsistantsAlternatif[0]) {
                mesAnomalies.push(new ErreurTypesInconsistantsAlternatif(this, typesInconsistantsAlternatif[1], typesInconsistantsAlternatif[2]));
            }
        }
        return super.rechercherAnomalies(mesAnomalies);
    }
    extraireInformation() {
        if(this._expressionATester.trim() == "")
        {
            return [new Information(this._expressionATester, Type.undefined)]
        }
        return [];

    }
} window.customElements.define("structure-switch-element", StructureSwitch);